import React from 'react';
import { render , cleanup, fireEvent} from '@testing-library/react';
import CreateJob from './CreateJob.js';
import { BrowserRouter } from 'react-router-dom';

const auth={key: 5000,};
afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

}));
test('renders learn react link', () => {
    const { getByText } = render(<BrowserRouter><CreateJob auth={auth} /></BrowserRouter> );
    // const linkElement = getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });