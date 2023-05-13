import { Pipe, PipeTransform } from '@angular/core';
import { TargetAsset } from './target-asset.modal';

@Pipe({
    name: 'filter'
})
export class TargetAssetPipe implements PipeTransform {
    transform(targetAssets: TargetAsset[], searchText: string): TargetAsset[] {
        if (!targetAssets || !searchText) {
            return targetAssets;
        }
        searchText = searchText.toLowerCase();
        return targetAssets.filter(targetAsset =>
            targetAsset.name.toLowerCase().includes(searchText) || targetAsset.status.toLowerCase().includes(searchText)
        );
    }
}
