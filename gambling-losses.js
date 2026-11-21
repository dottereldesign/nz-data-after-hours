const years = Object.keys(annualBreakdown).reverse();
choices("spend-year", years);
function drawNational() {
  const year = get("spend-year").value;
  const sectors = Object.entries(annualBreakdown[year]);
  const losses = sectors.map(([, values]) => values[0]);
  const total = losses.reduce((sum, value) => sum + value, 0);
  get("spend-total").replaceChildren(figure("Four sectors, " + year, "$" + (total / 1e9).toFixed(2) + " billion", losses.map(value => "$" + printed(value)).join(" + ") + " = $" + printed(total) + ". Nominal expenditure for the four sectors below, in the order shown.", officialSpend));
  const chart = get("spend-chart");
  chart.replaceChildren();
  for (const [label, [value]] of sectors) {
    const track = element("div", null, "bar-track");
    const bar = element("div", null, "bar-fill");
    bar.style.width = (100 * value / Math.max(...losses)) + "%";
    track.append(bar);
    chart.append(figure(label, "$" + printed(Math.round(value / 1e6)) + "m", "$" + printed(value) + " in the workbook’s Expenditure row for " + label + ", " + year + ". Chart labels round to NZD millions.", officialSpend), track);
  }
}
get("spend-year").onchange = drawNational;
drawNational();
