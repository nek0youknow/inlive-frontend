import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RequestTable } from '@/features/manager/requests/request-table/ui/RequestTable';

describe('RequestTable interactions', () => {
  it('renders table headers', () => {
    render(<RequestTable />);

    expect(screen.getByText('Клиент')).toBeInTheDocument();
    expect(screen.getByText('Даты')).toBeInTheDocument();
    expect(screen.getByText('Стоимость')).toBeInTheDocument();
    expect(screen.getByText('Кол-во гостей')).toBeInTheDocument();
    expect(screen.getByText('Статус')).toBeInTheDocument();
    expect(screen.getByText('Действия')).toBeInTheDocument();
  });

  it('opens popup on "Откликнуться" click and toggles to "Отмена" after choosing an option, then back', () => {
    render(<RequestTable />);

    // Initially, multiple rows each have an "Откликнуться" button
    const respondButtons = screen.getAllByRole('button', { name: 'Откликнуться' });
    expect(respondButtons.length).toBeGreaterThan(0);

    // Click the first row's respond button
    fireEvent.click(respondButtons[0]);

    // Popup appears with three explicit options
    const acceptBtn = screen.getByRole('button', { name: 'Принять цену' });
    const proposeBtn = screen.getByRole('button', { name: 'Предложить цену' });
    const hideBtn = screen.getByRole('button', { name: 'Скрыть' });
    expect(acceptBtn).toBeInTheDocument();
    expect(proposeBtn).toBeInTheDocument();
    expect(hideBtn).toBeInTheDocument();

    // Choose one option (e.g., Принять цену)
    fireEvent.click(acceptBtn);

    // Popup should close and the clicked row's main button becomes "Отмена"
    expect(screen.queryByRole('button', { name: 'Принять цену' })).not.toBeInTheDocument();

    // Now at least one cancel button should be present
    const cancelButtons = screen.getAllByRole('button', { name: 'Отмена' });
    expect(cancelButtons.length).toBeGreaterThan(0);

    // Number of "Откликнуться" buttons should be reduced by one
    const respondButtonsAfter = screen.getAllByRole('button', { name: 'Откликнуться' });
    expect(respondButtonsAfter.length).toBe(respondButtons.length - 1);

    // Click the same row's "Отмена" to revert (use the first cancel we find)
    fireEvent.click(cancelButtons[0]);

    // After reverting, the total number of "Откликнуться" buttons should restore
    const respondButtonsFinal = screen.getAllByRole('button', { name: 'Откликнуться' });
    expect(respondButtonsFinal.length).toBe(respondButtons.length);
  });
});
