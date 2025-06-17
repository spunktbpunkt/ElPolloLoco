
//   const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext('2d');

  // Klickbarer Bereich: unten rechts


  // Zeichne den Bereich (zur Sichtbarmachung)
  ctx.fillStyle = 'green';
  ctx.fillRect(clickableArea.x, clickableArea.y, clickableArea.width, clickableArea.height);

  // Event Listener für Klick
  canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (
      mouseX >= clickableArea.x &&
      mouseX <= clickableArea.x + clickableArea.width &&
      mouseY >= clickableArea.y &&
      mouseY <= clickableArea.y + clickableArea.height
    ) {
      alert('Du hast den Bereich unten rechts geklickt!');
    }
  });