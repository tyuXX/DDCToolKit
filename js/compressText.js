import { LZString } from "../lib/lz-string.min.js";

function compressText() {
  var input = document.getElementById("inputText").value;
  if (input === "") return;
  var compressed = LZString.compressToBase64(input);
  document.getElementById("outputText").value = compressed;
}

function decompressText() {
  var input = document.getElementById("inputText").value;
  if (input === "") return;
  var decompressed = LZString.decompressFromBase64(input);
  document.getElementById("outputText").value = decompressed;
}

// New: loadFile for file picker
function loadFile(event) {
  var file = event.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById("inputText").value = e.target.result;
  };
  reader.readAsText(file);
}

// Expose functions to global scope for inline usage
window.compressText = compressText;
window.decompressText = decompressText;
window.loadFile = loadFile;
