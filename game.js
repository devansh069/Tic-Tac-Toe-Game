//get boxes and add event listner
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#restart-btn");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");

let turnO = true;
let count = 0;
const winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgcontainer.classList.add("hide");
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked  ");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const showWinner = (winner) => {
  msg.innerText = `winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};
const checkWinner = () => {
  for (let patterns of winpattern) {
    let pos1Val = boxes[patterns[0]].innerText;
    let pos2Val = boxes[patterns[1]].innerText;
    let pos3Val = boxes[patterns[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner is", pos1Val);
        showWinner(pos1Val);
        return true;
      }
    }
  }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
