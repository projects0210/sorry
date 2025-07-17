const intro = document.getElementById("intro-screen"),
  game = document.getElementById("game-screen");
const yesBtn = document.getElementById("yes-btn"),
  noBtn = document.getElementById("no-btn");
const downloadExit = document.getElementById("download-exit");
const hateBtn = document.getElementById("hate-btn"),
  meterBar = document.querySelector(".meter-bar");
const meterCount = document.getElementById("meter-count"),
  reactionText = document.getElementById("reaction-text");
const gauge = document.getElementById("hate-gauge"),
  ctx = gauge.getContext("2d");
const genBtn = document.getElementById("gen-sorry-btn"),
  sorryCount = document.getElementById("sorry-count");
const sorryMsg = document.getElementById("sorry-msg"),
  hiddenLetter = document.getElementById("hidden-letter");
const forgiveBtn = document.getElementById("forgive-btn"),
  downloadLink = document.querySelector(".download-letter a");
const clickSfx = new Audio("click.mp3"),
  typeSfx = new Audio("type.mp3");
let hateCount = 0,
  TH = 30;

function drawGauge(n) {
  let r = Math.min(n / TH, 1),
    ang = r * Math.PI;
  ctx.clearRect(0, 0, 300, 300);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(150, 150, 120, Math.PI, 2 * Math.PI);
  ctx.lineWidth = 20;
  ctx.strokeStyle = "#222";
  ctx.stroke();
  const hue = 120 - r * 120;
  ctx.beginPath();
  ctx.arc(150, 150, 120, Math.PI, Math.PI + ang);
  ctx.lineWidth = 20;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.stroke();
  ctx.font = "20px Poppins";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(n, 150, 140);
}
drawGauge(0);

yesBtn.onclick = () => {
  clickSfx.play();
  intro.style.display = "none";
  game.style.display = "block";
};
noBtn.onclick = () => {
  clickSfx.play();
  downloadExit.style.display = "block";
  noBtn.disabled = true;
  yesBtn.style.display = "none";
  const p = document.createElement("p");
  p.textContent = "Okay 😭... but take this anyway. I tried!";
  downloadExit.appendChild(p);
};

hateBtn.onclick = () => {
  clickSfx.play();
  hateCount++;
  meterCount.textContent = hateCount;
  meterBar.style.width = `${Math.min((hateCount / TH) * 100, 100)}%`;
  drawGauge(hateCount);
  const r = Math.min(hateCount / TH, 1);
  const lightness = 90 - r * 50; // 90% → 40%

  hateBtn.style.background = `hsl(0, 0%, ${lightness}%)`;
  hateBtn.style.color =
    lightness < 60
      ? "hsl(0, 0%, 95%)" // bright text on dark bg
      : "hsl(240, 60%, 10%)"; // dark text on light bg

  //   const r = Math.min(hateCount / TH, 1);
  //   const lightness = 90 - r * 50;

  //   hateBtn.style.background = `hsl(0, 100%, ${lightness}%)`;

  //   // Dynamically switch button text color based on background brightness
  //   hateBtn.style.color = lightness < 50 ? "#ffffff" : "#330000";

  //   const r=Math.min(hateCount/TH,1);
  //   hateBtn.style.background=`hsl(0,100%,${100-r*50}%)`;
  //   hateBtn.style.color=r>0.5?'#fff':'#f3f7f5ff';

  reactionText.textContent =
    hateCount >= TH
      ? "Letter unlocked! Click 'Forgive Me' below 👀"
      : `Clicked ${hateCount} time${
          hateCount > 1 ? "s" : ""
        }? Color’s heating up ⚡🥶`;

  if (hateCount >= TH) {
    hiddenLetter.style.display = "block";
    forgiveBtn.style.display = "block";
    downloadLink.style.display = "none";
  }
};

genBtn.onclick = () => {
  clickSfx.play();
  let n = parseInt(sorryCount.value);
  if (isNaN(n) || n < 5) n = 5;
  if (n > 500) n = 500;
  const text = generateApology(n);
  sorryMsg.textContent = "";
  let i = 0;
  (function type() {
    if (i < text.length) {
      sorryMsg.textContent += text.charAt(i++);
      typeSfx.currentTime = 0;
      typeSfx.play();
      setTimeout(type, 30);
    }
  })();
};

forgiveBtn.onclick = () => {
  clickSfx.play();
  reactionText.textContent = "🤷🏻‍♂️ You forgave me!!✨";
  forgiveBtn.disabled = true;
  downloadLink.click();
};

function generateApology(words) {
  const v = [
    "SORRYYY ceo garu 💼,",
    "SORRYYY chintu from the bottom 🌝,",
    "SORRYYY for ghosting like Casper 👻,",
    "SORRYYY for ignoring you ,",
    "SORRYYY for being busy ,",
    "SORRYYY for thinking you don't matter. You do!",
    "SORRYYY for not saying sorry earlier 🤐",
    "SORRYYY  I’m sorry for not replying instantly. ",
  ];
  const base = "I’m truly sorry if I upset you.",
    trail = " 🤐 ";
  let out = "";
  while (out.split(" ").length < words)
    out += v[Math.floor(Math.random() * v.length)] + " " + base + trail;
  return out.trim().split(" ").slice(0, words).join(" ") + ".";
}
