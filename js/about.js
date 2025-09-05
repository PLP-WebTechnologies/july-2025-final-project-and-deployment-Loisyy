// About Page Specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll animations for commitment cards
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

  // Animate commitment cards on scroll
  const commitmentCards = document.querySelectorAll(".commitment-card")
  commitmentCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`
    observer.observe(card)
  })

  // Animate beyond landfill section
  const beyondSection = document.querySelector(".beyond-landfill")
  if (beyondSection) {
    const beyondImage = beyondSection.querySelector(".beyond-image")
    const beyondContent = beyondSection.querySelector(".beyond-content")

    if (beyondImage && beyondContent) {
      beyondImage.style.opacity = "0"
      beyondImage.style.transform = "translateX(-30px)"
      beyondContent.style.opacity = "0"
      beyondContent.style.transform = "translateX(30px)"

      beyondImage.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      beyondContent.style.transition = "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s"

      observer.observe(beyondImage)
      observer.observe(beyondContent)
    }
  }

  // Add hover effects for commitment icons
  const commitmentIcons = document.querySelectorAll(".commitment-icon")
  commitmentIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)"
    })

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
    })
  })

  // Parallax effect for mission section (subtle)
  const missionHero = document.querySelector(".mission-hero")
  if (missionHero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.1

      if (scrolled < missionHero.offsetHeight) {
        missionHero.style.transform = `translateY(${parallax}px)`
      }
    })
  }

  console.log("[v0] About page JavaScript initialized")
})

