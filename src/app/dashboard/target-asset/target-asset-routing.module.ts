import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TargetAssetsListViewComponent} from "./target-assets-list-view/target-assets-list-view.component";

const routes: Routes = [
  {
    path: '',
    component: TargetAssetsListViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetAssetRoutingModule { }
