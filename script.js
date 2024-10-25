const horizontalClues = [
    { clue: "Buku yang berisi peta bumi", answer: "atlas", row: 1, col: 3 },
    { clue: "Tempat pulang", answer: "rumah", row: 8, col: 1 },
    { clue: "Cocolan pedas", answer: "sambal", row: 3, col: 2 },
    { clue: "Cape / letih", answer: "lelah", row: 6, col: 0 },
    { clue: "Mata uang Jepang", answer: "yen", row: 10, col: 3 }
  ];
  
  const verticalClues = [
    { clue: "Ibukota Indonesia", answer: "jakarta", row: 0, col: 3 },
    { clue: "Tanggal merah", answer: "Libur", row: 1, col: 5 },
    { clue: "Aksesori pakaian yang sering dipakai di bahu, biasanya terbuat dari kain", answer: "selendang", row: 1, col: 7 },
    { clue: "Bulan kedua", answer: "februari", row: 5, col: 1 },
    { clue: "Sosok seram", answer: "hantu", row: 8, col: 5 }
  ];
  
  let score = 0;
  
  function createGrid() {
    const grid = document.getElementById("tts");
    for (let i = 0; i < 13; i++) {
      let row = document.createElement("tr");
      for (let j = 0; j < 13; j++) {
        let cell = document.createElement("td");
        cell.classList.add("empty");
        row.appendChild(cell);
      }
      grid.appendChild(row);
    }
  }
  
  function populateClues() {
    const horizontalUl = document.getElementById("horizontal-clues");
    const verticalUl = document.getElementById("vertical-clues");
  
    horizontalClues.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = (index + 1) + ". " + item.clue;
      horizontalUl.appendChild(li);
    });
  
    verticalClues.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = (index + 1) + ". " + item.clue;
      verticalUl.appendChild(li);
    });
  }
  
  function placeAnswers() {
    const grid = document.getElementById("tts");

    // Place horizontal answers
    horizontalClues.forEach((item, idx) => {
        let { row, col, answer } = item;
        for (let i = 0; i < answer.length; i++) {
            let cell = grid.rows[row].cells[col + i];
            cell.classList.remove("empty");
            // Check if cell already has an input, add label for horizontal clues
            if (!cell.querySelector("input")) {
                cell.innerHTML = `<label>${idx + 1}</label><input maxlength="1" data-answer="${answer[i]}" />`;
            } else {
                // If input exists, just add the label to avoid overwriting input
                let label = cell.querySelector("label");
                if (label) {
                    label.innerHTML += `, ${idx + 1}`;  // Append the clue number if needed
                }
            }
        }
    });

    // Place vertical answers
    verticalClues.forEach((item, idx) => {
        let { row, col, answer } = item;
        for (let i = 0; i < answer.length; i++) {
            let cell = grid.rows[row + i].cells[col];
            cell.classList.remove("empty");
            // Check if cell already has an input, add label for vertical clues
            if (!cell.querySelector("input")) {
                cell.innerHTML = `<label>${idx + 1}</label><input maxlength="1" data-answer="${answer[i]}" />`;
            } else {
                // If input exists, just add the label to avoid overwriting input
                let label = cell.querySelector("label");
                if (label) {
                    label.innerHTML += `, ${idx + 1}`;  // Append the clue number if needed
                }
            }
        }
    });
}

  
  function checkAnswers() {
    let correct = 0;
    const inputs = document.querySelectorAll("input");
    
    inputs.forEach(input => {
      if (input.value.toLowerCase() === input.dataset.answer.toLowerCase()) {
        input.style.backgroundColor = "lightgreen";
        correct++;
      } else {
        input.style.backgroundColor = "lightcoral";
      }
    });
  
    score = (correct+3)*2;
    document.getElementById("score").innerText = "Skor: " + score;
  }
  
  window.onload = function() {
    createGrid();
    populateClues();
    placeAnswers();
  }
  