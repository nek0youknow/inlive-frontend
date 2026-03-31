
export type RequestStatus =
    | 'Открыт к запросам по цене'
    | 'Запрос был сделан'
    | 'Подтверждено'


export interface AccSearchRequest {
    id: number
    authorId: number
    fromRating?: number | null
    toRating?: number | null
    fromDate: string
    toDate: string
    price?: number | null
    countOfPeople: number
    status: RequestStatus
}

