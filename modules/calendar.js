//Module for rendering the main page calendar
let today = new Date();
let thisMonth = today.getMonth();
let thisYear = today.getFullYear();
let monthAndYear = document.getElementById("calendar-month");
loadCalendar(thisMonth, thisYear);

function loadCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let tbl = document.getElementById("calendar-date");

    // clearing all previous cells
    tbl.innerHTML = "";
    monthAndYear.innerHTML = "";
    
    var left_arrow = new Image(20, 20);
    left_arrow.src = '/images/arrow-left-circle.svg';
    var right_arrow = new Image(20, 20);
    right_arrow.src = '/images/arrow-right-circle.svg';
    left_arrow.addEventListener('click', function() {
        if (month != 0) {
            loadCalendar(month-1, year);
        } else {
            loadCalendar(11, year-1);
        }
    });
    right_arrow.addEventListener('click', function() {
        if (month != 11) {
            loadCalendar(month+1, year);
        } else {
            loadCalendar(0, year+1);
        }
    });
    var textnode = document.createTextNode("    " + months[month] + " " + year + "    "); 

    // filing data about month and in the page via DOM.
    monthAndYear.appendChild(left_arrow);
    monthAndYear.appendChild(textnode);
    monthAndYear.appendChild(right_arrow);

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            cell.id = date;
            if (i === 0 && j < firstDay) {
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-success");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
                cell.addEventListener('click', function() {
                    location.href = "appointments?date=" + year + "-" + (month+1) + "-" + cell.id;
                });
            }
            cell.classList.add("pt-2")
            cell.classList.add("pb-2")
            
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
}