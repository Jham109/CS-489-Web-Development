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

    //Set default date in log round input form to today:
    document.getElementById("Date").valueAsNumber = 
      Date.now()-(new Date()).getTimezoneOffset()*60000;
    
    //Potentially clear out the "My Rounds" table
    //Note that we aren't deleting from localStorage since we're prepping for
    //new login.
    let gamesTable = document.getElementById("gamePageTable");
    if (!gamesTable.rows[1].innerHTML.includes ("colspan")) {
      //We have a non-empty table and must clear out rows
      while (gamesTable.rows.length > 1) {
        gamesTable.deleteRow(1);
      } 
      //Add new row to indicate empty table.
      let newRow = gamesTable.insertRow();
      newRow.innerHTML = "<td colspan='5' style='font-style: italic'>No rounds logged</td>"; 
    }
  }

//clearRoundForm -- Helper function that clears out data previously entered into
//the "Log New Round" form and resets all fields to their default values
function clearRoundForm() {
  document.getElementById("Date").valueAsNumber = 
  Date.now()-(new Date()).getTimezoneOffset()*60000;
  document.getElementById("Field").value = "";
  document.getElementById("Outcome").value = "practice";
}

//fillRoundForm -- When the user chooses to view/edit an existing round, we need
//to fill the round form with the corresponding round data and provide the
//option to update the data
function fillRoundForm(game) {
  document.getElementById("Date").value = game.date;
  document.getElementById("Field").value = game.field;
  document.getElementById("Outcome").value = game.type;
}

