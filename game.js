let gameRunning = false;
let pageState = 0; // 0 Login, 1 Signup
let player = null;
let playerData = null;

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
      <p id='form-status'></p>
      <input id='username' type="text" placeholder="Username">
      <input id='password' type="password" placeholder="Password">
      <button id='state-switcher'>Signup instead</button>
      <button id='submit'>Submit</button>
    </div>
  </div>
  `
  );

  document.getElementById("state-switcher").addEventListener("click", () => togglePageState());

  document.getElementById("submit").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username == "" || password == "") {
      document.getElementById("form-status").style.color = "red";
      document.getElementById("form-status").innerText = "You can't submit empty values";
      return;
    }
    if (pageState) {
      if (localStorage.getItem(username)) {
        document.getElementById("form-status").style.color = "red";
        document.getElementById("form-status").innerText = "Username already exists";
      } else {
        localStorage.setItem(username, JSON.stringify({ password: password, score: 0 }));
        togglePageState();
        document.getElementById("form-status").style.color = "green";
        document.getElementById("form-status").innerText = "Account created, please login";
      }
    } else {
      playerData = JSON.parse(localStorage.getItem(username));
      if (playerData.password == password) {
        player = username;
        document.getElementById("score").innerText = `Score: ${playerData.score}`;
        document.getElementById("page-container").remove();
        document.body.style.visibility = "visible";
      } else {
        document.getElementById("form-status").style.color = "red";
        document.getElementById("form-status").innerText = "Username or password is incorrect";
      }
    }
  });

  const game = document.getElementById("game");
  const boundaries = game.getElementsByClassName("boundary");
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  const status = document.getElementById("status");
  status.insertAdjacentHTML("afterend", `<h2 id="score">Score: 0</h2>`);
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
    playerData.score += 5;
    localStorage.setItem(player, JSON.stringify(playerData));
    status.innerHTML = "You win";
    score.innerHTML = `Score: ${playerData.score}`;
  };

  const gameOver = () => {
    gameRunning = false;
    for (boundary of boundaries) {
      boundary.classList.add("youlose");
    }
    playerData.score = Math.max(0, playerData.score - 10);
    localStorage.setItem(player, JSON.stringify(playerData));
    status.innerHTML = "You lose";
    score.innerHTML = `Score: ${playerData.score}`;
  };

  start.addEventListener("mouseenter", () => startGame());

  start.addEventListener("mousedown", () => {
    playerData.score = 0;
    localStorage.setItem(player, JSON.stringify(playerData));
    score.innerHTML = `Score: ${playerData.score}`;
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

  const togglePageState = () => {
    resetInputs();
    document.getElementById("form-status").innerText = null;
    if (pageState) {
      pageState = 0;
      document.getElementById("form-container").getElementsByTagName("h1")[0].innerText = "Login";
      document.getElementById("state-switcher").innerText = "Signup instead";
    } else {
      pageState = 1;
      document.getElementById("form-container").getElementsByTagName("h1")[0].innerText = "Signup";
      document.getElementById("state-switcher").innerText = "Login instead";
    }
  };
};

const resetInputs = () => {
  const inputs = document.getElementById("form-container").getElementsByTagName("input");
  for (input of inputs) {
    input.value = null;
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

.form-container p + input{
  margin-bottom: 5px;
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

.form-container p{
  width: auto;
  margin: 7px 0 13px;
}

.form-container h1{
  margin-bottom: 0;
}

`;
