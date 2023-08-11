import { PagerDutyAction, PagerDutySeverity } from './utils.model';
export declare function stopServerGracefully(signal: any, logger: any, server: any, args: any): Promise<void>;
export declare function pagerDutyTriggerIncident(logger: any, serviceName: string, message: string, severity: PagerDutySeverity, pagerRoutingKeyVal: string, env: string, eventName?: string, event_action?: PagerDutyAction): Promise<void>;
