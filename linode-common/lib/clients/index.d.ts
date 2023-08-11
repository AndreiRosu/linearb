export * from './linpr';
export * from './linrest';
export * from './pmrest';
export * from './segment';
export { getOrgIdFromChannel, getPusherClient } from './pusher';
import { AxiosInstance, AxiosStatic } from 'axios';
/**
 * @param axiosInst axios instance using axios,create, or global default axios
 * @param logger
 * @param LINB_SELF_SERVICE_ID -process.env.LINB_SELF_SERVICE_ID;
 */
export declare function setupAxios(axiosInst: AxiosStatic | AxiosInstance, logger?: any, linb_self_service_id?: any): void;
