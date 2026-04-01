export interface JwtPayload {
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    sub: string;
    typ: string;
    azp: string;
    sid: string;
    acr: string;
    'allowed-origins': string[];
    realm_access: {
        roles: string[];
    };
    resource_access: {
        inlive:{
            roles: string[];
        }
    };
    account: {
        roles: string[];
    };
    scope: string;
    email_verified: boolean;
    name: string;
    email: string;
    given_name: string;
    family_name: string;
    preferred_username: string;
}
