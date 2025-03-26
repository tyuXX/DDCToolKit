function formatCode() {
  var code = document.getElementById("inputText").value;
  var format = document.getElementById("formatSelector").value;
  var output = "";
  try {
    if (format === "json") {
      var parsed = JSON.parse(code);
      output = JSON.stringify(parsed, null, 2);
    } else {
      // Rudimentary formatting: add newline after common delimiters.
      output = code.replace(/([{};>])/g, "$1\n").replace(/\n\s*\n/g, "\n").trim();
    }
  } catch (e) {
    output = "Error formatting code: " + e;
  }
  document.getElementById("outputText").value = output;
}

function minifyCode() {
  var code = document.getElementById("inputText").value;
  var format = document.getElementById("formatSelector").value;
  var output = "";
  try {
    if (format === "json") {
      var parsed = JSON.parse(code);
      output = JSON.stringify(parsed);
    } else {
      // Basic minification: remove newlines and extra spaces.
      output = code.replace(/\s+/g, " ").trim();
    }
  } catch (e) {
    output = "Error minifying code: " + e;
  }
  document.getElementById("outputText").value = output;
}
