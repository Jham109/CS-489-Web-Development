//
//eventHandlers.js -- This file defines the JavaScript functions necessary to
//update the app in response to user interaction.
//


  //startUp -- This function sets up the initial state of the app: Login page is
  //visible, bottom bar is invisible, all menu items invisible except feed items,
  //menu bottom disabled, UI mode = login
  function startUp() {
    //Hide all pages except for Login Page, which is the start page.
    //TO DO: Fill in
    document.getElementById("loginModeDiv").style.display = "block";
    document.getElementById("dataPageDiv").style.display = "none";
    document.getElementById("addDataPageDiv").style.display = "none";
    document.getElementById("modeDiv").style.display = "none";

    //Clear all text from email and password fields
    //TO DO: Fill in
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";

    //Set top bar text
    //TO DO: Fill in
    document.getElementById("topBarTitle").textContent = "Welcome to My App";

    //Hide the bottom bar initially
    //TO DO: Fill in
    document.getElementById("bottomBar").style.display = "none";

    //Hide all menu items except for items of current mode:
    //TO DO: Fill in
    document.getElementById("mainMenuContent").style.display = "none";
    
    //Disable menu button:
    //TO DO: Fill in
    document.getElementById("menuBtn").disabled = true;

    //Set current mode
    //TO DO: Fill in
    mode = "loginMode";

    //set the input focus to the email field
    //TO DO: Fill in
    document.getElementById("emailInput").focus();
  }

//clearRoundForm -- Helper function that clears out data previously entered into
//the "Log New Round" form and resets all fields to their default values
function clearRoundForm() {
  document.getElementById("Date").valueAsNumber = 
  Date.now()-(new Date()).getTimezoneOffset()*60000;
  document.getElementById("Field").value = "";
  document.getElementById("Outcome").value = "practice";
}

  //document click: When the user clicks anywhere in the doc and the menu is open
  //we need to close it and toggle menu state variable.
  document.addEventListener("click",function(e) {
    if (menuOpen) {
      if (!pageLocked) { //Change hamburger back to 'X'
          document.getElementById("menuBtnIcon").classList.remove("fa-times"); 
          document.getElementById("menuBtnIcon").classList.add("fa-bars");
      }
      document.getElementById("sideMenu").style.width = "0px"; //close menu
      menuOpen = false;
    }
});
 
