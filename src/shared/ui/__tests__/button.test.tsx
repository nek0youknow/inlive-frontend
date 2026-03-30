import {Button} from "@/shared/ui/button";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';


describe('Button', () => {
    it('renders correctly', () => {
        render(<Button>Тестовая кнопка</Button>);
        expect(screen.getByRole('button', { name: /тестовая кнопка/i })).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', async () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Нажми меня</Button>);

        await userEvent.click(screen.getByRole('button', { name: /нажми меня/i }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies variant classes correctly', () => {
        render(<Button variant="destructive">Деструктивная</Button>);
        const button = screen.getByRole('button', { name: /деструктивная/i });
        expect(button).toHaveClass('bg-destructive');
    });

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Недоступная кнопка</Button>);
        expect(screen.getByRole('button', { name: /недоступная кнопка/i })).toBeDisabled();
    });

});
