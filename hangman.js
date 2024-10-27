const HintBox = document.getElementById("hint-container");
const AnswerStack = document.getElementById("answer-section");
const hangmanImage = document.querySelector("#hang img");
const letters = document.querySelectorAll(".letter");

const hangmanImages = [
  "./assets/body.svg",
  "./assets/head.svg",
  "./assets/left-hand.svg",
  "./assets/right-hand.svg",
  "./assets/right-leg.svg",
  "./assets/left-leg.svg",
];

let incorrectGuesses = 0;
const maxIncorrectGuesses = hangmanImages.length;

const chosenObjectWord = wordList[Math.floor(Math.random() * wordList.length)];
const selectedWord = chosenObjectWord.word;
const hint = chosenObjectWord.hint;

HintBox.textContent = `Hint: ${hint}`;

let ShownAnswer = Array(selectedWord.length).fill("_");
AnswerStack.textContent = ShownAnswer.join(" ");

letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    const clickedLetter = letter.textContent;
    let isLetterCorrect = false;

    selectedWord.split("").forEach((character, index) => {
      if (character === clickedLetter) {
        ShownAnswer[index] = clickedLetter;
        isLetterCorrect = true;
      }
    });

    AnswerStack.textContent = ShownAnswer.join(" ");

    if (isLetterCorrect) {
      console.log("Correct!");
    } else {
      console.log("Incorrect.");
      incorrectGuesses++;

      if (incorrectGuesses <= maxIncorrectGuesses) {
        hangmanImage.src = hangmanImages[incorrectGuesses - 1];
      }

      if (incorrectGuesses === maxIncorrectGuesses) {
        console.log(
          "Game Over! You've reached the maximum number of incorrect guesses."
        );
        alert(
          "Game Over! You've reached the maximum number of incorrect guesses."
        );

        letters.forEach((letter) =>
          letter.removeEventListener("click", arguments.calls)
        );
      }
    }

    if (!ShownAnswer.includes("_")) {
      console.log("Congratulations! You've guessed the word!");
      alert("Congratulations! You've guessed the word!");
    }
  });
});
