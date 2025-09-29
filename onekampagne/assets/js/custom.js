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