import React from "react";
import { render, screen } from '@testing-library/react';
import {BreadcrumbItemData} from "@/entities/breadcrumbs/model/types";
import ManagerRequestsPage from "@/app/manager/requests/page";

jest.mock('@/widgets/breadcrumbs/ui/BreadcrumbLayout', () => ({
    BreadcrumbLayout: ({ items }: {items: BreadcrumbItemData[]}) => (
        <div data-testid="breadcrumb">
            {items.map((item, index) => (
                <span key={index} data-testid="breadcrumb-item">{item.label}</span>
            ))}
        </div>
    ),
}));

jest.mock('@/features/manager/requests/filter-request/ui/RequestSearchInput', () => ({
    RequestSearchInput: () => <div data-testid="request-search">Request Search Mock</div>,
}))

jest.mock('@/features/manager/requests/request-table/ui/RequestTable', () => ({
    RequestTable: () => <div data-testid="request-table">Request Table Mock</div>,
}))


describe('ManagerRequestsPage', () => {
    it('renders all components correctly', () => {
        render(<ManagerRequestsPage />);

        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
        expect(screen.getByTestId('request-search')).toBeInTheDocument();
        expect(screen.getByTestId('booking-table')).toBeInTheDocument();
    })

    it('renders correct breadcrumb items', () => {
        render(<ManagerRequestsPage />);

        const breadcrumbItems = screen.getAllByTestId('breadcrumb-item');
        expect(breadcrumbItems).toHaveLength(1);
        expect(breadcrumbItems[0]).toHaveTextContent('Заявки');
    });
})


