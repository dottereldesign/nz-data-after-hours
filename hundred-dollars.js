const years = Object.keys(annualBreakdown).reverse();
choices("year",years);
choices("product",Object.keys(annualBreakdown[years[0]]));
const cash = n => "$"+printed(n);
function breakdown(revealed) {
  const year=get("year").value, product=get("product").value;
  const [loss,prizes,turnover]=annualBreakdown[year][product];
  const target=get("split");
  target.replaceChildren();
  get("guess-box").hidden=prizes==null || revealed;
  if (prizes==null) {
    target.append(element("h2","Casino player losses"),figure(year+" · net expenditure",cash(loss),"DIA publishes casino expenditure in the nominal statistics sheet. Casino prizes and turnover are unavailable in this workbook, so a per-$100 payout cannot be calculated.",officialSpend));
    return;
  }
  if (!revealed) return;
  const share=prizes/turnover*100;
  target.append(element("h2","Where the $100 went"),element("p","Your guess was $"+get("guess").value+" in prizes."));
  const track=element("div",null,"prize-share"),fill=element("i");
  track.setAttribute("aria-hidden","true");
  fill.style.width=share+"%";
  track.append(fill);
  target.append(track,figure("Paid as prizes","$"+share.toFixed(2),cash(prizes)+" in prizes ÷ "+cash(turnover)+" wagered × $100. These are national sector totals for "+product+" in "+year+".",officialSpend),
    figure("Net player losses","$"+(loss/turnover*100).toFixed(2),cash(loss)+" in expenditure ÷ "+cash(turnover)+" wagered × $100. Each time a prize is wagered again it adds to turnover.",officialSpend),
    figure("Total wagered",cash(turnover),"DIA’s nominal turnover for "+product+" in "+year+", converted from NZD millions to dollars and rounded. One dollar can be wagered more than once.",officialSpend),
    element("p","Prizes and expenditure each use their own DIA row divided by turnover. The two published ratios can add to slightly more or less than $100."));
  const retry=element("button","Guess again");
  retry.onclick=()=>{breakdown(false);get("guess").focus();};
  target.append(retry);
}
get("guess").oninput=()=>{get("guess-value").value="$"+get("guess").value;};
get("reveal").onclick=()=>{breakdown(true);get("split").querySelector("summary").focus();};
for (const id of ["year","product"]) get(id).onchange=()=>breakdown(false);
breakdown(false);
