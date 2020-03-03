import React from 'react';
import AppMode from '../AppMode.js';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        //Create date object for today, taking time zone into consideration
        let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
        //store date as ISO string
        if(this.props.mode === AppMode.ADD)
        {
          this.state = {date:  today.toISOString().substr(0,10), 
                        field: "",
                        outcome: "Win",};
        } else {
          //if editing an existing round, the starting state is the round's
          //current data
          this.state = this.props.startData;
          this.state.faIcon = "fa fa-edit";
          this.state.btnLabel = "Update Round Data";
        }   
      }
    
      handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
      }
    
      handleSubmitCallback = () => {
        this.setState({submitIcon: "fa fa-save", submitLabel: "Save Data"});
        let data = this.state;
        delete data.submitIcon;
        delete data.submitLabel;
        localStorage.setItem("userData",JSON.stringify(data));
        alert("Local user data now contains " + localStorage.getItem("userData"));
      }
  
     //handleSubmit -- When the user clicks on the button to save/update the
    //round, start the spinner and invoke the parent component's saveRound
    //method to do the actual work. Note that saveRound is set to the correct
    //parent method based on whether the user is logging a new round or editing
    //an existing round.
    handleSubmit = (event) => {
      //start spinner
      this.setState({faIcon: "fa fa-spin fa-spinner",
                     btnLabel: (this.props.mode === AppMode.ADD ? 
                                  "Saving..." : "Updating...")});
      //Prepare current round data to be saved
      let gameData = this.state;
      delete gameData.faIcon;
      delete gameData.btnLabel;
      //call saveRound on 1 second delay to show spinning icon
      setTimeout(this.props.saveGame,1000,gameData); 
      event.preventDefault(); 
    }
    
      render() {
        return (
          <div className = "padded-page">
          <form onSubmit={this.handleSubmit}>
            <center>
              <label>
                Date:
                <input name="date" className="form-control" 
                  type="date" value={this.state.date} onChange={this.handleChange} />
              </label>
              <p></p>
              <label>
                Field:
                <input name="field" className="form-control" type="text"
                  value={this.state.field} onChange={this.handleChange}
                  placeholder="Field played" size="50" maxLength="50" />
              </label>
            <p></p>
            <label>Outcome:
            <select name="outcome" value={this.state.outcome} 
              className="form-control form-center" onChange={this.handleChange}>
              <option value="practice">Win</option>
              <option value="tournament">Loss</option>
            </select> 
            </label>
            <p></p>
            <button type="submit" style={{width: "70%",fontSize: "36px"}} 
            className="btn btn-primary btn-color-theme">
              <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}
            </button>
            </center>
          </form>
          </div>
        );
      }
}

export default AddPage;
