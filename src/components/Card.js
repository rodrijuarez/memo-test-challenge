import React from 'react'
import ReactCardFlip from 'react-card-flip'

const Card = ({ card, index, onClick, isFlipped }) => {
  return (
    <ReactCardFlip key={`${card.id}-${index}`} isFlipped={isFlipped}>
      <div
        className={`aspect-square bg-emerald-200 hover:bg-emerald-600 hover:bg-black w-full m-w-fit h-full rounded shadow p-4 ${
          isFlipped ? '' : 'cursor-pointer'
        }`}
        onClick={() => !isFlipped && onClick(index)}
      >
        <div className="bg-black hover:bg-emerald-600 w-full h-full">
          <h2 className="text-2xl text-center -translate-y-1/2 relative inset-y-1/2 text-white">
            {index + 1}
          </h2>
        </div>
      </div>
      <div
        className={`aspect-square bg-emerald-200 w-full h-full rounded shadow p-4 ${
          isFlipped ? '' : 'cursor-pointer'
        }`}
        onClick={() => !isFlipped && onClick(index)}
      >
        <img src={card.image} alt={card.id} />
      </div>
    </ReactCardFlip>
  )
}

export default Card
