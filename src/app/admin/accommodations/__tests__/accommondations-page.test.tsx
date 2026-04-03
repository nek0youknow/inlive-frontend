import React from "react";
import { render, screen } from '@testing-library/react';
import {BreadcrumbItemData} from "@/entities/breadcrumbs/model/types";
import AdminAccommodationsPage from "@/app/admin/accommodations/page";

jest.mock('@/widgets/breadcrumbs/ui/BreadcrumbLayout', () => ({
    BreadcrumbLayout: ({ items }: {items: BreadcrumbItemData[]}) => (
        <div data-testid="breadcrumb">
            {items.map((item, index) => (
                <span key={index} data-testid="breadcrumb-item">{item.label}</span>
            ))}
        </div>
    ),
}));

jest.mock('@/widgets/admin/accommodations-list/accommodations-list-filter-panel/ui/FilterPanel', () => ({
    FilterPanel: () => <div data-testid="filter-panel">Filter Panel Mock</div>,
}))

jest.mock('@/features/admin/approve-accommodation/accommodation-table/ui/AccommodationTable', () => ({
    AccommodationTable: () => <div data-testid="accommodation-table">Accommodation Table Mock</div>,
}))


describe('AdminAccommodationsPage', () => {
    it('renders all components correctly', () => {
        render(<AdminAccommodationsPage />);

        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
        expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
        expect(screen.getByTestId('accommodation-table')).toBeInTheDocument();
    })

    it('renders correct breadcrumb items', () => {
        render(<AdminAccommodationsPage />);

        const breadcrumbItems = screen.getAllByTestId('breadcrumb-item');
        expect(breadcrumbItems).toHaveLength(2);
        expect(breadcrumbItems[0]).toHaveTextContent('Админ');
        expect(breadcrumbItems[1]).toHaveTextContent('Accommodations');
    });
})


