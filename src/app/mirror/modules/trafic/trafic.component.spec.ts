import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraficComponent } from './trafic.component';

describe('TraficComponent', () => {
  let component: TraficComponent;
  let fixture: ComponentFixture<TraficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
