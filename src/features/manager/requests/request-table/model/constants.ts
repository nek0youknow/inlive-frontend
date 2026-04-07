import { AccSearchRequest } from "@/entities/request/model/types";

export const data: AccSearchRequest[] = [
    {
        id: 1,
        authorId: 101,
        fromDate: "2025-01-01",
        toDate: "2025-01-07",
        countOfPeople: 5,
        price: 20000,
        status: "Открыт к запросам по цене",
        fromRating: 4,
        toRating: 5
    },
    {
        id: 2,
        authorId: 102,
        fromDate: "2025-01-10",
        toDate: "2025-01-15",
        countOfPeople: 3,
        price: 28000,
        status: "Запрос был сделан",
        fromRating: 3,
        toRating: 5
    },
    {
        id: 3,
        authorId: 103,
        fromDate: "2025-02-01",
        toDate: "2025-02-10",
        countOfPeople: 2,
        price: 40000,
        status: "Подтверждено",
        fromRating: 4,
        toRating: 5
    },
    {
        id: 4,
        authorId: 104,
        fromDate: "2025-02-15",
        toDate: "2025-02-20",
        countOfPeople: 4,
        price: 25000,
        status: "Открыт к запросам по цене",
        fromRating: 3,
        toRating: 4
    },
    {
        id: 5,
        authorId: 105,
        fromDate: "2024-12-25",
        toDate: "2025-01-05",
        countOfPeople: 6,
        price: 0,
        status: "Подтверждено",
        fromRating: 2,
        toRating: 5
    },
];
