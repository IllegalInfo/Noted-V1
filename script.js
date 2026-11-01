let addNoteButton = document.querySelector(".add-note");
let card = document.querySelector(".card");
let textBoxes = document.querySelector(".text-boxes");


let noteCount = 0;

function addNote() {
  noteCount = noteCount +1;

  let noteRow = document.createElement("div");
  noteRow.className = "note-row";

  let note = document.createElement("button");
  note.className = "note-button";
  note.textContent = "Note " + noteCount;

  let xButton = document.createElement("button");
  xButton.className = "x-button";
  xButton.textContent = "X";

  let textBox = document.createElement("textarea");
  textBox.className = "text-box";
  textBox.hidden = true;

  note.addEventListener("click", function () {
    hideAllTextBoxes();
    textBox.hidden = false;
  });

  xButton.addEventListener("click", function () {
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

  for (let i = 0; i < allTextBoxes.length; i++) {
    allTextBoxes[i].hidden = true;
  }
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

  noteCount = 0;
}

let clearAllNotesButton = document.querySelector(".clear-all-notes");
clearAllNotesButton.addEventListener("click", clearAllNotes);

