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

const partyBoard = document.querySelector("#party-board");
const search = document.querySelector("#vote-search");
const typeFilter = document.querySelector("#vote-type");
const allVotes = { ...parliamentVotes, ...partyVotes };

function totals(vote) {
  if (vote.groups) return vote.totals;
  return { yes: vote.yes.length, no: vote.no.length, abstain: vote.abstain.length };
}

function marginShare(vote) {
  const { yes, no } = totals(vote);
  return Math.abs(yes - no) / (yes + no || 1);
}

const rankedVotes = Object.entries(allVotes).sort(([, a], [, b]) =>
  marginShare(a) - marginShare(b) || Date.parse(b.date) - Date.parse(a.date)
);
function searchable(text) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

function populateVotes(selectMatch = false) {
  const previous = bill.value;
  const query = searchable(search.value.trim());
  bill.replaceChildren(new Option("Browse MPs by party", ""));
  for (const [id, vote] of rankedVotes) {
    const type = vote.groups ? "party" : "named";
    if (typeFilter.value !== "all" && type !== typeFilter.value) continue;
    if (!searchable([vote.title, vote.shortTitle, vote.date, vote.stage].join(" ")).includes(query)) continue;
    const { yes, no, abstain } = totals(vote);
    const count = [yes, no];
    if (abstain) count.push(abstain);
    const label = [vote.shortTitle || vote.title, vote.stage, vote.date, count.join("–")].join(" · ");
    bill.add(new Option(label, id));
  }
  if (selectMatch) {
    bill.value = previous;
    if (!bill.value && bill.options.length > 1) bill.selectedIndex = 1;
  }
}
populateVotes();

function showPartyTotals(vote, animate) {
  const positions = new Map();
  if (animate && !partyBoard.hidden && !reducedMotion.matches) {
    for (const row of partyBoard.querySelectorAll(".party-row")) {
      positions.set(row.dataset.key, row.getBoundingClientRect());
    }
  }
  const sections = [];
  const used = new Set();
  for (const [key, label] of Object.entries(outcomes)) {
    const entries = Object.entries(vote.groups[key] || {}).sort((a, b) => b[1] - a[1]);
    if (!entries.length && key === "abstain") continue;
    const section = groupSection(label, false);
    section.querySelector("h2 span").textContent = vote.totals[key];
    const list = section.lastChild;
    list.className = "party-list";
    for (const [party, count] of entries) {
      const row = document.createElement("div");
      row.className = "party-row";
      row.dataset.key = used.has(party) ? party + key : party;
      used.add(party);
      row.style.setProperty("--party", palette.get(party) || palette.get("Independent"));
      row.style.setProperty("--share", (100 * count / Math.max(1, vote.totals.yes, vote.totals.no, vote.totals.abstain)) + "%");
      const number = document.createElement("strong");
      number.textContent = count;
      row.append(party, number);
      list.append(row);
    }
    sections.push(section);
  }
  partyBoard.replaceChildren(...sections);
  partyBoard.hidden = false;
  for (const row of partyBoard.querySelectorAll(".party-row")) {
    const old = positions.get(row.dataset.key);
    if (!old) continue;
    const target = row.getBoundingClientRect();
    const dx = old.left - target.left, dy = old.top - target.top;
    if (dx || dy) row.animate([{ transform: "translate(" + dx + "px," + dy + "px)" }, { transform: "none" }],
      { duration: 640, easing: "cubic-bezier(.22,.72,.15,1)" });
  }
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
  const vote = allVotes[bill.value];
  const empty = bill.options.length === 1;
  previousVote.disabled = bill.selectedIndex <= 1;
  nextVote.disabled = empty || bill.selectedIndex === bill.options.length - 1;
  byVote.disabled = empty;
  byParty.setAttribute("aria-pressed", String(!voteView));
  byVote.setAttribute("aria-pressed", String(voteView));
  partyKey.hidden = !voteView || Boolean(vote?.groups);
  if (vote) {
    const source = document.createElement("a");
    source.href = vote.source;
    source.textContent = vote.groups ? "Official division" : "Official roll call";
    const { yes, no, abstain } = totals(vote);
    const tally = [yes + " Yes", no + " No"];
    if (abstain) tally.push(abstain + " abstained");
    context.replaceChildren([vote.title, vote.stage, vote.date, vote.groups ? "Party vote" : "Named MP vote", tally.join(", ")].join(" · ") + ". ", source);
    for (const [index, id] of (vote.billIds || []).entries()) {
      const record = document.createElement("a");
      record.href = "https://bills.parliament.nz/v/6/" + id;
      record.textContent = vote.billIds.length === 1 ? "Bill history" : "Bill " + (index + 1) + " history";
      context.append(" · ", record);
    }
    if (vote.note) context.append(" ", vote.note);
  } else {
    context.textContent = empty ? "No matching readings. Try another search or voting record." : "MPs who served in the 53rd and 54th Parliaments. Select a reading to see its vote.";
  }
  document.querySelector("#vote-status").textContent = context.textContent;
  grid.hidden = (voteView && Boolean(vote?.groups)) || empty;
  if (voteView && vote?.groups) {
    showPartyTotals(vote, animate);
    return;
  }
  partyBoard.hidden = true;
  if (empty) return;
  const labels = voteView ? [...Object.values(outcomes), unlisted] : [...palette.keys()];
  const sections = new Map(labels.map(label => [label, groupSection(label, !voteView)]));
  const positions = animate && !reducedMotion.matches && tiles[0].isConnected ? tiles.map(tile => tile.getBoundingClientRect()) : [];
  const roll = new Map();
  if (vote && !vote.groups) {
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
byParty.addEventListener("click", () => {
  bill.selectedIndex = 0;
  arrange(false);
});
function filterReadings() {
  populateVotes(true);
  arrange(Boolean(bill.value));
}
search.addEventListener("input", filterReadings);
typeFilter.addEventListener("change", filterReadings);
byVote.addEventListener("click", () => {
  if (!bill.value) bill.selectedIndex = 1;
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
