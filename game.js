let gameRunning = false;

window.onload = () => {
  const game = document.getElementById("game");
  const boundaries = game.getElementsByClassName("boundary");
  const start = document.getElementById("start");
  const end = document.getElementById("end");

  const gameOver = () => {
    gameRunning = false;
    for (boundary of boundaries) {
      boundary.classList.add("youlose");
    }
    console.log("You lose");
  };

  const startGame = () => {
    gameRunning = true;
    for (boundary of boundaries) {
      boundary.classList.remove("youlose");
    }
  };

  start.addEventListener("mouseenter", () => startGame());

  end.addEventListener("mouseenter", () => {
    if (gameRunning) {
      gameRunning = false;
      console.log("You won");
    }
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
