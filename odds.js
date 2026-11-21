const machineSource = ["DIA · return to player and volatility (Appendix Two)", "https://www.regulation.govt.nz/assets/RIS-Documents/ria-dia-iarp-dec21.pdf"];
const casinoSource = ["DIA · roulette game rules, Division 8", "https://www.dia.govt.nz/diawebsite.nsf/Files/Gambling-2025/%24file/Division-8-Roulette-consolidated-2025-%28corrected%29.pdf"];
const machines = [{name:"Machine A", p:0.46, payout:2},{name:"Machine B", p:0.04, payout:23}];
for (const {name,p,payout} of machines) {
  const card = element("div", null, "odds-card");
  const pct = Math.round(100*p);
  const context = " This teaching model uses independent bets. DIA explains long-run return and volatility. Its report does not supply these example payouts.";
  card.append(element("h3",name),
    figure("Chance of a payout",pct+"%",pct+" of 100 equally likely outcomes pay $"+payout+" including the stake. All other outcomes pay $0."+context,machineSource),
    figure("Payout when it hits","$"+payout,"For this model, a winning $1 bet returns $"+payout+" in total. Net gain on that bet is $"+(payout-1)+"."+context,machineSource),
    figure("Expected return per $100","$92","100 × ("+p+" × $"+payout+") = $92 in expected prizes. The expected loss is $8. A short session can finish above or below either figure."+context,machineSource),
    figure("20 bets, no payouts", (100*(1-p)**20).toPrecision(3)+"%", "A miss has probability "+(1-p).toFixed(2)+". For 20 independent misses, raise that probability to the power of 20, then multiply by 100 for a percentage."+context,machineSource));
  get("machines").append(card);
}
function simulate() {
  get("strips").replaceChildren();
  for (const machine of machines) {
    const strip = element("div",null,"strip");
    strip.setAttribute("aria-hidden","true");
    let hits = 0;
    for (let i=0;i<20;i++) {
      const hit = Math.random()<machine.p;
      if (hit) hits++;
      strip.append(element("i",null,hit ? "hit" : ""));
    }
    get("strips").append(figure(machine.name + " · simulated payouts",hits+" of 20","Each dot is one independent draw with a "+Math.round(100*machine.p)+"% chance of paying. The displayed count sums the filled dots in this simulation.",machineSource),strip);
  }
}
const reds = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
function roulette() {
  const red = get("bet").value==="red";
  const wins = red ? 18 : 1, payout = red ? 2 : 36;
  get("wheel").replaceChildren();
  for (let n=0;n<=36;n++) {
    const lit = red ? reds.has(n) : n===17;
    get("wheel").append(element("span",n,lit ? "lit "+(red ? "red" : "black") : ""));
  }
  get("wheel-maths").replaceChildren(
    figure("Chance of winning",(100*wins/37).toFixed(2)+"%",wins+" winning pockets ÷ 37 equally likely pockets × 100. Zero loses on this bet. This example uses standard single-zero roulette with no special zero rule.",casinoSource),
    figure("Total returned on a winning $1 bet","$"+payout,"The winning bet earns $"+(payout-1)+" in winnings, plus the original $1 stake.",casinoSource),
    figure("House edge","2.70%","For each $1 wagered, expected return is "+wins+"/37 × $"+payout+" = $0.97297. The expected loss is $1 − $0.97297, or about 2.70 cents.",casinoSource));
}
get("game").onchange=()=>{const casino=get("game").selectedIndex===1;get("roulette").hidden=!casino;get("pokies").hidden=casino;};
get("bet").onchange=roulette;
get("again").onclick=simulate;
simulate();
roulette();
