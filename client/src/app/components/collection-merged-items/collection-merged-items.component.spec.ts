import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionMergedItemsComponent } from './collection-merged-items.component';

describe('CollectionMergedItemsComponent', () => {
  let component: CollectionMergedItemsComponent;
  let fixture: ComponentFixture<CollectionMergedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionMergedItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionMergedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
