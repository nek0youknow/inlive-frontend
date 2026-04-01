export interface Accommodation {
    id: string;
    cityId: string;
    districtId: string;
    address: string;
    name: string;
    description: string;
    rating: number;
    approved?: boolean;
    approvedBy?: string;
    ownerId: string;
    imageUrls?: string[];
}
