import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TargetAssetState} from "./target-asset.store";

export const targetAssetsSelect = createFeatureSelector<TargetAssetState>('targetAssets');

export const getTargetAssetById = (id: number) => createSelector(
    targetAssetsSelect,
    state => state.targetAssets.find(asset => asset.id === id)
);
export const selectedTargetAssets = createSelector(
    targetAssetsSelect,
    state => state.selectedTargetAsset
);

export const selectFilteredTargetAssets = createSelector(
    targetAssetsSelect,
    state => state.filteredTargetAssets
);

export const selectIsLoading = createSelector(
    targetAssetsSelect,
    state => state.isLoading
);

