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
const districtCSV = ["DIA · quarterly GMP and machine counts (CSV)", "https://catalogue.data.govt.nz/dataset/4df114b8-5995-49e3-85df-185c7a30cf12/resource/0f3cbea0-57ac-4ac9-a89d-024c453e6947/download/gmp-quarterly-dashboard-dataset-csv.csv"];
const report = ["DIA · how to interpret the June 2026 figures", "https://www.dia.govt.nz/gambling-statistics-gmp-dashboard"];
const dollars = new Intl.NumberFormat("en-NZ", {style:"currency", currency:"NZD"});
choices("odds-area", Object.keys(districtSupply).sort((a,b) => a.localeCompare(b,"en-NZ")));
get("odds-area").value = "Christchurch";
function showDistrict() {
  const area = get("odds-area").value;
  const [, machines, , cents] = districtSupply[area];
  const panel = get("city-working");
  panel.replaceChildren();
  if (cents == null || !machines) {
    panel.append(figure("Loss per licensed machine", "Unavailable", "The file has no separate June 2026 figures for this district.", districtCSV));
    return;
  }
  const loss = cents / 100;
  const average = dollars.format(loss / machines);
  const working = dollars.format(loss) + " in player losses ÷ " + printed(machines) + " licensed machines = " + average + " per machine for the quarter.";
  const detail = figure("Quarterly loss per licensed machine", average, working, districtCSV, report);
  detail.open = true;
  panel.append(detail, element("p", "The numerator is all stakes less prizes (gaming machine profit) for the whole quarter. The denominator is the licensed machine count on 30 June. An individual machine’s losses and time in use can differ from this area average."));
  if (area === "Auckland") panel.append(element("p","Auckland combines the local-board records in DIA’s file before division."));
  if (area.includes("+")) panel.append(element("p","DIA reports Hurunui and Kaikōura together for this quarter."));
}
get("odds-area").onchange = showDistrict;
function showTopic() {
  const topic = get("game").value;
  get("pokies").hidden = topic !== "national";
  get("roulette").hidden = topic !== "roulette";
  get("district").hidden = topic !== "district";
}
if (location.hash === "#district") get("game").value = "district";
get("game").onchange = showTopic;
showDistrict();
showTopic();
get("bet").onchange=roulette;

roulette();
