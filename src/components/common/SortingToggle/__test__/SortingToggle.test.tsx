import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortDropdown from '../SortingToggle';


describe('SortDropdown', () => {
  test('calls the onChange callback with the correct value when toggled', () => {
    const mockOnChange = jest.fn();
    render(<SortDropdown onChange={mockOnChange} />);

    const toggleButton = screen.getByRole('button');
    
    // Initial state (A-Z)
    expect(screen.getByText('A-Z')).toHaveClass('active');
    expect(screen.getByText('Z-A')).not.toHaveClass('active');

    // Toggle to Z-A
    fireEvent.click(toggleButton);
    expect(mockOnChange).toHaveBeenCalledWith('desc');
    expect(screen.getByText('A-Z')).not.toHaveClass('active');
    expect(screen.getByText('Z-A')).toHaveClass('active');

    // Toggle back to A-Z
    fireEvent.click(toggleButton);
    expect(mockOnChange).toHaveBeenCalledWith('asc');
    expect(screen.getByText('A-Z')).toHaveClass('active');
    expect(screen.getByText('Z-A')).not.toHaveClass('active');
  });

  test('renders the toggle button with correct accessibility attributes', () => {
    render(<SortDropdown onChange={jest.fn()} />);

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton).toHaveAttribute('type', 'button');
  });

  test('handles keyboard events correctly', () => {
    const mockOnChange = jest.fn();
    render(<SortDropdown onChange={mockOnChange} />);

    const toggleButton = screen.getByRole('button');
    
    // Press Enter key
    fireEvent.keyDown(toggleButton, { key: 'Enter' });
    expect(mockOnChange).toHaveBeenCalledWith('desc');

    // Press Space key
    fireEvent.keyDown(toggleButton, { key: ' ' });
    expect(mockOnChange).toHaveBeenCalledWith('asc');
  });

  test('renders the correct visually hidden text', () => {
    render(<SortDropdown onChange={jest.fn()} />);

    expect(screen.getByText('Sort A to Z')).toBeInTheDocument();
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Sort Z to A')).toBeInTheDocument();
  });
});
