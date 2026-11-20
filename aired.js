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
  const outcome = current.outcome.toLowerCase();
  let state, mark, headline, comparison;
  if (outcome === "declined to determine") {
    [state, mark, headline] = ["neutral", "—", "No ruling"];
    comparison = "The BSA didn’t decide whether the broadcast crossed the line.";
  } else if (outcome.startsWith("breach accepted")) {
    [state, mark, headline] = ["neutral", "±", "Two-part ruling"];
    comparison = "The broadcaster accepted it crossed the line. The BSA accepted the response.";
  } else {
    const bsa = outcome.includes("upheld") && !outcome.startsWith("not upheld")
      ? "Crossed the line" : "Fair game";
    const matched = choice === bsa;
    [state, mark, headline] = matched ? ["right", "✓", "You got it right"] : ["wrong", "×", "You got it wrong"];
    comparison = "BSA call: " + bsa + (outcome.includes("part") ? " on part of the complaint." : ".");
  }
  get("reveal").dataset.state = state;
  get("mark").textContent = mark;
  get("verdict-text").textContent = headline;
  get("choices").hidden = true;
  get("your-choice").textContent = "You chose: " + choice + ". " + comparison;
  get("finding").textContent = "BSA ruling · " + current.outcome;
  get("reason").textContent = current.reason;
  get("source").href = current.source;
  get("next").textContent = index === cases.length - 1 ? "Finish →" : "Next case →";
  get("reveal").hidden = false;
  if (focus) get("verdict").focus();
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
