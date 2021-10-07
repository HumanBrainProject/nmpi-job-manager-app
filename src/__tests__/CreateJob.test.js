import React from 'react';
import { render , cleanup, fireEvent} from '@testing-library/react';
import CreateJob from '../Queue/CreateJob.js';
import { BrowserRouter } from 'react-router-dom';

const auth={token: 5000,};
afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

}));
test('check if form displayed', () => {
    const { getByTestId,getByText } = render(<BrowserRouter><CreateJob auth={auth} /></BrowserRouter> );
    // const linkElement = getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  const hardwareList =getByTestId('hardwareList')
  expect(hardwareList).toBeInTheDocument();

  });