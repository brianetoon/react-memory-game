import { useState } from 'react';
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
    // console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  return (
    <div className="App">
      <h2>Magic Match</h2>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard card={card} handleChoice={handleChoice} key={card.id}/>
        ))}
      </div>
    </div>
  );
}

export default App;
