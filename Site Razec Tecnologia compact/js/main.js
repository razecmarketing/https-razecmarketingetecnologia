document.addEventListener('DOMContentLoaded', () => {
  const robot = document.querySelector('.transformer-robot');
  const robotHead = document.querySelector('.robot-head');

  function updateRobotOrientation(x, y) {
    const robotRect = robot.getBoundingClientRect();
    const centerX = robotRect.left + robotRect.width / 2;
    const centerY = robotRect.top + robotRect.height / 2;

    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    
    // Limit head rotation
    const clampedAngle = Math.max(-45, Math.min(45, angle));
    robotHead.style.transform = `translateX(-50%) rotate(${clampedAngle}deg)`;
  }

  // Mouse move event for desktop
  document.addEventListener('mousemove', (e) => {
    updateRobotOrientation(e.clientX, e.clientY);
  });

  // Touch move event for mobile
  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    updateRobotOrientation(touch.clientX, touch.clientY);
  });
});