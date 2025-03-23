function formatHtml() {
  const input = document.getElementById("inputText").value;
  // Basic formatter: insert newlines between tags
  const formatted = input.replace(/>\s*</g, ">\n<");
  document.getElementById("outputText").value = formatted;
}

function previewHtml() {
  const html = document.getElementById("inputText").value;
  document.getElementById("previewFrame").srcdoc = html;
}
