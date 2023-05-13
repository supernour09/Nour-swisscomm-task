import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TargetAssetActions from '../store/target-asset.actions';
import {TargetAssetState} from "../store/target-asset.store";
import {TargetAsset, TargetAssetStatus} from "../target-asset.modal";
import {selectedTargetAssets, selectFilteredTargetAssets, selectIsLoading} from "../store/target-asset.selectors";
import {NzIconService} from "ng-zorro-antd/icon";
import {listAssetDetails} from "./assets-details-ui.modals";
import {selectTargetAsset, updateSearchTerm} from "../store/target-asset.actions";
import {Router} from "@angular/router";
import {dashboardUrl} from "../../dashboard.constants";
import {assetsUrl} from "../target-asset.constants";



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
  isLoading$: Observable<boolean>;
  constructor(private store: Store<TargetAssetState>,
              private iconService: NzIconService,
              private router: Router) {
    this.targetAssets$ = this.store.select(selectFilteredTargetAssets);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.listAssetDetails.forEach(icon => this.iconService.addIcon(icon.icon));
  }

  ngOnInit(): void {
    this.store.dispatch(TargetAssetActions.loadTargetAssets());
  }

  onSearchTermChange(searchTerm: string): void {
    this.store.dispatch(updateSearchTerm({ searchTerm }));
  }


  moreDetails(selectedTargetAsset: TargetAsset) {
    this.store.dispatch(selectTargetAsset({ selectedTargetAsset }));
    this.router.navigateByUrl(`/${dashboardUrl}/${assetsUrl}/${selectedTargetAsset.id}`);

  }
}
