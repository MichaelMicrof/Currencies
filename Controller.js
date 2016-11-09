/**
 * Created by 1 on 09.11.2016.
 */

var ratesArray;
var ratesTable;
var cap;

//requests backend and fills view table
function fillRatesArray(currenciesList) {
    var YAHOO_FINANCE_URL_PATTERN =
        '//query.yahooapis.com/v1/public/yql?q=select * from ' +
        'yahoo.finance.xchange where pair in ("PAIRS")&format=json&' +
        'env=store://datatables.org/alltableswithkeys&callback=JSON_CALLBACK';
    var numCurr = currenciesList.length;
    var pairsArray = [];
    for(var i = 0; i < numCurr; i++){
        for(var j = 0; j < numCurr; j++){
            pairsArray.push(currenciesList[i] + currenciesList[j]);
        }
    }

    var url = YAHOO_FINANCE_URL_PATTERN.replace("PAIRS", pairsArray.join());

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState != 4) {
            return;
        }
        if(xhr.status == 200){
            var resp = xhr.response;
            var first = resp.indexOf("{");
            var last = resp.lastIndexOf("}");
            var json = resp.substring(first, last+1);
            var rArray = JSON.parse(json).query.results.rate;

            //console.log(rArray);
            // console.log(json);

            // console.log(JSON.parse(json));
            ratesArray = [];
            for(var i = 0; i < rArray.length; i++){
                ratesArray.push(rArray[i].Rate);
            }
            fillRatesTable();
            fillCurrTable(currenciesList);
//                for(var i = 0; i < ratesTable.length; i++){
//                    console.log(ratesTable[i].toString());
//                }
            //console.log(ratesArray);
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}

//fill view table with data in ratesTable
function fillCurrTable(currenciesList) {
    var numCurr = currenciesList.length;
    var tbl = document.getElementById("cTable");
    for(var i = 1; i <= numCurr; i++){
        var row = tbl.rows[i];
        for(var j = 1; j <= numCurr; j++){
            if(j == i){
                row.cells[j].style.backgroundColor = "lightgrey";
            }
            var c = ratesTable[(i-1)*numCurr + (j-1)].getCurr();
            var p = ratesTable[(i-1)*numCurr + (j-1)].getPrev();
            row.cells[j].innerText = c;

            //console.log(parseInt(c));

            if(parseFloat(c) > parseFloat(p)){
                row.cells[j].style.color = Rate.colorUp;
            } else if(parseFloat(c) < parseFloat(p)){
                row.cells[j].style.color = Rate.colorDown;
            } else if(parseFloat(c) == parseFloat(p)){
                row.cells[j].style.color = Rate.colorSame;
            }

        }
    }
    var str = new Date().toString();
    var gmt = str.indexOf("GMT");
    str = str.substring(0,gmt) + " (local time)";
    cap.innerText = str;
}

//fill rates table with incoming data
function fillRatesTable() {
    for(var i = 0; i < ratesTable.length; i++){
        if(ratesTable[i].getCurr() === undefined){
            ratesTable[i].setPrev(ratesArray[i]);
        }else{
            ratesTable[i].setPrev(ratesTable[i].getCurr());
        }
        ratesTable[i].setCurr(ratesArray[i]);
    }
}

