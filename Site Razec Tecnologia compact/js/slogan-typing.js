class SloganTyper {
  constructor() {
    this.sloganElement = document.querySelector('.slogan-dynamic');
    this.slogan = 'para quem quer estar sempre a frente'; // Corrected slogan text
    this.typingSpeed = 100;
    this.deletingSpeed = 40;
    this.pauseBetweenCycles = 2000;
    this.isDeleting = false;
    this.charIndex = 0;
    this.type();
  }

  type() {
    const fullText = this.slogan;
    let currentText = this.isDeleting 
      ? fullText.substring(0, this.charIndex - 1) 
      : fullText.substring(0, this.charIndex + 1);

    this.sloganElement.textContent = currentText;

    let typeSpeed = this.typingSpeed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && currentText === fullText) {
      typeSpeed = this.pauseBetweenCycles;
      this.isDeleting = true;
    } else if (this.isDeleting && currentText === '') {
      this.isDeleting = false;
      typeSpeed = this.typingSpeed;
    }

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SloganTyper();
});