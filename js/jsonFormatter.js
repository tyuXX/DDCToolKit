function formatJson() {
  const input = document.getElementById("inputText").value.trim();
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 4);
    document.getElementById("outputText").value = formatted;
  } catch (error) {
    document.getElementById("outputText").value = "Invalid JSON: " + error.message;
  }
}
