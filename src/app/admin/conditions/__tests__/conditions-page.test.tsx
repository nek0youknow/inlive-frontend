import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminConditionsPage from "@/app/admin/conditions/page";
import {BreadcrumbItemData} from "@/entities/breadcrumbs/model/types";


jest.mock('@/widgets/breadcrumbs/ui/BreadcrumbLayout', () => ({
    BreadcrumbLayout: ({ items }: {items: BreadcrumbItemData[]}) => (
        <div data-testid="breadcrumb">
            {items.map((item, index) => (
                <span key={index} data-testid="breadcrumb-item">{item.label}</span>
            ))}
        </div>
    ),
}));


jest.mock('@/widgets/admin/conditions/conditions-filter-panel/ui/FilterPanel', () => ({
    FilterPanel: () => <div data-testid="filter-panel">Filter Panel Mock</div>,
}));

jest.mock('@/features/admin/manage-conditions/condition-table/ui/ConditionTable', () => ({
    ConditionTable: () => <div data-testid="condition-table">Condition Table Mock</div>,
}));


describe('AdminConditionsPage', () => {
    it('renders all components correctly', () => {
        render(<AdminConditionsPage />);

        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
        expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
        expect(screen.getByTestId('condition-table')).toBeInTheDocument();
    });

    it('renders correct breadcrumb items', () => {
        render(<AdminConditionsPage />);

        const breadcrumbItems = screen.getAllByTestId('breadcrumb-item');
        expect(breadcrumbItems).toHaveLength(2);
        expect(breadcrumbItems[0]).toHaveTextContent('Админ');
        expect(breadcrumbItems[1]).toHaveTextContent('Условия');
    });
});
