// These are the emojis that can appear in the machine
const symbols = ["🍒", "🍋", "🍇", "💎", "⭐", "🔔"];
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];
const scoreText = document.getElementById("score");
const resultText = document.getElementById("result");
const message = document.getElementById("message");
const spinButton = document.getElementById("spinButton");

let score = 100;
let spinning = false;
let spinTimer = null;

// Pick one random emoji from the symbols array
function randomEmoji() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}

// Start a spin and animate the three reels
function spin() {
  if (spinning || score < 10) return;

  spinning = true;
  score = score - 10; // Every spin costs 10 points
  updateScore();
  spinButton.disabled = true;
  message.textContent = "The reels are spinning...";

  reels.forEach(function (reel) {
    reel.classList.add("spinning");
  });

  let changes = 0;
  spinTimer = setInterval(function () {
    reels.forEach(function (reel) {
      reel.textContent = randomEmoji();
    });
    changes++;

    // Stop the animation after a short time
    if (changes >= 15) {
      clearInterval(spinTimer);
      finishSpin();
    }
  }, 100);
}

// Check if all three emojis match
function finishSpin() {
  reels.forEach(function (reel) {
    reel.classList.remove("spinning");
  });

  const first = reels[0].textContent;
  const second = reels[1].textContent;
  const third = reels[2].textContent;

  if (first === second && second === third) {
    score = score + 100;
    resultText.textContent = "WIN!";
    message.textContent = "Amazing! All three emojis matched. +100 points!";
  } else {
    resultText.textContent = "No match";
    message.textContent = "Not a match this time. Try again!";
  }

  spinning = false;
  updateScore();
  spinButton.disabled = score < 10;

  if (score < 10) {
    message.textContent += " You need at least 10 points to spin again.";
  }
}

// Keep the score display and button in the correct state
function updateScore() {
  scoreText.textContent = score;
  if (!spinning) spinButton.disabled = score < 10;
}

spinButton.addEventListener("click", spin);
updateScore();