//menuBtn click: When the top-left side menu button is clicked and the menu
//is closed, we need to open it and toggle menu state variable.
document.getElementById("menuBtn").addEventListener("click",function(e) {
  if (pageLocked) { //user is clicking left arrow to exit locked page
    pageLocked = false;
    //restore hamburger icon
    document.getElementById("menuBtnIcon").classList.remove("fa-arrow-left"); 
    document.getElementById("menuBtnIcon").classList.add("fa-bars"); 
    //Hide current page
    document.getElementById("addDataPageDiv").style.display = "none";
    //Show main mode page
    document.getElementById("dataPageDiv").style.display = "block";
    //Restore main mode page title
    document.getElementById("topBarTitle").textContent = "My Data";
    //Re-enable bottom bar buttons
    document.getElementById("bottomBar").classList.remove("disabledButton");
    e.stopPropagation();
    return;
  }
  if (!menuOpen) {
    document.getElementById("menuBtnIcon").classList.remove("fa-bars"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-times");
    document.getElementById("sideMenu").style.width = "250px"; //open up menu
    menuOpen = true;
    e.stopPropagation();
  }
});   

//bottomBarBtnClick -- When a button in the bottom bar is clicked, we potentially
//need to toggle the mode.
var bottomBarBtnClick = function() {
  //TO DO: Fill in
  if(mode != this.id)
  {
    var prevMode = mode;
    mode = this.id;
    document.getElementById(prevMode).classList.remove("menuItemSelected");
    this.classList.add("menuItemSelected");
    document.getElementById("topBarTitle").textContent = modeToTitle[mode];

    //swap out page content
    document.getElementById(prevMode + "Div").style.display = "none";
    document.getElementById(mode + "Div").style.display = "block";
  }
}

//login -- This function sets the initial app state after login. It is called
//from setTimeout after the button spinner has commenced.bottombar
function login() {
  //Stop spinner
 //TO DO: Fill in
  document.getElementById("loginBtnIcon").classList.remove("fas","fa-spinner","fa-spin");

  //Enable menu button:
  //TO DO: Fill in
  document.getElementById("menuBtn").disabled = false;
  document.getElementById("dataPage").classList.add("menuItemSelected");

  //Show bottom bar buttons and highlight feed mode button
  //TO DO: Fill in
  document.getElementById("bottomBar").style.display = "block";

  //Change title bar to that of app start page
  //TO DO: Fill in
  document.getElementById("topBarTitle").textContent = "My Data";

  //Show only the menu items for current mode
  //TO DO: Fill in
  document.getElementById("mainMenuContent").style.display = "block";

  //hide login screen and show feed screen
  //TO DO: Fill in
  document.getElementById("loginModeDiv").style.display = "none";
  document.getElementById("dataPageDiv").style.display = "block";

  //Set mode to current mode
  //TO DO: Fill in
  mode = "dataPage";

  //Write login name of user who just logged in to localStorage
  let thisUser = document.getElementById("emailInput").value;
  localStorage.setItem("userName",thisUser);
  //Check whether we have saved data on this (or any) user:
  let data = localStorage.getItem("managerUserData");
  if (data == null) { 
    //No user app data stored yet -- create blank record for current user
    localStorage.setItem("managerUserData",
      JSON.stringify({thisUser : {"games" : {}, "gamescount": 0}}));  
  } else {
    //app data exists -- check if data exists for thisUser
    data = JSON.parse(data);
    if  (!data.hasOwnProperty(thisUser)) { 
      //No data for this user -- create empty data
      data[thisUser] = {"games": {}, "gamescount": 0}; 
      localStorage.setItem("managerUserData",JSON.stringify(data));
    }
  }
  
}

//loginInterface submit: When the login button is clicked, we rely on form
//pattern matching to ensure validity of username and password. To log in, we
//switch the mode to "feedMode" and make the necessary UI and state changes.

document.getElementById("loginInterface").onsubmit = function(e) {

  //Start spinner:
  document.getElementById("loginBtnIcon").classList.add("fas","fa-spinner","fa-spin");
  setTimeout(login,3000);
  e.preventDefault(); //Prevents form refresh -- the default behavior
};

//addData SUBMIT: When the user clicks the "Save" button to save a newly
//entered speedgolf round, we need to save it to local storage
document.getElementById("addDataForm").onsubmit = function(e) {
  e.preventDefault(); //We do NOT want the button to trigger a page reload!
  //Start spinner
  document.getElementById("saveIcon").classList.add("fas", "fa-spinner", "fa-spin");
  //Set spinner to spin for one second, after which saveRoundData will be called
  setTimeout(saveRoundData,1000);
}

//saveRoundData -- Callback function called from logRoundForm's submit handler.
//Stops the spinner and then saves the entered round data to local storage.
function saveRoundData() {

  //Stop spinner
  document.getElementById("saveIcon").classList.remove("fa-spinner", "fa-spin");

  //Retrieve from localStorage this user's rounds and roundCount
  let thisUser = localStorage.getItem("userName");
  let data = JSON.parse(localStorage.getItem("managerUserData"));
   
    //increment roundCount since we're adding a new round
 data[thisUser].gamescount++;

  //Initialize empty JavaScript object to store this new round
  let thisRound = {}; //iniitalize empty object for this round
  let temp; //temporary value for storying DOM elements as needed

  //Store the data
  thisRound.roundNum = data[thisUser].gamescount;
  thisRound.date = document.getElementById("Date").value; //round date
  thisRound.field = document.getElementById("Field").value;
  temp = document.getElementById("Outcome");
  thisRound.type = temp.options[temp.selectedIndex].value;

  //Add this round to associative array of rounds
  data[thisUser].games[data[thisUser].gamescount] = thisRound;

  //Commit updated user data to app data in local storage
  localStorage.setItem("managerUserData",JSON.stringify(data));

  //Show alert box with current state of speedgolfUserData for debugging purposes
  data = localStorage.getItem('managerUserData');
  alert("managerUserData: " +  data);
  

 //Go back to "My Rounds" page by programmatically clicking the menu button
 document.getElementById("menuBtn").click();

 //Clear form to ready for next use
 clearRoundForm();
}
  
//logOutBtn click: When the user logs out, we need to reset the app to its start
//state, with the login page visible
document.getElementById("logOutItem").onclick = function(e) {
  //Restore starting app state
  startUp();
};

//aboutBtn click: When the user clicks on "About", launch the modal About dialog
//box.
document.getElementById("aboutItem").onclick = function(e) {
  document.getElementById("aboutModal").style.display = "block";
};


document.getElementById("addDataItem").onclick = function (e) {
  myFunction();
};

function myFunction() {
    //swap pages
    document.getElementById("dataPageDiv").style.display = "none";
    document.getElementById("addDataPageDiv").style.display = "block";
    //swap titles
    document.getElementById("topBarTitle").textContent = "Add Data";
    //Set pageLocked to true, thus indicating that we're on a page that may only
    //be exited by clicking on the left arrow at top left
    pageLocked = true;
    //When pageLocked is true, the menu icon is the left arrow
    document.getElementById("menuBtnIcon").classList.remove("fa-times");
    document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");
    //When pageLocked is true, the bottom bar buttons are disabled
    document.getElementById("bottomBar").classList.add("disabledButton");
}

//closeAbout click: When user clicks a button to cloe the modal About box, hide the
//dialog box. Note that this function is bound to the two items with class
//"close" in function startUp
function closeAbout(e) {
  document.getElementById("aboutModal").style.display = "none";  
}