import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './func'; // Replace with the path to your App.js file

describe('App component', () => {
  it('should render the table header correctly', () => {
    render(<App />);

    const tableHeader = screen.getByRole('columnheader', { name: /tổng thu nhập/i });
    expect(tableHeader).toBeInTheDocument();

    // Add similar assertions for other table headers
  });

  it('should calculate income tax correctly for different scenarios', () => {
    const salary = 20000000;
    const person = 1;

    render(<App salary={salary} person={person} />);

    // Access calculated income tax (implementation detail)
    const appInstance = render.getInstance();
    const incomeTaxes = salary - appInstance.props.personalDeduction - appInstance.props.dependentsDeduction * person;

    // Expect table body with income tax details
    const tableBody = screen.getByRole('group');
    expect(tableBody).toBeInTheDocument();

    const incomeTaxRow = screen.getByText(/số tiền tính thuế thu nhập cá nhân/i);
    expect(incomeTaxRow).toBeInTheDocument();
    expect(incomeTaxRow.textContent).toContain(formatCurrency(incomeTaxes)); // Assuming formatCurrency is a tested function

    // Add similar test cases for other income tax scenarios, checking for specific tax brackets and values in the table
  });
});
