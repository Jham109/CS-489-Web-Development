class Display extends React.Component {

    constructor(props) {
        super(props);
        this.temp = 68;
        this.units = "F";
      }

    componentDidMount() {
        this.timer = setInterval(
          () => this.updateTime(),
          1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.temp);
    }

    updateTime() {
        this.setState({
          date: new Date()
        });
      }

    upBtnClick = () =>{
      this.temp++;
    }

    downBtnClick = () =>{
      this.temp--;
    }

    updateUnits = () =>{
      if(this.units == "F")
      {
        this.units = "C";
        this.temp = (this.temp -32) *(5/9);
      }else{
        this.units = "F";
        this.temp = (this.temp * (9/5)) +32;
      }
    }

    disableBtn = () => {
      
    }
    render() {
      return (
        <div className="tempDisplay">
          <h2 className="temp">{this.temp}&#176;{this.units} </h2>
          <div className="buttons">
            <button className="fas fa-arrow-circle-up" onClick={this.upBtnClick} disabled={(this.temp >= 80 && this.units == "F") || (this.temp >= 27 && this.units == "C")? true : false}> </button>
            <button className="fas fa-arrow-circle-down " onClick={this.downBtnClick} disabled={(this.temp <= 50 && this.units == "F") || (this.temp <= 10 && this.units == "C")? true : false}></button>
          </div>
          <div class="toggleSwitch">
            <label class="switch">
              <input type="checkbox" onClick={this.updateUnits}></input>
              <span class="slider round"></span>             
            </label>
          </div>

        </div>
      );
    }
  }

  ReactDOM.render(
    <Display />,
    document.getElementById('adjust')
  );