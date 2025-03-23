function convertUnits() {
  const value = parseFloat(document.getElementById("inputValue").value);
  const type = document.getElementById("conversionType").value;
  let result = "";
  if (isNaN(value)) {
    result = "Please enter a valid number.";
  } else {
    if (type === "mToFt") {
      result = value + " meters = " + (value * 3.28084).toFixed(2) + " feet.";
    } else if (type === "ftToM") {
      result = value + " feet = " + (value / 3.28084).toFixed(2) + " meters.";
    } else if (type === "kmToMi") {
      result =
        value + " kilometers = " + (value * 0.621371).toFixed(2) + " miles.";
    } else if (type === "miToKm") {
      result =
        value + " miles = " + (value / 0.621371).toFixed(2) + " kilometers.";
    } else if (type === "cToF") {
      result = value + "°C = " + ((value * 9) / 5 + 32).toFixed(2) + "°F.";
    } else if (type === "fToC") {
      result = value + "°F = " + (((value - 32) * 5) / 9).toFixed(2) + "°C.";
    } else if (type === "kgToLb") {
      result =
        value + " kilograms = " + (value * 2.20462).toFixed(2) + " pounds.";
    } else if (type === "lbToKg") {
      result =
        value + " pounds = " + (value / 2.20462).toFixed(2) + " kilograms.";
    } else if (type === "cmToIn") {
      result =
        value + " centimeters = " + (value * 0.393701).toFixed(2) + " inches.";
    } else if (type === "inToCm") {
      result =
        value + " inches = " + (value * 2.54).toFixed(2) + " centimeters.";
    } else if (type === "lToGal") {
      result =
        value + " liters = " + (value * 0.264172).toFixed(2) + " gallons.";
    } else if (type === "galToL") {
      result =
        value + " gallons = " + (value * 3.78541).toFixed(2) + " liters.";
    } else if (type === "ydToM") {
      result = value + " yards = " + (value * 0.9144).toFixed(2) + " meters.";
    } else if (type === "mToYd") {
      result = value + " meters = " + (value / 0.9144).toFixed(2) + " yards.";
    } else if (type === "m2ToFt2") {
      result =
        value +
        " square meters = " +
        (value * 10.7639).toFixed(2) +
        " square feet.";
    } else if (type === "ft2ToM2") {
      result =
        value +
        " square feet = " +
        (value / 10.7639).toFixed(2) +
        " square meters.";
    } else if (type === "m3ToFt3") {
      result =
        value +
        " cubic meters = " +
        (value * 35.3147).toFixed(2) +
        " cubic feet.";
    } else if (type === "ft3ToM3") {
      result =
        value +
        " cubic feet = " +
        (value / 35.3147).toFixed(2) +
        " cubic meters.";
    } else if (type === "kToC") {
      result = value + " Kelvin = " + (value - 273.15).toFixed(2) + "°C.";
    } else if (type === "cToK") {
      result = value + "°C = " + (value + 273.15).toFixed(2) + " Kelvin.";
    } else if (type === "gToOz") {
      result =
        value + " grams = " + (value * 0.03527396).toFixed(2) + " ounces.";
    } else if (type === "ozToG") {
      result =
        value + " ounces = " + (value / 0.03527396).toFixed(2) + " grams.";
    }
  }
  document.getElementById("result").value = result;
}
