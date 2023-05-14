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
import {of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";


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
            imports: [RouterTestingModule],
            declarations: [ TargetAssetDetailsComponent ],
            providers: [
                provideMockStore()
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

    it('should display the selected TargetAsset', () => {
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

        mockSelectedAsset.setResult(targetAsset);
        component.parentTargetAsset$ = of(parentAsset);
        store.refreshState();
        fixture.detectChanges();

        const name = fixture.debugElement.query(By.css('div:nth-of-type(1)')).nativeElement.textContent;
        const status = fixture.debugElement.query(By.css('div:nth-of-type(2)')).nativeElement.textContent;
        const location = fixture.debugElement.query(By.css('div:nth-of-type(3)')).nativeElement.textContent;
        const parent = fixture.debugElement.query(By.css('div:nth-of-type(9)')).nativeElement.textContent;


        expect(name).toContain(targetAsset.name);
        expect(status).toContain(targetAsset.status);
        expect(location).toContain(targetAsset.location);
        expect(parent).toContain(`Parent Target Asset: ${parentAsset.name}`);
    });

    it('should display root as parent if parent ID is null', () => {
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

        mockSelectedAsset.setResult(targetAsset);
        component.parentTargetAsset$ = of(parentAsset);
        store.refreshState();
        fixture.detectChanges();


        const parent = fixture.debugElement.query(By.css('div:nth-of-type(9)')).nativeElement.textContent;

        expect(parent).toContain('Parent Target Asset: Root');
    });

});
