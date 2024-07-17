import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UniversityDetailsPage from '../UniversityDetailsPage';

// Mock the localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('UniversityDetailsPage', () => {
  const renderComponent = (name: string) => {
    render(
      <MemoryRouter initialEntries={[`/university/${name}`]}>
        <Routes>
          <Route path="/university/:name" element={<UniversityDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders university details when university is found', () => {
    const mockUniversity = {
      name: 'Test University',
      country: 'Test Country',
      domains: ['test.edu'],
      web_pages: ['https://test.edu'],
    };
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([mockUniversity]));

    renderComponent('Test University');

    expect(screen.getByText('Test University')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('test.edu')).toBeInTheDocument();
    expect(screen.getByText('Visit Website')).toHaveAttribute('href', 'https://test.edu');
  });

  test('renders "University not found" when university is not found', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([]));

    renderComponent('Non-existent University');

    expect(screen.getByText('University not found')).toBeInTheDocument();
    expect(screen.getByText("We couldnt find the university you are looking for.")).toBeInTheDocument();
  });

  test('renders "N/A" for missing domain', () => {
    const mockUniversity = {
      name: 'No Domain University',
      country: 'Test Country',
      domains: [],
      web_pages: ['https://test.edu'],
    };
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([mockUniversity]));

    renderComponent('No Domain University');

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

 

  test('renders back button with correct link', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([]));

    renderComponent('Any University');

    const backButton = screen.getByText('Back to List');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });
});
