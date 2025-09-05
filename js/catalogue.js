// Catalogue Page Specific JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Catalogue page filter functionality
  const categoryFilter = document.querySelector("#category-filter")
  const sortFilter = document.querySelector("#sort-filter")
  const clearFiltersBtn = document.querySelector(".clear-filters-btn")
  const productCards = document.querySelectorAll(".product-card")

  if (categoryFilter && sortFilter && clearFiltersBtn) {
    // Category filter functionality
    categoryFilter.addEventListener("change", function () {
      const selectedCategory = this.value
      filterProducts(selectedCategory)
    })

    // Sort filter functionality
    sortFilter.addEventListener("change", function () {
      const selectedSort = this.value
      sortProducts(selectedSort)
    })

    // Clear filters functionality
    clearFiltersBtn.addEventListener("click", () => {
      categoryFilter.value = "all"
      sortFilter.value = "newest"
      showAllProducts()
    })

    // Filter products by category
    function filterProducts(category) {
      productCards.forEach((card) => {
        if (category === "all") {
          card.style.display = "block"
        } else {
          const productCategory = card.getAttribute("data-category")
          if (productCategory === category) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        }
      })
    }

    // Sort products (basic implementation)
    function sortProducts(sortType) {
      const productsGrid = document.querySelector(".products-grid")
      const productArray = Array.from(productCards)

      // Simple sorting based on product titles for demo
      productArray.sort((a, b) => {
        const titleA = a.querySelector(".product-title").textContent
        const titleB = b.querySelector(".product-title").textContent

        switch (sortType) {
          case "newest":
            return 0 // Keep original order
          case "popular":
            return titleA.localeCompare(titleB)
          case "price-low":
            return titleA.localeCompare(titleB)
          case "price-high":
            return titleB.localeCompare(titleA)
          default:
            return 0
            
        }
      })

      // Re-append sorted elements
      productArray.forEach((card) => {
        productsGrid.appendChild(card)
      })
    }

    // Show all products
    function showAllProducts() {
      productCards.forEach((card) => {
        card.style.display = "block"
      })
    }
  }

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function () {
      // Add visual feedback for click
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)

      // Navigate to style details page
      // For now, all cards go to the same style details page
      // In a real application, you would pass the style ID as a URL parameter
      const styleId = this.getAttribute("data-style-id")
      if (styleId) {
        window.location.href = `style-details.html?style=${styleId}`
      } else {
        window.location.href = "style-details.html"
      }
    })

    // Add hover effect for better UX
    card.addEventListener("mouseenter", function () {
      this.style.cursor = "pointer"
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })

  // Catalogue-specific fade-in animations
  const catalogueAnimatedElements = document.querySelectorAll(".product-card, .catalogue-hero, .filters-section")

  catalogueAnimatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    // Use intersection observer for fade-in effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    observer.observe(el)
  })
})
