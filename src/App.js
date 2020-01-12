import React, {Component} from 'react';
import './App.css';
import FlagForm from './FlagForm';
import worldImg from './world.jpg';

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			countries:[],
			options:[],
			answer:[]
		}
		
		this.randIndex=this.randIndex.bind(this);
		this.gameSetUp=this.gameSetUp.bind(this);
		this.resetGame=this.resetGame.bind(this);
	}
	componentDidMount(){
		const url = 'https://restcountries.eu/rest/v2/all';
		
		fetch(url)
			.then(data=>data.json())
			.then(parsedData=>{
				let gameData = this.gameSetUp(parsedData);
				this.setState(
					{
						countries:parsedData,
						options:gameData[0],
						answer:gameData[1]
					})
			})
			
		
	}
	randIndex(array){
		return Math.floor(Math.random()*array.length)
		
	}
	gameSetUp(arr){
		const options = [
				arr[this.randIndex(arr)],
				arr[this.randIndex(arr)],
				arr[this.randIndex(arr)],
				arr[this.randIndex(arr)]
			]
		const answer = options[Math.floor(Math.random()*options.length)];
		return [options,answer]
	}
	resetGame(){
		let newData=this.gameSetUp(this.state.countries);
		this.setState({options:newData[0],answer:newData[1]});
	}
	
		
		
	render(){
		let gameForm = "Loading..."
		if(this.state.countries && this.state.countries.length>0){
			gameForm = <FlagForm {...this.state} resetGame={this.resetGame}/>
		}
		
		return (
			<div className="App">
				<header
					className="title-header"
					style={{ backgroundImage: `url(${worldImg})` }}>
					<h1 className="title-text">Guess The Flag</h1>
				</header>
				<div className='game'>
					{gameForm}
				</div>
				<div className="flag">
					<img src={this.state.answer.flag} alt="flag"/>
				</div>
			</div>
		);
	}

}
  
export default App;
