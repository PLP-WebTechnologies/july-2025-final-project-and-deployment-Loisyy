// Style Details Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Image zoom functionality
  initImageZoom()

  // Expandable sections functionality
  initExpandableSections()

  // Tutorial button functionality
  initTutorialButton()
})

// Image Zoom Functionality
function initImageZoom() {
  const heroImage = document.getElementById("heroImage")
  const zoomOverlay = document.getElementById("imageZoomOverlay")
  const closeZoomBtn = document.getElementById("closeZoom")

  if (heroImage && zoomOverlay && closeZoomBtn) {
    // Open zoom on image click
    heroImage.addEventListener("click", () => {
      zoomOverlay.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling
    })

    // Close zoom on close button click
    closeZoomBtn.addEventListener("click", () => {
      closeZoom()
    })

    // Close zoom on overlay click (but not on image click)
    zoomOverlay.addEventListener("click", (e) => {
      if (e.target === zoomOverlay) {
        closeZoom()
      }
    })

    // Close zoom on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && zoomOverlay.classList.contains("active")) {
        closeZoom()
      }
    })
  }

  function closeZoom() {
    zoomOverlay.classList.remove("active")
    document.body.style.overflow = "" // Restore scrolling
  }
}

// Expandable Sections Functionality
function initExpandableSections() {
  const expandButtons = document.querySelectorAll(".expand-btn")

  expandButtons.forEach((button) => {
    const targetId = button.getAttribute("data-target")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Initially show all sections (remove collapsed class if present)
      targetElement.classList.remove("collapsed")

      button.addEventListener("click", () => {
        const isExpanded = !targetElement.classList.contains("collapsed")

        if (isExpanded) {
          // Collapse
          targetElement.classList.add("collapsed")
          button.classList.remove("expanded")
        } else {
          // Expand
          targetElement.classList.remove("collapsed")
          button.classList.add("expanded")
        }
      })
    }
  })
}

// Tutorial Button Functionality
function initTutorialButton() {
  const tutorialBtn = document.querySelector(".tutorial-btn")

  if (tutorialBtn) {
    tutorialBtn.addEventListener("click", () => {
      // Add loading state
      const originalText = tutorialBtn.innerHTML
      tutorialBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Tutorial...'
      tutorialBtn.disabled = true

      // Simulate tutorial loading (replace with actual functionality)
      setTimeout(() => {
        tutorialBtn.innerHTML = originalText
        tutorialBtn.disabled = false

        // You can replace this alert with actual tutorial functionality
        alert("Tutorial feature coming soon! This would typically open a video tutorial or detailed guide.")
      }, 2000)
    })
  }
}

// Smooth scrolling for breadcrumb navigation
document.addEventListener("click", (e) => {
  if (e.target.matches(".breadcrumb-link")) {
    // Add a subtle animation when going back
    e.target.style.transform = "translateX(-5px)"
    setTimeout(() => {
      e.target.style.transform = ""
    }, 150)
  }
})

// Add scroll-based animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".instruction-step, .materials-section, .tools-section")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Initialize scroll animations
initScrollAnimations()
