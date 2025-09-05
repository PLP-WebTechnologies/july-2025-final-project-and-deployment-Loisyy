// Mobile Navigation toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains("active")) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });

    // Highlight the current page nav link
const currentPage = window.location.pathname.split("/").pop(); // e.g., "about.html"
document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active"); // remove active from all links
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active"); // add active to current page only
    }
});

});

// Search functionality (basic implementation)
const searchInput = document.querySelector(".search-input");
if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                console.log("Searching for:", searchTerm);
                alert(`Searching for: ${searchTerm}`);
            }
        }
    });
}

// Category card click handling → navigate to style-detail.html
document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", function () {
        window.location.href = "pages/style-details.html";
    });
});

// Button click handlers
document.querySelector(".cta-button")?.addEventListener("click", () => {
    alert("Learn more about EcoStitch's mission and value!");
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0,  // fire as soon as the element enters
  rootMargin: "0px" 
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      // Stop observing once it has appeared
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".category-card, .hero-content, .commitment, .bonus-feature"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 1s ease, transform 1s ease";
    observer.observe(el);
  });
});

