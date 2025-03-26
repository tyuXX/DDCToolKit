function updateColor() {
  const r = parseInt(document.getElementById("redSlider").value, 10);
  const g = parseInt(document.getElementById("greenSlider").value, 10);
  const b = parseInt(document.getElementById("blueSlider").value, 10);
  const hex =
    "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
  document.getElementById("colorPreview").style.backgroundColor = hex;
  document.getElementById("hexValue").textContent = "Hex Value: " + hex.toUpperCase();
  document.getElementById("rgbValue").textContent = "RGB: " + r + ", " + g + ", " + b;
}

document.getElementById("redSlider").addEventListener("input", updateColor);
document.getElementById("greenSlider").addEventListener("input", updateColor);
document.getElementById("blueSlider").addEventListener("input", updateColor);

function copyHex() {
  const hexText = document.getElementById("hexValue").textContent.replace("Hex Value: ", "");
  navigator.clipboard.writeText(hexText).then(() => {
    alert("Copied " + hexText);
  });
}
