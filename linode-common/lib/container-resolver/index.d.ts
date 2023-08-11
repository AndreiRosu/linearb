import { IContributor } from './contributor.model';
export * from './contributor.model';
export interface IContainedMap {
    containerMap: any;
    containedMap: any;
}
export declare class ContainerContributorsResolver {
    organization_id: number;
    baseURL: string;
    redisClient: any;
    contributorsFetch: () => Promise<IContributor[]>;
    redisKey: string;
    map: IContainedMap;
    isContainersMapLoaded: boolean;
    constructor(organization_id: number, redisClient: any, contributorsFetch: () => Promise<IContributor[]>);
    getFromCache(): Promise<IContainedMap>;
    saveToCache(): Promise<unknown>;
    constructContainersMap(contributors: IContributor[]): IContainedMap;
    loadContributorsMap(): Promise<void>;
    isInCache(): Promise<boolean>;
    invalidate(): Promise<void>;
    getAllContributors(): Promise<IContributor[]>;
    isContained(containedId: number): boolean;
    getContainedContainer(containedId: number): number;
    getContainerContained(containerId: number): number;
    resolveFilter(ids: number[]): Promise<number[]>;
    resolveObjects(json: any, json_paths: string[]): Promise<any>;
}
