// ==========================================
// Smooth Scrolling for Navigation Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80; // Navbar height
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ==========================================
// Navbar Scroll Effect
// ==========================================
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ==========================================
// Mobile Menu Toggle
// ==========================================
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileToggle.classList.toggle("active");
  });
}

// ==========================================
// Intersection Observer for Scroll Animations
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

// Timeline items animation
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 100);
    }
  });
}, observerOptions);

document.querySelectorAll(".timeline-item").forEach((item) => {
  timelineObserver.observe(item);
});

// Module cards animation
const moduleObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 150);
    }
  });
}, observerOptions);

document.querySelectorAll(".module-card").forEach((card) => {
  moduleObserver.observe(card);
});

// ==========================================
// Dynamic Background Gradient
// ==========================================
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateGradient() {
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  const heroBackground = document.querySelector(".hero-background");
  if (heroBackground) {
    const percentX = (targetX / window.innerWidth) * 100;
    const percentY = (targetY / window.innerHeight) * 100;
    heroBackground.style.backgroundPosition = `${percentX}% ${percentY}%`;
  }

  requestAnimationFrame(updateGradient);
}

updateGradient();

// ==========================================
// Learning Progress Tracker (Local Storage)
// ==========================================
class LearningProgress {
  constructor() {
    this.storageKey = "quantLearningProgress";
    this.progress = this.loadProgress();
    this.init();
  }

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    return saved
      ? JSON.parse(saved)
      : {
          completedModules: [],
          currentStep: 0,
          lastVisit: new Date().toISOString(),
        };
  }

  saveProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
  }

  markModuleComplete(moduleId) {
    if (!this.progress.completedModules.includes(moduleId)) {
      this.progress.completedModules.push(moduleId);
      this.saveProgress();
      this.updateUI();
    }
  }

  updateCurrentStep(step) {
    this.progress.currentStep = step;
    this.saveProgress();
    this.updateUI();
  }

  updateUI() {
    // Update timeline items to show completion
    document.querySelectorAll(".timeline-item").forEach((item, index) => {
      if (this.progress.currentStep > index) {
        item.classList.add("completed");
      }
    });

    // Update module cards
    document.querySelectorAll(".module-card").forEach((card) => {
      const moduleId = card.dataset.moduleId;
      if (this.progress.completedModules.includes(moduleId)) {
        card.classList.add("completed");
      }
    });
  }

  init() {
    this.updateUI();
  }
}

// Initialize progress tracker
const learningProgress = new LearningProgress();

// ==========================================
// Timeline Item Click Handlers
// ==========================================
document.querySelectorAll(".timeline-item").forEach((item, index) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".timeline-item").forEach((node) => {
      node.classList.remove("active");
      node.setAttribute("aria-pressed", "false");
    });
    learningProgress.updateCurrentStep(index);
    item.classList.add("active");
    item.setAttribute("aria-pressed", "true");

    // Show visual feedback
    const content = item.querySelector(".timeline-content");
    content.style.transform = "scale(1.02)";
    setTimeout(() => {
      content.style.transform = "";
    }, 300);
  });

  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      item.click();
    }
  });
});

// ==========================================
// Module Card Interactive Effects
// ==========================================
document.querySelectorAll(".module-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.zIndex = "10";
  });

  card.addEventListener("mouseleave", function () {
    this.style.zIndex = "";
  });
});

// ==========================================
// Performance Optimization - Lazy Loading
// ==========================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ==========================================
// Parallax Effect for Hero Section
// ==========================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-content");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - scrolled / 700;
  }
});

// ==========================================
// Add Gradient Animation to Stats
// ==========================================
const statNumbers = document.querySelectorAll(".stat-number");
statNumbers.forEach((stat) => {
  stat.addEventListener("mouseenter", function () {
    this.style.animation = "gradientShift 1s ease infinite";
  });

  stat.addEventListener("mouseleave", function () {
    this.style.animation = "";
  });
});

// ==========================================
// Console Easter Egg
// ==========================================
console.log(
  "%c🚀 欢迎来到量化交易学习中心！",
  "color: #667eea; font-size: 20px; font-weight: bold;",
);
console.log(
  "%c准备好开始你的量化交易之旅了吗？",
  "color: #4facfe; font-size: 14px;",
);
console.log(
  "%c💡 提示：点击时间轴项目可以标记你的学习进度！",
  "color: #43e97b; font-size: 12px;",
);

// ==========================================
// Track Page Visibility for Analytics
// ==========================================
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    learningProgress.progress.lastVisit = new Date().toISOString();
    learningProgress.saveProgress();
  }
});

// ==========================================
// Initialize on DOM Load
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Add entrance animations
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);

  // Log visit
  console.log("Learning progress loaded:", learningProgress.progress);
});
