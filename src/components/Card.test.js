import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Card from './Card'

describe('Card', () => {
  const cardMock = {
    id: 1,
    image: 'https://example.com/image.jpg',
  }

  test('renders the card component', () => {
    render(
      <Card card={cardMock} index={0} onClick={() => {}} isFlipped={false} />
    )
    const cardElement = screen.getByText('1')
    expect(cardElement).toBeInTheDocument()
  })

  test('calls onClick when card is clicked', () => {
    const onClickMock = jest.fn()
    render(
      <Card card={cardMock} index={0} onClick={onClickMock} isFlipped={false} />
    )

    fireEvent.click(screen.getByText('1'))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick when card is flipped', () => {
    const onClickMock = jest.fn()
    render(
      <Card card={cardMock} index={0} onClick={onClickMock} isFlipped={true} />
    )

    fireEvent.click(screen.getByAltText('1'))
    expect(onClickMock).toHaveBeenCalledTimes(0)
  })

  test('displays the image when card is flipped', () => {
    render(
      <Card card={cardMock} index={0} onClick={() => {}} isFlipped={true} />
    )
    const imgElement = screen.getByAltText('1')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', cardMock.image)
  })
})