//transitionToLockedPage: Take the user to a locked page that is subsidiary to
//the main mode page. The new page is identified by lockedPageId and should have
//the title lockedPageTitle. Note: Any other tweaks to the locked page (e.g., 
//changing of button labels or hiding/showing of input fields and controls) must
//be done manually before or after calling this function.
function transitionToLockedPage(lockedPageId, lockedPageTitle) {
  //Swap pages
  document.getElementById("dataPageDiv").style.display = "none";
  document.getElementById(lockedPageId).style.display = "block";
  //Change page title
  document.getElementById("topBarTitle").textContent = lockedPageTitle;
  //Set pageLocked to true, thus indicating that we're on a page that may only
  //be exited by clicking on the left arrow at top left
  pageLocked = true;
  //When pageLocked is true, the menu  icon is the left arrow
  document.getElementById("menuBtnIcon").classList.remove("fa-times");
  document.getElementById("menuBtnIcon").classList.remove("fa-bars");
  document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");
  //When pageLocked is true, the bottom bar buttons are disabled
  document.getElementById("bottomBar").classList.add("disabledButton");
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
    localStorage.setItem("managerUserData",JSON.stringify({[thisUser] : {"games" : {}, "gamescount": 0}}));  
  } else {
    //app data exists -- check if data exists for thisUser
    data = JSON.parse(data);
    if  (!data.hasOwnProperty(thisUser)) { 
      //No data for this user -- create empty data
      data[thisUser] = {"games": {}, "gamescount": 0}; 
      localStorage.setItem("managerUserData",JSON.stringify(data));
    }else {
      //There is data for this user; add it to the "My Rounds" table
      for (const game in data[thisUser].games) {
        addGameTable(data[thisUser].games[game].roundNum);
      } 
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


  //Initialize empty JavaScript object to store this new round
  let thisRound = {}; //iniitalize empty object for this round
  let temp; //temporary value for storying DOM elements as needed

  //Store the data
  thisRound.date = document.getElementById("Date").value; //round date
  thisRound.field = document.getElementById("Field").value;
  temp = document.getElementById("Outcome");
  thisRound.type = temp.options[temp.selectedIndex].value;

  //Determine whether we're saving new or editing existing round, saving accordingly
  let submitBtnLabel = document.getElementById("submitBtnLabel").textContent;
  let addNew;

  if (submitBtnLabel == "Save Game Data") {
    //Adding new round
    addNew = true;
    //Add 1 to roundCount, setting thisRound's roundNum to that value
    thisRound.roundNum = ++(data[thisUser].gamescount);
    data[thisUser].games[thisRound.roundNum] = thisRound; //add to local storage 
  } else {
    //Editing existing round
    addNew = false;
    //Grab index of round being edited from localStorage. It was set in editRound()
    thisRound.roundNum = Number(localStorage.getItem("gameIndex")); 
  }
  //Add this round to associative array of rounds
  data[thisUser].games[thisRound.roundNum] = thisRound;

  //Commit updated user data to app data in local storage
  localStorage.setItem("managerUserData",JSON.stringify(data));

 //Go back to "My Rounds" page by programmatically clicking the menu button
 document.getElementById("menuBtn").click();

 //Clear form to ready for next use
 clearRoundForm();

  //Add to or update "My Rounds" table
  addToOrUpdateRoundTable(addNew, thisRound.roundNum);
}

//addToOrUpdateRoundTable -- Helper function that adds a new round with unique index
//roundIndex to the "My Rounds" table. The round is a "condensed view" that
//shows only the date, course and score for the round, together with buttons to
//view/edit the detailed round data and delete the round data.
function addToOrUpdateRoundTable(add, gameIndex) {
  let data = JSON.parse(localStorage.getItem("managerUserData"));
  let user = localStorage.getItem("userName");
  let gameData = data[user].games[gameIndex]; //the round data to add/edit
  let gamesTable = document.getElementById("gamePageTable");
  let gameRow;
  if (add) { //add new row
    //Test whether table is empty
    if (gamesTable.rows[1].innerHTML.includes ("colspan")) {
      //empty table! Need to remove this row before adding new one
      gamesTable.deleteRow(1);
     }
     gameRow = gamesTable.insertRow(1); //insert new row
     gameRow.id = "r-" + gameIndex; //set id of this row so we can edit/delete later per user input
  } else { //update existing row
    gameRow = document.getElementById("r-" + gameIndex);
  }
  //Add/update row with five cols to table
  gameRow.innerHTML = "<td>" + gameData.date + "</td><td>" +
  gameData.field + "</td><td>" + gameData.type + "</td>" +
   "<td><button onclick='editRound(" + gameIndex + ")'><span class='fas fa-eye'>" +
   "</span>&nbsp;<span class='fas fa-edit'></span></button></td>" +
   "<td><button onclick='confirmDelete(" + gameIndex + ")'>" +
   "<span class='fas fa-trash'></span></button></td>";
}

//confirmDelete: Event handler called when "Delete" button clicked in "My Rounds"
//table. roundIndex indicates the index of the round tht was clicked. We presenta
//modal dialog box asking user to confirm the deletion. The confirm button event
//handler calls on the function deleteRound, which does the deletion.
function confirmDelete(gameIndex) {
  //Preserve index of round to delete for deleteRound function
  localStorage.setItem("pendingDelete",gameIndex); 
  //Show the modal dialog box
  document.getElementById("deleteGameModal").style.display = "block";
}
  
//cancelDelete: Event handler called when "No, do not delete" button clicked in
//the confirm delete modal dialog. In this case, we simply hide the dialog box
//aclear out the "pendingDelete" local storage item
function cancelDelete() {
  localStorage.setItem("pendingDelete","");
  document.getElementById("deleteGameModal").style.display = "none";
}

//deleteRound: Event handler called when "Yes, delete round" button clicked in
//confirm delete dialog box. We fetch the index of round to delete from local
//storage and delete the corresponding row from the table and record from the
//rounds array. We also hide the dialog box.
function deleteRound() {
  //Hide modal dialog box
  document.getElementById("deleteGameModal").style.display = "none";
  //Grab user data from localStorage
  let data = JSON.parse(localStorage.getItem("managerUserData"));
  let user = localStorage.getItem("userName");
  let gameIndex = Number(localStorage.getItem("pendingDelete"));
  let row, gamesTable, newRow;
  //delete round from rounds associative array and save back to localStorage
  delete data[user].games[gameIndex];
  localStorage.setItem("managerUserData",JSON.stringify(data));
  //delete the row from the table
  row = document.getElementById("r-" + gameIndex);
  row.parentNode.removeChild(row);
  //If we're now down to just header row, we need to add a row saying that no
  //rounds have been added yet
  gamesTable = document.getElementById("addDataForm");
  if (gamesTable.rows.length == 1) {
    //Add new row
    newRow = gamesTable.insertRow();
    newRow.innerHTML = "<td colspan='5' style='font-style: italic'>No rounds logged</td>"; 
  }
}
//addGameTable -- Helper function that adds a new round with unique index
//gameIndex to the "My Rounds" table. The round is a "condensed view" that
//shows only the date, course and score for the round, together with buttons to
//view/edit the detailed round data and delete the round data.
function addGameTable(gameIndex) {
  let data = JSON.parse(localStorage.getItem("managerUserData"));
  let user = localStorage.getItem("userName");
  let games = data[user].games;

 //Test whether table is empty
 let gamesTable = document.getElementById("gamePageTable");
 if (gamesTable.rows[1].innerHTML.includes ("colspan")) {
   //empty table! Need to remove this row before adding new one
   gamesTable.deleteRow(1);
 }
//Write new row with five cols to table
 let game = gamesTable.insertRow(1);
 game.id = "r-" + gameIndex; //set unique id of this row so we can edit/delete later

 game.innerHTML = "<td>" + games[gameIndex].date + "</td><td>" +
 games[gameIndex].field + "</td><td>" + games[gameIndex].type  + 
   "</td>" +
   "<td><button onclick='editRound(" + gameIndex + ")'><span class='fas fa-eye'>" +
   "</span>&nbsp;<span class='fas fa-edit'></span></button></td>" +
   "<td><button onclick='confirmDelete(" + gameIndex + ")'>" +
   "<span class='fas fa-trash'></span></button></td>";
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

    //Set label of form button appropriately
    document.getElementById("saveIcon").classList.remove("fas","fa-edit");
    document.getElementById("saveIcon").classList.add("fas","fa-save");
    document.getElementById("submitBtnLabel").textContent = "Save Game Data";
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

//editRound: Event handler called when "View/Edit" button clicked in "My Rounds"
//table. roundIndex indicates the index of the round that was clicked. Grab
//the round data from local storage, fill it into the edit form and transition
//to the view/edit round page.
function editRound(gameIndex) {
  //Grab appropriate round to view/edit from localStorage
  let data = JSON.parse(localStorage.getItem("managerUserData"));
  let user = localStorage.getItem("userName");
  
  //Pre-populate form with round data
  fillRoundForm(data[user].games[gameIndex]);

  //Set local storage var to index of round being edited. This will allow us to
  //save updated data to correct round when the user clicks "Update Round Data"
  localStorage.setItem("gameIndex",gameIndex);

  //Transition to round view/edit page with "Update" label for form submit button
  document.getElementById("saveIcon").classList.remove("fas","fa-save");
  document.getElementById("saveIcon").classList.add("fas","fa-edit");
  document.getElementById("submitBtnLabel").textContent = "Update Round Data";
  transitionToLockedPage("addDataPageDiv","View/Edit Round");
}

//closeAbout click: When user clicks a button to cloe the modal About box, hide the
//dialog box. Note that this function is bound to the two items with class
//"close" in function startUp
function closeAbout(e) {
  document.getElementById("aboutModal").style.display = "none";  
}