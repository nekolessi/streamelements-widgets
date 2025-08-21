const container = document.getElementById("chat-container");

function addMessage(user, text) {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = user + ": " + text;
  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), 6000);
}

window.addEventListener("message", (event) => {
  if (event.data.listener === "message") {
    const { displayName, text } = event.data.event.data;
    addMessage(displayName, text);
  }
});

// For local demo
if (window.SE_SETTINGS) {
  setInterval(() => addMessage("Viewer" + Math.floor(Math.random()*99), "nya~!"), 3000);
}