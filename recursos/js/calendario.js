// Función para crear el calendario
function createCalendar(year, month) {
  let date = new Date(year, month - 1, 1);
  let today = new Date();
  let calendarHeader = document.getElementById("calendar-header");
  let calendarBody = document.getElementById("calendar-body");
  calendarHeader.textContent = year;

  // Llenar los días previos si no comienza en domingo
  for (let i = 0; i < (date.getDay() === 0 ? 6 : date.getDay() - 1); i++) {
    let emptyCell = document.createElement("td");
    calendarBody.appendChild(emptyCell);
  }

  // Llenar los días del mes
  while (date.getMonth() === month - 1) {
    let cell = document.createElement("td");
    cell.classList.add("day");
    cell.textContent = date.getDate();
    if (date.toDateString() === today.toDateString()) {
      cell.classList.add("today");
    }
    calendarBody.appendChild(cell);

    if (date.getDay() === 6) {
      calendarBody.appendChild(document.createElement("tr"));
    }
    date.setDate(date.getDate() + 1);
  }

  // Llenar los días restantes
  if (date.getDay() !== 0) {
    for (let i = date.getDay(); i < 7; i++) {
      let emptyCell = document.createElement("td");
      calendarBody.appendChild(emptyCell);
    }
  }
}

// Llamar a la función para crear el calendario del mes actual
createCalendar(new Date().getFullYear(), new Date().getMonth() + 1);