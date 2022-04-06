import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MemeViewer from './MemeViewer';
import { DummyMeme } from '../../interfaces/common';

describe('<MemeViewer />', () => {
  test('it should mount', () => {
    render(<MemeViewer meme={DummyMeme} image={undefined} />);
    
    const memeViewer = screen.getByTestId('MemeViewer');

    expect(memeViewer).toBeInTheDocument();
  });
});