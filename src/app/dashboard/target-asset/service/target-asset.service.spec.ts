import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TargetAssetService } from './target-asset.service';

describe('TargetAssetService', () => {
    let service: TargetAssetService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TargetAssetService]
        });
        service = TestBed.inject(TargetAssetService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve target assets', () => {
        const mockTargetAssets = [
            { id: 1, name: 'targetAsset1', status: 'Online' },
            { id: 2, name: 'targetAsset2', status: 'Offline' }
        ];
        service.getTargetAssets().subscribe(targetAssets => {
            expect(targetAssets).toEqual(mockTargetAssets);
        });
        const request = httpMock.expectOne(service['targetAssetUrl']);
        expect(request.request.method).toBe('GET');
        request.flush(mockTargetAssets);
    });
});
