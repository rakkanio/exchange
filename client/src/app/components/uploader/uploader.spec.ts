import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploader } from './uploader';

describe('Uploader', () => {
  let component: Uploader;
  let fixture: ComponentFixture<Uploader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uploader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uploader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
