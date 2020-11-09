const app = {};

// Canvas setup
app.canvas = document.querySelector('#canvas');
app.ctx = app.canvas.getContext('2d');

// Canvas size
app.canvas.height = 900;
app.canvas.width = 1500;

// Color picker
app.colorPicker = new iro.ColorPicker('#picker', {
  width: 200,
});

// Selects
app.backgroundSelect = document.getElementById('backgroundList');
app.paintTip = document.getElementById('paintTip');

// Variables
app.painting = false;
app.color = app.colorPicker.color.hexString;
app.width = 10;
app.lineCap = 'round'

// Buttons
app.sizeChanger = document.getElementById('sizeSlider');
app.backgroundChngBtn = document.getElementById('backgroundAccept');
app.saveButton = document.getElementById('saveImage');

// Save Popup and Blur
app.backgroundBlur = document.getElementById('backgroundBlur');
app.savePopup = document.getElementById('savePopup');
app.canvasImage = document.getElementById('canvasImage');

// Add background to canvas
app.setBackground = function() {
  app.background = new Image;
  app.background.src = app.backgroundSelect.value;
  app.background.onload = function(){
    app.ctx.drawImage(app.background, 0, 0, app.canvas.width, app.canvas.height);   
  }
};

// Start of drawing method
app.startPosition = function(e) {
  app.painting = true;
  app.draw(e);
};

// End of drawing method
app.finishPosition = function() {
  app.painting = false;
  app.ctx.beginPath();
};

// Draw method
app.draw = function(e) {
  if(!app.painting) return;
  app.ctx.lineWidth = app.width;
  app.ctx.lineCap = `${app.paintTip.value}`;
  app.ctx.strokeStyle = app.color;
  app.ctx.shadowColor= app.color;
  app.ctx.lineTo(e.offsetX, e.offsetY);
  if (app.ctx.lineCap === 'round') {
    app.ctx.shadowOffsetX = 0;
    app.ctx.shadowOffsetY = 0;
    app.ctx.shadowBlur = 10;
  } else {
    app.ctx.shadowBlur = 0;
  }
  app.ctx.stroke();
  app.ctx.beginPath();
  app.ctx.moveTo(e.offsetX, e.offsetY);
};

// Change size of the draw tool
app.changeSize = function() {
  app.width = app.sizeChanger.value;
};

// Clear the canvas
app.clearCanvas = function() {
  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
  app.setBackground();
};

// Save image
app.openSavePopup = function() {
  app.backgroundBlur.className = "backgroundBlur active";
  app.savePopup.className = "savePopup active";
  const url = app.canvas.toDataURL('image/png').replace(/^data:image\/png/,'data:application/octet-stream');
  app.canvasImage.src = url;
  app.saveButton.setAttribute('href', url);
};

app.closeSavePopup = function() {
  app.backgroundBlur.className = "backgroundBlur";
  app.savePopup.className = "savePopup";
};

// Event Listeners
app.eventListeners = function() {
  app.canvas.addEventListener('mousedown', app.startPosition);
  app.canvas.addEventListener('mouseup', app.finishPosition);
  app.canvas.addEventListener('mouseleave', app.finishPosition);
  app.canvas.addEventListener('mousemove', app.draw);
  app.sizeChanger.addEventListener('input', app.changeSize);
  app.backgroundChngBtn.addEventListener('click', app.clearCanvas);
  app.colorPicker.on('color:change', () => {
    app.color = app.colorPicker.color.hexString;
  })
};

// Document ready
window.addEventListener("load", () => {
  app.eventListeners();
  app.setBackground();
});
