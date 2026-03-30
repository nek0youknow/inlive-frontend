
import {JwtPayload} from "@/entities/session/model/types";
import {jwtDecode} from "jwt-decode";

export const sessionService = {
    getToken: () => {
        return localStorage.getItem('accessToken');
    },
    setTokens: (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
    },
    removeTokens: () => {
        localStorage.removeItem('accessToken');
    },
    decodeToken: (token:string): JwtPayload | null => {
        if(!token) return null;

        try{
            return jwtDecode<JwtPayload>(token);
        }catch (error) {
            console.error("Ошибка при декодировании токена:", error);
            return null;
        }
    },
    isTokenExpired: (token: string): boolean => {
        const decodedToken = sessionService.decodeToken(token);
        if(!decodedToken) return true;
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    },
    getUserFromToken: (token: string) => {
        const decoded = sessionService.decodeToken(token);
        if(!decoded) return null;

        return {
            given_name: decoded.given_name,
            family_name: decoded.family_name,
            preferred_username: decoded.preferred_username,
            email: decoded.email,
            role: decoded.resource_access.inlive.roles,
        }
    }
}