import { ActivityExplain, FileMetric } from './filter-types';
export declare const explainExpertReviewerComment: (expertReviewers: string[], activeUsers: string[], knowledgeUsers: string[], threshold: number, provider: string, isNoUserButYou: boolean) => string;
export declare const explainActivityAndBlameComment: (files: string[], activity: any, knowledge: any, activityUsers: string[], knowledgeUsers: string[], provider: string) => string;
export declare const getExplainActivity: (activity: ActivityExplain, activeUsers: string[]) => {};
export declare const getExplainKnowledge: (blame: FileMetric, knowledgeUsers: string[]) => {};
