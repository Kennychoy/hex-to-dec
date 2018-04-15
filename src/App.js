import React, { Component } from 'react';
import './App.css';

var msInterval;
var sInterval;
var hexObj = {'10': "A", '11': "B", "12": "C", "13": "D", "14": "E", "15": "F"};

class App extends Component {
	
	constructor(props){		
		super(props);
		this.state = {
			timerMinute: 0,
			timerSecond: 0,
			timerMs: 0,
			message: "Convert Hex value into Dec",
			hex: "??",
			dec: "???"
		}
	}	
	
	handleStart = (e) => {		
		msInterval = setInterval(() => {
			this.setState({timerMs: this.state.timerMs+1})
			if(this.state.timerMs == 99){
				this.setState({timerMs: 0})
			}
		},1);
		sInterval = setInterval(() => {
			this.setState({timerSecond: this.state.timerSecond+1})
			if(this.state.timerSecond == 60){
				this.setState({
					timerSecond: 0,
					timerMinute: this.state.timerMinute+1
				})				
			}
			if(this.state.timerMinute == 60){
				clearInterval(msInterval);
				clearInterval(sInterval);
				this.setState({message: "Anybody home??"})
			}
		},1000)
		let tempHex = '';
		for(let i=0; i<2; i++){
			tempHex += hexObj[Math.floor((Math.random() * 6) + 10)];
		}
		this.setState({hex: tempHex})		
		
		let tempAns = '';
		document.querySelectorAll(".num-btn").forEach(btn => btn.addEventListener('click', (e) => {			
			tempAns += e.target.value;
			if(tempAns.length >= 4){
				tempAns = tempAns.replace(tempAns[0], '')
			}
			this.setState({dec: tempAns})
		}));
		document.querySelector("#back").addEventListener("click", () => {
			if(tempAns.length >= 1){
				tempAns = tempAns.replace(tempAns[tempAns.length-1],'')
			}
			this.setState({dec: tempAns})
		});	

		this.handleStart = () => {return false};		
	}
	
	handleSubmit = () => {
		clearInterval(msInterval)
		clearInterval(sInterval)
		if(this.state.dec == parseInt(this.state.hex, 16)){
			this.setState({message: 'Correct'});
		} else {
			this.setState({message: 'Correct answer is ' + parseInt(this.state.hex, 16)});
		}
		this.handleStart = () => {return false};
	}
	
	handlePlayAgain = () => {
		window.location.assign(window.location.href)
	}
	
  render() {
    return (
		<div id="wrapper" value='value from x' ref='value from x'>
			<div id="board">
				<div id="title">
					<center>Hex to Dec</center>
				</div>
				<div id="timer">
					<div><span className="timer-timing" id="timer-minute">{this.state.timerMinute}</span><span>m</span></div>
					<div><span className="timer-timing" id="timer-second">{this.state.timerSecond}</span><span>s</span></div>
					<div><span className="timer-timing" id="timer-ms">{this.state.timerMs}</span><span>ms</span></div>
				</div>
				<div id="messageDiv">
					<div id="message">{this.state.message}</div>
				</div>
				<div id="qanda">
					<div id="qanda-q">
						<span className="unit">HEX</span><span className="hexanddec" id="hex">{this.state.hex}</span>
					</div>
					<div id="qanda-a">
						<span className="unit">DEC</span><span className="hexanddec" id="dec">{this.state.dec}</span>
					</div>
				</div>
				
				<div className="btns-rows">
					<button className="btn num-btn" value='1'>1</button>
					<button className="btn num-btn" value='2'>2</button>
					<button className="btn num-btn" value='3'>3</button>
				</div>
				<div className="btns-rows">
					<button className="btn num-btn" value='4'>4</button>
					<button className="btn num-btn" value='5'>5</button>
					<button className="btn num-btn" value='6'>6</button>
				</div>
				<div className="btns-rows">
					<button className="btn num-btn" value='7'>7</button>
					<button className="btn num-btn" value='8'>8</button>
					<button className="btn num-btn" value='9'>9</button>
				</div>
				<div className="btns-rows">
					<button className="btn num-btn" value='0'>0</button>
					<button className="btn" id="back" value='backward'><span className="glyphicon glyphicon-arrow-left"></span></button>
					
				</div>
				<div className="btns-rows">							
					<button className="btn" id="start" value="start" onClick={this.handleStart}>START</button>
					<button className="btn" id="submit" value="submit" onClick={this.handleSubmit}>SUBMIT</button>
					<button className="btn" id="playagain" onClick={this.handlePlayAgain}>Play Again</button>			
				</div>
			</div>
		</div>
    );
  }
}

export default App;
