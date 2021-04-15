import React from 'react';
import { render , cleanup, fireEvent} from '@testing-library/react';
import JobDetail from './JobDetail.js';

afterEach(cleanup);

test('renders learn react link', () => {
    const { getByText } = render(<JobDetail />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });