import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApimanagerComponent } from './apimanager.component';

describe('ApimanagerComponent', () => {
  let component: ApimanagerComponent;
  let fixture: ComponentFixture<ApimanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApimanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApimanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
