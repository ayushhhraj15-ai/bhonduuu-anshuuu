function showGame(gameId) {
  document.querySelectorAll('.game-section').forEach(div => div.classList.add('hidden'));
  document.getElementById(gameId).classList.remove('hidden');

  if (gameId === "catch") startCatchGame();
  if (gameId === "bubble") startBubbleGame();
  if (gameId === "memory") startMemoryGame();
}

/* ---------------- HEART CATCH ---------------- */
function startCatchGame() {
  const container = document.getElementById("catch");
  container.innerHTML = '<div id="catchGame"><div id="paddle"></div><div id="score">Score: 0</div></div>';

  let paddle = document.createElement("div");
  paddle.id = "paddle";
  container.querySelector("#catchGame").appendChild(paddle);

  let score = 0;
  let scoreDisplay = container.querySelector("#score");

  document.addEventListener("mousemove", e => {
    paddle.style.left = e.clientX - 50 + "px";
  });

  function dropHeart() {
    let heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.className = "falling-heart";
    heart.style.left = Math.random() * 300 + "px";
    container.querySelector("#catchGame").appendChild(heart);

    let fall = setInterval(() => {
      let top = parseInt(heart.style.top || 0);
      heart.style.top = top + 2 + "px"; // slow speed

      let heartRect = heart.getBoundingClientRect();
      let paddleRect = paddle.getBoundingClientRect();

      if (heartRect.bottom >= paddleRect.top &&
          heartRect.left >= paddleRect.left &&
          heartRect.right <= paddleRect.right) {
        score++;
        scoreDisplay.innerText = "Score: " + score;
        heart.remove();
        clearInterval(fall);
      }
      if (top > 350) {
        heart.remove();
        clearInterval(fall);
      }
    }, 20);
  }
  setInterval(dropHeart, 2000);
}

/* ---------------- BUBBLE POP ---------------- */
function startBubbleGame() {
  const container = document.getElementById("bubble");
  container.innerHTML = '<div id="bubbleGame"></div>';
  const compliments = ["Cutest 🎀", "Favvv 💕", "My Star 🌸", "Special 😌", "Adorable 🤭"];
  let game = container.querySelector("#bubbleGame");

  setInterval(() => {
    let bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerText = "🎀";
    bubble.style.left = Math.random() * 300 + "px";
    game.appendChild(bubble);

    bubble.addEventListener("click", () => {
      alert(compliments[Math.floor(Math.random() * compliments.length)]);
      bubble.remove();
    });

    let rise = setInterval(() => {
      let top = parseInt(bubble.style.top || 350);
      bubble.style.top = top - 2 + "px";
      if (top < 0) { bubble.remove(); clearInterval(rise); }
    }, 20);
  }, 2000);
}

/* ---------------- MEMORY FLIP ---------------- */
function startMemoryGame() {
  const container = document.getElementById("memory");
  container.innerHTML = '<div id="memoryGame"></div>';
  let game = container.querySelector("#memoryGame");

  const cards = ["💖","🎀","🌸","💖","🎀","🌸"];
  cards.sort(() => 0.5 - Math.random());

  cards.forEach(icon => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerText = "?";
    card.dataset.icon = icon;
    game.appendChild(card);
  });

  let flipped = [];
  game.addEventListener("click", e => {
    let card = e.target;
    if (card.className !== "card" || flipped.length === 2 || card.innerText !== "?") return;

    card.innerText = card.dataset.icon;
    flipped.push(card);

    if (flipped.length === 2) {
      setTimeout(() => {
        if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
          flipped[0].style.visibility = "hidden";
          flipped[1].style.visibility = "hidden";
        } else {
          flipped[0].innerText = "?";
          flipped[1].innerText = "?";
        }
        flipped = [];
      }, 800);
    }
  });
}
