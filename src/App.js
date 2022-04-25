import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet.png", matched: false },
  { "src": "/img/potion.png", matched: false },
  { "src": "/img/ring.png", matched: false },
  { "src": "/img/scroll.png", matched: false },
  { "src": "/img/shield.png", matched: false },
  { "src": "/img/sword.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {

    if (choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()

      } else {
        setTimeout(() => resetTurn(), 800)
      }
    }

  }, [choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h2>Magic Match</h2>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            card={card} 
            handleChoice={handleChoice} 
            key={card.id} 
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled} />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
