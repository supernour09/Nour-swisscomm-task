import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TargetAsset} from "../target-asset.modal";
import {Observable, map } from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class TargetAssetService {
    private targetAssetUrl = environment.appUrl + 'targetasset';

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