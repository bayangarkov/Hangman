"use strict";

const selectCategory = document.querySelector(".dropdown-toggle");
const btnNewGame = document.querySelector(".btn-new-game");
const mainSelection = document.querySelector(".select-category");
const insertWord = document.querySelector(".letters-insert");
const checkLetter = document.querySelector(".btn-primary");
const inputLetter = document.querySelector(".form-control");

// Creating all types of words by theme
const animals = ["cat", "dogs", "croc", "horse", "donkey"];
const cars = ["mercedes", "audi", "fiat", "vw"];
const cities = ["knezha", "sofia", "brenica", "bregare"];

// Creating the canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#eeeeee";

// Empty array for putting random word here later
const arr1 = [];

// Return ONE word
const getRandomWord = function (arr) {
  let randomWord = arr[Math.floor(Math.random() * arr.length)];
  return randomWord;
};

// For every letter in the word we insert html code with letter
// in order to use check the input later for the created word.
const createWordInHTML = function (word) {
  for (let i = 0; i < word.length; i++) {
    insertWord.insertAdjacentHTML(
      "beforeend",
      `<td class='text-white word value-${i}'>?</td>`
    );
  }
};

// In the empty array at the top, put new random word
// and delete the old word
const eraseWord = function (word) {
  arr1.pop();
  arr1.push(word);
};

let newGameEvent = 0;

btnNewGame.addEventListener("click", function (eventOne) {
  // This return the value for the selected selection
  // in order to use it for creating random word from array
  const selectedOption =
    mainSelection.options[mainSelection.selectedIndex].value;

  if (selectedOption === "Animals") {
    // Clear the inserted word first, because when user click New Game
    // it must created new word and delete the old one
    insertWord.innerHTML = "";
    let rndm = getRandomWord(animals);
    createWordInHTML(rndm);
    eraseWord(rndm);
    console.log(arr1);
  } else if (selectedOption === "Cars") {
    insertWord.innerHTML = "";
    let rndm = getRandomWord(cars);
    createWordInHTML(rndm);
    eraseWord(rndm);
    console.log(arr1);
  } else if (selectedOption === "Cities") {
    insertWord.innerHTML = "";
    let rndm = getRandomWord(cities);
    createWordInHTML(rndm);
    eraseWord(rndm);
    console.log(arr1);
  }

  let foundPos = 0;
  const checkInputLetter = function (arr, letter) {
    // For every found letter from input field, if it's found
    // from the random word it must be swapped with the letter
    // check if the letter is already there if it is don't increment it
    for (let i = 0; i < arr.length; i++) {
      if (
        letter === arr[i] &&
        document.querySelector(`.value-${i}`).textContent === "?"
      ) {
        // Replace the ? with the correct letter
        document.querySelector(`.value-${i}`).textContent = `${letter}`;

        foundPos += 1;
      }
    }
    console.log(`foundPost: ${foundPos}`);

    // Reload the page after all letters are found
    if (foundPos == arr1[0].length) {
      alert(`Yes you found it! The right word is: ${arr1[0].toUpperCase()}`);

      location.reload();
    }
  };

  let foundNeg = 0;
  const checkNegative = function (arr, letter) {
    if (arr.indexOf(letter) === -1) {
      foundNeg += 1;
    }
    console.log(`foundNeg: ${foundNeg}`);
  };

  if (eventOne.isTrusted) {
    newGameEvent += 1;
  }
  if (newGameEvent > 1) {
    location.reload();
  }
  // Check the input letter from input field
  checkLetter.addEventListener("click", function () {
    let letter = inputLetter.value.toLowerCase();
    let str = arr1[0];
    checkInputLetter(str, letter);
    checkNegative(str, letter);

    switch (foundNeg) {
      case 1:
        ctx.fillRect(70, 160, 160, 5);
        break;
      case 2:
        ctx.fillRect(70, 25, 5, 140);
        break;
      case 3:
        ctx.fillRect(70, 25, 120, 5);
        break;
      case 4:
        ctx.fillRect(190, 25, 5, 25);
        break;
      case 5:
        ctx.beginPath();
        ctx.arc(192, 60, 10, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 6:
        ctx.fillRect(191, 70, 2, 45);
        break;
      case 7:
        ctx.fillRect(167, 80, 25, 2);
        break;
      case 8:
        ctx.fillRect(193, 80, 25, 2);
        break;
      case 9:
        ctx.fillRect(167, 113, 25, 2);
        break;
      case 10:
        ctx.fillRect(193, 113, 25, 2);
        break;
    }

    if (foundNeg == 10) {
      alert(`You LOSE, the correct word is: ${arr1[0].toUpperCase()}`);
      location.reload();
    }

    inputLetter.value = ""; // clear the input field
  });

  //
});
