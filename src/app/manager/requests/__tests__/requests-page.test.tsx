import React from "react";
import { render, screen } from "@testing-library/react";
import { BreadcrumbItemData } from "@/entities/breadcrumbs/model/types";
import ManagerRequestsPage from "@/app/manager/requests/page";

jest.mock("@/widgets/breadcrumbs/ui/BreadcrumbLayout", () => ({
    BreadcrumbLayout: ({ items }: { items: BreadcrumbItemData[] }) => (
        <div data-testid="breadcrumb">
            {items.map((item, index) => (
                <span key={index} data-testid="breadcrumb-item">
                    {item.label}
                </span>
            ))}
        </div>
    ),
}));

jest.mock(
    "@/widgets/manage-list-accommodations/accommodations-filter/ui/ManagerAccommodationFilterPanel",
    () => ({
        ManagerAccommodationFilterPanel: () => (
            <div data-testid="filter-panel">Filter Panel Mock</div>
        ),
    })
);

jest.mock(
    "@/widgets/manage-list-accommodations/accommodations-list/ui/AccommodationList",
    () => ({
        AccommodationList: () => (
            <div data-testid="accommodation-list">List Mock</div>
        ),
    })
);

describe("ManagerRequestsPage", () => {
    it("renders all components correctly", () => {
        render(<ManagerRequestsPage />);

        expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
        expect(screen.getByTestId("filter-panel")).toBeInTheDocument();
        expect(screen.getByTestId("accommodation-list")).toBeInTheDocument();
    });

    it("renders correct breadcrumb items", () => {
        render(<ManagerRequestsPage />);

        const breadcrumbItems = screen.getAllByTestId("breadcrumb-item");
        expect(breadcrumbItems).toHaveLength(2);
        expect(breadcrumbItems[0]).toHaveTextContent("Главная");
        expect(breadcrumbItems[1]).toHaveTextContent(
            "Заявки по Accommodation"
        );
    });
});
