let gameRunning = false;

window.onload = () => {
  const game = document.getElementById("game");
  const boundaries = game.getElementsByClassName("boundary");
  const start = document.getElementById("start");
  const end = document.getElementById("end");

  start.addEventListener("mouseenter", () => {
    gameRunning = true;
  });

  end.addEventListener("mouseenter", () => {
    if (gameRunning) {
      gameRunning = false;
      console.log("You won");
    }
  });

  for (boundary of boundaries) {
    boundary.addEventListener("mouseenter", () => {
      if (gameRunning) {
        gameRunning = false;
        console.log("You lost");
      }
    });

    game.addEventListener("mouseleave", () => {
      if (gameRunning) {
        gameRunning = false;
        console.log("You lost");
      }
    });
  }
};
