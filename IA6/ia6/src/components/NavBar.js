import React from 'react';
import AppMode from '../AppMode.js';

class NavBar extends React.Component {
    
  handleMenuBtnClick = () => {
    if (this.props.mode === AppMode.ADD ||
        this.props.mode === AppMode.EDIT) {
      this.props.changeMode(AppMode.GAMES);
    } else if (this.props.mode != AppMode.LOGIN) {
      this.props.toggleMenuOpen();
    }
  }
    getMenuBtnIcon = () => {
      if (this.props.mode === AppMode.ADD || 
          this.props.mode === AppMode.EDIT)
          return "fa fa-arrow-left";
      if (this.props.menuOpen)
        return "fa fa-times";
      return "fa fa-bars";
    }

    render() {
       return (
        <div className="navbar">  
        <span className="navbar-items">
          <button className="sidemenu-btn" onClick={this.handleMenuBtnClick}>
            <span id="sidemenu-btn-icon"  
                className={"sidemenu-btn-icon " + this.getMenuBtnIcon()}>
            </span>
          </button>
          <img src="favicon.ico" height="38px"
          width="38px" />
          <span className="navbar-title">
            &nbsp;{this.props.title}
          </span>
        </span>
      </div>
    ); 
  }
}

export default NavBar;
