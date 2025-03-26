document.getElementById("imageInput").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.getElementById("imageCanvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
});

document.getElementById("imageCanvas").addEventListener("click", function(e) {
  const canvas = e.target;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const rgba = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
  document.getElementById("pickedColor").textContent = `Picked Color: ${rgba}`;
});

function rotateImage() {
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(canvas, 0, 0);
  
  // Swap dimensions for 90-degree rotation
  canvas.width = tempCanvas.height;
  canvas.height = tempCanvas.width;
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(Math.PI / 2);
  ctx.drawImage(tempCanvas, -tempCanvas.width / 2, -tempCanvas.height / 2);
  ctx.restore();
}

function convertToGrayscale() {
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = avg;
    imageData.data[i + 1] = avg;
    imageData.data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);
}

function resizeImage() {
  const newWidth = parseInt(document.getElementById("resizeWidth").value, 10);
  const newHeight = parseInt(document.getElementById("resizeHeight").value, 10);
  if (!newWidth || !newHeight) return;
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCanvas.getContext("2d").drawImage(canvas, 0, 0);
  
  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, newWidth, newHeight);
}

function cropImage() {
  const cropX = parseInt(document.getElementById("cropX").value, 10) || 0;
  const cropY = parseInt(document.getElementById("cropY").value, 10) || 0;
  const cropW = parseInt(document.getElementById("cropWidth").value, 10);
  const cropH = parseInt(document.getElementById("cropHeight").value, 10);
  if (!cropW || !cropH) return;
  
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(cropX, cropY, cropW, cropH);
  canvas.width = cropW;
  canvas.height = cropH;
  ctx.putImageData(imageData, 0, 0);
}
