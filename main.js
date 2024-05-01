// const row = document.getElementsByTagName("tr");
// const cells = document.querySelectorAll("td[contenteditable='true']") 
// console.log(cells);


// document.addEventListener("DOMContentLoaded", ()=>{
//     const editBtns = document.getElementById("editBtn");
//     const saveBtns = document.getElementById("saveBtn");


//     editBtns.forEach(function(button){
//         button.addEventListener("click", ()=>{
//             const row = document.getElementsByTagName("tr");
//             const cells = document.querySelectorAll("td[contenteditable='true']"); 
//             cells.forEach(function(cell){
//                 cell.setAttribute("contentEditable", "true");
//             })
//             button.style.display = "none";
//             saveBtns.style.display = "block";
//         })
//     });

//     saveBtns.forEach((button)=>{
//         button.addEventListener("click", ()=>{
//             const row = document.getElementsByTagName("tr");
//             const cells = document.querySelectorAll("td[contenteditable='true']"); 
//             cells.forEach(function(cell){
//                 cell.setAttribute("contentEditable", "false");
//             })
//             button.style.display = "block";
//             saveBtns.style.display = "none";
//         })
//     })

// });


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
  
    // Check if there's any saved data in local storage and make the cells editable if needed
    const allCells = document.querySelectorAll('td[contenteditable="true"]');
    allCells.forEach(function(cell) {
      retrieveDataFromLocalStorage(cell);
    });
   
  });
