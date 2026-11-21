const dia=["DIA · quarterly venue and machine counts","https://catalogue.data.govt.nz/dataset/gaming-machine-profits-gmp-dashboard"];
const population=["Stats NZ · subnational population estimates, June 2026","https://www.stats.govt.nz/information-releases/subnational-population-estimates-at-30-june-2026/"];
const ageTable=["Stats NZ age bands · source file via Figure.NZ","https://figure.nz/table/AXNyfj38v4vAL9ax"];
const areas=Object.keys(districtSupply).sort((a,b)=>a.localeCompare(b,"en-NZ"));
choices("area",areas);
get("area").value="Auckland";
function density(row) { return row[1]*1000/(row[3]+0.4*row[2]); }
function local() {
  const name=get("area").value, row=districtSupply[name];
  const [venues,machines,teen,older]=row;
  const adults=older+0.4*teen;
  const extra=name==="Auckland"?" Auckland local-board counts are summed.":name.includes("+")?" DIA reports these two districts together; both populations are included.":"";
  get("area-title").textContent=name;
  const unavailable="DIA lists no separate June 2026 count for this area. It is excluded from the ranking.";
  get("local").replaceChildren(
    figure("Venues",venues==null?"Unreported":printed(venues),venues==null?unavailable:"DIA’s Venues count for pubs and clubs with Class 4 machines at the June 2026 quarter."+extra,dia),
    figure("Pokie machines",machines==null?"Unreported":printed(machines),machines==null?unavailable:"DIA’s EGMs count (electronic gaming machines) for the same area and quarter."+extra,dia),
    figure("Machines per 1,000 estimated residents aged 18+",machines==null?"Unavailable":density(row).toFixed(2),machines==null?unavailable:
    printed(machines)+" machines ÷ "+printed(adults)+" estimated adults × 1,000. We estimate age 18+ as "+printed(older)+" residents aged 20+ plus two fifths of "+printed(teen)+" aged 15–19, assuming equal numbers at each age within that band. Both sources refer to June 2026. Visitors can also use these machines."+extra,dia,population,ageTable));
  const linkbox=get("grants-link");
  linkbox.replaceChildren();
  for (const district of name.includes("+")?["Hurunui","Kaikoura"]:[name]) {
    const a=element("a","Compare "+district+" losses and grants");
    a.href="pokie-money.html?district="+encodeURIComponent(district)+"#district-title";
    linkbox.append(a,document.createElement("br"));
  }
}
let all=false;
function ranking() {
  const perAdult=get("sort").value==="density";
  const metric=r=>perAdult?density(r):r[1];
  const ranked=areas.filter(a=>districtSupply[a][1]!=null).sort((a,b)=>metric(districtSupply[b])-metric(districtSupply[a]) || a.localeCompare(b));
  const list=get("ranking");
  list.replaceChildren();
  for(const [i,a] of ranked.slice(0,all?ranked.length:10).entries()) {
    const row=districtSupply[a], value=metric(row);
    const btn=element("button",null,"district-choice");
    btn.append(element("span",String(i+1)+". "+a),element("strong",perAdult?value.toFixed(2):printed(value)));
    btn.onclick=()=>{get("area").value=a;local();const detail=get("local").children[perAdult?2:1];detail.open=true;detail.querySelector("summary").focus();};
    list.append(btn);
  }
  get("more-districts").textContent=all?"Show top ten":"Show all "+ranked.length+" reporting areas";
}
get("area").onchange=local;
get("sort").onchange=ranking;
get("more-districts").onclick=()=>{all=!all;ranking();};
local();
ranking();
