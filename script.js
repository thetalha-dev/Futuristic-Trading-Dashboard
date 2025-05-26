// Clock functionality
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  document.getElementById(
    "clock"
  ).textContent = `${formattedHours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();
// Start menu functionality
function toggleStartMenu() {
  const startMenu = document.getElementById("startMenu");
  startMenu.style.display =
    startMenu.style.display === "block" ? "none" : "block";
}
// Close start menu when clicking outside
document.addEventListener("click", function (event) {
  const startMenu = document.getElementById("startMenu");
  const startButton = document.getElementById("startButton");

  if (!startMenu.contains(event.target) && event.target !== startButton) {
    startMenu.style.display = "none";
  }
});
// Window management
function openWindow(windowId) {
  document.getElementById(windowId + "Window").classList.add("active");
  document.getElementById("startMenu").style.display = "none";
}
function closeWindow(windowId) {
  document.getElementById(windowId).classList.remove("active");
}
// Make windows draggable
const windows = document.querySelectorAll(".window");
windows.forEach((window) => {
  const header = window.querySelector(".window-header");
  let isDragging = false;
  let offsetX, offsetY;
  header.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - window.getBoundingClientRect().left;
    offsetY = e.clientY - window.getBoundingClientRect().top;

    // Bring to front
    windows.forEach((w) => (w.style.zIndex = 10));
    window.style.zIndex = 100;
  });
  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    window.style.left = x + "px";
    window.style.top = y + "px";
  });
  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
});
// Open File Explorer by default
openWindow("explorer");

// Follow Me Guys😀 TK: @talha_coder_5577 IG: talhaaa.khann
