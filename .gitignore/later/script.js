let noteList = document.querySelector(".note-list");
let textBoxes = document.querySelector(".text-boxes");
let emptyMessage = document.querySelector(".empty-message");

let noteCount = 0;

function addNote() {
  noteCount = noteCount + 1;

  let noteRow = document.createElement("div");
  noteRow.className = "note-row";

  let note = document.createElement("button");
  note.className = "note-button";
  note.textContent = "Note " + noteCount;

  let xButton = document.createElement("button");
  xButton.className = "x-button";
  xButton.textContent = "×";

  let textBox = document.createElement("textarea");
  textBox.className = "text-box";
  textBox.placeholder = "Start typing...";
  textBox.hidden = true;

  note.addEventListener("click", function () {
    hideAllTextBoxes();
    textBox.hidden = false;
    noteRow.classList.add("active");
    emptyMessage.hidden = true;
    textBox.focus();
  });

  xButton.addEventListener("click", function () {
    if (!textBox.hidden) {
      emptyMessage.hidden = false;
    }
    noteList.removeChild(noteRow);
    textBoxes.removeChild(textBox);
  });

  noteRow.appendChild(note);
  noteRow.appendChild(xButton);
  noteList.appendChild(noteRow);
  textBoxes.appendChild(textBox);

  note.click();
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
}

function clearAllNotes() {
  let allTextBoxes = document.querySelectorAll(".text-box");

  noteList.innerHTML = "";

  for (let i = 0; i < allTextBoxes.length; i++) {
    textBoxes.removeChild(allTextBoxes[i]);
  }

  emptyMessage.hidden = false;
  noteCount = 0;
}

document.querySelector(".add-note").addEventListener("click", addNote);
document.querySelector(".plus-button").addEventListener("click", addNote);
document.querySelector(".clear-all-notes").addEventListener("click", clearAllNotes);
