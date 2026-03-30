export interface Reservation {
    id: number;
    clientId: number;
    clientName: string;
    accommodationUnitId: number;
    accommodationUnitName: string;
    accommodationName: string;
    priceRequestId: number;
    searchRequestId: number;
    price: number;
    status: ReservationStatus;
    needToPay: boolean;
    createdAt: string;
    updatedAt: string;
    checkInDate: string;
    checkOutDate: string;
    guestCount: number;
}



export enum ReservationStatus {
    FINISHED_SUCCESSFUL = 'FINISHED_SUCCESSFUL',
    WAITING_TO_APPROVE = 'WAITING_TO_APPROVE',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CLIENT_DIDNT_CAME = 'CLIENT_DIDNT_CAME',
    CANCELED = 'CANCELED',
}
