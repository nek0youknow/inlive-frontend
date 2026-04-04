import {Accommodation} from "@/entities/accommodation/model/types";

export const data: Accommodation[] = [
    {
        id: "1",
        cityId: "1",
        districtId: "2",
        name: "Квартира 'Тихая Гавань'",
        description: "Квартира с ремонтом в классическом стиле. Вблизи ТРЦ 'Shymkent Plaza'.",
        address: "Абая 32А",
        rating: 4,
        approved: false,
        approvedBy: "",
        ownerId: "tagankhozhaev@gmail.com"
    },
    {
        id: "2",
        cityId: "1",
        districtId: "5",
        name: "Апартаменты 'Sky View'",
        description: "Современные апартаменты с видом на город, рядом с университетом SDU.",
        address: "пр. Назарбаева 101",
        rating: 5,
        approved: true,
        approvedBy: "admin@sdu.kz",
        ownerId: "aliya.bekova@gmail.com"
    },
    {
        id: "4",
        cityId: "3",
        districtId: "1",
        name: "Комната в общежитии SDU",
        description: "Доступная комната в студенческом общежитии, общий санузел и кухня.",
        address: "ул. Университетская 12",
        rating: 2,
        approved: false,
        approvedBy: "",
        ownerId: "student123@sdu.kz"
    },
    {
        id: "5",
        cityId: "2",
        districtId: "6",
        name: "Квартира 'Green Park'",
        description: "Светлая квартира рядом с парком, удобный транспорт.",
        address: "ул. Кунаева 88",
        rating: 5,
        approved: true,
        approvedBy: "superadmin@gmail.com",
        ownerId: "askar.dev@gmail.com"
    }
];