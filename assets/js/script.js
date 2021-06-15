// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function() {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    })
  }
  document.getElementById("answer-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  })
  runGame("addition");
})
/**
 * The main game 'loop', called when the script is first
 * loaded and after the user's answer has been processed
 */
function runGame(gameType) {

  document.getElementById("answer-box").value = "";
  document.getElementById("answer-box").focus();
  //create two random numbers between 1 and 25 (inclusive)
  let num1 = Math.ceil(Math.random() * 25);
  let num2 = Math.ceil(Math.random() * 25);

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
  } else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "division") {
    displayDivideQuestion(num1, num2);
  }
}

/**
 * Check the answer against the first element in
 * the returned calculatedCorrectAnswer
 */
function checkAnswer() {
  console.log(document.getElementById("answer-box").value);
  if (document.getElementById("answer-box").value === "") {
    alert("Please input your answer.");
  } else {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    if (isCorrect) {
      alert("Hey! You got it right! :D");
      incrementScore();
    } else {
      alert(`Awww...you answered ${userAnswer}. the correct answer was ${calculatedAnswer[0]}!`);
      incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
  }
}

/**
 * Gets the operands and the operator directly from
 * the DOM and returns the correct answer.
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  if (operator === "+") {
    return [operand1 + operand2, "addition"];
  } else if (operator ==="-") {
    return [operand1 - operand2, "subtract"];
  } else if (operator ==="\u00d7") {
    return [operand1 * operand2, "multiply"];
  } else if (operator ==="\u00f7") {
    return [operand1 / operand2, "division"];
  }
}

/**
 * Gets the current score from the DOM and increments it by 1.
 */
function incrementScore() {
  let currentScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++currentScore;
}

/**
 * Gets the current incorrect answer tally from the DOM and increments it by 1.
 */
function incrementWrongAnswer() {
  let currentScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++currentScore;
}
function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}
function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 < operand2 ? operand1 : operand2;
    document.getElementById("operator").textContent = "-";
}
function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "\u00d7";  
}
function displayDivideQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1 * operand2;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "\u00f7";  
}