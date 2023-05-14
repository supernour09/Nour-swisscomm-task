import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetAsset, TargetAssetStatus } from '../target-asset.modal';
import { TargetAssetStatisticsComponent } from './target-asset-statistics.component';

const targetAssets: TargetAsset[] = [
    {
        id: 1,
        name: 'Asset 1',
        status: TargetAssetStatus.Running,
        location: 'New York',
        owner: 'John Doe',
        createdBy: 'Jane Doe',
        cpu: 2,
        ram: 4,
        createdAt: new Date().toString(),
        parentId: null,
        isStartable: true,
        tags: []
    },
    {
        id: 2,
        name: 'Asset 2',
        status: TargetAssetStatus.Running,
        location: 'San Francisco',
        owner: 'Bob Smith',
        createdBy: 'Alice Johnson',
        cpu: 4,
        ram: 8,
        createdAt: new Date().toString(),
        parentId: null,
        isStartable: true,
        tags: []
    },
];
describe('TargetAssetStatisticsComponent', () => {
    let component: TargetAssetStatisticsComponent;
    let fixture: ComponentFixture<TargetAssetStatisticsComponent>;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TargetAssetStatisticsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TargetAssetStatisticsComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display total CPU usage', () => {

        fixture.componentRef.setInput('targetAssets', targetAssets);
        fixture.detectChanges();

        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('div').textContent).toContain(`Total CPU: ${targetAssets[0].cpu + targetAssets[1].cpu}`);
    });

    it('should display total RAM usage', () => {

        fixture.componentRef.setInput('targetAssets', targetAssets);
        fixture.detectChanges();

        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('div').textContent).toContain(`Total RAM: ${((targetAssets[0].ram + targetAssets[1].ram) / (1024 * 1024 * 1024)).toFixed(2)} GB`);
    });

    it('should display total number of Running Assets', () => {

        fixture.componentRef.setInput('targetAssets', targetAssets);
        fixture.detectChanges();

        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('div').textContent).toContain(`# of Running Assets: 2`);
    });

});