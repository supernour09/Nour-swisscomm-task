import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TargetAsset} from "../target-asset.modal";
import {Observable, map} from "rxjs";

@Injectable()
export class TargetAssetService {
    private targetAssetUrl = 'https://adb47d56-1aa9-4aa7-8ec2-77a923b80a5b.mock.pstmn.io/targetasset';

    constructor(private http: HttpClient) {}

    getTargetAssets():Observable<TargetAsset[]> {
        return this.http.get<TargetAsset[]>(this.targetAssetUrl).pipe(
            map((response: TargetAsset[]) => {
                // Transform the response data if necessary
                return response.filter(targetAsset => targetAsset !== null);
            })
        );
    }
}