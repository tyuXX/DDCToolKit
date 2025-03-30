const code = document.getElementById("inputText");
const format = document.getElementById("formatSelector");

function formatCode() {
  if (!validateCode()) {
    return;
  }
  var output = "";
  try {
    if (format.value === "json") {
      var parsed = JSON.parse(code.value);
      output = JSON.stringify(parsed, null, 2);
    } else {
      // Rudimentary formatting: add newline after common delimiters.
      output = code.value
        .replace(/([{};>])/g, "$1\n")
        .replace(/\n\s*\n/g, "\n")
        .trim();
    }
  } catch (e) {
    output = "Error formatting code: " + e;
  }
  document.getElementById("outputText").value = output;
}

function validateCode() {
  var output = "";
  let isValid = true;
  if (code.value.trim() === "") {
    output = "Code is empty.";
    isValid = false;
  } else {
    try {
      if (format.value === "json") {
        JSON.parse(code.value);
        output = "Valid JSON.";
      } else if (format.value === "javascript") {
        // Using Function constructor as a basic syntax check for JavaScript.
        new Function(code.value);
        output = "Valid JavaScript.";
      } else if (format.value === "html") {
        var parser = new DOMParser();
        parser.parseFromString(code.value, "text/html");
        output = "Valid HTML.";
      } else {
        output = "Validation not available for " + format.value + ".";
      }
    } catch (e) {
      output = "Invalid " + format.value + " code: " + e.message;
      isValid = false;
    }
  }
  document.getElementById("outputText").value = output;
  return isValid;
}

function minifyCode() {
  if (!validateCode()) {
    return;
  }
  var output = "";
  try {
    if (format.value === "json") {
      var parsed = JSON.parse(code.value);
      output = JSON.stringify(parsed);
    } else {
      // Basic minification: remove newlines and extra spaces.
      output = code.value.replace(/\s+/g, " ").trim();
    }
  } catch (e) {
    output = "Error minifying code: " + e;
  }
  document.getElementById("outputText").value = output;
}
