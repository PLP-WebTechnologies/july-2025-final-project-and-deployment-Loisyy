// Contact Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Form handling
  const contactForm = document.getElementById("contactForm")
  const submitButton = contactForm.querySelector(".submit-button")

  // Form validation and submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const formObject = {}

    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      formObject[key] = value
    }

    // Basic validation
    if (!validateForm(formObject)) {
      return
    }

    // Simulate form submission
    submitForm(formObject)
  })

  // Form validation function
  function validateForm(data) {
    const requiredFields = ["fullName", "email", "inquiryType", "subject", "message"]
    let isValid = true

    // Remove previous error states
    document.querySelectorAll(".form-input, .form-select, .form-textarea").forEach((field) => {
      field.classList.remove("error")
    })

    // Check required fields
    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        const fieldElement = document.getElementById(field)
        fieldElement.classList.add("error")
        isValid = false
      }
    })

    // Email validation
    if (data.email && !isValidEmail(data.email)) {
      document.getElementById("email").classList.add("error")
      isValid = false
    }

    if (!isValid) {
      showMessage("Please fill in all required fields correctly.", "error")
    }

    return isValid
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Form submission simulation
  function submitForm(data) {
    // Disable submit button and show loading state
    submitButton.disabled = true
    submitButton.textContent = "Sending Message..."

    // Simulate API call
    setTimeout(() => {
      // Reset button
      submitButton.disabled = false
      submitButton.textContent = "Submit Message"

      // Show success message
      showMessage("Thank you for your message! We'll get back to you soon.", "success")

      // Reset form
      contactForm.reset()

      console.log("[v0] Form submitted with data:", data)
    }, 2000)
  }

  // Message display function
  function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector(".form-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create message element
    const messageElement = document.createElement("div")
    messageElement.className = `form-message ${type}`
    messageElement.textContent = message

    // Insert message before form
    contactForm.parentNode.insertBefore(messageElement, contactForm)

    // Auto-remove message after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove()
      }
    }, 5000)
  }

  // File upload handling
  const fileInput = document.getElementById("attachments")
  fileInput.addEventListener("change", (e) => {
    const files = e.target.files
    if (files.length > 0) {
      console.log(
        "[v0] Files selected:",
        Array.from(files).map((f) => f.name),
      )
    }
  })

  // Real-time validation feedback
  const formInputs = document.querySelectorAll(".form-input, .form-select, .form-textarea")
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.classList.add("error")
      } else {
        this.classList.remove("error")
      }
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("error") && this.value.trim()) {
        this.classList.remove("error")
      }
    })
  })
})

// Add error styles dynamically
const style = document.createElement("style")
style.textContent = `
    .form-input.error,
    .form-select.error,
    .form-textarea.error {
        border-color: #e53e3e;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
    
    .form-message {
        padding: 1rem;
        border-radius: 6px;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }
    
    .form-message.success {
        background-color: #f0fff4;
        color: #22543d;
        border: 1px solid #9ae6b4;
    }
    
    .form-message.error {
        background-color: #fed7d7;
        color: #742a2a;
        border: 1px solid #feb2b2;
    }
`
document.head.appendChild(style)
