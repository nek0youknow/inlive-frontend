export interface User {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
}

export interface UpdateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
}

