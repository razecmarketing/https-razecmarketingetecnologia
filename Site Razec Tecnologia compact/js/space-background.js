class MarsOrbitalBackground {
  constructor() {
    // Use document.querySelector to find containers, with fallback creation
    this.starsContainer = document.querySelector('.stars') || this.createContainer('stars');
    this.meteorsContainer = document.querySelector('.meteors') || this.createContainer('meteors');
    this.dustContainer = document.querySelector('.dust-particles') || this.createContainer('dust-particles');
    this.astronaut = document.querySelector('.astronaut') || this.createAstronautElement();
    this.init();
  }

  createContainer(className) {
    const container = document.createElement('div');
    container.classList.add(className);
    document.querySelector('.space-background').appendChild(container);
    return container;
  }

  createAstronautElement() {
    const astronaut = document.createElement('div');
    astronaut.classList.add('astronaut');
    document.querySelector('.space-background').appendChild(astronaut);
    return astronaut;
  }

  init() {
    this.createStars();
    this.createDustParticles();
    this.createMeteors();
    this.setupAstronautInteraction();
  }

  createStars() {
    const starCount = 300;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.width = `${Math.random() * 4}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      this.starsContainer.appendChild(star);
    }
  }

  createDustParticles() {
    const dustCount = 500;
    for (let i = 0; i < dustCount; i++) {
      const dust = document.createElement('div');
      dust.classList.add('dust-particle');
      dust.style.left = `${Math.random() * 100}%`;
      dust.style.top = `${Math.random() * 100}%`;
      dust.style.animationDelay = `${Math.random() * 10}s`;
      this.dustContainer.appendChild(dust);
    }
  }

  createMeteors() {
    setInterval(() => {
      if (Math.random() > 0.3) return;

      const meteor = document.createElement('div');
      meteor.classList.add('meteor');
      
      meteor.style.top = `${Math.random() * 100}%`;
      meteor.style.animationDuration = `${2 + Math.random() * 3}s`;
      meteor.style.opacity = `${0.5 + Math.random() * 0.5}`;
      
      this.meteorsContainer.appendChild(meteor);

      setTimeout(() => {
        meteor.remove();
      }, 5000);
    }, 1000);
  }

  setupAstronautInteraction() {
    document.addEventListener('mousemove', (e) => {
      this.moveAstronautInOrbit(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      this.moveAstronautInOrbit(touch.clientX, touch.clientY);
    });

    window.addEventListener('scroll', this.rotateAstronaut.bind(this));
    document.addEventListener('click', this.bounceAstronaut.bind(this));
  }

  moveAstronautInOrbit(x, y) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const orbitRadius = Math.min(distance / 8, 150);
    const scaleFactor = 1 + (distance / window.innerWidth);

    this.astronaut.style.transform = `
      translate(-50%, -50%) 
      rotate(${angle}deg) 
      translateX(${orbitRadius}px)
      scale(${scaleFactor})
      perspective(500px)
      rotateY(${dx/10}deg)
      rotateX(${-dy/10}deg)
    `;
  }

  rotateAstronaut() {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 720;
    this.astronaut.style.transform = `
      translate(-50%, -50%) 
      rotate(${scrollPercentage}deg)
      scale(1.2)
      perspective(500px)
      rotateY(20deg)
    `;
  }

  bounceAstronaut() {
    this.astronaut.style.animation = 'astronaut-bounce 0.5s ease';
    setTimeout(() => {
      this.astronaut.style.animation = 'float-in-orbit 3s ease-in-out infinite, astronaut-drift 10s linear infinite alternate';
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Ensure space-background exists
  let spaceBackground = document.querySelector('.space-background');
  if (!spaceBackground) {
    spaceBackground = document.createElement('div');
    spaceBackground.classList.add('space-background');
    document.body.insertBefore(spaceBackground, document.body.firstChild);
  }

  new MarsOrbitalBackground();
});