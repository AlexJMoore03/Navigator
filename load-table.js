var gridWidth;
var gridHeight;

function loadTable() {
    let table = document.getElementById("mainTable");
    table.addEventListener("mousedown", function(event){ event.preventDefault() });
    table.innerHTML = "";
    gridWidth = document.getElementById("gridWidth").value;
    gridHeight = document.getElementById("gridHeight").value;

    table.style.width = 20 * gridWidth;
    table.style.height = 20 * gridHeight;
    for(var i = 0; i < gridHeight; i++)
    {
        table.innerHTML += "<tr id = \"row" + i + "\"></tr>"
        let tableRow = document.getElementById("row" + i);
        tableRow.addEventListener("mousedown", function(event){ event.preventDefault() }); //Prevents weird dragging while painting
        for(var j = 0; j < gridWidth; j++)
        {
            tableRow.innerHTML += "<td id=\"cell"+i+"_"+j+"\" row="+i+" column="+j+" paintColor=0 onMouseDown=\"paintCell(this, true)\" onMouseOver=\"paintCell(this, false)\" class=\"gridSquare\"></td>";
            let cell = document.getElementById("cell"+i+"_"+j);
            cell.addEventListener("mousedown", function(event){ event.preventDefault() }); //Prevents weird dragging while painting
        }
    }
}