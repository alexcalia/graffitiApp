const app = {};

// Canvas setup
app.canvas = document.querySelector('#canvas');
app.canvasTwo = document.querySelector('#canvasTwo');
app.ctx = app.canvas.getContext('2d');
app.ctxTwo = app.canvasTwo.getContext('2d');

// Canvas size
app.canvas.height = 700;
app.canvas.width = 1200;
app.canvasTwo.height = 360;
app.canvasTwo.width = 600;

// Color picker
app.colorPicker = new iro.ColorPicker('#picker', {
  width: 150,
  sliderSize: 25
});

// Selects
app.backgroundSelect = document.getElementById('backgroundList');
app.paintTip = document.getElementById('paintTip');
app.filterList = document.getElementById('filterList');

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

// Open the save popup
app.openSavePopup = function() {
  app.backgroundBlur.className = "backgroundBlur active";
  app.savePopup.className = "savePopup active";
  app.ctxTwo.drawImage(app.canvas, 0, 0, app.canvasTwo.width, app.canvasTwo.height);
};

// Apply filter
app.applyFilter = function() {
  app.ctxTwo.clearRect(0, 0, app.canvasTwo.width, app.canvasTwo.length);
  app.ctxTwo.filter = app.filterList.value;
  app.ctxTwo.drawImage(app.canvas, 0, 0, app.canvasTwo.width, app.canvasTwo.height);
}

// Download the image
app.downloadImage = function() {
  const url = app.canvasTwo.toDataURL('image/png').replace("image/png", "image/octet-stream");
  app.saveButton.setAttribute('href', url);
  app.ctxTwo.filter = "none";
  app.filterList.value = "none";
}

// Close popup
app.closeSavePopup = function() {
  app.backgroundBlur.className = "backgroundBlur";
  app.savePopup.className = "savePopup";
  app.ctxTwo.filter = "none";
  app.filterList.value = "none";
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
