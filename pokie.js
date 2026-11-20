const field = id => document.getElementById(id);
const years = Object.keys(districtSeries).map(Number).sort((a, b) => b - a);
const normal = value => value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const keywords = grantStrings.map(normal);
const currency = new Intl.NumberFormat("en-NZ", {style: "currency", currency: "NZD", maximumFractionDigits: 2, minimumFractionDigits: 0});
const money = cents => cents == null ? "Unreported" : currency.format(cents / 100);
const text = (tag, content) => Object.assign(document.createElement(tag), {textContent: content});
const yearField = field("year"), societyField = field("society"), query = field("query");
const district = field("district"), chartYear = field("chart-year");
const statusLine = field("status"), records = field("records");
const loadTasks = new Map(), areaCache = new Map();
let matches = [], shown = 0, revision = 0, timer, districtFilter = "";
function options(select, items, all) {
  if (all) select.add(new Option(all, ""));
  for (const value of items) select.add(new Option(value, value));
}
options(yearField, years, "All years");
// Group spelling and legal-suffix variants while preserving the society label on each record.
function societyKey(name) {
  return normal(name).replace(/^the /, "").replace(/ (limited|incorporated|ltd)$/, "").replace(/ /g, "");
}
const societyLabels = new Map();
for (const name of grantSocieties) {
  const key = societyKey(name);
  if (!societyLabels.has(key) || name.length > societyLabels.get(key).length) societyLabels.set(key, name);
}
options(societyField, [...societyLabels.values()].sort(), "All societies");
const societyIds = new Map(grantSocieties.map(name => [name, societyLabels.get(societyKey(name))]));
options(field("scope"), ["District", "Multi-district", "National", "Unknown area"], "All areas");
options(field("outcome"), ["Accepted", "Declined", "Refunded"], "All outcomes");
options(district, grantDistricts);
options(chartYear, years);
district.value = "South Taranaki";

function loadYear(year) {
  if (!loadTasks.has(year)) {
    const task = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "pokie-data/" + year + ".js";
      script.onload = resolve;
      script.onerror = () => { script.remove(); loadTasks.delete(year); reject(new Error("Load failed")); };
      document.head.append(script);
    });
    loadTasks.set(year, task);
  }
  return loadTasks.get(year);
}

