import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TargetAssetsListViewComponent} from "./target-assets-list-view/target-assets-list-view.component";
import {
  TargetAssetDetailsComponent
} from "./target-asset-details-component/target-asset-details.component";
import {assetsUrl} from "./target-asset.constants";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: assetsUrl
  },
  {
    path: assetsUrl,
    component: TargetAssetsListViewComponent
  },
  {
    path: `${assetsUrl}/:id`,
    component: TargetAssetDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetAssetRoutingModule { }
