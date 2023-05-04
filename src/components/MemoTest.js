import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactCardFlip from "react-card-flip";
import useLocalStorage from "../hooks/useLocalStorage";
import Modal from "./Modal";

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const MemoTest = () => {
	const router = useRouter();

	const [memoTestProgress, setMemoTestProgress] = useLocalStorage(
		"memoTestProgress",
		{}
	);

	const { id, newGame } = router.query;
	const [memoTestGames, setMemoTestGames] = useState([])
	const [gameData, setGameData] = useState(null);
	const [cards, setCards] = useState([]);
	const [flippedCards, setFlippedCards] = useState([]);
	const [matchedCards, setMatchedCards] = useState([]);
	const [retries, setRetries] = useState(0);
	const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    async function fetchMemoTestGames() {
      const response = await fetch("http://localhost:1337/api/memo-test-games");
      const responseJSON = await response.json();
      setMemoTestGames(responseJSON.data);
    }

    fetchMemoTestGames();
  }, []);

	useEffect(() => {
		if (id && !hasStarted) {

			const game = memoTestGames.find(
				(game) => game.id === parseInt(id, 10)
			);
				setGameData(game);

			if(memoTestProgress[id] && !newGame) {
				const {cards, flippedCards, matchedCards, retries} = memoTestProgress[id]
				setCards(cards)
				setMatchedCards(matchedCards)
				setRetries(retries)
			setHasStarted(true)
			} else{
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
				]);
				setCards(shuffledCards);
			setHasStarted(true)
			}
			}
		}
	}, [id, memoTestGames]);

	useEffect(() => {
		if (hasStarted) {

		setMemoTestProgress({...memoTestProgress, [id]: {
			matchedCards,
			retries,
			cards,
		}})
		}
	}, [hasStarted,matchedCards, cards, retries])

	const handleCardClick = (clickedCardIndex) => {
		if (flippedCards.length === 2) return;

		const newFlippedCards = [...flippedCards, clickedCardIndex];
		setFlippedCards(newFlippedCards);

		if (newFlippedCards.length === 2) {
			setRetries(retries + 1);

			const [firstCardIndex, secondCardIndex] =
				newFlippedCards;
			if (
				cards[firstCardIndex].id ===
				cards[secondCardIndex].id
			) {
				setMatchedCards([
					...matchedCards,
					...newFlippedCards,
				]);
				setFlippedCards([]);
			} else {
				setTimeout(() => {
					setFlippedCards([]);
				}, 1000);
			}
		}
	};

	useEffect(() => {
		if (matchedCards.length === cards.length && cards.length > 0) {
			const newScore = Math.round(
				(gameData.attributes.pairs.length / retries) * 100
			);

			const memoTestScores =
				JSON.parse(
					localStorage.getItem("memoTestScores")
				) || {};
			const currentHighScore =
				memoTestScores[gameData.id] || 0;

			if (newScore > currentHighScore) {
				memoTestScores[gameData.id] = newScore;
				localStorage.setItem(
					"memoTestScores",
					JSON.stringify(memoTestScores)
				);
			}
		}
	}, [matchedCards, cards, gameData, retries]);

	if (!gameData) {
		return <div>Loading...</div>;
	}

	const CardWrapper = ({ children, index, card }) => {
		return (
			<div
				key={`${card.id}-${index}`}
				className={`aspect-square bg-white w-full h-full rounded shadow p-4 ${
					flippedCards.includes(index) ||
					matchedCards.includes(index)
						? ""
						: "cursor-pointer"
				}`}
				onClick={() => {
					if (
						!flippedCards.includes(index) &&
						!matchedCards.includes(index)
					) {
						handleCardClick(index);
					}
				}}
			>
				{children}
			</div>
		);
	};

	return (
		<div className="container mx-auto p-4">
			<Modal isOpen={matchedCards.length === cards.length}>
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4 text-black">
						Congratulations!
					</h2>
					<p className="mb-4 text-black">
						You have completed the memo test
						with a score of{" "}
						{Math.round(
							(gameData.attributes.pairs.length /
								retries) *
								100
						)}
						.
					</p>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded"
						onClick={() => router.push("/")}
					>
						Back to Home
					</button>
				</div>
			</Modal>
			<div className="flex justify-between mb-2">
				<h1 className="text-2xl font-bold mb-6">
					{gameData.attributes.title}
				</h1>
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() => router.push("/")}
				>
					Back to Home
				</button>
			</div>
			<div className="grid grid-cols-6 gap-4"
		>
				{cards.map((card, index) => (
					<ReactCardFlip
						key={`${card.id}-${index}`}
						isFlipped={
							flippedCards.includes(
								index
							) ||
							matchedCards.includes(
								index
							)
						}
					>
						<CardWrapper
							index={index}
							card={card}

						>
							<div
								className="bg-black w-full h-full"
								onClick={() => {
									if (
										!flippedCards.includes(
											index
										) &&
										!matchedCards.includes(
											index
										)
									) {
										handleCardClick(
											index
										);
									}
								}}
							>
					<h2 className="text-2xl text-center -translate-y-1/2 relative inset-y-1/2	text-white">{index + 1}</h2>
					</div>
						</CardWrapper>
						<CardWrapper
							index={index}
							card={card}
						>
							<img
								src={card.image}
								alt={card.id}
							/>
						</CardWrapper>
					</ReactCardFlip>
				))}
			</div>
		</div>
	);
};

export default MemoTest;
