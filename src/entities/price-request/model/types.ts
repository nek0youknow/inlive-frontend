export enum PriceRequestStatus {
    ACCEPTED = 'ACCEPTED',
    RAISED = 'RAISED',
    DECREASED = 'DECREASED'
}

export enum PriceRequestClientStatus {
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    WAITING = 'WAITING'
}


export interface PriceRequest {
    id: number,
    searchRequestId: number,
    accommodationUnitId: number,
    accommodationUnitName: string,
    accommodationName: string,
    price: number,
    status: PriceRequestStatus,
    clientResponseStatus: PriceRequestClientStatus,
    isDeleted: boolean,
}
