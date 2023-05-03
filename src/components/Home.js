import React, { useState, useEffect } from "react";
import { memoTestData } from "../utils";
import Link from "next/link";

import useLocalStorage from "../hooks/useLocalStorage";

const Home = () => {
	const [memoTestScores, setMemoTestScores] = useLocalStorage(
		"memoTestScores",
		{}
	);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">
				Memo Test Games
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{memoTestData.map((game) => (
					<div
						key={game.id}
						className="bg-white rounded shadow p-4 flex flex-col justify-between"
					>
						<div>
							<h2 className="text-xl font-semibold mb-2 text-black">
								{game.title}
							</h2>
							<p className="text-gray-600">
								Highest Score:{" "}
								{memoTestScores &&
								memoTestScores[
									game.id
								]
									? memoTestScores[
											game
												.id
									  ]
									: 0}
							</p>
						</div>
						<Link href={`/game/${game.id}`}>
							<p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
								Start
							</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
