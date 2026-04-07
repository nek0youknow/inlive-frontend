
export interface IAddAccommodationUnitForm {
    accommodationId: string,
    unitType: string;
    name: string;
    description: string;
    capacity: number;
    floor: number;
    area: number;
    serviceDictionaryIds: number[],
    conditionDictionaryIds: number[],
    images: File[];
}