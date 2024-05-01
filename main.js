
document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('#editBtn');
    const saveButtons = document.querySelectorAll('#saveBtn');
  
    // Save Data Local Storge
    function saveDataToLocalStorage(cell) {
      const rowIndex = cell.parentElement.rowIndex;
      const cellIndex = cell.cellIndex;
      const data = cell.innerText;
      localStorage.setItem(`cell_${rowIndex}_${cellIndex}`, data);
    }
  
    // retrieve edited cell data from local storage
    function retrieveDataFromLocalStorage(cell) {
      const rowIndex = cell.parentElement.rowIndex;
      const cellIndex = cell.cellIndex;
      const data = localStorage.getItem(`cell_${rowIndex}_${cellIndex}`);
      if (data !== null) {
        cell.innerText = data;
        cell.setAttribute('contenteditable', 'true'); // Make the cell editable
      }
    }
  
    editButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const cells = row.querySelectorAll('td[contenteditable="true"]');
        cells.forEach(function(cell) {
          cell.setAttribute('contenteditable', 'true');
        });
        button.style.display = 'none';
        row.querySelector('#saveBtn').style.display = 'inline-block';
      });
    });
  
    saveButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const cells = row.querySelectorAll('td[contenteditable="true"]');
        cells.forEach(function(cell) {
          cell.setAttribute('contenteditable', 'false');
          saveDataToLocalStorage(cell); // Save data to local storage
        });
        button.style.display = 'none';
        row.querySelector('#editBtn').style.display = 'inline-block';
      });
    });
  
    const allCells = document.querySelectorAll('td[contenteditable="true"]');
    allCells.forEach(function(cell) {
      retrieveDataFromLocalStorage(cell);
    });
   
  });
