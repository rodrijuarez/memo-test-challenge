import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import '@testing-library/jest-dom';

describe('Modal', () => {
  test('renders Modal component without crashing', () => {
    render(<Modal isOpen={false} />);
  });

  test('does not render Modal when isOpen is false', () => {
    render(<Modal isOpen={false}><div>Modal content</div></Modal>);
    expect(screen.queryByText('Modal content')).toBeNull();
  });

  test('renders Modal with correct content when isOpen is true', () => {
    render(<Modal isOpen={true}><div>Modal content</div></Modal>);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

});
