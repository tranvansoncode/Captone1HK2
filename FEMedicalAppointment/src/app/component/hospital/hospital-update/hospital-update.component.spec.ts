import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUpdateComponent } from './hospital-update.component';

describe('HospitalUpdateComponent', () => {
  let component: HospitalUpdateComponent;
  let fixture: ComponentFixture<HospitalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
