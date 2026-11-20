const cases = airedCases;
const get = id => document.getElementById(id);
const buttons = [...get("choices").querySelectorAll("button")];
const storageKey = "they-aired-that.v1";
let answers = {};
let index = 0;

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify({ index, answers })); } catch {}
}
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && Number.isInteger(saved.index) && saved.index >= 0 && saved.index <= cases.length) {
    index = saved.index;
    if (saved.answers && typeof saved.answers === "object") answers = saved.answers;
  }
} catch {}

function reveal(choice, focus) {
  const current = cases[index];
  get("choices").hidden = true;
  get("your-choice").textContent = "Your call · " + choice;
  get("finding").textContent = "BSA ruling · " + current.outcome;
  get("reason").textContent = current.reason;
  get("source").href = current.source;
  get("next").textContent = index === cases.length - 1 ? "Finish →" : "Next case →";
  get("reveal").hidden = false;
  if (focus) get("finding").focus();
}

function render(focus = false) {
  const finished = index === cases.length;
  get("complete").hidden = !finished;
  get("round").hidden = finished;
  if (finished) {
    const votes = cases.map(c => answers[c.id]);
    get("recap").textContent = "Your calls · " + votes.filter(v => v === "Crossed the line").length +
      " crossed the line · " + votes.filter(v => v === "Fair game").length + " fair game";
    if (focus) get("complete").querySelector("h2").focus();
    return;
  }
  const current = cases[index];
  get("counter").textContent = "Case " + (index + 1) + " of " + cases.length;
  const progress = document.querySelector("progress");
  progress.max = cases.length;
  progress.value = index + 1;
  get("question").textContent = current.question;
  get("reveal").hidden = true;
  get("choices").hidden = false;
  if (buttons.some(button => button.textContent === answers[current.id])) reveal(answers[current.id], false);
  if (focus) get("question").focus();
}

for (const button of buttons) {
  button.addEventListener("click", () => {
    const choice = button.textContent;
    answers[cases[index].id] = choice;
    save();
    reveal(choice, true);
  });
}
get("next").addEventListener("click", () => {
  index++;
  save();
  render(true);
});
get("restart").addEventListener("click", () => {
  answers = {};
  index = 0;
  save();
  render(true);
});
render();
