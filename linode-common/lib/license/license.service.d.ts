import { ILicense, ILicensePlanDefinition, TierType } from './license.model';
export declare function getOrganizationLicense(queryBy: any): Promise<ILicense>;
export declare function hasValidLicense(organization_id: any): Promise<boolean>;
export declare function hasPaidLicense(organization_id: any): Promise<boolean>;
export declare function createLicense(orgId: any, tierType?: TierType): Promise<ILicense>;
export declare function getLicensePlanDefinitions(): Promise<ILicensePlanDefinition[]>;
export declare function setOrgAsTierType(orgId: any, tierType: any, planName: any): Promise<number>;
