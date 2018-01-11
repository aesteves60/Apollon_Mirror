import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPersonalizeComponent } from './items-personalize.component';

describe('ItemsPersonalizeComponent', () => {
  let component: ItemsPersonalizeComponent;
  let fixture: ComponentFixture<ItemsPersonalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsPersonalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsPersonalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
