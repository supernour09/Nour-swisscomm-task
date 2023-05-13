export interface TargetAsset {
    id: number;
    isStartable: boolean;
    location: string;
    owner: string;
    createdBy: string;
    name: string;
    status: TargetAssetStatus;
    tags: string[];
    cpu: number;
    ram: number;
    createdAt: string;
    parentId: number;
}

export enum TargetAssetStatus {
    Running = 'running',
    Stopped = 'stopped',
    MigrationFailed = 'migration-failed',
    Unknown = 'unknown'
}
