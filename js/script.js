const tools = document.getElementById("tools");
let toolCount = 0;

fetch("./tools/tools.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((tool) => {
      if (tool.path.startsWith("absolutepath:")) {
        tools.innerHTML += `
        <div id="tool-${tool.name}" class="tool">
            <h2>${tool.name}</h2>
            <p>${tool.description}</p>
            <a href="${tool.path.replace("absolutepath:","")}">Open</a>
        </div>
    `;
      } else {
        tools.innerHTML += `
            <div id="tool-${tool.name}" class="tool">
                <h2>${tool.name}</h2>
                <p>${tool.description}</p>
                <a href="tools/${tool.path}">Open</a> <label class="versionLabel">v${tool.version}</label>
            </div>
        `;
      }
      toolCount++;
    });
    document.getElementById("toolCount").textContent = `[${toolCount}]`;
  });

function toggleSidebar(button) {
  if (document.getElementById("sidebar").style.display == "block") {
    button.textContent = ">>";
    document.getElementById("sidebar").style.display = "none";
  } else {
    document.getElementById("sidebar").style.display = "block";
    button.textContent = "<<";
  }
}

function filterTools() {
  const filter = document.getElementById("search").value.toLowerCase();
  const tools = document.getElementsByClassName("tool");
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    const toolName = tool.querySelector("h2").textContent.toLowerCase();
    if (toolName.includes(filter)) {
      tool.style.display = "block";
    } else {
      tool.style.display = "none";
    }
  }
}