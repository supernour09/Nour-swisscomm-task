import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetAssetRoutingModule } from './target-asset-routing.module';
import { TargetAssetsListViewComponent } from './target-assets-list-view/target-assets-list-view.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";


@NgModule({
  declarations: [
    TargetAssetsListViewComponent
  ],
    imports: [
        CommonModule,
        TargetAssetRoutingModule,
        NzCardModule,
        NzGridModule
    ]
})
export class TargetAssetModule { }
