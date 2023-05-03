import React, { useState, useEffect } from "react";
import { memoTestData } from "../utils";
import { useRouter } from "next/router";

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

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">
				{gameData.title}
			</h1>
			<div className="grid grid-cols-6 gap-4">
				{cards.map((card, index) => (
					<div
						key={`${card.id}-${index}`}
						className={`bg-white rounded shadow p-4 ${
							flippedCards.includes(
								index
							) ||
							matchedCards.includes(
								index
							)
								? ""
								: "cursor-pointer"
						}`}
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
						{flippedCards.includes(index) ||
						matchedCards.includes(index) ? (
							<img
								src={card.image}
								alt={card.id}
							/>
						) : (
							<div
								style={{
									width: "120px",
									height: "120px",
								}}
								className="bg-gray-300"
							></div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default MemoTest;
