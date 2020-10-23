import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

test('<App/> renders properly', () => {
  const { getByText } = render(<Router><App /></Router>);
  const comedyTab = getByText(/comedy/i);
  expect(comedyTab).toBeInTheDocument();
});
