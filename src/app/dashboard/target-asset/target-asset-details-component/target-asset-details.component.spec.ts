import {TargetAsset, TargetAssetStatus} from "../target-asset.modal";
import {TargetAssetDetailsComponent} from "./target-asset-details.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {
    getTargetAssetById,
    selectedTargetAssets,
} from "../store/target-asset.selectors";
import {By} from "@angular/platform-browser";
import {TargetAssetState} from "../store/target-asset.store";
import { MemoizedSelector} from "@ngrx/store";


const targetAsset: TargetAsset = {
    id: 1,
    name: 'Target Asset 1',
    status: TargetAssetStatus.Running,
    location: 'New York',
    owner: 'John Doe',
    createdBy: 'Jane Doe',
    cpu: 4,
    ram: 1080,
    createdAt: new Date().toString(),
    parentId: 2,
    isStartable: true,
    tags: ['test']
};

const parentAsset: TargetAsset = {
    id: 2,
    name: 'Parent Asset',
    status: TargetAssetStatus.Running,
    location: 'San Francisco',
    owner: 'Bob Smith',
    createdBy: 'Alice Johnson',
    cpu: 4,
    ram: 1080,
    createdAt: new Date().toString(),
    parentId: null,
    isStartable: true,
    tags: ['test']
};

describe('TargetAssetDetailsComponent', () => {
    let component: TargetAssetDetailsComponent;
    let fixture: ComponentFixture<TargetAssetDetailsComponent>;
    let store: MockStore<TargetAssetState>;
    let mockSelectedAsset : MemoizedSelector<TargetAssetState, TargetAsset | null>;



    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ TargetAssetDetailsComponent ],
            providers: [
                provideMockStore({
                    selectors: [
                        {
                            selector: 'getTargetAssetById',
                            value: parentAsset,
                        },
                    ]
                })
            ]
        })
            .compileComponents();

        store = TestBed.inject(MockStore);
        mockSelectedAsset = store.overrideSelector(selectedTargetAssets, targetAsset );
        fixture = TestBed.createComponent(TargetAssetDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should display root as parent if parent ID is null', () => {
        const targetAsset: TargetAsset = {
            id: 1,
            name: 'Target Asset 1',
            status: TargetAssetStatus.Running,
            location: 'New York',
            owner: 'John Doe',
            createdBy: 'Jane Doe',
            cpu: 4,
            ram: 1080,
            createdAt: new Date().toString(),
            parentId: null,
            isStartable: true,
            tags: ['test']
        };

        store.overrideSelector(selectedTargetAssets, targetAsset);

        fixture.detectChanges();

        const parent = fixture.debugElement.query(By.css('div:nth-of-type(8)')).nativeElement.textContent;

        expect(parent).toContain('Parent Target Asset: Root');
    });

});
