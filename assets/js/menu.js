/* The small menu for phones: the button opens the page links under the bar; a link or a second tap closes it. */
(function () {
  const bar = document.getElementById("bar"), btn = document.getElementById("menu-btn");
  if (!bar || !btn) return;
  const set = (open) => { bar.classList.toggle("menu-open", open); btn.setAttribute("aria-expanded", open ? "true" : "false"); };
  btn.addEventListener("click", () => set(!bar.classList.contains("menu-open")));
  bar.querySelectorAll("nav a").forEach((a) => a.addEventListener("click", () => set(false)));
  addEventListener("hashchange", () => set(false));
  addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
})();
