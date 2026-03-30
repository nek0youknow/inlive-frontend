import '@testing-library/jest-dom';
import 'whatwg-fetch';

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
        },
        pathname: '',
        route: '',
        asPath: '',
        query: {},
        replace: jest.fn(),
    }),
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        replace: jest.fn(),
    }),
    usePathname: () => '',
    useSearchParams: () => new URLSearchParams(),
}));