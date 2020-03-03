import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import ModeBar from './ModeBar.js';
import LoginPage from './LoginPage.js';
import Mode2 from './Mode2.js';
import AppMode from "./../AppMode.js";
import Games from './Games.js';


const modeTitle = {};
modeTitle[AppMode.LOGIN] = "Welcome to ISManager";
modeTitle[AppMode.ADD] = "Add Game";
modeTitle[AppMode.EDIT] = "Edit Game";
modeTitle[AppMode.GAMES] = "My Games";
modeTitle[AppMode.MODE2] = "Mode 2";

const modeToPage = {};
modeToPage[AppMode.LOGIN] = LoginPage;
modeToPage[AppMode.ADD] = Games;
modeToPage[AppMode.GAMES] = Games;
modeToPage[AppMode.MODE2] = Mode2;
modeToPage[AppMode.EDIT] = Games;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  userId: "",
                  showAbout: false};
  }

  handleChangeMode = (newMode) => {
    this.setState({mode: newMode});
  }

  openMenu = () => {
    this.setState({menuOpen : true});
  }
  
  closeMenu = () => {
    this.setState({menuOpen : false});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  setUserId = (Id) => {
    this.setState({userId: Id});
  }

  //When App component mounts, add a window-level click handler to close the
  //side menu if it is open. This event should fire only if no other lower-level
  //events intercept the click.
  componentDidMount() {
    window.addEventListener("click",this.handleClick);
  }

//We remove the event listener when the component
//unmounts. This is a best practice. 
componentWillUnmount() {
  window.removeEventListener("click",this.handleClick);
}

  //When the user clicks anywhere on the app and the menu is open, close it.
  //This function takes advantage of event bubbling.
  handleClick = (event) => {
    if (this.state.menuOpen) {
      this.closeMenu();
    }
    event.stopPropagation();
  }

  toggleAbout = () => {
    this.setState(prevState => ({showAbout: !prevState.showAbout}));
  }

  renderAbout = () => {
    return (
      <div className="modal" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title"><b>About ISManager</b>
                <button className="close-modal-button" onClick={this.toggleAbout}>
                  &times;</button>
              </h3>
            </div>
            <div className="modal-body">
              <img
              src="favicon.ico" height="200" width="200"/>
              <h3>The World's First and Only Suite of Apps for Intramural Managing</h3>
              <p>Version CptS 489 Sp20, Build W06C2 (React)<br/>
              &copy; 2017-20 The Godfather of Intramurals. All rights
              reserved.
              </p>
              <div style={{textAlign: "left"}}>
                <p>ISManager apps support</p>
                <ul>
                <li>live game scoring (<i>ISManager Live&reg;</i>)</li>
                <li>tracking outcomes of your team's games and sharing results (<i>ISManager Track&reg;</i>)</li>
                <li>finding players, booking game times, and paying to play Intramurals by the season (<i>ISNanager Play&reg;</i>)</li>
                </ul>
                <p>ISManager was first developed by Joseph Cunningham,
                undergraduate student of computer science at Washington State
                University and the <i>Godfather of Intramurals</i>. It leverages
                Google server-side technologies.</p>
                <p>More information will be coming soon.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary btn-color-theme"
                onClick={this.toggleAbout}>OK</button>
              </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const ModePage = modeToPage[this.state.mode];
    return (
      <div onClick={this.handleClick}>
        <NavBar 
          title={modeTitle[this.state.mode]}
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          toggleMenuOpen={this.toggleMenuOpen}/>
        <SideMenu 
          mode={this.state.mode}
          menuOpen={this.state.menuOpen}
          changeMode={this.handleChangeMode}
          userId={this.state.userId}
          showAbout={this.toggleAbout}/>
        <ModeBar 
          mode={this.state.mode} 
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}/>
        <ModePage menuOpen={this.state.menuOpen}
          mode={this.state.mode} 
          changeMode={this.handleChangeMode}
          userId={this.state.userId}
          setUserId={this.setUserId}/>
        {this.state.showAbout ? this.renderAbout() : null}
      </div>
      );  
  }
}

export default App;