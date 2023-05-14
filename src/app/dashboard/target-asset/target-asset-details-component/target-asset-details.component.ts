import { Component, OnInit } from '@angular/core';
import {getTargetAssetById, selectedTargetAssets} from "../store/target-asset.selectors";
import {Store} from "@ngrx/store";
import {TargetAssetState} from "../store/target-asset.store";
import {Observable, map, mergeMap, filter, defaultIfEmpty, of} from "rxjs";
import {TargetAsset} from "../target-asset.modal";
import {selectTargetAsset} from "../store/target-asset.actions";

@Component({
  selector: 'app-target-asset-details-component',
  templateUrl: './target-asset-details.component.html',
  styleUrls: [ './target-asset-details.component.scss']
})
export class TargetAssetDetailsComponent {
  selectedTargetAssets$: Observable<TargetAsset | null>;
  parentTargetAsset$: Observable<TargetAsset | null>;

  constructor(private store: Store<TargetAssetState>) {
    this.selectedTargetAssets$ = this.store.select(selectedTargetAssets);
    this.parentTargetAsset$ = this.selectedTargetAssets$.pipe(
        map(targetAsset => targetAsset?.parentId ),
        mergeMap(parentId => {
          if (parentId === undefined || parentId === null) {
            return of(null);
          } else {
            return this.store.select(getTargetAssetById(parentId));
          }
        }),
        filter(parent => parent !== undefined && parent !== null),
        map(parent => parent as TargetAsset),
        defaultIfEmpty(null)
    );
  }


  routeParent(selectedTargetAsset: TargetAsset) {
    this.store.dispatch(selectTargetAsset({ selectedTargetAsset }));
  }
}
