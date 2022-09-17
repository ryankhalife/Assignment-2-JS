let gameRunning = false;
let scoreInt = 0;

window.onload = () => {
  const game = document.getElementById("game");
  const boundaries = game.getElementsByClassName("boundary");
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  const status = document.getElementById("status");
  status.insertAdjacentHTML("afterend", `<h2 id="score">Score: ${scoreInt}</h2>`);
  const score = document.getElementById("score");

  const startGame = () => {
    if (gameRunning) return;
    gameRunning = true;
    for (boundary of boundaries) {
      boundary.classList.remove("youlose");
    }
  };

  const victory = () => {
    gameRunning = false;
    scoreInt += 5;
    status.innerHTML = "You win";
    score.innerHTML = `Score: ${scoreInt}`;
  };

  const gameOver = () => {
    gameRunning = false;
    for (boundary of boundaries) {
      boundary.classList.add("youlose");
    }
    scoreInt = Math.max(0, scoreInt - 10);
    status.innerHTML = "You lose";
    score.innerHTML = `Score: ${scoreInt}`;
  };

  start.addEventListener("mouseenter", () => startGame());

  start.addEventListener("mousedown", () => {
    scoreInt = 0;
    score.innerHTML = `Score: ${scoreInt}`;
    status.innerHTML = 'Begin by moving your mouse over the "S".';
  });

  end.addEventListener("mouseenter", () => {
    if (gameRunning) victory();
  });

  for (boundary of boundaries) {
    boundary.addEventListener("mouseenter", () => {
      if (gameRunning) gameOver();
    });

    game.addEventListener("mouseleave", () => {
      if (gameRunning) gameOver();
    });
  }
};
