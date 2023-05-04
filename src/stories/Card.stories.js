import React from 'react'
import Card from '../components/Card'
import { action } from '@storybook/addon-actions';

export default {
  title: 'Card',
  component: Card,
}

const Template = (args) => (
  <div className="bg-white aspect-square h-52">
    <Card {...args} />
  </div>
)

export const Flipped = Template.bind({})
Flipped.args = {
  card: {
    id: 1,
    image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=250&h=250&fit=crop',
  },
  index: 0,
  onClick: action('onClick event'),
  isFlipped: true,
}

export const NotFlipped = Template.bind({})
NotFlipped.args = {
  card: {
    id: 1,
    image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=250&h=250&fit=crop',
  },
  index: 0,
  onClick: action('onClick event'),
  isFlipped: false,
}
