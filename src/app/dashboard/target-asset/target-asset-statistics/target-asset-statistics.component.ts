import {Component, Input, OnChanges} from '@angular/core';
import {TargetAsset} from "../target-asset.modal";

@Component({
  selector: 'app-target-asset-statistics',
  templateUrl: './target-asset-statistics.component.html',
  styleUrls: ['./target-asset-statistics.component.scss']
})
export class TargetAssetStatisticsComponent implements OnChanges {

  @Input() targetAssets: TargetAsset[] = [];
  totalCpu: number = 0;
  totalRam: number = 0;
  totalRunningAssets: number = 0;

  constructor() { }

  ngOnChanges(): void {
    this.totalCpu = this.targetAssets.reduce((acc, curr) => acc + curr.cpu, 0);
    this.totalRam = this.targetAssets.reduce((acc, curr) => acc + curr.ram, 0);
    this.totalRunningAssets = this.targetAssets.filter(asset => asset.status === 'running').length
  }

}
