let addNoteButton = document.querySelector(".add-note");
let card = document.querySelector(".card");
let textBoxes = document.querySelector(".text-boxes");
let sectionsButton = document.querySelector(".sections-button");
let sectionsCard = document.querySelector(".sections-card");
let sectionOptions = document.querySelectorAll(".section-option");
let wordCount = document.querySelector(".word-count");


let noteCount = 0;
let currentSection = "Default";

function addNote() {
  noteCount = noteCount +1;

  let noteRow = document.createElement("div");
  noteRow.className = "note-row";
  noteRow.dataset.section = currentSection;

  let note = document.createElement("button");
  note.className = "note-button";
  note.textContent = "Note " + noteCount;

  let xButton = document.createElement("button");
  xButton.className = "x-button";
  xButton.textContent = "X";

  let textBox = document.createElement("textarea");
  textBox.className = "text-box";
  textBox.placeholder = "Start typing...";
  textBox.hidden = true;

  note.addEventListener("click", function () {
    hideAllTextBoxes();
    textBox.hidden = false;
    noteRow.classList.add("active");
    updateWordCount(textBox);
  });

  textBox.addEventListener("input", function () {
    updateWordCount(textBox);
  });

  note.addEventListener("dblclick", function () {
    let input = document.createElement("input");
    input.className = "rename-input";
    input.value = note.textContent;

    noteRow.replaceChild(input, note);
    input.focus();
    input.select();

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        input.blur();
      }

      if (event.key === "Escape") {
        input.value = note.textContent;
        input.blur();
      }

    });

    input.addEventListener("blur", function () {
      let newName = input.value.trim();

      if (newName !== "") {
        note.textContent = newName;
      }

      noteRow.replaceChild(note, input);
    });
  });

  xButton.addEventListener("click", function () {
    if (noteRow.classList.contains("active")) {
      wordCount.textContent = "";
    }
    card.removeChild(noteRow);
    textBoxes.removeChild(textBox);
  });

  noteRow.appendChild(note);
  noteRow.appendChild(xButton);
  card.appendChild(noteRow);
  textBoxes.appendChild(textBox);
}

function hideAllTextBoxes() {
  let allTextBoxes = document.querySelectorAll(".text-box");
  let allNoteRows = document.querySelectorAll(".note-row");

  for (let i = 0; i < allTextBoxes.length; i++) {
    allTextBoxes[i].hidden = true;
  }

  for (let i = 0; i < allNoteRows.length; i++) {
    allNoteRows[i].classList.remove("active");
  }

  wordCount.textContent = "";
}

function updateWordCount(textBox) {
  let text = textBox.value.trim();
  let count = 0;

  if (text !== "") {
    count = text.split(/\s+/).length;
  }

  let letters = textBox.value.length;
  let wordText = count + " words";
  let letterText = letters + " characters";

  if (count === 1) {
    wordText = "1 word";
  }

  if (letters === 1) {
    letterText = "1 character";
  }

  wordCount.textContent = wordText + " · " + letterText;
}

addNoteButton.addEventListener("click", addNote);

let plusButton = document.querySelector(".plus-button");
plusButton.addEventListener("click", addNote);


function clearAllNotes() {
  let allNoteRows = document.querySelectorAll(".note-row");
  let allTextBoxes = document.querySelectorAll(".text-box");

  for (let i = 0; i < allNoteRows.length; i++) {
    card.removeChild(allNoteRows[i]);
  }

  for (let i = 0; i < allTextBoxes.length; i++) {
    textBoxes.removeChild(allTextBoxes[i]);
  }

  wordCount.textContent = "";
  noteCount = 0;
}

let clearAllNotesButton = document.querySelector(".clear-all-notes");
clearAllNotesButton.addEventListener("click", clearAllNotes);


function showSectionNotes() {
  let allNoteRows = document.querySelectorAll(".note-row");

  hideAllTextBoxes();

  for (let i = 0; i < allNoteRows.length; i++) {
    if (allNoteRows[i].dataset.section === currentSection) {
      allNoteRows[i].style.display = "";
    } else {
      allNoteRows[i].style.display = "none";
    }
  }
}

sectionsButton.addEventListener("click", function () {
  sectionsCard.classList.toggle("open");
});

function selectSection(option) {
  let allOptions = document.querySelectorAll(".section-option");

  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].classList.remove("selected");
  }
  option.classList.add("selected");
  currentSection = option.textContent;
  sectionsButton.textContent = "Section: " + currentSection;
  sectionsCard.classList.remove("open");
  showSectionNotes();
}

for (let i = 0; i < sectionOptions.length; i++) {
  sectionOptions[i].addEventListener("click", function () {
    selectSection(sectionOptions[i]);
  });
}

document.addEventListener("click", function (event) {
  if (!sectionsButton.contains(event.target) && !sectionsCard.contains(event.target)) {
    sectionsCard.classList.remove("open");
  }
});

let createSectionButton = document.querySelector(".create-section");
let overlay = document.querySelector(".overlay");
let sectionNameInput = document.querySelector(".section-name");
let cancelSectionButton = document.querySelector(".cancel-section");
let saveSectionButton = document.querySelector(".save-section");

function closeOverlay() {
  overlay.classList.remove("open");
  sectionNameInput.value = "";
}

createSectionButton.addEventListener("click", function () {
  sectionsCard.classList.remove("open");
  overlay.classList.add("open");
  sectionNameInput.focus();
});

cancelSectionButton.addEventListener("click", closeOverlay);

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    closeOverlay();
  }
});

saveSectionButton.addEventListener("click", function () {
  let name = sectionNameInput.value.trim();

  if (name === "") {
    return;
  }

  let newOption = document.createElement("button");
  newOption.className = "section-option";
  newOption.textContent = name;

  newOption.addEventListener("click", function () {
    selectSection(newOption);
  });

  sectionsCard.insertBefore(newOption, createSectionButton);
  selectSection(newOption);
  closeOverlay();
});


