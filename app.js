const app = {};

// Canvas setup
app.canvas = document.querySelector('#canvas');
app.ctx = app.canvas.getContext('2d');

// Buttons
app.sizeChanger = document.getElementById('sizeSlider');
app.clearBtn = document.getElementById('clearBtn');
app.backgroundChngBtn = document.getElementById('backgroundAccept');

// Selects
app.backgroundSelect = document.getElementById('backgroundList');

// Canvas size
app.canvas.height = 900;
app.canvas.width = 1500;

// Variables
app.painting = false;
app.color = 'black';
app.width = 10;

// Start of drawing method
app.startPosition = function(e) {
  app.painting = true;
  app.draw(e);
}

// End of drawing method
app.finishPosition = function() {
  app.painting = false;
  app.ctx.beginPath();
}

// Draw method
app.draw = function(e) {
  if(!app.painting) return;
  app.ctx.lineWidth = app.width;
  app.ctx.lineCap = 'round';
  app.ctx.strokeStyle = app.color;

  app.ctx.lineTo(e.offsetX, e.offsetY);
  app.ctx.stroke();
  app.ctx.beginPath();
  app.ctx.moveTo(e.offsetX, e.offsetY);
}

// Change size of the draw tool
app.changeSize = function() {
  app.width = app.sizeChanger.value;
}

// Change the background of the canvas
app.changeBackground = function() {
  app.canvas.style.background = `url(./assets/${app.backgroundSelect.value}.jpg)`
}

// Clear the canvas
app.clearCanvas = function() {
  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
}

// Event Listeners
app.eventListeners = function() {
  app.canvas.addEventListener('mousedown', app.startPosition);
  app.canvas.addEventListener('mouseup', app.finishPosition);
  app.canvas.addEventListener('mousemove', app.draw);
  app.sizeChanger.addEventListener('input', app.changeSize);
  app.clearBtn.addEventListener('click', app.clearCanvas);
  app.backgroundChngBtn.addEventListener('click', app.changeBackground);
}

// Document ready
window.addEventListener("load", () => {
  app.eventListeners();
});
