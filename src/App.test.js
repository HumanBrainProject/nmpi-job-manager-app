import React from 'react';
import { render,screen ,cleanup} from '@testing-library/react';
import App from './App';


const auth={key: 5000,};
afterEach(cleanup);
test('should render app', () => {
  const { getByText } = render(<App auth={auth} />);

  const jobManagerLink = screen.getByTestId('job-manager-link');
  expect(jobManagerLink).toBeInTheDocument();

  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
