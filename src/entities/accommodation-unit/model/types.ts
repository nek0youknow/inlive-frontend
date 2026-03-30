export interface AccommodationUnit {
    id: string;
    accommodationId: string;
    unitType: string;
    name: string;
    description: string;
    capacity: number;
    area: number;
    floor: number;
    isAvailable: boolean;
}


export interface AccUnitDictionary {
    id: string;
    accId: string;
    accUnitId: string;
    dictionaryId: string;
}

export interface AccUnitImages {
    id: string;
    accId: string;
    accUnitId: string;
    imageUrl: string;
}