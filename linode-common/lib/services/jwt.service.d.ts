export declare const decodeToken: (token: string, verifyBy: string) => Promise<any>;
export declare const signToken: (payload: any, secret: string, expiresIn: string) => Promise<any>;
export declare const getToken: (req: any) => any;
