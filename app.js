const app = {};

// Canvas setup
app.canvas = document.querySelector('#canvas');
app.ctx = app.canvas.getContext('2d');

// Canvas size
app.canvas.height = 900;
app.canvas.width = 1500;

// Buttons
app.sizeChanger = document.getElementById('sizeSlider');
app.clearBtn = document.getElementById('clearBtn');
app.backgroundChngBtn = document.getElementById('backgroundAccept');
app.saveButton = document.getElementById('saveImage');

// Selects
app.backgroundSelect = document.getElementById('backgroundList');
app.paintTip = document.getElementById('paintTip');

// Add background to canvas
app.background = new Image;
app.background.src = app.backgroundSelect.value;
app.background.onload = function(){
    app.ctx.drawImage(app.background, 0, 0, app.canvas.width, app.canvas.height);   
}

// Variables
app.painting = false;
app.color = 'black';
app.width = 10;
app.lineCap = 'round'

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
  app.ctx.lineCap = `${app.paintTip.value}`;
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

// Change type of paint tool
app.changeTip = function() {
  app.lineCap = app.paintTip.value
}

// Clear the canvas and change the background
app.changeBackground = function() {
  app.clearCanvas();
  app.background.src = app.backgroundSelect.value;
  app.background.onload = function(){
    app.ctx.drawImage(app.background, 0, 0, app.canvas.width, app.canvas.height);   
  }
}

// Clear the canvas
app.clearCanvas = function() {
  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
  app.background.src = app.backgroundSelect.value;
  app.background.onload = function(){
    app.ctx.drawImage(app.background, 0, 0, app.canvas.width, app.canvas.height);   
  }
}

// Save image
app.saveImage = function() {
  const url = app.canvas.toDataURL('image/png').replace(/^data:image\/png/,'data:application/octet-stream');
  app.saveButton.setAttribute('href', url);
}

// Event Listeners
app.eventListeners = function() {
  app.canvas.addEventListener('mousedown', app.startPosition);
  app.canvas.addEventListener('mouseup', app.finishPosition);
  app.canvas.addEventListener('mousemove', app.draw);
  app.sizeChanger.addEventListener('input', app.changeSize);
  app.clearBtn.addEventListener('click', app.clearCanvas);
  app.backgroundChngBtn.addEventListener('click', app.clearCanvas);
}

// Document ready
window.addEventListener("load", () => {
  app.eventListeners();
});
