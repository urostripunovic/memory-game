import { Component } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {cards: [], turns: 0, choiceOne: null, choiceTwo: null, startingCards: [
      { "src": "/img/helmet-1.png", matched: false },
      { "src": "/img/potion-1.png", matched: false },
      { "src": "/img/ring-1.png", matched: false },
      { "src": "/img/scroll-1.png", matched: false },
      { "src": "/img/shield-1.png", matched: false },
      { "src": "/img/sword-1.png", matched: false },
      ]};
    this.shuffleCards = this.shuffleCards.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.resetTurn = this.resetTurn.bind(this);
  }

  //Shuffle the cards in a 2d grid, set the state for the cards and turns, glöm inte sätta id på varje kort.
  shuffleCards() {
    const shuffledCards = [...this.state.startingCards, ...this.state.startingCards]
    .map(cards => ({...cards, id: Math.random()})); //varje spel pjäs har ett unikt id.

    //Fisher-Yates Shuffle, 2D tillämpad
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      for (let j = shuffledCards.length - 1; j > 0; j--) {
        let x = Math.floor(Math.random() * (i + 1));
        let y = Math.floor(Math.random() * (j + 1));

        let temp = shuffledCards[i,j];
        shuffledCards[i,j] = shuffledCards[x,y];
        shuffledCards[x,y] = temp;
      }
    }

    this.setState({cards : shuffledCards, turns : 0, choiceOne: null, choiceTwo: null});
  }
  
  handleChoice(card) {
    !this.state.choiceOne ? this.setState({choiceOne: card}) : this.setState({choiceTwo: card});
  }

  componentDidMount() {
    this.shuffleCards();
  }

  componentDidUpdate() {
    if (this.state.choiceOne && this.state.choiceTwo) {
      if (this.state.choiceOne.src === this.state.choiceTwo.src) {
        this.setState(prevState => (
          {cards: prevState.cards.map(card => card.src === prevState.choiceOne.src ? {...card, matched: true} : card)}
        ));
        this.resetTurn();
      } else {
        setTimeout(() => this.resetTurn(), 1000); //Ge spelare en chans att komma ihåg va det var för kort
      }
    }
  }

  resetTurn(){
    this.setState(prevState => (
      {turns: prevState.turns + 1, choiceOne: null, choiceTwo: null}
    ));
  }

  render() {
    return (
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={this.shuffleCards}>New Game</button>

        <div className='card-grid'>
          {this.state.cards.map(card => (
            <SingleCard 
              card={card} 
              key={card.id} 
              handleChoice={this.handleChoice}
              flipped={card === this.state.choiceOne || card === this.state.choiceTwo || card.matched}
              />
          ))}
        </div>
        <p>Turns: {this.state.turns}</p>
      </div>
    );
  }
}
export default App