function otherAreas(id) {
  if (!areaCache.has(id)) {
    areaCache.set(id, grantStrings[id].split(",").map(part => normal(part.split("(")[0]).replace(/ (district|city|territory)$/, "").replace(/^hutt$/, "lower hutt")));
  }
  return areaCache.get(id);
}
function inArea(row, name) {
  return keywords[row[3]] === name || otherAreas(row[4]).includes(name);
}
function action(title, handler) {
  const button = text("button", title);
  button.type = "button";
  button.addEventListener("click", handler);
  return button;
}
function clearFilters() {
  query.value = yearField.value = societyField.value = field("outcome").value = field("scope").value = districtFilter = "";
}
function selectArea(area, year) {
  clearFilters();
  districtFilter = district.value = area;
  yearField.value = year || "";
  if (year) chartYear.value = year;
  drawChart();
  search();
  query.focus();
}
function townLinks(term) {
  const holder = field("towns");
  holder.replaceChildren();
  if (!term) return;
  for (const [town, areas] of Object.entries(townDistricts)) {
    if (normal(town) !== term && normal(town.split(" (")[0]) !== term) continue;
    for (const area of new Set(areas)) holder.append(action("Search " + area + " district for " + town, () => selectArea(area,yearField.value)));
  }
}
function addRecords() {
  const batch = matches.slice(shown, shown + 25);
  const fragment = document.createDocumentFragment();
  for (const row of batch) {
    const [name, original, society, area, other, scope, result, date, requested, granted, category, refund, refundDate, hasRefund, year] = row;
    const card = document.createElement("div");
    card.className = "grant-record";
    card.append(text("small", grantStrings[result] + " · " + (date ? new Date(date + "T12:00:00").toLocaleDateString("en-NZ",{dateStyle:"medium"}) : year)),
      text("h3", grantStrings[name]), text("p", grantStrings[society] + " · " + (grantStrings[category] || "Unspecified purpose")),
      text("p", "Requested " + money(requested) + " · Granted " + money(granted)));
    if (hasRefund || refund) card.append(text("p", "Refund recorded: " + money(refund) + (refundDate ? " · " + refundDate : "")));
    card.append(text("p", [grantStrings[area], grantStrings[scope] === "District" ? "" : grantStrings[scope], grantStrings[other]].filter(Boolean).join(" · ")));
    if (grantStrings[original] && name !== original) card.append(text("small","Filed as " + grantStrings[original]));
    const peers = action("Other applicants · " + year, () => {
      clearFilters(); societyField.value = societyIds.get(grantStrings[society]); yearField.value = year;
      field("filters").open = true; search(); query.focus();
    });
    const actions = document.createElement("div");
    actions.append(peers);
    if (grantDistricts.includes(grantStrings[area])) {
      actions.append(action("Compare district", () => {
        district.value = grantStrings[area];
        chartYear.value = year;
        drawChart();
        district.focus();
      }));
    }
    card.append(actions);
    fragment.append(card);
  }
  records.append(fragment);
  shown += batch.length;
  field("more").hidden = shown >= matches.length;
}
async function search() {
  clearTimeout(timer);
  const ticket = ++revision, term = normal(query.value), pickedYear = yearField.value;
  const selected = districtFilter || grantDistricts.find(d => normal(d) === term);
  if (selected) { district.value = selected; if (pickedYear) chartYear.value = pickedYear; drawChart(); }
  townLinks(term);
  field("active").hidden = false;
  records.replaceChildren(); field("more").hidden = true;
  statusLine.textContent = "Searching grant records…";
  try { await Promise.all((pickedYear ? [Number(pickedYear)] : years).map(loadYear)); }
  catch { if (ticket === revision) statusLine.replaceChildren("Some grant records could not be loaded. ",action("Retry search",search)); return; }
  if (ticket !== revision) return;
  const areaName = normal(selected || ""), words = term.split(" ").filter(Boolean);
  const society = societyField.value, scope = field("scope").value, outcome = field("outcome").value;
  matches = grantRecords.filter(row => {
    if (pickedYear && row[14] !== Number(pickedYear) || society && societyIds.get(grantStrings[row[2]]) !== society ||
        outcome && grantStrings[row[6]] !== outcome || scope && grantStrings[row[5]] !== scope) return false;
    if (districtFilter) return inArea(row, areaName);
    if (selected && inArea(row, areaName)) return true;
    return [0,1,3,4].some(col => words.every(word => keywords[row[col]].includes(word)));
  }).sort((a,b) => b[14]-a[14] || b[7].localeCompare(a[7]) || a[0]-b[0]);
  const context = [districtFilter,society,pickedYear,outcome,scope].filter(Boolean).join(" · ");
  statusLine.textContent = matches.length.toLocaleString("en-NZ") + " matching records" + (context ? " · " + context : "") + (matches.length ? "" : ". Try a wider search.");
  shown = 0;
  addRecords();
}
function drawChart() {
  const area = district.value, year = chartYear.value;
  const t = districtSeries[year][area] || {};
  const q = Object.values(t.quarter || {});
  const loss = q.length === 4 && q.every(Number.isFinite) && !t.combined ? q.reduce((a,b)=>a+b,0) : null;
  const chart = field("chart"); chart.replaceChildren();
  for (const [label, value, className] of [["Player losses",loss,""],["Grants approved for this district",t.grants || 0,"award"]]) {
    const line = text("div",label); line.className = "bar-label";
    line.append(text("strong",value == null ? "Unavailable" : money(value))); chart.append(line);
    if (value != null) {
      const track = document.createElement("div"), fill = document.createElement("div");
      track.className="bar-track"; fill.className="bar-fill " + className;
      fill.style.width = 100 * value / Math.max(loss || 0,t.grants || 0,1) + "%";
      track.append(fill); chart.append(track);
    }
  }
  if (loss == null) chart.append(text("p",t.combined ? "A quarterly loss figure includes another district. A separate annual total is unavailable." : "The source has fewer than four separate quarterly amounts for this district."));
  field("shared").textContent = (t.multiCount || 0).toLocaleString("en-NZ") + " shared approvals also name " + area + " · " + money(t.multi || 0) + " across all places listed on those awards.";
}
query.addEventListener("input",()=>{ districtFilter=""; ++revision; clearTimeout(timer); timer=setTimeout(search,180); });
for (const id of ["year","society","outcome","scope"]) field(id).addEventListener("change",search);
for (const button of document.querySelectorAll("[data-query]")) button.addEventListener("click",()=>{clearFilters();query.value=button.dataset.query;search();});
field("browse").addEventListener("click",()=>{clearFilters();search();});
field("clear").addEventListener("click",()=>{clearFilters();search();});
field("more").addEventListener("click",addRecords);
district.addEventListener("change",drawChart); chartYear.addEventListener("change",drawChart);
field("district-records").addEventListener("click",()=>selectArea(district.value,chartYear.value));
drawChart();
