import React from "react";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/app/not-found";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            back: jest.fn(),
        };
    },
}));

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: { alt: string }) => <img alt={props.alt} />,
}));

describe("NotFoundPage", () => {
    it("renders 404 text", () => {
        render(<NotFoundPage />);
        expect(screen.getByText("Page not found")).toBeInTheDocument();
        expect(
            screen.getByText(/can't find the page/i)
        ).toBeInTheDocument();
    });

    it("has navigation buttons", () => {
        render(<NotFoundPage />);
        expect(screen.getByText("Go back")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("displays the not-found image", () => {
        render(<NotFoundPage />);
        expect(screen.getByAltText("Page not found")).toBeInTheDocument();
    });
});
