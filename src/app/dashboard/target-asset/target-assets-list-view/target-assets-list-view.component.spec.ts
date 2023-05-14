import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {MemoizedSelector, Store, StoreModule} from '@ngrx/store';
import { TargetAssetsListViewComponent } from './target-assets-list-view.component';
import { TargetAssetStatisticsComponent } from '../target-asset-statistics/target-asset-statistics.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { TargetAssetEffects } from '../store/target-asset.effects';
import {targetAssetReducer} from "../store/target-asset.reducers";
import {loadTargetAssets, updateSearchTerm} from "../store/target-asset.actions";
import {TargetAssetService} from "../service/target-asset.service";
import {TargetAsset, TargetAssetStatus} from "../target-asset.modal";
import {By} from "@angular/platform-browser";
import spyOn = jest.spyOn;
import {FormsModule} from "@angular/forms";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {of} from "rxjs";
import {TargetAssetState} from "../store/target-asset.store";
import {selectFilteredTargetAssets, selectIsLoading, targetAssetsSelect} from "../store/target-asset.selectors";




describe('TargetAssetsListViewComponent', () => {
    let component: TargetAssetsListViewComponent;
    let fixture: ComponentFixture<TargetAssetsListViewComponent>;
    let store: MockStore<TargetAssetState>;
    let mockFilterSelector : MemoizedSelector<TargetAssetState, TargetAsset[]>;
    let mockLoading : MemoizedSelector<TargetAssetState, boolean>;
    let initialState: TargetAssetState = {
        targetAssets: [],
        selectedTargetAsset: null,
        filteredTargetAssets: [],
        isLoading: false,
        error: null,
        searchTerm: null
    };


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TargetAssetsListViewComponent, TargetAssetStatisticsComponent],
            imports: [
                NzSpinModule,
                NzIconModule.forRoot([]),
                RouterTestingModule,
                HttpClientTestingModule,
                StoreModule.forRoot({ targetAssets: targetAssetReducer }),
                EffectsModule.forRoot([TargetAssetEffects]),
                FormsModule
            ],
            providers: [TargetAssetService,  provideMockStore({initialState})]
        }).compileComponents();

        store = TestBed.inject(MockStore);
        mockFilterSelector = store.overrideSelector(selectFilteredTargetAssets, []);
        mockLoading = store.overrideSelector(selectIsLoading, false);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TargetAssetsListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('dispatch loadTargetAssets', () => {
        expect(component.searchText).toEqual('');
        spyOn(component['store'], 'dispatch');
        component.ngOnInit();
        expect(component['store'].dispatch).toHaveBeenCalledWith(loadTargetAssets());
    });

    xit('should filter target assets by name or status on search term change', done => {
        // Arrange
        const targetAsset1 = {
            id: 1,
            name: 'Target Asset 1',
            status: TargetAssetStatus.Running,
            location: 'San Francisco',
            owner: 'Bob Smith',
            createdBy: 'Alice Johnson',
            cpu: 4,
            ram: 17179869184,
            createdAt: new Date().toString(),
            parentId: null,
            isStartable: true,
            tags: []
        };
        const targetAsset2 = {
            id: 2,
            name: 'Target Asset 1',
            status: TargetAssetStatus.Stopped,
            location: 'San Francisco',
            owner: 'Bob Smith',
            createdBy: 'Alice Johnson',
            cpu: 4,
            ram: 8589934592,
            createdAt: new Date().toString(),
            parentId: null,
            isStartable: true,
            tags: []
        };
        const targetAssets: TargetAsset[] = [targetAsset1, targetAsset2];

        // Set data to the store
        mockFilterSelector.setResult(targetAssets);
        mockLoading.setResult(false);

        // Trigger change detection
        store.refreshState()
        fixture.detectChanges()

        const expectedTargetAssets: TargetAsset[] = [targetAsset2];
        const searchTerm = 'Stopped';

        // Act - something wrong here
        component.onSearchTermChange(searchTerm);
        store.dispatch(updateSearchTerm({ searchTerm }));
        fixture.detectChanges();
        store.refreshState()

        // Assert
        expect(component.targetAssets$).toBeTruthy();
        component.targetAssets$.subscribe(targetAssetsResult => {
            expect(targetAssetsResult).toEqual(expectedTargetAssets);
            done();
        });
    });

    it('should display no results found when no target assets are available', done => {
        // Set data to the store
        mockFilterSelector.setResult([]);
        mockLoading.setResult(false);

        // Trigger change detection
        store.refreshState();
        fixture.detectChanges();

        expect(component.targetAssets$).toBeTruthy();
        component.targetAssets$.subscribe(targetAssetsResult => {
            expect(targetAssetsResult).toEqual([]);
            done();
        });
        // Expect the "No results found" message to be displayed
        const noResultsFoundMessage = fixture.debugElement.query(By.css('.target-List div'));
        expect(noResultsFoundMessage.nativeElement.textContent.trim()).toBe('No results found.');
    });


});
