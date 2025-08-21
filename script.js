// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const btn = document.querySelector(".mobile-menu-btn")

  mobileMenu.classList.toggle("active")

  // Animate hamburger menu
  const spans = btn.querySelectorAll("span")
  if (mobileMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const btn = document.querySelector(".mobile-menu-btn")
  const spans = btn.querySelectorAll("span")

  mobileMenu.classList.remove("active")

  // Reset hamburger menu
  spans[0].style.transform = "none"
  spans[1].style.opacity = "1"
  spans[2].style.transform = "none"
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Add intersection observer for animations
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
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".feature-card, .component-card, .stat-card, .media-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Add click effects to buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
})

// Add ripple effect styles
const rippleStyles = `
.btn-primary, .btn-secondary {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`

// Add ripple styles to document
const styleSheet = document.createElement("style")
styleSheet.textContent = rippleStyles
document.head.appendChild(styleSheet)

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start)
    }
  }, 16)
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numberElement = entry.target.querySelector(".stat-number")
        const text = numberElement.textContent
        const number = Number.parseFloat(text.replace(/[^\d.]/g, ""))

        if (text.includes("M")) {
          animateCounter(numberElement, number, 2000)
          setTimeout(() => {
            numberElement.textContent = number + "M"
          }, 2000)
        } else if (text.includes("%")) {
          animateCounter(numberElement, number, 2000)
          setTimeout(() => {
            numberElement.textContent = number + "%"
          }, 2000)
        }

        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

document.addEventListener("DOMContentLoaded", () => {
  const statCards = document.querySelectorAll(".stat-card")
  statCards.forEach((card) => {
    statsObserver.observe(card)
  })
})

function abrirFinalizacao() {
  const modal = document.getElementById("modalFinalizacao")
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function fecharFinalizacao() {
  const modal = document.getElementById("modalFinalizacao")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

function calcularFrete() {
  const cep = document.getElementById("cep").value
  const infoFrete = document.getElementById("infoFrete")

  if (cep.length >= 8) {
    infoFrete.style.display = "block"
    infoFrete.innerHTML = "<p>Frete: R$ 15,00 - Entrega em 5-7 dias úteis</p>"
  } else {
    alert("Por favor, insira um CEP válido")
  }
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("modalFinalizacao")
  if (event.target === modal) {
    fecharFinalizacao()
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const formCompra = document.getElementById("formCompra")

  if (formCompra) {
    formCompra.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simular processamento da compra
      const btnFinalizar = document.querySelector(".btn-finalizar")
      const textoOriginal = btnFinalizar.textContent

      btnFinalizar.textContent = "Processando..."
      btnFinalizar.disabled = true

      setTimeout(() => {
        alert("Compra realizada com sucesso! Você receberá um e-mail de confirmação em breve.")
        fecharFinalizacao()
        btnFinalizar.textContent = textoOriginal
        btnFinalizar.disabled = false
        formCompra.reset()
      }, 2000)
    })
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep")

  if (cepInput) {
    cepInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, "$1-$2")
      }
      e.target.value = value
    })
  }
})
