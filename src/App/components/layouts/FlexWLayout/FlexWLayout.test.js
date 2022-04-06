import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlexWLayout from './FlexWLayout';

describe('<FlexWLayout />', () => {
  test('it should mount', () => {
    render(<FlexWLayout />);
    
    const flexWLayout = screen.getByTestId('FlexWLayout');

    expect(flexWLayout).toBeInTheDocument();
  });
});