import React from 'react';
import '../styles/modal.css';
import AppMode from '../AppMode.js';

class DataPage extends React.Component {

  constructor(props) {
    super(props);
    //confirmDelete state variable determines whether to show or hide the
    //confirm delete dialog box
    this.state = {confirmDelete: false}; 
  }
//editGame -- Triggered when the user clicks the edit button for a given
    //round. The id param is the unique property that identifies the round.
    //Set the state variable representing the id of the round to be edited and
    //then switch to the ROUNDS_EDITROUND mode to allow the user to edit the
    //chosen round.
    editGame = (id) => {
      this.props.setEditId(id);
      this.props.changeMode(AppMode.EDIT);
    }

    //confirmDelete -- Triggered when the user clicks on the delete button
    //associated with a given round. The id param is the unique property that
    //identifies the round. Set the state variable representing the id
    //of the item to be deleted and set the confirmDelete state variable to true
    //to force a re-render with the confirm delete modal dialog box showing.
    confirmDelete = (id) => {
      this.props.setDeleteId(id);
      this.setState({confirmDelete: true});
    }

      //doDelete -- Triggered when the user clicks on the "Yes Delete" button in
    //the confirm delete dialog box. Call upon parent component's deleteRound to
    //to actually performt he deletion of the round currently flagged for
    //deletion and toggle the confirmDelete state variable to hide the confirm
    //dialog box.
    doDelete = () => {
      this.props.deleteGame();
      this.setState({confirmDelete: false});
    }

      //cancelDelete -- Triggered when the user chooses to cancel a delete
  //operation. We just need to update state to toggle confirmDelete to false
  cancelDelete = () => {
    this.props.setDeleteId(""); 
    this.setState({confirmDelete: false});
  }

    //renderConfirmDeleteDialog: presents user with dialog to confirm deletion
  //of round. Credit: https://getbootstrap.com/docs/4.0/components/modal/
  renderConfirmDeleteDialog = () => {
    return (
      <div className="modal" role="dialog">
        <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title">Confirm Game Deletion</p>
                <button className="close-modal-button" onClick={this.cancelDelete}>
                  &times;</button>
            </div>
            <div className="modal-body">
              <h4>Are you sure that you want to delete this game?</h4>
              <div className="modal-footer">
                  <button className="btn btn-primary btn-color-scheme"
                    onClick={this.doDelete}>
                  Yes, delete game</button>
                  <button className="btn btn-secondary" 
                    onClick={this.cancelDelete}>
                  No, do not delete game</button>
              </div>
            </div>
        </div>
      </div>
    );
  }

   //renderTable -- render an HTML table displaying the rounds logged
    //by the current user and providing buttons to view/edit and delete each round.
    renderTable = () => {
      let table = [];
      for (const r in this.props.games) {
        table.push(
          <tr key={r}>
            <td>{this.props.games[r].date}</td>
            <td>{this.props.games[r].field}</td>
            <td><button onClick={this.props.menuOpen ? null : () => this.editGame(r)}>
                  <span className="fa fa-eye"></span></button></td>
            <td><button onClick={this.props.menuOpen ? null : () => this.confirmDelete(r)}>
                  <span className="fa fa-trash"></span></button></td>
          </tr> 
      );
    }
    return table;
  }

    render() {
      return(
      <div className="padded-page">
        <h1></h1>
        <table className="table table-hover">
          <thead className="thead-light">
          <tr>
            <th>Date</th>
            <th>Field</th>
            <th>Outcome</th>
            <th>View/Edit...</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.games).length === null?
              <tr>
              <td colSpan="5" style={{fontStyle: "italic"}}>No games logged</td>
              </tr> : this.renderTable()
            }
            
          </tbody>
        </table>
        {this.state.confirmDelete ? this.renderConfirmDeleteDialog() : null}
      </div>
      );
    }
}

export default DataPage;