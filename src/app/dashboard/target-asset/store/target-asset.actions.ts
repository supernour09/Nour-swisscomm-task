import { createAction, props } from '@ngrx/store';
import { TargetAsset } from '../target-asset.modal';

export const loadTargetAssets = createAction('[Target Asset] Load');

export const loadTargetAssetsSuccess = createAction(
    '[Target Asset] Load Target Assets Success',
    props<{ targetAssets: TargetAsset[] }>()
);

export const loadTargetAssetsFailure = createAction(
    '[Target Asset] Load Target Assets Failure',
    props<{ error: any }>()
);

export const selectTargetAsset = createAction(
    '[Target Asset] Select',
    props<{ targetAsset: TargetAsset }>()
);

export const updateSearchTerm = createAction(
    '[TargetAsset] Update Search Term',
    props<{ searchTerm: string }>()
);