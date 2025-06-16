// --- Smooth Scroll Helper ---
document.querySelectorAll('a[href^="#"], .scroll-down').forEach(el => {
  el.addEventListener('click', function(e) {
    let targetId;
    if (this.classList.contains('scroll-down')) {
      targetId = 'about';
    } else {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) targetId = href.substring(1);
      else return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav if open
      document.getElementById('mobile-nav').classList.remove('open');
    }
  });
});
// Home icon scrolls to top
document.getElementById('nav-home').onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('mobile-nav').classList.remove('open');
};

// --- Navbar Hide/Show on Scroll ---
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < 12) {
    navbar.classList.remove('hide');
    return;
  }
  if (y > lastScroll + 10) {
    navbar.classList.add('hide');
  } else if (y < lastScroll - 10) {
    navbar.classList.remove('hide');
  }
  lastScroll = y;
});

// --- Mobile Nav ---
const navBurger = document.getElementById('nav-burger');
const mobileNav = document.getElementById('mobile-nav');
navBurger.onclick = () => mobileNav.classList.toggle('open');
document.querySelectorAll('.mobile-link').forEach(link => {
  link.onclick = () => mobileNav.classList.remove('open');
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 650) {
    mobileNav.classList.remove('open');
  }
});

// --- Animate In on Viewport ---
const observer = new window.IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.18 }
);
document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// --- Custom Cursor ---
const cursor = document.querySelector('.custom-cursor');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function renderCursor() {
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  requestAnimationFrame(renderCursor);
}
renderCursor();

// Cursor enlarge on interactive elements
function cursorToggle(e, state) {
  if (state) cursor.classList.add('cursor-hover');
  else cursor.classList.remove('cursor-hover');
}
['a', 'button', '.nav-brand-center', '.skill-card', '.project-demo-btn', '.nav-burger', '.mobile-link', '.scroll-down'].forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('mouseenter', () => cursorToggle(null, true));
    el.addEventListener('mouseleave', () => cursorToggle(null, false));
  });
});

// Prevent cursor on mobile
function toggleCursorOnMobile() {
  if (window.innerWidth < 600) cursor.style.display = 'none';
  else cursor.style.display = '';
}
toggleCursorOnMobile();
window.addEventListener('resize', toggleCursorOnMobile);

// --- Microinteraction: Button/Text animation ---
document.querySelectorAll('.form-btn, .project-demo-btn, .skill-card').forEach(el => {
  el.addEventListener('mousedown', () => el.style.transform = 'scale(0.94)');
  el.addEventListener('mouseup', () => el.style.transform = '');
  el.addEventListener('mouseleave', () => el.style.transform = '');
});

// --- Contact Form fake submit (no backend) ---
document.querySelector('.contact-form').onsubmit = function(e) {
  e.preventDefault();
  this.reset();
  this.querySelector('.form-btn').textContent = "Sent!";
  setTimeout(() => this.querySelector('.form-btn').textContent = "Send Message", 1500);
};
