import React from 'react'
import { Meta, Story } from '@storybook/react'
import Modal from '../components/Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: {
      control: {
        type: 'boolean',
      },
    },
  },
}

const Template = (args) => (
  <Modal {...args}>
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Example Modal Content
      </h2>
      <p className="mb-4 text-black">
        This is an example of what the modal content might look like.
      </p>
    </div>
  </Modal>
)

export const Primary = Template.bind({})
Primary.args = {
  isOpen: true,
}
