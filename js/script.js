const tools = document.getElementById("tools");
let toolDataGlobal = []; // new global cache

fetch("./tools/tools.json")
  .then((response) => response.json())
  .then((data) => {
    toolDataGlobal = data;
    document.getElementById(
      "toolCount"
    ).textContent = `[${toolDataGlobal.length}]`;
    renderToolCards(toolDataGlobal);
  });

function renderToolCards(data) {
  const pinned = JSON.parse(localStorage.getItem("pinnedTools") || "[]");
  // Sort: pinned tools first
  data.sort(
    (a, b) =>
      (pinned.includes(a.name) ? -1 : 1) - (pinned.includes(b.name) ? -1 : 1)
  );
  tools.innerHTML = ""; // clear existing tools
  data.forEach((tool) => {
    const isPinned = pinned.includes(tool.name);
    let pinIcon = `<span class="pinIcon" onclick="togglePin('${
      tool.name
    }', event)">${isPinned ? "📌" : "📍"}</span>`;
    if (tool.path.startsWith("absolutepath:")) {
      tools.innerHTML += `
        <div id="tool-${tool.id}" class="tool">
            <h2>${tool.name}</h2>
            <p>${tool.description}</p>
            <a href="${tool.path.replace(
              "absolutepath:",
              ""
            )}">Open</a>${pinIcon}
        </div>
      `;
    } else {
      tools.innerHTML += `
        <div id="tool-${tool.id}" class="tool">
            <h2>${tool.name}</h2>
            <p>${tool.description}</p>
            <a href="tools/${tool.path}">Open</a> <label class="versionLabel">v${tool.version}</label>${pinIcon}
        </div>
      `;
    }
  });
  filterTools(); // Apply filter after rendering
}

function togglePin(toolName, event) {
  event.stopPropagation();
  let pinned = JSON.parse(localStorage.getItem("pinnedTools") || "[]");
  if (pinned.includes(toolName)) {
    pinned = pinned.filter((name) => name !== toolName);
  } else {
    pinned.push(toolName);
  }
  localStorage.setItem("pinnedTools", JSON.stringify(pinned));
  renderToolCards(toolDataGlobal);
}

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
  for (let tool of tools) {
    switch (filter) {
      case ":pinned": {
        const pinned = JSON.parse(localStorage.getItem("pinnedTools") || "[]");
        if (pinned.includes(tool.querySelector("h2").textContent)) {
          tool.style.display = "block";
        } else {
          tool.style.display = "none";
        }
        break;
      }
      case ":unpinned": {
        const pinned = JSON.parse(localStorage.getItem("pinnedTools") || "[]");
        if (!pinned.includes(tool.querySelector("h2").textContent)) {
          tool.style.display = "block";
        } else {
          tool.style.display = "none";
        }
        break;
      }
      default: {
        if (filter.includes(":id")) {
          if (tool.id.includes(filter.replace(":id", ""))) {
            tool.style.display = "block";
          } else {
            tool.style.display = "none";
          }
          break;
        } else {
          const toolName = tool.querySelector("h2").textContent.toLowerCase();
          if (toolName.includes(filter)) {
            tool.style.display = "block";
          } else {
            tool.style.display = "none";
          }
        }
        break;
      }
    }
  }
}
