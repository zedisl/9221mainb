document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".page");
  const secretTrigger = document.getElementById("secretTrigger");
  const returnMain = document.getElementById("returnMain");

  function showPage(id, updateHash = true) {
    const target = document.getElementById(id);
    if (!target) return;

    pages.forEach(page => page.classList.toggle("active", page === target));
    buttons.forEach(button => button.classList.toggle("active", button.dataset.page === id));

    if (updateHash) history.replaceState(null, "", "#" + id);
    document.title = id === "darkform"
      ? "SCP-9221 — Засекреченная запись"
      : "SCP-9221 — Белая Лилия";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });

  if (secretTrigger) {
    secretTrigger.addEventListener("click", () => showPage("darkform"));
  }

  if (returnMain) {
    returnMain.addEventListener("click", () => showPage("main"));
  }

  const initial = location.hash.replace("#", "");
  if (initial && document.getElementById(initial)) {
    showPage(initial, false);
  }

  // Изображения подхватываются автоматически.
  // Если файла нет — остаётся красивый плейсхолдер.
  function setupImage(imageId, boxId) {
    const image = document.getElementById(imageId);
    const box = document.getElementById(boxId);
    if (!image || !box) return;

    image.addEventListener("load", () => {
      box.classList.add("has-image");
    });

    image.addEventListener("error", () => {
      box.classList.remove("has-image");
      image.style.display = "none";
    });

    if (image.complete && image.naturalWidth > 0) {
      box.classList.add("has-image");
    }
  }

  setupImage("whiteImage", "whiteImageBox");
  setupImage("darkImage", "darkImageBox");
});
