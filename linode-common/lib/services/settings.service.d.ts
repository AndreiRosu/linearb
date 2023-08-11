export interface IGetSettingsRequest {
    organization_id: number;
    team_id?: number;
    repository_id?: number;
    include_schema?: boolean;
    order_by_ns?: boolean;
    restrict_to_definition_level?: boolean;
    do_not_inherit?: string[];
}
export interface IGetFeatureFlagRequest {
    organization_id: number;
    feature_name: string;
}
export interface ISearchSettingRequest {
    organization_id: number;
    team_id?: number;
    repository_id?: number;
    definition_level?: string;
    definition_name?: string;
}
export interface IPostOrgSettingsRequest {
    organization_id: number;
    payload: {
        [key: string]: any;
    };
    team_id?: number;
    repository_id?: number;
}
export declare enum DefinitionLevel {
    ORGANIZATION = "organization",
    REPOSITORY = "repository",
    TEAM = "team"
}
export declare enum SettingsNamespace {
    JIRA = "jira",
    PM = "pm",
    FEATURE_FLAGS = "featureFlags",
    REWORK = "rework",
    BRANCHES = "branches",
    NOTIFICATIONS = "notifications",
    RELEASES = "releases"
}
/**
 * call the GET /api/internal/settings API in Settings Service, for a specific organization
 * @param settingsServiceBaseUrl base host URL of settings service, not include API path. E.G: http://localhost:3033
 * @param req
 */
export declare function getOrgSettings(settingsServiceBaseUrl: string, req: IGetSettingsRequest): Promise<any>;
export declare function isFeatureFlagEnabled(settingsServiceBaseUrl: string, req: IGetFeatureFlagRequest): Promise<boolean>;
/**
 * call the GET /api/internal/settings/search API in Settings Service, for a specific organization
 * @param settingsServiceBaseUrl base host URL of settings service, not include API path. E.G: http://localhost:3033
 * @param req
 */
export declare function searchOrgSettings(settingsServiceBaseUrl: string, req: ISearchSettingRequest): Promise<any>;
/**
 * call the POST /api/internal/settings/ API in Settings Service, for a specific organization
 * @param settingsServiceBaseUrl base host URL of settings service, not include API path. E.G: http://localhost:3033
 * @param req
 */
export declare function postOrgSettings(settingsServiceBaseUrl: string, req: IPostOrgSettingsRequest): Promise<any>;
export declare const getSettingByDefinitionName: (settingsServiceBaseUrl: string, req: ISearchSettingRequest) => Promise<any>;
