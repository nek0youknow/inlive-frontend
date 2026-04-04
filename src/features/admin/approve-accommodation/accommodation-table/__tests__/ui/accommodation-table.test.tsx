import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {AccommodationTable} from "@/features/admin/approve-accommodation/accommodation-table/ui/AccommodationTable";


global.fetch = jest.fn();


jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    }),
    usePathname: () => '/admin/accommodations-list',
    useSearchParams: () => new URLSearchParams(),
}));


describe('AccommodationTable', () => {
    // beforeEach(() => {
    //     (global.fetch as jest.Mock).mockImplementation(() =>
    //         Promise.resolve({
    //             ok: true,
    //             json: () => Promise.resolve({ items: mockAccommodations }),
    //         })
    //     );
    // });

    afterEach(()=> {
        jest.clearAllMocks();
    });

    it('renders the accommodation table with headers', async () => {
        render(<AccommodationTable />);

        expect(screen.getByText('Название')).toBeInTheDocument();
        expect(screen.getByText('Адрес')).toBeInTheDocument();
        expect(screen.getByText('Рейтинг')).toBeInTheDocument();
        expect(screen.getByText('Статус')).toBeInTheDocument();
        expect(screen.getByText('Действия')).toBeInTheDocument();
    });

    it('displays accommodation data correctly', async () => {
        render(<AccommodationTable />);

        expect(screen.getByText('Квартира \'Тихая Гавань\'')).toBeInTheDocument();;
        expect(screen.getByText('Абая 32А')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('shows approval status correctly', async () => {
        render(<AccommodationTable />);

        await waitFor(() => {
            expect(screen.getByText('Квартира \'Тихая Гавань\'')).toBeInTheDocument();
        });

        const pendingStatusElements = screen.getAllByText('На рассмотрении');
        const approvedStatusElements = screen.getAllByText('Одобрено');

        expect(pendingStatusElements.length).toBeGreaterThan(0);
        expect(approvedStatusElements.length).toBeGreaterThan(0);
    });

});