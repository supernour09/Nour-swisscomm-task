import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetAssetRoutingModule } from './target-asset-routing.module';
import { TargetAssetsListViewComponent } from './target-assets-list-view/target-assets-list-view.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {TargetAssetService} from "./service/target-asset.service";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {TargetAssetEffects} from "./store/target-asset.effects";
import {targetAssetReducer} from "./store/target-asset.reducers";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import { TargetAssetStatisticsComponent } from './target-asset-statistics/target-asset-statistics.component';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import { TargetAssetDetailsComponent } from './target-asset-details-component/target-asset-details.component';
import {NzSpinModule} from "ng-zorro-antd/spin";


@NgModule({
  declarations: [
    TargetAssetsListViewComponent, TargetAssetStatisticsComponent, TargetAssetDetailsComponent
  ],
    imports: [
        CommonModule,
        TargetAssetRoutingModule,
        NzCardModule,
        NzGridModule,
        StoreModule.forFeature('targetAssets', targetAssetReducer),
        EffectsModule.forFeature([TargetAssetEffects]),
        NzIconModule,
        FormsModule,
        NzCollapseModule,
        NzButtonModule,
        NzInputModule,
        NzSpinModule,
    ],
    providers: [TargetAssetService]
})
export class TargetAssetModule { }
