import React from 'react';
import { render , cleanup, fireEvent} from '@testing-library/react';
import index from '../index.js';
import { BrowserRouter } from 'react-router-dom';


afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

}));
test('renders index', () => {
    const { getByText } = render(<BrowserRouter><index  /></BrowserRouter> );
    // const linkElement = getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });