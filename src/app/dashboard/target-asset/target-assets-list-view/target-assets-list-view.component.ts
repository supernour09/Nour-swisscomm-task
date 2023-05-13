import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TargetAssetActions from '../store/target-asset.actions';
import {TargetAssetState} from "../store/target-asset.store";
import {TargetAsset, TargetAssetStatus} from "../target-asset.modal";
import {selectFilteredTargetAssets} from "../store/target-asset.selectors";
import {NzIconService} from "ng-zorro-antd/icon";
import {listAssetDetails} from "./assets-details-ui.modals";
import {updateSearchTerm} from "../store/target-asset.actions";



@Component({
  selector: 'app-target-assets-list-view',
  templateUrl: './target-assets-list-view.component.html',
  styleUrls: ['./target-assets-list-view.component.scss']
})
export class TargetAssetsListViewComponent implements OnInit {
  targetAssets$: Observable<TargetAsset[]>;
  listAssetDetails = listAssetDetails;
  targetAssetStatus = TargetAssetStatus;
  searchText: string = '';
  constructor(private store: Store<TargetAssetState>,
              private iconService: NzIconService) {
    this.targetAssets$ = this.store.select(selectFilteredTargetAssets);
    this.listAssetDetails.forEach(icon => this.iconService.addIcon(icon.icon));
  }

  ngOnInit(): void {
    this.store.dispatch(TargetAssetActions.loadTargetAssets());
  }

  onSearchTermChange(searchTerm: string): void {
    this.store.dispatch(updateSearchTerm({ searchTerm }));
  }


}
