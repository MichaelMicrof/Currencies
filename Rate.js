/**
 * Created by 1 on 09.11.2016.
 */
var RateStatic;
Rate();

function Rate(prev, curr) {

    if(RateStatic === undefined) {
        Rate.colorUp = "red";
        Rate.colorDown = "lawngreen";
        Rate.colorSame = "black";
        RateStatic = true;
    }

    var c = curr;
    var p = prev;

    var gCurr = function () {return c;};
    var gPrev = function () {return p;};

    var sCurr = function (val) {c = val;};
    var sPrev = function (val) {p = val;};

    var tString = function() {return c + "; " + p;};

    return {
        getCurr : gCurr,
        getPrev : gPrev,
        setCurr : sCurr,
        setPrev : sPrev,
        toString : tString
    }
}