/* Lanternline Review — accessible editorial interactions */
(function () {
  "use strict";

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  const nav = document.querySelector(".site-nav");
  if (nav) {
    const updateNav = function () {
      nav.classList.toggle("has-scrolled", window.scrollY > 12);
    };
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
  }

  const focusButtons = document.querySelectorAll("[data-focus-topic]");
  const focusStatus = document.querySelector("[data-focus-status]");
  focusButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const card = button.closest("[data-topic-card]");
      const wasFocused = card && card.classList.contains("is-focused");
      document.querySelectorAll("[data-topic-card]").forEach(function (item) {
        item.classList.remove("is-focused");
        const control = item.querySelector("[data-focus-topic]");
        if (control) {
          control.setAttribute("aria-pressed", "false");
          control.textContent = "Highlight topic";
        }
      });
      if (card && !wasFocused) {
        card.classList.add("is-focused");
        button.setAttribute("aria-pressed", "true");
        button.textContent = "Highlighted";
        if (focusStatus) focusStatus.textContent = "One topic is highlighted";
      } else if (focusStatus) {
        focusStatus.textContent = "No topic selected";
      }
    });
  });

  const form = document.getElementById("editorialForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.classList.add("was-validated");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const subject = "[" + document.title.split(" | ")[0] + "] " + data.get("subject");
      const body = [
        "Name: " + data.get("name"),
        "Email: " + data.get("email"),
        "Subject: " + data.get("subject"),
        "",
        data.get("message")
      ].join("\n");
      const draftUrl = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      const status = document.getElementById("formStatus");
      if (status) status.textContent = "Your email app should open with a draft. Add the recipient address there and send the message yourself.";
      window.location.href = draftUrl;
    });
  }

})();
