document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.fast-free-trafic, .all-in-one-solutions, .hero-section');
    const icons = document.querySelectorAll('.fast-free-trafic .animated-social-icon, .all-in-one-solutions .animated-social-icon, .hero-section .animated-social-icon');

    let intervals = [];

    function moveIcon(icon, section) {
        const sectionRect = section.getBoundingClientRect();
        const maxX = sectionRect.width - 90;
        const maxY = sectionRect.height - 90;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        const scale = 0.8 + Math.random() * 0.5;
        const rotate = Math.random() * 10 - 5;

        icon.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
        const duration = 2 + Math.random() * 2;
        const easing = Math.random() > 0.5 ? 'ease-in-out' : 'cubic-bezier(0.25, 1, 0.5, 1)';
        icon.style.transition = `transform ${duration}s ${easing}`;
    }

    function startAnimation(section) {
        const icons = section.querySelectorAll('.animated-social-icon');
        icons.forEach(icon => {
            moveIcon(icon, section);
            const interval = setInterval(() => moveIcon(icon, section), 2500 + Math.random() * 3000);
            icon._interval = interval; // store interval on the element
        });
    }
    function stopAnimation(section) {
        const icons = section.querySelectorAll('.animated-social-icon');
        icons.forEach(icon => {
            if (icon._interval) clearInterval(icon._interval);
            icon._interval = null;
        });
    }
    sections.forEach(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation(section);
                } else {
                    stopAnimation(section);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(section);
    });

    // Price Plan change
    const switchButtons = document.querySelectorAll(".switch-button");
    const priceElements = document.querySelectorAll(".plan-price");

    switchButtons.forEach(button => {
        button.addEventListener("click", () => {
            switchButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const planType = button.dataset.switch;
            priceElements.forEach(priceEl => {
                const newPrice = planType === "monthly"
                  ? priceEl.getAttribute("data-monthly-price")
                  : priceEl.getAttribute("data-yearly-price");
                const priceTypeEl = priceEl.querySelector(".price-type");
                priceTypeEl.textContent = planType === "monthly" ? "month" : "year";
                priceEl.firstChild.textContent = `${newPrice}/`;
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const stepsContainer = document.querySelector(".ai-page-builder-steps");
  const stepBoxes = document.querySelectorAll(".ai-page-builder-steps .step-box");
  const progressFill = document.querySelector(".progress-line-fill");
  const progressLocation = document.querySelector(".progress-line-location");
  const baseLine = document.querySelector(".progress-line-base");

  if (!stepsContainer || !stepBoxes.length) return;

  const updateProgress = () => {
    const containerTop = stepsContainer.getBoundingClientRect().top;
    const containerBottom = stepsContainer.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (containerBottom > 0 && containerTop < windowHeight) {
      let visibleStepIndex = 0;

      stepBoxes.forEach((box, index) => {
        const boxRect = box.getBoundingClientRect();
        const boxCenter = boxRect.top + boxRect.height / 2;

        if (boxCenter < windowHeight / 1.5) {
          visibleStepIndex = index;
        }
      });

      stepBoxes.forEach(box => box.classList.remove("current"));
      stepBoxes[visibleStepIndex].classList.add("current");

      const totalSteps = stepBoxes.length;
      const progressHeight = ((visibleStepIndex + 1) / totalSteps) * (baseLine.offsetHeight);
      progressFill.style.height = `${progressHeight}px`;

      const circleY = 40 + progressHeight - progressLocation.offsetHeight / 2;
      progressLocation.style.top = `${circleY}px`;
    }
  };

  // Scroll event listener
  window.addEventListener("scroll", updateProgress);
  updateProgress(); // run once on load
});


document.addEventListener("DOMContentLoaded", () => {
  const floatingObjects = document.querySelectorAll(".floating-object");

  const activeObjects = new Set();

  // Observe when elements enter or leave viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeObjects.add(entry.target);
      } else {
        activeObjects.delete(entry.target);
      }
    });
  }, { threshold: 0.1 }); // visible at least 10%

  floatingObjects.forEach(el => {
    observer.observe(el);
    el.dataset.originX = el.offsetLeft;
    el.dataset.originY = el.offsetTop;
  });

  // Random float parameters
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function animate() {
    activeObjects.forEach((el) => {
      const originX = parseFloat(el.dataset.originX);
      const originY = parseFloat(el.dataset.originY);

      // Gentle random movement
      const offsetX = random(-1, 1);
      const offsetY = random(-1, 1);

      let currentX = parseFloat(el.dataset.currentX || 0);
      let currentY = parseFloat(el.dataset.currentY || 0);

      // Smooth drift (within ±50–100 px range)
      currentX += offsetX;
      currentY += offsetY;

      currentX = Math.max(-150, Math.min(150, currentX));
      currentY = Math.max(-150, Math.min(150, currentY));

      el.dataset.currentX = currentX;
      el.dataset.currentY = currentY;

      el.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
});

document.addEventListener("DOMContentLoaded", () => {
  // Check if URL contains a hash (like #pricing_section)
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      // Use a slight delay to ensure layout stabilizes
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }
});