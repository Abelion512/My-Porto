window.addEventListener('DOMContentLoaded', () => {
  const door = document.getElementById('door-entrance');
  const left = door.querySelector('.door-panel.left');
  const right = door.querySelector('.door-panel.right');
  const body = document.body;

  // Step 1: Camera zoom towards door
  gsap.fromTo(
    ".door-frame",
    { scale: 0.38, opacity: 0.7 },
    {
      scale: 1.04,
      opacity: 1,
      duration: 1.8,
      ease: "power3.inOut",
      delay: 0.2,
      onComplete: () => {
        // Step 2: Door open (swing)
        gsap.to(left, {
          rotateY: -85,
          transformOrigin: "left center",
          duration: 1.25,
          ease: "power2.inOut"
        });
        gsap.to(right, {
          rotateY: 85,
          transformOrigin: "right center",
          duration: 1.25,
          ease: "power2.inOut",
          onComplete: () => {
            // Step 3: Fade out entrance, reveal index.html
            gsap.to(door, {
              opacity: 0,
              duration: 0.8,
              delay: 0.4,
              onComplete: () => {
                body.classList.add('entrance-done');
                door.style.display = 'none';
              }
            });
          }
        });
      }
    }
  );
});
