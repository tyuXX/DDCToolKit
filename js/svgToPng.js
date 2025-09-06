document.addEventListener('DOMContentLoaded', function() {
  const svgInput = document.getElementById('svgInput');
  const fileInput = document.getElementById('fileInput');
  const fileName = document.getElementById('fileName');
  const convertBtn = document.getElementById('convertBtn');
  const pasteMethod = document.getElementById('pasteMethod');
  const uploadMethod = document.getElementById('uploadMethod');
  const methodTabs = document.createElement('div');
  methodTabs.className = 'method-tabs';
  
  // Create tab navigation
  const pasteTab = document.createElement('div');
  pasteTab.className = 'method-tab active';
  pasteTab.textContent = 'Paste SVG';
  pasteTab.onclick = () => switchMethod('paste');
  
  const uploadTab = document.createElement('div');
  uploadTab.className = 'method-tab';
  uploadTab.textContent = 'Upload File';
  uploadTab.onclick = () => switchMethod('upload');
  
  methodTabs.appendChild(pasteTab);
  methodTabs.appendChild(uploadTab);
  document.querySelector('main').insertBefore(methodTabs, document.querySelector('.input-methods'));
  
  // File input change handler
  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      fileName.textContent = file.name;
    } else {
      fileName.textContent = 'No file selected';
    }
  });
  
  // Convert button click handler
  convertBtn.addEventListener('click', convertSvgToPng);
  
  function switchMethod(method) {
    if (method === 'paste') {
      pasteMethod.classList.add('active');
      uploadMethod.classList.remove('active');
      pasteTab.classList.add('active');
      uploadTab.classList.remove('active');
    } else {
      pasteMethod.classList.remove('active');
      uploadMethod.classList.add('active');
      pasteTab.classList.remove('active');
      uploadTab.classList.add('active');
    }
  }
  
  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  }
  
  async function getSvgContent() {
    if (pasteMethod.classList.contains('active')) {
      const svgText = svgInput.value.trim();
      if (!svgText) {
        throw new Error('Please enter valid SVG code.');
      }
      return svgText;
    } else {
      const file = fileInput.files[0];
      if (!file) {
        throw new Error('Please select an SVG file.');
      }
      if (!file.name.toLowerCase().endsWith('.svg')) {
        throw new Error('Please select a valid SVG file.');
      }
      return await readFileAsText(file);
    }
  }
  
  async function convertSvgToPng() {
    try {
      const svgText = await getSvgContent();
      
      // Create image from SVG
      const img = new Image();
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = function() {
        // Determine dimensions based on custom size selection
        let width = img.width;
        let height = img.height;
        const customCheckbox = document.getElementById('customSizeCheckbox');
        
        if (customCheckbox.checked) {
          const customW = parseInt(document.getElementById('customWidth').value, 10);
          const customH = parseInt(document.getElementById('customHeight').value, 10);
          if (!isNaN(customW) && !isNaN(customH) && customW > 0 && customH > 0) {
            width = customW;
            height = customH;
          }
        }
        
        // Create canvas and draw image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Draw the SVG with transparency preserved
        ctx.drawImage(img, 0, 0, width, height);
        
        // Generate PNG and update UI
        const pngUrl = canvas.toDataURL('image/png');
        const preview = document.getElementById('preview');
        const downloadLink = document.getElementById('downloadLink');
        
        preview.src = pngUrl;
        downloadLink.href = pngUrl;
        downloadLink.download = 'converted.png';
        
        // Show the preview and download link
        preview.style.display = 'block';
        downloadLink.style.display = 'inline-block';
        
        // Clean up
        URL.revokeObjectURL(url);
      };
      
      img.onerror = function() {
        throw new Error('Error loading SVG. The file may be corrupted or not a valid SVG.');
      };
      
      img.src = url;
      
    } catch (error) {
      alert(error.message);
      console.error('Conversion error:', error);
    }
  }
});
