const grid = document.querySelector("#seat-board");
const tiles = Array.from(grid.querySelectorAll("button"));
const bill = document.querySelector("#bill");
const byParty = document.querySelector("#by-party");
const byVote = document.querySelector("#by-vote");
const previousVote = document.querySelector("#previous-vote");
const nextVote = document.querySelector("#next-vote");
const context = document.querySelector("#context");
const partyKey = document.querySelector("#party-key");
const palette = new Map([
  ["National", "#2376b9"], ["Labour", "#d53a47"], ["Green", "#248257"],
  ["ACT", "#f5c83d"], ["NZ First", "#343239"], ["Te Pāti Māori", "#7846ad"],
  ["Independent", "#787582"]
]);
const panel = document.querySelector("#mp-profile");
const photo = panel.querySelector("img");
const initials = panel.querySelector(".profile-initials");
const credit = panel.querySelector(".photo-credit");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const outcomes = { yes: "Yes", no: "No", abstain: "Abstained" };
const unlisted = "Outside this roll call";

// A close division is a reproducible measure of how split the House was.
function marginShare(vote) {
  return Math.abs(vote.yes.length - vote.no.length) / (vote.yes.length + vote.no.length);
}

const rankedVotes = Object.entries(parliamentVotes).sort(([, a], [, b]) =>
  marginShare(a) - marginShare(b) || Date.parse(b.date) - Date.parse(a.date)
);
for (const [id, vote] of rankedVotes) {
  const tally = [vote.yes.length, vote.no.length];
  if (vote.abstain.length) tally.push(vote.abstain.length);
  const label = vote.shortTitle + " · " + vote.stage + " · " + tally.join("–");
  bill.add(new Option(label, id));
}

for (const [party, colour] of palette) {
  const key = document.createElement("li");
  key.style.setProperty("--party", colour);
  key.textContent = party;
  partyKey.append(key);
}

function groupSection(label, partyView) {
  const section = document.createElement("section");
  section.className = "seat-group";
  if (partyView) section.style.setProperty("--party", palette.get(label));
  const heading = document.createElement("h2");
  heading.append(label, document.createElement("span"));
  const seats = document.createElement("div");
  seats.className = "seats";
  section.append(heading, seats);
  return section;
}

function arrange(voteView, animate = true) {
  const vote = parliamentVotes[bill.value];
  const labels = voteView ? [...Object.values(outcomes), unlisted] : [...palette.keys()];
  const sections = new Map(labels.map(label => [label, groupSection(label, !voteView)]));
  const positions = animate && !reducedMotion.matches ? tiles.map(tile => tile.getBoundingClientRect()) : [];
  const roll = new Map();
  if (vote) {
    for (const [key, label] of Object.entries(outcomes)) {
      for (const name of vote[key]) roll.set(name, label);
    }
  }
  for (const tile of tiles) {
    tile.getAnimations().forEach(animation => animation.cancel());
    const { name, party } = tile.dataset;
    const affiliation = vote?.parties?.[name] || party;
    const result = roll.get(name) || unlisted;
    tile.dataset.result = vote ? result : "";
    tile.dataset.affiliation = affiliation;
    tile.style.setProperty("--party", palette.get(affiliation));
    tile.style.setProperty("--ink-on-party", affiliation === "ACT" ? "#222" : "white");
    const description = [name, affiliation, vote && result].filter(Boolean).join(", ");
    tile.setAttribute("aria-label", description);
    tile.title = description;
    sections.get(voteView ? result : affiliation).lastChild.append(tile);
  }
  const visible = [...sections.values()].filter(section => section.lastChild.childElementCount);
  for (const section of visible) section.querySelector("h2 span").textContent = section.lastChild.childElementCount;
  grid.replaceChildren(...visible);
  previousVote.disabled = bill.selectedIndex <= 1;
  nextVote.disabled = bill.selectedIndex === bill.options.length - 1;
  partyKey.hidden = !voteView;
  byParty.setAttribute("aria-pressed", String(!voteView));
  byVote.setAttribute("aria-pressed", String(voteView));
  if (vote) {
    const source = document.createElement("a");
    source.href = vote.source;
    source.textContent = "Official roll call";
    const tally = [vote.yes.length + " Yes", vote.no.length + " No"];
    if (vote.abstain.length) tally.push(vote.abstain.length + " abstained");
    context.replaceChildren(vote.title + " · " + vote.stage + " · " + vote.date + " · " + tally.join(", ") + ". ", source);
  } else {
    context.textContent = "MPs who served in the 53rd and 54th Parliaments. Select a bill to see how they voted.";
  }
  document.querySelector("#vote-status").textContent = voteView ? context.textContent : "Grouped by party.";
  if (!positions.length) return;
  const targets = tiles.map(tile => tile.getBoundingClientRect());
  tiles.forEach((tile, i) => {
    const dx = positions[i].left - targets[i].left;
    const dy = positions[i].top - targets[i].top;
    if (Math.abs(dx) + Math.abs(dy) < 1) return;
    tile.animate([
      { transform: `translate(${dx}px, ${dy}px)`, zIndex: 2 },
      { transform: "translate(0,0)", zIndex: 2 }
    ], { duration: 820, easing: "cubic-bezier(.22,.72,.15,1)" });
  });
}

function stepVote(direction) {
  bill.selectedIndex += direction;
  arrange(true);
}
previousVote.addEventListener("click", () => stepVote(-1));
nextVote.addEventListener("click", () => stepVote(1));
bill.addEventListener("change", () => arrange(Boolean(bill.value)));
byParty.addEventListener("click", () => arrange(false));
byVote.addEventListener("click", () => {
  if (!bill.value) bill.value = rankedVotes[0][0];
  arrange(true);
});
arrange(false, false);

grid.addEventListener("click", event => {
  const tile = event.target.closest("button");
  if (!tile) return;

  panel.querySelector("h2").textContent = tile.dataset.name;
  panel.querySelector(".affiliation").textContent = tile.dataset.affiliation + " · " + (tile.dataset.result && tile.dataset.result !== unlisted && parliamentVotes[bill.value]?.session || tile.dataset.term);
  panel.style.setProperty("--party", palette.get(tile.dataset.affiliation));
  panel.querySelector(".profile-vote").textContent = tile.dataset.result;
  const thumbnail = tile.querySelector("img");
  photo.hidden = !thumbnail;
  initials.hidden = Boolean(thumbnail);
  credit.hidden = !thumbnail;
  if (thumbnail) {
    photo.src = thumbnail.src;
    credit.querySelector(".author").textContent = tile.dataset.credit;
    const source = credit.querySelector(".source");
    source.href = tile.dataset.source;
    const licence = credit.querySelector(".licence");
    licence.textContent = tile.dataset.licence;
    if (tile.dataset.licenceUrl) licence.href = tile.dataset.licenceUrl;
    else licence.removeAttribute("href");
  } else {
    photo.removeAttribute("src");
    initials.textContent = tile.textContent.trim();
  }
  panel.showModal();
});

panel.querySelector("button").addEventListener("click", () => panel.close());
panel.addEventListener("click", event => {
  if (event.target !== panel) return;
  const rect = panel.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom) panel.close();
});
