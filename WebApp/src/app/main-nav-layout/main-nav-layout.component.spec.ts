import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavLayoutComponent } from './main-nav-layout.component';

describe('MainNavLayoutComponent', () => {
  let component: MainNavLayoutComponent;
  let fixture: ComponentFixture<MainNavLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNavLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
