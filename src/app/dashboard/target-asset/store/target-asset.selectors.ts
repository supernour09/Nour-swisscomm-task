import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TargetAssetState} from "./target-asset.store";

export const targetAssetsSelect = createFeatureSelector<TargetAssetState>('targetAssets');

export const selectTargetAssets = createSelector(
    targetAssetsSelect,
    state => state.targetAssets
);

export const selectFilteredTargetAssets = createSelector(
    targetAssetsSelect,
    state => state.filteredTargetAssets
);

export const selectIsLoading = createSelector(
    targetAssetsSelect,
    state => state.isLoading
);