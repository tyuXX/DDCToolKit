function encode() {
    const input = document.getElementById("inputText").value;
    try {
        const encoded = btoa(input);
        document.getElementById("outputText").value = encoded;
    } catch (e) {
        document.getElementById("outputText").value = "Error: " + e.message;
    }
}

function decode() {
    const input = document.getElementById("inputText").value;
    try {
        const decoded = atob(input);
        document.getElementById("outputText").value = decoded;
    } catch (e) {
        document.getElementById("outputText").value = "Error: " + e.message;
    }
}
