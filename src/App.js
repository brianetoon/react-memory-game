import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet.png" },
  { "src": "/img/potion.png" },
  { "src": "/img/ring.png" },
  { "src": "/img/scroll.png" },
  { "src": "/img/shield.png" },
  { "src": "/img/sword.png" }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    // not here
  }

  // compare 2 selected cards
  useEffect(() => {

    if (choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log('those cards match!')
      } else {
        console.log('those cards do not match')
      }
      resetTurn()
    }

  }, [choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h2>Magic Match</h2>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard card={card} handleChoice={handleChoice} key={card.id}/>
        ))}
      </div>
    </div>
  );
}

export default App;
