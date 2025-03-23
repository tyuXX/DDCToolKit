function convertSvgToPng() {
  const svgText = document.getElementById("svgInput").value.trim();
  if (!svgText) {
    alert("Please enter valid SVG code.");
    return;
  }
  
  const img = new Image();
  const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  
  img.onload = function() {
    // Determine dimensions based on custom size selection
    let width = img.width;
    let height = img.height;
    const customCheckbox = document.getElementById("customSizeCheckbox");
    if (customCheckbox.checked) {
      const customW = parseInt(document.getElementById("customWidth").value, 10);
      const customH = parseInt(document.getElementById("customHeight").value, 10);
      if (!isNaN(customW) && !isNaN(customH) && customW > 0 && customH > 0) {
        width = customW;
        height = customH;
      }
    }
    
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);
    
    const pngUrl = canvas.toDataURL("image/png");
    document.getElementById("preview").src = pngUrl;
    document.getElementById("downloadLink").href = pngUrl;
  };
  
  img.onerror = function() {
    alert("Error loading SVG. Please check your code.");
  };
  
  img.src = url;
}
