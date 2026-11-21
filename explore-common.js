const get = id => document.getElementById(id);
function element(tag, value, cls) {
  const node = document.createElement(tag);
  if (value != null) node.textContent = value;
  if (cls) node.className = cls;
  return node;
}
function figure(label, value, explanation, ...sources) {
  const box = element("details", null, "figure");
  const summary = element("summary");
  summary.append(element("span", label), element("strong", value));
  const note = element("div", null, "source-note");
  note.append(element("p", explanation));
  for (const [title, url] of sources) {
    const a = element("a",title);
    a.href = url;
    note.append(a);
  }
  box.append(summary,note);
  return box;
}
function choices(id, items) {
  for (const item of items) get(id).add(new Option(item,item));
}
const printed = n => n.toLocaleString("en-NZ");
const officialSpend = ["DIA · annual expenditure workbook","https://catalogue.data.govt.nz/dataset/gambling-expenditure-statistics"];
