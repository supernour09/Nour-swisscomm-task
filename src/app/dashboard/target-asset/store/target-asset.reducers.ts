import { createReducer, on } from '@ngrx/store';
import {initialState} from "./target-asset.store";
import {
    loadTargetAssets,
    loadTargetAssetsFailure,
    loadTargetAssetsSuccess,
    selectTargetAsset, updateSearchTerm
} from "./target-asset.actions";

export const targetAssetReducer = createReducer(
    initialState,
    on(loadTargetAssets, state => ({ ...state, isLoading: true })),
    on(loadTargetAssetsSuccess, (state, { targetAssets }) => ({ ...state, targetAssets, filteredTargetAssets : targetAssets ,isLoading: false })),
    on(loadTargetAssetsFailure, state => ({ ...state, isLoading: false })),
    on(selectTargetAsset, (state, { targetAsset }) => ({
        ...state,
        selectedTargetAsset: targetAsset
    })),
    on(updateSearchTerm, (state, { searchTerm }) => ({
        ...state,
        searchTerm,
        filteredTargetAssets: state.targetAssets.filter((asset) =>
            asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.status.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    }))
);
