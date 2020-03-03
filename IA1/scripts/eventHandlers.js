//
//eventHandlers.js -- This file defines the JavaScript functions necessary to
//update the app in response to user interaction.
//

//document click: When the user clicks anywhere in the doc and the menu is open
//we need to close it and toggle menu state variable.
document.addEventListener("click",function(e) {
  if (menuOpen) {
    document.getElementById("menuBtnIcon").classList.remove("fa-times"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-bars");
    document.getElementById("sideMenu").style.width = "0px"; //close menu
    menuOpen = false;
  }
});
 
//menuBtn click: When the top-left side menu button is clicked and the menu
//is closed, we need to open it and toggle menu state variable.
document.getElementById("menuBtn").addEventListener("click",function(e) {
  if (!menuOpen) {
    document.getElementById("menuBtnIcon").classList.remove("fa-bars"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-times");
    document.getElementById("sideMenu").style.width = "250px"; //open up menu
    menuOpen = true;
    //toggleInputDisabled(true);
    e.stopPropagation();
  }
});   
                                                       
//bottomBarBtnClick -- When a button in the bottom bar is clicked, we potentially

//need to toggle the mode.

var bottomBarBtnClick = function() {

  if (mode != this.id) {
    var prevMode = mode;
    mode = this.id;  
    document.getElementById(prevMode).classList.remove("menuItemSelected"); 
    this.classList.add("menuItemSelected");  
   
    if (mode == "about") {
      document.getElementById("topBarTitle").textContent = "About Me";
    } else if (mode == "family") {
      document.getElementById("topBarTitle").textContent = "Family";
    } else { //mode == "hobbies"
      document.getElementById("topBarTitle").textContent = "Hobbies";
    }

    document.getElementById(prevMode + "Div").style.display = "none";
    document.getElementById(prevMode + "Item").style.display = "none";
    document.getElementById(mode + "Div").style.display = "block";
    document.getElementById(mode + "Item").style.display = "block";
  }
}