declare function addContext(key: any, value: any): void;
export declare function createLogger(options: any): {
    level: any;
    embed(expressApp: any): void;
    debug(msg: string, ctx?: {}): void;
    verbose(msg: string, ctx?: {}): void;
    info(msg: string, ctx?: {}): void;
    warn(msg: string, ctx?: {}): void;
    error(msg: string, error?: {}): void;
    addContext: typeof addContext;
};
export * from './utils';
