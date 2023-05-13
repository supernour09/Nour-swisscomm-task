import {TargetAsset} from "../target-asset.modal";

export interface TargetAssetState {
    targetAssets: TargetAsset[];
    selectedTargetAsset: TargetAsset | null;
    isLoading: boolean;
    filteredTargetAssets: TargetAsset[];
    error: string | null;
    searchTerm: string | null;
}

export const initialState: TargetAssetState = {
    targetAssets: [],
    selectedTargetAsset: null,
    filteredTargetAssets: [],
    isLoading: false,
    error: null,
    searchTerm: null
};