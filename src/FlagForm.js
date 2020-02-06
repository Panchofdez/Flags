import React, {Component} from 'react';

class FlagForm extends Component {
	// static defaultProps ={
	// 	resetGame(){}
	// }
	constructor(props){
	super(props);
	this.state=
		{
			selectedOption:undefined,
			guessedCorrect:undefined
			
		}
		this.handleOptionChange=this.handleOptionChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.restartGame=this.restartGame.bind(this);
	}
	handleOptionChange(event){
		this.setState({selectedOption:event.target.value});
	}
	handleSubmit(event){
		event.preventDefault();
		if(this.state.selectedOption===this.props.answer.name){
			this.props.trackProgress(true);
			this.setState({guessedCorrect:true})
		}else{
			this.props.trackProgress(false);
			this.setState({guessedCorrect:false})
		}
		
	}
	restartGame(){
		this.props.resetGame();
		this.setState(
			{
				selectedOption:undefined,
				guessedCorrect:undefined
			})
	}
	render(){
		const {options}= this.props;
		let	countryOptions = options.map((country,index)=>(
					<div key={index}>
						<label>
							<input 
								type="radio" 
								checked={this.state.selectedOption===country.name} 
								name="country" 
								value={country.name}
								onChange={this.handleOptionChange}/>
							{country.name}
						</label>
					</div>
			))
		if (this.state.guessedCorrect===undefined){
			return(
				<form onSubmit={this.handleSubmit}>
					{countryOptions}
					<div>
						<button type="submit">Guess</button>
					</div>
				</form>

			)
		}else if (this.state.guessedCorrect===true){
			return (
				<div>
					<p>You Guessed Correctly! It was {this.state.selectedOption}</p>
					<button onClick={this.restartGame}>Play Again</button>
				</div>
			)
		}else{
			return(
				<div>
					<p>You were wrong. The right answer was {this.props.answer.name}</p>
					<button onClick={this.restartGame}>Try Again</button>
				</div>
			)
		}	
		
	}
}

export default FlagForm;