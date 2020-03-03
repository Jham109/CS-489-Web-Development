import React from 'react';
import FloatingButton from './FloatingButton.js';
import DataPage from './DataPage.js';
import AddData from './AddData.js';
import AppMode from "./../AppMode.js";


class Games extends React.Component {

    //Initialize games object based on local storage
    constructor(props) {
        super(props);
        let data = JSON.parse(localStorage.getItem("ismanagerUserData"));
        this.state = {games: data [this.props.userId].games, 
                    gameCount: data[this.props.userId].gameCount,
                    deleteId: "",
                    editId: ""};
    }

    //setDeleteId -- Capture in this.state.deleteId the unique id of the item
    //the user is considering deleting.
    setDeleteId = (val) => {
        this.setState({deleteId: val});
    }

    //setEditId -- Capture in this.state.editId the unique id of the item
    //the user is considering editing.
    setEditId = (val) => {
        this.setState({editId: val});
    }
    
    //addRound -- Given an object newData containing a new game, add the game
    //to the current user's list of games, commit to local storage, and toggle
    //the mode back to AppMode.ADD since the user is done adding a round.
    addGame = (newData) => {
        let data = JSON.parse(localStorage.getItem("ismanagerUserData"));
        let newGames = this.state.games;
        newData.gameNum = this.state.gameCount + 1;
        newGames[this.state.gameCount + 1] = newData;
        data[this.props.userId].games = newGames;
        data[this.props.userId].gameCount = this.state.gameCount + 1;
        localStorage.setItem("ismanagerUserData",JSON.stringify(data));
        this.setState({games: newGames, gameCount: newData.gameNum});
        this.props.changeMode(AppMode.GAMES);
    }

    //editGame -- Given an object newData containing updated data on an
    //existing game, update the current user's game uniquely identified by
    //this.state.editId, commit to local storage, reset editId to empty and
    //toggle the mode back to AppMode.DATA since the user is done editing the
    //game. 
    editGame = (newData) => {
        let data = JSON.parse(localStorage.getItem("ismanagerUserData")); 
        let newGames = this.state.games;
        newGames[this.state.editId] = newData;
        data[this.props.userId].games = newGames;
        localStorage.setItem("ismanagerUserData",JSON.stringify(data));
        this.setState({games: newGames, editId: ""});
        this.props.changeMode(AppMode.GAMES);
    }

    //deleteGame -- Delete the current user's game uniquely identified by
    //this.state.deleteId, commit to local storage, and reset deleteId to empty.
    deleteGame = () => {
        let data = JSON.parse(localStorage.getItem("ismanagerUserData"));
        let newGames = this.state.games;
        delete newGames[this.state.deleteId];
        data[this.props.userId].games = newGames;
        localStorage.setItem("ismanagerUserData",JSON.stringify(data));
        this.setState({games: newGames, deleteId: ""});
    }

    //Render the Games page based on the mode
    render() {
        switch(this.props.mode) {
            case AppMode.GAMES:
                return (
                  <React.Fragment>
                  <DataPage 
                    games={this.state.games}
                    setEditId={this.setEditId}
                    setDeleteId={this.setDeleteId}
                    deleteGame={this.deleteGame}
                    changeMode={this.props.changeMode}
                    menuOpen={this.props.menuOpen} /> 
                  <FloatingButton
                      handleClick={() => 
                        this.props.changeMode(AppMode.ADD)}
                      menuOpen={this.props.menuOpen}
                      icon={"fa fa-plus"} />
                  </React.Fragment>
                );
            case AppMode.ADD:
                return (
                    <AddData
                       mode={this.props.mode}
                       startData={""} 
                       saveGame={this.addGame} />
                );
            case AppMode.EDIT:
                return (
                    <AddData
                      mode={this.props.mode}
                      startData={this.state.games[this.state.editId]} 
                      saveGame={this.editGame} />
                );
        }
    }
}

export default Games;
