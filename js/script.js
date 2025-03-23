const tools = document.getElementById("tools");

fetch("../tools/tools.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((tool) => {
      tools.innerHTML += `
            <div class="tool">
                <h2>${tool.name}</h2>
                <p>${tool.description}</p>
                <a href="tools/${tool.path}">Open</a>
            </div>
        `;
    });
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
