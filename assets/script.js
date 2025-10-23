console.log("JavaScript file loaded.");

(function () {

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (status) {
        status.textContent = "Sending...";
        status.style.color = "#EDEDED";
      }

      try {
        const data = new FormData(form);
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          if (status) {
            status.textContent = "Message sent successfully! ✅";
            status.style.color = "#00C851";
          }
          form.reset();
        } else {

          let msg = "Oops! Something went wrong. ❌";
          try {
            const err = await response.json();
            if (err && err.errors && err.errors.length) {
              msg = err.errors.map(e => e.message).join(" ");
            }
          } catch (_) {}
          if (status) {
            status.textContent = msg;
            status.style.color = "#ff4444";
          }
        }
      } catch (error) {
        console.error(error);
        if (status) {
          status.textContent = "Network error — please try again later. ⚠️";
          status.style.color = "#ffbb33";
        }
      }
    });
  }


  const containers = document.querySelectorAll(".image-container");
  if (containers.length) {
    function closeAll() {
      containers.forEach((c) => c.classList.remove("active"));
    }

    containers.forEach((container) => {
      const show = () => container.classList.add("active");
      const hide = () => container.classList.remove("active");

      container.addEventListener("mouseenter", show);
      container.addEventListener("mouseleave", hide);

      container.addEventListener("focusin", () => {
        closeAll();
        show();
      });
      container.addEventListener("focusout", hide);

      container.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        if (key === "enter" || key === " ") {
          e.preventDefault();
          const isActive = container.classList.contains("active");
          closeAll();
          if (!isActive) container.classList.add("active");
        }
        if (key === "escape") hide();
      });

      container.addEventListener(
        "touchstart",
        (e) => {
          const isActive = container.classList.contains("active");
          if (!isActive) {
            e.preventDefault();
            closeAll();
            show();
          }
        },
        { passive: false }
      );
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".image-container")) closeAll();
    });
  }
})();
