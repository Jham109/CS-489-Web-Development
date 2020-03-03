import React from 'react';
import AppMode from '../AppMode.js';

class ModeBar extends React.Component {

    handleModeBtnClick = (newMode) => {
      if (this.props.mode != newMode) {
          this.props.changeMode(newMode);
      }
    }
  
    render() {
      return(
        <div className={"modebar" + (this.props.mode === AppMode.LOGIN ? 
          " invisible" : " visible")}>
          <a className={"modebar-btn" +
            (this.props.mode === AppMode.GAMES ? " modebar-item-selected" : "")} 
            onClick={this.props.menuOpen ? null : 
              () => this.handleModeBtnClick(AppMode.GAMES)}>
            <span className="modebar-icon fa fa-history"></span>
            <span className="modebar-text">DATA</span>
          </a>
          <a className={"modebar-btn" +
            (this.props.mode === AppMode.MODE2 ? " modebar-item-selected" : "")} 
             onClick={this.props.menuOpen ? null : 
              () => this.handleModeBtnClick(AppMode.MODE2)}>
            <span className="modebar-icon fa fa-flag"></span>
            <span className="modebar-text">MODE2</span>
          </a> 
        </div>
      );
    }

}

export default ModeBar;
