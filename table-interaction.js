let painting = false;
function paint() { painting = true; }
function unPaint() { painting = false; }
let mode = 1; // 0=erase 1=road 2=start 3=finish

function paintCell(cell, override) {
    if (painting || override) {
        cell.setAttribute("paintColor", mode);
        if (mode == 1) {
            cell.style.background = "yellow";
        }
        else {
            cell.style.background = "black";
        }
    }
    if (!painting && override) {
        if (mode == 2) {
            cell.style.background = "green";
            cell.setAttribute("paintColor", mode);
            removeOthers(cell, mode)
        }
        else if (mode == 3) {
            cell.style.background = "red";
            cell.setAttribute("paintColor", mode);
            removeOthers(cell, mode)
        }
    }
}

function removeOthers(cell, paintColor) {
    let table = document.getElementById("mainTable");
    for (tb of Array.from(table.children)) {
        for (tableRow of Array.from(tb.children)) {
            for (tableCell of Array.from(tableRow.children)) {
                if (tableCell != cell && tableCell.getAttribute("paintColor") == paintColor) {
                    let tempMode = mode;
                    mode = paintColor;
                    mode = 1;
                    paintCell(tableCell, true);
                    mode = tempMode;
                }
            }
        }
    }
}

function setMode(mode_) {
    mode = mode_;
}