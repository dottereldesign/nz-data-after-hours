const casinoSource = ["DIA · Division 8, rule 3.9 and Appendix 1", "https://www.dia.govt.nz/diawebsite.nsf/Files/Gambling-2025/%24file/Division-8-Roulette-consolidated-2025-%28corrected%29.pdf"];
const years = Object.keys(annualBreakdown).reverse();
choices("pokie-year", years);
function pokieReturn() {
  const year = get("pokie-year").value;
  const [loss, prizes, turnover] = annualBreakdown[year]["Pub and club pokies"];
  const share = 100 * prizes / turnover;
  const sheet = "DIA’s nominal statistics sheet, Gaming Machines (outside casinos), " + year + ". Values converted from NZD millions to NZ dollars and rounded to the nearest dollar.";
  get("pokie-figures").replaceChildren(
    figure("Prizes as a share of turnover", share.toFixed(2) + "%", "$" + printed(prizes) + " in prizes ÷ $" + printed(turnover) + " in wagers × 100. This percentage measures dollars returned across the sector. The workbook gives no count of winning spins.", officialSpend),
    figure("Prizes", "$" + printed(prizes), sheet + " Prizes row.", officialSpend),
    figure("Turnover", "$" + printed(turnover), sheet + " Turnover row. Turnover includes winnings wagered again.", officialSpend),
    figure("Player expenditure", "$" + printed(loss), sheet + " Expenditure row.", officialSpend));
}
get("pokie-year").onchange = pokieReturn;
pokieReturn();
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
    figure("Theoretical house edge",(100*(1-wins*payout/37)).toFixed(2)+"%","For each $1 wagered, expected return is "+wins+"/37 × $"+payout+" = $0.97297. The expected loss is $1 − $0.97297, or about 2.70 cents.",casinoSource));
}
get("game").onchange=()=>{const casino=get("game").selectedIndex===1;get("roulette").hidden=!casino;get("pokies").hidden=casino;};
get("bet").onchange=roulette;

roulette();
