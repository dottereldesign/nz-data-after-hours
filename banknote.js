(() => {
  "use strict";
  const stage = document.querySelector(".note-stage");
  const canvas = stage.querySelector("canvas");
  const handle = stage.querySelector(".note-grab");
  const photo = stage.querySelector("img");
  const tools = document.querySelector(".note-tools");
  const range = document.querySelector("#note-range");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const cols = 40, rows = 20;
  const nodes = [], faces = [];
  const ratio = 70 / 145;
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      nodes.push({u:i / cols, v:j / rows, x:0, y:0, z:0, px:0, py:0});
      if (!i || !j) continue;
      const d = nodes.length - 1, a = d - cols - 2, b = a + 1, c = d - 1;
      faces.push([a,b,c],[b,d,c]);
    }
  }

  // Both renderers use the same projected surface and pointer hit geometry.
  function makeRenderer() {
    const gl = canvas.getContext("webgl", {alpha:true, antialias:true, premultipliedAlpha:false});
    if (!gl) return softwareRenderer();
    function shader(type, source) {
      const s = gl.createShader(type);
      gl.shaderSource(s,source); gl.compileShader(s);
      if (!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(s));
      return s;
    }
    const program = gl.createProgram();
    gl.attachShader(program,shader(gl.VERTEX_SHADER,
      "attribute vec3 pos; attribute vec2 uv; attribute vec3 normal; varying vec2 tex; varying vec3 n; void main(){tex=uv;n=normal;gl_Position=vec4(pos,1.0);}"));
    gl.attachShader(program,shader(gl.FRAGMENT_SHADER,
      "precision mediump float; varying vec2 tex; varying vec3 n; uniform sampler2D paper; void main(){vec3 N=normalize(n);bool front=N.z>=0.0;if(!front)N=-N;vec3 base=front?texture2D(paper,tex).rgb:vec3(.80,.83,.72);vec3 L=normalize(vec3(-.46,-.55,.84));float light=.67+.42*max(dot(N,L),0.0);float glint=.027*pow(max(dot(N,normalize(L+vec3(0.,0.,1.))),0.),18.);gl_FragColor=vec4(base*light+glint,1.);}"));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program,gl.LINK_STATUS)) throw Error("Banknote renderer unavailable");
    gl.useProgram(program);
    const buffer = gl.createBuffer(), data = new Float32Array(nodes.length*8);
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,data.byteLength,gl.DYNAMIC_DRAW);
    for (const [name, size, offset] of [["pos",3,0],["uv",2,3],["normal",3,5]]) {
      const loc=gl.getAttribLocation(program,name);
      gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,size,gl.FLOAT,false,32,offset*4);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(faces.flat()),gl.STATIC_DRAW);
    gl.bindTexture(gl.TEXTURE_2D,gl.createTexture());
    for (const p of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T]) gl.texParameteri(gl.TEXTURE_2D,p,gl.CLAMP_TO_EDGE);
    for (const p of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER]) gl.texParameteri(gl.TEXTURE_2D,p,gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,photo);
    const filtering = gl.getExtension("EXT_texture_filter_anisotropic");
    if (filtering) {
      gl.texParameterf(gl.TEXTURE_2D,filtering.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(8,gl.getParameter(filtering.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
    }
    gl.enable(gl.DEPTH_TEST); gl.clearColor(0,0,0,0);
    return () => {
      gl.viewport(0,0,canvas.width,canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      for (let k=0;k<nodes.length;k++) {
        const p=nodes[k], col=k%(cols+1), row=Math.floor(k/(cols+1));
        const left=nodes[col?k-1:k], right=nodes[col<cols?k+1:k];
        const top=nodes[row?k-cols-1:k], bottom=nodes[row<rows?k+cols+1:k];
        const ax=right.x-left.x, ay=right.y-left.y, az=right.z-left.z;
        const bx=bottom.x-top.x, by=bottom.y-top.y, bz=bottom.z-top.z;
        const nx=ay*bz-az*by, ny=az*bx-ax*bz, nz=ax*by-ay*bx;
        const len=Math.hypot(nx,ny,nz)||1, i=k*8;
        data[i]=2*p.px/width-1;data[i+1]=1-2*p.py/height;data[i+2]=-p.z/6;
        data[i+3]=p.u;data[i+4]=p.v;data[i+5]=nx/len;data[i+6]=ny/len;data[i+7]=nz/len;
      }
      gl.bufferSubData(gl.ARRAY_BUFFER,0,data);gl.drawElements(gl.TRIANGLES,faces.length*3,gl.UNSIGNED_SHORT,0);
    };
  }

  function softwareRenderer() {
    const ctx=canvas.getContext("2d");
    if (!ctx) return null;
    const iw=photo.naturalWidth, ih=photo.naturalHeight;
    return () => {
      ctx.setTransform(canvas.width/width,0,0,canvas.height/height,0,0);
      ctx.clearRect(0,0,width,height);
      const sorted=faces.slice().sort((a,b)=>sumZ(a)-sumZ(b));
      function sumZ(f){return nodes[f[0]].z+nodes[f[1]].z+nodes[f[2]].z;}
      for(const f of sorted) {
        const [p,q,r]=f.map(i=>nodes[i]), x=q.px-p.px,y=q.py-p.py,X=r.px-p.px,Y=r.py-p.py;
        if (Math.abs(x*Y-y*X)<.01) continue;
        ctx.save();ctx.beginPath();ctx.moveTo(p.px,p.py);ctx.lineTo(q.px,q.py);ctx.lineTo(r.px,r.py);ctx.closePath();
        if (x*Y-y*X<0){ctx.fillStyle="#c9cdbb";ctx.fill();ctx.restore();continue;}
        ctx.clip();
        const a=(q.u-p.u)*iw,b=(q.v-p.v)*ih,c=(r.u-p.u)*iw,d=(r.v-p.v)*ih,det=a*d-b*c;
        const A=(x*d-X*b)/det,B=(y*d-Y*b)/det,C=(X*a-x*c)/det,D=(Y*a-y*c)/det;
        ctx.transform(A,B,C,D,p.px-A*p.u*iw-C*p.v*ih,p.py-B*p.u*iw-D*p.v*ih);
        ctx.drawImage(photo,0,0);ctx.restore();
      }
    };
  }

  const target={crumple:0,roll:0,turn:0,peel:0}, pose={...target};
  const labels={crumple:"Crumple",roll:"Roll",turn:"Turn",peel:"Peel corner"};
  let selected="roll",width=1,height=1,scale=1,frame=0,last=0,render;
  let x=0,y=0,tx=0,ty=0,vx=0,vy=0,lean=0,lift=0,grab=null,grabU=.5,grabV=.5;
  function resize(){
    width=stage.clientWidth;height=stage.clientHeight;scale=Math.min(1160,width*.89,height*1.45)/2;
    const dpr=Math.min(devicePixelRatio||1,4,Math.sqrt(4000000/(width*height)));
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    constrain();wake();
  }
  function constrain(){
    tx=clamp(tx,-width*.48+scale*.42,width*.48-scale*.42);
    ty=clamp(ty,-height*.47+scale*.22,height*.47-scale*.22);
  }
  function wake(){if(render&&!frame)frame=requestAnimationFrame(draw);}
  const tri=t=>2/Math.PI*Math.asin(Math.sin(t));
  function draw(now){
    frame=0;
    const dt=clamp((now-last)/1000,1/240,1/30);last=now;
    const fast=reduced.matches?1:1-Math.exp(-dt*12);
    let moving=false;
    for (const key of Object.keys(pose)){
      pose[key]+=(target[key]-pose[key])*fast;
      if(Math.abs(target[key]-pose[key])<.0002)pose[key]=target[key];else moving=true;
    }
    if(!grab){
      const decay=reduced.matches?0:Math.exp(-dt*8);
      vx*=decay;vy*=decay;tx+=vx*dt;ty+=vy*dt;constrain();
    }
    x+=(tx-x)*fast;y+=(ty-y)*fast;
    const dx=(tx-x)/scale,dy=(ty-y)/scale;
    lean+=((dx*(grabV-.5)-dy*(grabU-.5))*.65-lean)*fast;
    lift+=((grab ? .13 : 0)-lift)*fast;
    const spin=pose.turn*Math.PI*2, co=Math.cos(spin),si=Math.sin(spin);
    const tilt=-.10+lean, cs=Math.cos(tilt),sn=Math.sin(tilt);
    const rollStart=1-1.83*pose.roll,rollRadius=.20;
    let left=width, top=height, right=0, bottom=0;
    for(const p of nodes){
      let X=2*p.u-1,Y=(2*p.v-1)*ratio,Z=0;
      // Bend the free edge along a cylinder, preserving distance around the roll.
      const d=Math.max(0,X-rollStart);
      if(d){const a=d/rollRadius;X=rollStart+rollRadius*Math.sin(a);Z=rollRadius*(1-Math.cos(a))+.018*a;}
      // A diagonal cylinder lifts only the upper-right corner.
      const h=Math.max(0,.8*X-.6*Y-(1.10-.90*pose.peel));
      if(h){const radius=.18, a=h/radius, shift=radius*Math.sin(a)-h;X+=.8*shift;Y-=.6*shift;Z+=radius*(1-Math.cos(a));}
      const crush=pose.crumple, u=p.u,v=p.v;
      X=X*(1-.65*crush)+crush*.12*tri(12*v+4*u);
      Y=Y*(1-.43*crush)+crush*.09*tri(10*u-5*v);
      Z+=crush*(.16*tri(13*u+6*v)+.11*tri(12*v-5*u)+.085*tri(20*u-13*v));
      const weight=Math.exp(-6*((u-grabU)**2+(v-grabV)**2));
      Z+=lift*weight+clamp((dx*(u-.5)+dy*(v-.5))*.48,-.3,.3);
      Z+=.016*Math.sin(u*4.3+v*2.8);
      const turned=X*co+Z*si;
      p.z=-X*si+Z*co;
      p.x=turned*cs-Y*sn+dx*weight;
      p.y=turned*sn+Y*cs+dy*weight;
      const perspective=4.8/(4.8-p.z);
      p.px=width/2+x+p.x*scale*perspective;
      p.py=height/2+y+p.y*scale*perspective;
      left=Math.min(left,p.px);right=Math.max(right,p.px);
      top=Math.min(top,p.py);bottom=Math.max(bottom,p.py);
    }
    // Only the note captures touch. Swiping the blank stage scrolls the page.
    Object.assign(handle.style,{left:left+"px", top:top+"px", width:(right-left)+"px", height:(bottom-top)+"px"});
    render();
    if(moving||Math.abs(tx-x)+Math.abs(ty-y)>.04||Math.abs(vx)+Math.abs(vy)>.5||Math.abs(lean)>.001||Math.abs(lift-(grab ? .13 : 0))>.001)wake();
  }
  function point(e){const r=canvas.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];}
  function hit(px,py){
    let result=null,depth=-Infinity;
    for(const [i,j,k] of faces){
      const a=nodes[i],b=nodes[j],c=nodes[k];
      const det=(b.py-c.py)*(a.px-c.px)+(c.px-b.px)*(a.py-c.py);
      if(Math.abs(det)<.001)continue;
      const A=((b.py-c.py)*(px-c.px)+(c.px-b.px)*(py-c.py))/det;
      const B=((c.py-a.py)*(px-c.px)+(a.px-c.px)*(py-c.py))/det,C=1-A-B;
      const z=A*a.z+B*b.z+C*c.z;
      if(Math.min(A,B,C)>=0&&z>depth){depth=z;result=[A*a.u+B*b.u+C*c.u,A*a.v+B*b.v+C*c.v];}
    }
    return result;
  }
  handle.addEventListener("pointerdown",e=>{
    if(grab||e.button!==0)return;
    const [px,py]=point(e), uv=hit(px,py);
    if(!uv)return;
    [grabU,grabV]=uv;
    grab={id:e.pointerId,px,py,t:e.timeStamp,ox:tx,oy:ty,startX:px,startY:py};
    vx=vy=0;handle.setPointerCapture(e.pointerId);handle.style.cursor="grabbing";wake();
  });
  handle.addEventListener("pointermove",e=>{
    const [px,py]=point(e);
    if(!grab){if(e.pointerType==="mouse")handle.style.cursor=hit(px,py)?"grab":"default";return;}
    if(e.pointerId!==grab.id)return;
    const dt=Math.max(.01,(e.timeStamp-grab.t)/1000);
    tx=grab.ox+px-grab.startX;ty=grab.oy+py-grab.startY;constrain();
    vx=clamp((px-grab.px)/dt,-650,650);vy=clamp((py-grab.py)/dt,-650,650);
    Object.assign(grab,{px,py,t:e.timeStamp});wake();
  });
  function release(e){
    if(!grab||e.pointerId!==grab.id)return;
    if(e.type!=="pointerup"||e.timeStamp-grab.t>90)vx=vy=0;
    grab=null;handle.style.cursor="grab";wake();
  }
  for(const name of ["pointerup","pointercancel","lostpointercapture"])handle.addEventListener(name,release);
  function controls(){
    for(const b of tools.querySelectorAll("[data-shape]"))b.setAttribute("aria-pressed",String(b.dataset.shape===selected));
    document.querySelector("#note-label").textContent=labels[selected];
    const val=Math.round(target[selected]*100);
    range.value=val;
    const value=selected==="turn"?Math.round(val*3.6)+"°":val+"%";
    range.setAttribute("aria-valuetext",value);document.querySelector("#note-value").value=value;
  }
  for(const b of tools.querySelectorAll("[data-shape]"))b.onclick=()=>{
    selected=b.dataset.shape;
    if(selected==="turn")target.turn=target.turn>=1?0:Math.min(1,target.turn+.5);
    else target[selected]=target[selected]>.5?0:.85;
    controls();wake();
  };
  range.oninput=()=>{target[selected]=Number(range.value)/100;controls();wake();};
  tools.querySelector(".note-reset").onclick=()=>{
    for(const key of Object.keys(target))target[key]=0;
    tx=ty=vx=vy=0;controls();wake();
  };
  canvas.onkeydown=e=>{
    const delta={ArrowLeft:[-16,0],ArrowRight:[16,0],ArrowUp:[0,-16],ArrowDown:[0,16]}[e.key];
    if(!delta)return;e.preventDefault();tx+=delta[0];ty+=delta[1];constrain();wake();
  };
  async function start(){
    await photo.decode();render=makeRenderer();if(!render)return;
    tools.hidden=false;stage.classList.add("ready");
    controls();resize();new ResizeObserver(resize).observe(stage);
  }
  start().catch(()=>{stage.classList.remove("ready");tools.hidden=true;});
})();
