import React, { useState, useEffect } from "react";
import { memoTestData } from "../utils";
import { useRouter } from "next/router";
import ReactCardFlip from "react-card-flip";
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
	const { id } = router.query;

	const [gameData, setGameData] = useState(null);
	const [cards, setCards] = useState([]);
	const [flippedCards, setFlippedCards] = useState([]);
	const [matchedCards, setMatchedCards] = useState([]);
	const [retries, setRetries] = useState(0);

	useEffect(() => {
		if (id) {
			const game = memoTestData.find(
				(game) => game.id === parseInt(id, 10)
			);
			if (game) {
				setGameData(game);

				const shuffledCards = shuffleArray([
					...game.pairs.map((pair) => ({
						...pair,
						isFlipped: false,
					})),
					...game.pairs.map((pair) => ({
						...pair,
						isFlipped: false,
					})),
				]);
				setCards(shuffledCards);
			}
		}
	}, [id]);

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

	if (!gameData) {
		return <div>Loading...</div>;
	}

	const CardWrapper = ({ children, index, card }) => {
		return (
			<div
				key={`${card.id}-${index}`}
				className={`bg-white rounded shadow p-4 ${
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
							(gameData.pairs.length /
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
			<h1 className="text-2xl font-bold mb-6">
				{gameData.title}
			</h1>
			<div className="grid grid-cols-6 gap-4">
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
								className="bg-gray-300 w-full h-full"
								style={{
									width: "120px",
									height: "120px",
								}}
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
							></div>
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
