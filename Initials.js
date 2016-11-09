/**
 * Created by 1 on 09.11.2016.
 */

//creates empty table on view
function makeTable(currenciesList) {
    var tbl = document.createElement("table");
    tbl.className = "currTable";
    tbl.id = "cTable";
    tbl.style.border = "5px solid darkblue";
    var numCurr = currenciesList.length;

    //-----table header ---------------------

    cap = document.createElement("caption");
    cap.className = "cap";
    //cap.innerText = new Date().getUTCMinutes();
    //console.log(cap.innerText);
    var str = new Date().toString();
    var gmt = str.indexOf("GMT");
    str = str.substring(0,gmt) + " (local time)";
    cap.innerText = str;
    tbl.appendChild(cap);

    //-----header ---------------------------

    var row = tbl.insertRow();
    var cell = row.insertCell();
    // cell.innerText = "Curs's";
    // cell.style.backgroundColor = "darkgrey";
    // cell.style.color = "white";
    for(var i = 0; i < numCurr; i++){
        row.insertCell().innerText = currenciesList[i];
    }

    //-----body -----------------------------

    for( var i = 0; i < numCurr; i++){
        row = tbl.insertRow();
        cell = row.insertCell().innerText = currenciesList[i];
        for(var j = 0; j < numCurr; j++){
            row.insertCell();
        }
    }

    var corner = tbl.rows[0].cells[0];
    corner.className = "corner";
    // corner.onclick = function () {
    //     //alert("Hello");
    //     fillRatesArray(currenciesList);
    // };
    corner.innerHTML = "<button id='but'>Push</button>";

    document.body.appendChild(tbl);
}

//creates empty ratesTable
function makeRatesTable(currenciesList) {
    var numCurr = currenciesList.length;
    var n2 = numCurr*numCurr;
    ratesTable = [];
    for (var i = 0; i < n2; i++){
        ratesTable.push(Rate());
    }
}