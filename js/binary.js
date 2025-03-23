function textToBinary() {
  const input = document.getElementById("textInput").value;
  let binaryOutput = "";
  for (let i = 0; i < input.length; i++) {
    let binaryChar = input.charCodeAt(i).toString(2).padStart(8, "0");
    binaryOutput += binaryChar + " ";
  }
  document.getElementById("textOutput").value = binaryOutput.trim();
}

function binaryToText() {
  const input = document.getElementById("textInput").value;
  let textOutput = "";
  const binaryArray = input.trim().split(" ");
  binaryArray.forEach(binary => {
    if (binary) {
      textOutput += String.fromCharCode(parseInt(binary, 2));
    }
  });
  document.getElementById("textOutput").value = textOutput;
}

function decimalToBinary() {
  const input = document.getElementById("decimalInput").value.trim();
  const num = parseInt(input, 10);
  if (isNaN(num)) {
    document.getElementById("decimalOutput").value = "Error: Invalid decimal number.";
  } else {
    document.getElementById("decimalOutput").value = num.toString(2);
  }
}

function binaryToDecimal() {
  const input = document.getElementById("decimalInput").value.trim();
  const num = parseInt(input, 2);
  if (isNaN(num)) {
    document.getElementById("decimalOutput").value = "Error: Invalid binary number.";
  } else {
    document.getElementById("decimalOutput").value = num.toString(10);
  }
}
