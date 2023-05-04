import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactCardFlip from 'react-card-flip'
import useLocalStorage from '../hooks/useLocalStorage'
import Modal from './Modal'
import Card from './Card'
import { shuffleArray } from '../utils'

const MemoTest = () => {
  const router = useRouter()

  const [memoTestProgress, setMemoTestProgress] = useLocalStorage(
    'memoTestProgress',
    {}
  )

  const { id, newGame } = router.query
  const [memoTestGames, setMemoTestGames] = useState([])
  const [gameData, setGameData] = useState(null)
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [retries, setRetries] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    async function fetchMemoTestGames() {
      const response = await fetch('http://localhost:1337/api/memo-test-games')
      const responseJSON = await response.json()
      setMemoTestGames(responseJSON.data)
    }

    fetchMemoTestGames()
  }, [setMemoTestGames])

  useEffect(() => {
    if (id && !hasStarted && memoTestGames.length) {
      const game = memoTestGames.find((game) => game.id === parseInt(id, 10))
      setGameData(game)

      if (memoTestProgress[id] && !newGame) {
        const { cards, flippedCards, matchedCards, retries } =
          memoTestProgress[id]
        setCards(cards)
        setMatchedCards(matchedCards)
        setRetries(retries)
        setHasStarted(true)
      } else {
        if (game) {
          const shuffledCards = shuffleArray([
            ...game.attributes.pairs.map((pair) => ({
              ...pair,
              isFlipped: false,
            })),
            ...game.attributes.pairs.map((pair) => ({
              ...pair,
              isFlipped: false,
            })),
          ])
          setCards(shuffledCards)
          setHasStarted(true)
        }
      }
    }
  }, [id, memoTestGames, hasStarted, memoTestProgress, newGame, setGameData])

  useEffect(() => {
    if (hasStarted) {
      setMemoTestProgress({
        ...memoTestProgress,
        [id]: {
          matchedCards,
          retries,
          cards,
        },
      })
    }
  }, [hasStarted, matchedCards, cards, retries, id])

  const handleCardClick = (clickedCardIndex) => {
    if (flippedCards.length === 2) return

    const newFlippedCards = [...flippedCards, clickedCardIndex]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setRetries(retries + 1)

      const [firstCardIndex, secondCardIndex] = newFlippedCards
      if (cards[firstCardIndex].id === cards[secondCardIndex].id) {
        setMatchedCards([...matchedCards, ...newFlippedCards])
        setFlippedCards([])
      } else {
        setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
    }
  }

	// Score Storage
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      const newScore = Math.round(
        (gameData.attributes.pairs.length / retries) * 100
      )

      const memoTestScores =
        JSON.parse(localStorage.getItem('memoTestScores')) || {}
      const currentHighScore = memoTestScores[gameData.id] || 0

      if (newScore > currentHighScore) {
        memoTestScores[gameData.id] = newScore
        localStorage.setItem('memoTestScores', JSON.stringify(memoTestScores))
      }
    }
  }, [matchedCards, cards, gameData, retries])

  if (!gameData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Modal isOpen={matchedCards.length === cards.length}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Congratulations!
          </h2>
          <p className="mb-4 text-black">
            You have completed the memo test with a score of{' '}
            {Math.round((gameData.attributes.pairs.length / retries) * 100)}.
          </p>
          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setMemoTestProgress({
                ...memoTestProgress,
                [id]: undefined,
              })
              router.push('/')
            }}
          >
            Back to Home
          </button>
        </div>
      </Modal>
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold mb-6">{gameData.attributes.title}</h1>
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded"
          onClick={() => router.push('/')}
        >
          Back to Home
        </button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            onClick={handleCardClick}
            card={card}
            index={index}
            isFlipped={
              flippedCards.includes(index) || matchedCards.includes(index)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default MemoTest
