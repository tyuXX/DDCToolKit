const tools = document.getElementById("tools");
let toolCount = 0;

fetch("./tools/tools.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((tool) => {
      if (tool.path.startsWith("absolutepath:")) {
        tools.innerHTML += `
        <div class="tool">
            <h2>${tool.name}</h2>
            <p>${tool.description}</p>
            <a href="${tool.path.replace("absolutepath:","")}">Open</a>
        </div>
    `;
      } else {
        tools.innerHTML += `
            <div class="tool">
                <h2>${tool.name}</h2>
                <p>${tool.description}</p>
                <a href="tools/${tool.path}">Open</a> <label class="versionLabel">v${tool.version}</label>
            </div>
        `;
      }
      toolCount++;
    });
    document.getElementById("toolCount").textContent = toolCount;
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
