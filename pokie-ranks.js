const rankYear = field("rank-year");
const rankSort = field("rank-sort");
options(rankYear, years);
let expandedRanks = false;
const shortMoney = new Intl.NumberFormat("en-NZ", {style:"currency", currency:"NZD", notation:"compact", maximumFractionDigits:1});
const compact = cents => shortMoney.format(cents / 100);

async function showRecipients(panel, area, year) {
  panel.textContent = "Loading grant recipients…";
  try {
    await loadYear(year);
  } catch {
    panel.replaceChildren(action("Retry loading recipients", () => showRecipients(panel, area, year)));
    return;
  }
  const totals = new Map();
  for (const record of grantRecords) {
    const [name, , , place, , scope, status, , , amount] = record;
    const recordYear = record[14];
    if (recordYear !== Number(year) || grantStrings[place] !== area || grantStrings[scope] !== "District" ||
        grantStrings[status] !== "Accepted" || !(amount > 0)) continue;
    const label = grantStrings[name].trim();
    if (!label || /^(unnamed organisation|unknown|unspecified|unreported|not (provided|recorded|specified)|n\/a)$/i.test(label)) continue;
    const key = label.toLocaleLowerCase("en-NZ");
    const item = totals.get(key) || {label, amount:0, count:0};
    item.count++;
    item.amount += amount;
    totals.set(key, item);
  }
  const sorted = [...totals.values()].sort((a,b) => b.amount - a.amount || a.label.localeCompare(b.label));
  panel.replaceChildren(text("h3", "Biggest grant recipients in " + area));
  if (!sorted.length) {
    panel.append(text("p","No named recipients with a positive single-district approval."));
    return;
  }
  const list = document.createElement("ol");
  panel.append(list);
  for (const item of sorted.slice(0,10)) {
    const li = text("li", item.label);
    li.append(text("small", money(item.amount) + " · " + item.count + (item.count === 1 ? " approval" : " approvals")));
    list.append(li);
  }
  panel.append(action("See all district records", () => selectArea(area, year)));
}

function drawRanks() {
  const year = rankYear.value;
  const ranked = [], omitted = [];
  for (const area of grantDistricts) {
    const figures = districtSeries[year][area] || {};
    const loss = annualLoss(figures);
    if (!(loss > 0)) { omitted.push(area); continue; }
    const grants = figures.grants || 0;
    ranked.push({area, grants, loss, gap:loss - grants, ratio:grants / loss});
  }
  const byGap = rankSort.value === "gap";
  ranked.sort((a,b) => (byGap ? b.gap - a.gap : a.ratio - b.ratio) || a.area.localeCompare(b.area));
  const list = field("rank-list");
  list.replaceChildren();
  for (const [index, row] of ranked.slice(0, expandedRanks ? ranked.length : 10).entries()) {
    const details = document.createElement("details");
    details.name = "district-ranking";
    const summary = document.createElement("summary");
    summary.append(text("span", String(index + 1).padStart(2,"0")), text("strong",row.area),
      text("b", byGap ? compact(row.gap) : (row.ratio * 100).toFixed(1) + "%"),
      text("small", compact(row.loss) + " lost · " + compact(row.grants) + " in grants"));
    const panel = document.createElement("div");
    panel.className = "recipient-panel";
    details.addEventListener("toggle", () => {
      if (details.open && !panel.hasChildNodes()) showRecipients(panel, row.area, year);
    });
    const maths = text("div", "");
    maths.className = "source-note";
    maths.append(text("strong","Source and calculation"), text("p", money(row.loss) + " in four quarters of player losses − " + money(row.grants) + " in approvals recorded against one district = " + money(row.gap) + ". Approvals ÷ losses × 100 = " + (100 * row.ratio).toFixed(1) + "%."));
    for (const [label, url] of [["DIA grants CSV","https://catalogue.data.govt.nz/dataset/b6b7f1cc-bfa4-4c7a-81e8-8a03f2983cae/resource/06d99ad0-47d6-4591-84c7-8872a4f77da9/download/class-4-grants-dataset-csv.csv"], ["DIA quarterly losses CSV","https://catalogue.data.govt.nz/dataset/5f1d596c-ac85-400e-8457-894aba20f637/resource/b3ac5b15-5cc9-4d7b-aef4-7215efd8836b/download/quarterly-class-4-gambling-expenditure-by-district-csv.csv"]]) {
      const source = text("a", label);
      source.href = url;
      maths.append(source, document.createElement("br"));
    }
    details.append(summary,maths,panel);
    list.append(details);
  }
  field("rank-more").textContent = expandedRanks ? "Show top 10" : "Show all " + ranked.length + " districts";
  field("rank-more").hidden = ranked.length <= 10;
  field("rank-omitted").textContent = omitted.length ? "Outside the ranking (combined, missing or zero annual losses): " + omitted.join(", ") + "." : "";
}
for (const control of [rankYear, rankSort]) control.addEventListener("change", () => { expandedRanks = false; drawRanks(); });
field("rank-more").addEventListener("click", () => { expandedRanks = !expandedRanks; drawRanks(); });
drawRanks();
