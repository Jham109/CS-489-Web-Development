//Start-up functions run when page is loaded.
//1. Include the HTML snippets:
includeHTML();

//Hide all pages except for one
document.getElementById("familyDiv").style.display = "none";
document.getElementById("hobbiesDiv").style.display = "none";
//Hide all menu items except for one
document.getElementById("familyItem").style.display = "none";
document.getElementById("hobbiesItem").style.display = "none";


//2. Set up UI state
var menuOpen = false; //Boolean variable to capture the state of the side menu.

//On startup, set current app mode to "about"
var mode = "about"; //Variable captures current UI mode
document.getElementById(mode).classList.add("menuItemSelected");

var bottomBtns = document.getElementsByClassName("bottomBarBtn");
for (var i = 0; i < bottomBtns.length; ++i) {
    bottomBtns[i].addEventListener("click",bottomBarBtnClick);
}