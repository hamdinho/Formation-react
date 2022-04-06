import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MemeForm from './MemeForm';
import { DummyMeme } from '../../interfaces/common';

describe('<MemeForm />', () => {
  test('it should mount', () => {
    render(<MemeForm  images={[]} currentMeme={DummyMeme} onInputValueChange={()=>{}} />);
    
    const memeForm = screen.getByTestId('MemeForm');

    expect(memeForm).toBeInTheDocument();
  });
});