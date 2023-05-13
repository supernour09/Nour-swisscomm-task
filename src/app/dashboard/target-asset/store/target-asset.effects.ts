import {Injectable} from "@angular/core";
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {loadTargetAssets, loadTargetAssetsFailure, loadTargetAssetsSuccess} from "./target-asset.actions";
import {TargetAsset} from "../target-asset.modal";
import { of } from 'rxjs';
import {TargetAssetService} from "../service/target-asset.service";

@Injectable()
export class TargetAssetEffects {
    loadTargetAssets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTargetAssets),
            mergeMap(() =>
                this.targetAssetService.getTargetAssets().pipe(
                    map((targetAssets: TargetAsset[]) => loadTargetAssetsSuccess({ targetAssets })),
                    catchError(error => of(loadTargetAssetsFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private targetAssetService: TargetAssetService
    ) {}
}