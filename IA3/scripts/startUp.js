//Start-up functions run when page is loaded.
//1. Include the HTML snippets:
includeHTML();
//2. Define global vars and function bindings
//Set up UI state
var menuOpen = false; //Boolean variable to capture the state of the side menu.
var mode = "loginMode"; //Variable captures current UI mode

//Associative array maps modes to page titles
var modeToTitle = {
    //TO DO: Fill in
    "dataPage": "My Data",
    "addDataPage": "Add Data",
    "modeDiv": "Undetermined"
};

//Bind bottomBarBtnClick function to all elements of class bottomBarBtn
var bottomBtns = document.getElementsByClassName("bottomBarBtn");
for (var i = 0; i < bottomBtns.length; ++i) {
    bottomBtns[i].addEventListener("click",bottomBarBtnClick);
}

var addbutton = document.getElementById("addDataBtn");
addbutton.addEventListener("click", myFunction);

//Bind closeAbout function to all elements of class close
var closeBtns = document.getElementsByClassName("close");
for (var i = 0; i < closeBtns.length; ++i) {
    closeBtns[i].addEventListener("click",closeAbout);
}

document.getElementById("Date").valueAsNumber = Date.now()-(new Date()).getTimezoneOffset()*60000;

//We'll use this to indicate we're on a "locked" page where you have to click
//left arrow to get back to main mode page.
var pageLocked = false;


//Execute function to set start state of app
startUp();