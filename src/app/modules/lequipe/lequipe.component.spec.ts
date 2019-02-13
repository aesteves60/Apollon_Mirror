import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LequipeComponent } from './lequipe.component';

describe('LequipeComponent', () => {
  let component: LequipeComponent;
  let fixture: ComponentFixture<LequipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LequipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
