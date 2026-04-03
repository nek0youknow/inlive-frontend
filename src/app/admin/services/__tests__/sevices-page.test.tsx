import {BreadcrumbItemData} from "@/entities/breadcrumbs/model/types";
import { render, screen } from '@testing-library/react';
import React from "react";
import AdminServicesPage from "@/app/admin/services/page";

jest.mock('@/widgets/breadcrumbs/ui/BreadcrumbLayout', () => ({
    BreadcrumbLayout: ({ items }: {items: BreadcrumbItemData[]}) => (
        <div data-testid="breadcrumb">
            {items.map((item, index) => (
                <span key={index} data-testid="breadcrumb-item">{item.label}</span>
            ))}
        </div>
    ),
}));

jest.mock('@/widgets/admin/services-filter-panel/ui/FilterPanel', () => ({
    FilterPanel: () => <div data-testid="filter-panel">Filter Panel Mock</div>,
}))

jest.mock('@/features/admin/manage-services/table-services/ui/ServicesTable', () => ({
    ServicesTable: () => <div data-testid="service-table">Service Table Mock</div>,
}))

describe("AdminServicesPage", () => {
    it("renders all components correctly", () => {
        render(<AdminServicesPage />);

        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
        expect(screen.getByTestId("filter-panel")).toBeInTheDocument();
        expect(screen.getByTestId("service-table")).toBeInTheDocument();
    })

    it('renders correct breadcrumb items', () => {
        render(<AdminServicesPage />);

        const breadcrumbItems = screen.getAllByTestId('breadcrumb-item');
        expect(breadcrumbItems).toHaveLength(2);
        expect(breadcrumbItems[0]).toHaveTextContent('Админ');
        expect(breadcrumbItems[1]).toHaveTextContent('Услуги');
    })
})