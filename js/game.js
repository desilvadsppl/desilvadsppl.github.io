const symbols = ["amante", "icon1", "icon2", "icon3"];
let reels = ["", "", ""];

// 🎯 Easy win ratio control
const WIN_RATE = 0.2;

const spinBtn = document.getElementById("spinBtn");
const message = document.getElementById("message");
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

spinBtn.addEventListener("click", spinReels);

function spinReels() {
    spinBtn.disabled = true;
    message.innerText = "";

    spinSound.play();

    let positions = [0, 0, 0]; // index in symbols array
    let intervals = [];

    // Start each reel spinning
    for (let i = 0; i < 3; i++) {
        intervals[i] = setInterval(() => {
            positions[i] = (positions[i] + 1) % symbols.length;
            document.getElementById(`reel${i + 1}`).src = `images/${symbols[positions[i]]}.png`;
        }, 100 + i * 50); // each reel a bit slower for realism
    }

    // Decide win or lose now (so we know the stop target)
    let isWin = Math.random() < WIN_RATE;
    let finalSymbols = [];

    if (isWin) {
        finalSymbols = ["amante", "amante", "amante"];
    } else {
        for (let i = 0; i < 3; i++) {
            finalSymbols[i] = symbols[Math.floor(Math.random() * symbols.length)];
        }
    }

    // Stop reels one by one with delay
    setTimeout(() => stopReel(0, finalSymbols[0]), 2000);
    setTimeout(() => stopReel(1, finalSymbols[1]), 3000);
    setTimeout(() => stopReel(2, finalSymbols[2], checkWin), 4000);

    function stopReel(reelIndex, symbol, callback) {
        clearInterval(intervals[reelIndex]);
        reels[reelIndex] = symbol;
        document.getElementById(`reel${reelIndex + 1}`).src = `images/${symbol}.png`;
        if (callback) callback();
    }
}

function checkWin() {
    if (reels.every(symbol => symbol === "amante")) {
        message.innerText = "🎉 WINNER! 🎉";
        winSound.play();
        flashWin();
    } else {
        message.innerText = "Try Again!";
    }
    spinBtn.disabled = false;
}

function flashWin() {
    // Add flash to reels (frame + bulbs)
    const reelsContainer = document.querySelector(".reels");
    if (reelsContainer) reelsContainer.classList.add("flash");

    // Add flash to individual reels (borders)
    document.querySelectorAll(".reel").forEach(reel => reel.classList.add("flash"));

    // Remove flash after 3 seconds
    setTimeout(() => {
        if (reelsContainer) reelsContainer.classList.remove("flash");
        document.querySelectorAll(".reel").forEach(reel => reel.classList.remove("flash"));
    }, 3000);
}

// Load saved count (local for this browser)
let playCount = parseInt(localStorage.getItem("playCount")) || 0;

// Function to update counter in the UI
function updatePlayCountDisplay() {
    document.getElementById("playCountDisplay").textContent = `Plays: ${playCount}`;
}

// Run once on page load
updatePlayCountDisplay();

// When spin button is clicked
document.getElementById("spinBtn").addEventListener("click", () => {
    playCount++;
    localStorage.setItem("playCount", playCount);
    updatePlayCountDisplay();
});
