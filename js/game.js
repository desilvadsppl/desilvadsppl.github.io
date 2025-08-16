const symbols = ["amante", "icon1", "icon2", "icon3"];
let reels = ["", "", ""];

// Win rate configuration
const WIN_RATE = 0.3;

const spinBtn = document.getElementById("spinBtn");
const message = document.getElementById("message");
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

spinBtn.addEventListener("click", spinReels);

function spinReels() {
    spinBtn.disabled = true;
    message.innerText = "";
    spinSound.play();

    // Determine win or lose
    const isWin = Math.random() < WIN_RATE;
    const finalSymbols = isWin
        ? ["amante", "amante", "amante"]
        : Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);

    // Start each reel spin
    for (let i = 0; i < 3; i++) {
        spinSingleReel(i, finalSymbols[i], 2000 + i * 1000); // delay each reel
    }
}

function spinSingleReel(index, finalSymbol, duration) {
    const reel = document.getElementById(`reel${index + 1}`);
    const strip = reel.querySelector(".reel-strip");

    if (!strip) {
        console.error(`.reel-strip not found in reel${index + 1}`);
        return;
    }

    // Reset strip before starting spin
    strip.style.transition = "none";
    strip.style.transform = "translateY(0)";
    strip.innerHTML = "";

    // Force reflow (important for restart)
    void strip.offsetWidth;

    // Build spin strip
    const spinCount = 20 + index * 5;
    for (let i = 0; i < spinCount; i++) {
        const img = document.createElement("img");
        const sym = symbols[Math.floor(Math.random() * symbols.length)];
        img.src = `images/${sym}.png`;
        strip.appendChild(img);
    }

    // Add final symbol at end
    const finalImg = document.createElement("img");
    finalImg.src = `images/${finalSymbol}.png`;
    strip.appendChild(finalImg);

    // Animate strip moving up
    const totalHeight = 220 * (spinCount + 1); // symbol height × total
    strip.style.transition = `transform ${duration}ms ease-out`;
    strip.style.transform = `translateY(-${totalHeight}px)`;

    // After animation ends
    setTimeout(() => {
        // Reset position and show only final image
        strip.style.transition = "none";
        strip.style.transform = "translateY(0)";
        strip.innerHTML = "";

        const img = document.createElement("img");
        img.src = `images/${finalSymbol}.png`;
        strip.appendChild(img);

        reels[index] = finalSymbol;

        // Check win on last reel
        if (index === 2) checkWin();
    }, duration + 100);
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
    const reelsContainer = document.querySelector(".reels");
    if (reelsContainer) reelsContainer.classList.add("flash");

    document.querySelectorAll(".reel").forEach(reel => reel.classList.add("flash"));

    setTimeout(() => {
        if (reelsContainer) reelsContainer.classList.remove("flash");
        document.querySelectorAll(".reel").forEach(reel => reel.classList.remove("flash"));
    }, 3000);
}

// Play counter using localStorage
let playCount = parseInt(localStorage.getItem("playCount")) || 0;

function updatePlayCountDisplay() {
    document.getElementById("playCountDisplay").textContent = `Plays: ${playCount}`;
}

updatePlayCountDisplay();

spinBtn.addEventListener("click", () => {
    playCount++;
    localStorage.setItem("playCount", playCount);
    updatePlayCountDisplay();
});
