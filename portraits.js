const grid = document.querySelector(".portrait-grid");
const panel = document.querySelector("#mp-profile");
const photo = panel.querySelector("img");
const initials = panel.querySelector(".profile-initials");
const credit = panel.querySelector(".photo-credit");

grid.addEventListener("click", event => {
  const tile = event.target.closest("button");
  if (!tile) return;

  panel.querySelector("h2").textContent = tile.dataset.name;
  panel.querySelector(".affiliation").textContent = tile.dataset.party + " · " + tile.dataset.term;
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
