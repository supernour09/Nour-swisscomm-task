import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetAssetRoutingModule } from './target-asset-routing.module';
import { TargetAssetsListViewComponent } from './target-assets-list-view/target-assets-list-view.component';


@NgModule({
  declarations: [
    TargetAssetsListViewComponent
  ],
  imports: [
    CommonModule,
    TargetAssetRoutingModule
  ]
})
export class TargetAssetModule { }
