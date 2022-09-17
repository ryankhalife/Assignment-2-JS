let gameRunning = false;
let scoreInt = 0;

window.onload = () => {
  document.body.style.visibility = "hidden";

  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML(
    "afterbegin",
    `
  <div id='page-container' class="page-container" style="visibility: visible !important">
    <div id="form-container" class="form-container">
      <h1>Login</h1>
      <input type="text" placeholder="Username">
      <input type="password" placeholder="Password">
      <button>Signup instead</button>
      <button>Submit</button>
    </div>
  </div>
  `
  );

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

const css = `
.page-container{
  display:flex;
  justify-content: center;
}
.form-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.form-container input{
  width: 250px;
  height: 25px;
}

.form-container h1 + input{
  margin-bottom: 10px;
}

.form-container input + input{
  margin-bottom: 5px;
}

.form-container input + button{
  margin-bottom: 20px;
  background: none;
  border: none;
}

.form-container input + button:hover{
  cursor: pointer;
}

.form-container button + button{
  border: none;
  background-color: rgba(128,128,128,0.2);
  height: 30px;
  width: 250px;
  border-radius: 20px;
}

.form-container button + button:hover{
  background-color: rgba(128,128,128,0.4);
  cursor: pointer;
}

`;
