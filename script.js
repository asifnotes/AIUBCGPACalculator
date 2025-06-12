
(() => {
  'use strict';

  const subjectsContainer = document.getElementById('subjects-container');
  const addSubjectBtn   = document.getElementById('add-subject-btn');
  const calculateBtn    = document.getElementById('calculate-btn');
  const downloadBtn     = document.getElementById('download-btn');
  const resultDiv       = document.getElementById('result');
  let subjectCount      = 0;

  document.addEventListener('DOMContentLoaded', () => {
    addSubject(); // initialize first row
    addSubjectBtn.addEventListener('click', addSubject);
    calculateBtn.addEventListener('click', calculateCGPA);
    downloadBtn.addEventListener('click', downloadPDF);
    subjectsContainer.addEventListener('click', e => {
      if (e.target.classList.contains('remove-btn')) {
        removeSubject(e.target);
      }
    });
  });

  const addValidationListeners = row => {
    const mid = row.querySelector('.midterm');
    const fin = row.querySelector('.final');
    mid.addEventListener('input', () => validateField(mid, row.querySelector('.midterm-error')));
    fin.addEventListener('input', () => validateField(fin, row.querySelector('.final-error')));
  };

  const validateField = (input, errorSpan) => {
    const val = parseFloat(input.value);
    errorSpan.textContent = (isNaN(val) || val < 0 || val > 100)
      ? 'Enter a valid score (0-100)' : '';
  };

  const addSubject = () => {
    subjectCount++;
    const row = document.createElement('div');
    row.className = 'subject-row';
    row.innerHTML = `
      <div class="subject-field">
        <label>Subject Name</label>
        <input type="text" class="subject-name" placeholder="Optional">
      </div>
      <div class="subject-field">
        <label>Midterm Score</label>
        <input type="number" class="midterm" min="0" max="100">
        <span class="error-message midterm-error"></span>
      </div>
      <div class="subject-field">
        <label>Final Score</label>
        <input type="number" class="final" min="0" max="100">
        <span class="error-message final-error"></span>
      </div>
      <div class="subject-field">
        <label>Weight Distribution</label>
        <select class="weight-select">
          <option value="40">40% Mid / 60% Final</option>
          <option value="50">50% Mid / 50% Final</option>
        </select>
      </div>
      <button type="button" class="remove-btn">Remove</button>
    `;
    subjectsContainer.appendChild(row);
    addValidationListeners(row);
  };

  const removeSubject = btn => {
    if (subjectsContainer.children.length > 1) {
      btn.closest('.subject-row').remove();
    } else {
      alert('At least one subject is required.');
    }
  };

  const getGradeDetails = score => {
    if (score >= 90) return { letter: 'A+', point: 4.00 };
    if (score >= 85) return { letter: 'A', point: 3.75 };
    if (score >= 80) return { letter: 'B+', point: 3.50 };
    if (score >= 75) return { letter: 'B', point: 3.25 };
    if (score >= 70) return { letter: 'C+', point: 3.00 };
    if (score >= 65) return { letter: 'C', point: 2.75 };
    if (score >= 60) return { letter: 'D+', point: 2.50 };
    if (score >= 50) return { letter: 'D', point: 2.25 };
    return { letter: 'F', point: 0.00 };
  };

  const validateRow = row => {
    let ok = true;
    ['midterm', 'final'].forEach(cls => {
      const inp = row.querySelector(`.${cls}`);
      const err = row.querySelector(`.${cls}-error`);
      if (inp.value === '' || isNaN(inp.value) || inp.value < 0 || inp.value > 100) {
        err.textContent = 'Enter a valid score (0-100)';
        ok = false;
      }
    });
    return ok;
  };

  const calculateCGPA = () => {
    const rows = document.querySelectorAll('.subject-row');
    let totalPoints = 0;
    let table = `<table><tr><th>Subject</th><th>Midterm</th><th>Final</th><th>Dist.</th><th>Score</th><th>Grade</th><th>Point</th></tr>`;
    rows.forEach((row, idx) => {
      if (!validateRow(row)) { alert('Please correct errors.'); return; }
      const name = row.querySelector('.subject-name').value || `Subject ${idx+1}`;
      const m = +row.querySelector('.midterm').value;
      const f = +row.querySelector('.final').value;
      const w = row.querySelector('.weight-select').value === '40' ? [0.4,0.6] : [0.5,0.5];
      const score = m*w[0] + f*w[1];
      const g = getGradeDetails(score);
      totalPoints += g.point;
      table += `<tr><td>${name}</td><td>${m}</td><td>${f}</td><td>${w[0]*100}%/${w[1]*100}%</td><td>${score.toFixed(2)}</td><td>${g.letter}</td><td>${g.point.toFixed(2)}</td></tr>`;
    });
    table += `</table><p><strong>Overall CGPA: ${(totalPoints/rows.length).toFixed(2)}</strong></p>`;
    resultDiv.innerHTML = table;
  };

  const downloadPDF = () => {
    if (!resultDiv.innerHTML.trim()) calculateCGPA();
    setTimeout(() => html2pdf().set({ margin:0.5, filename:'CGPA_Details.pdf', html2canvas:{scale:2}, jsPDF:{unit:'in',format:'letter'} }).from(resultDiv).save(), 300);
  };
})();
