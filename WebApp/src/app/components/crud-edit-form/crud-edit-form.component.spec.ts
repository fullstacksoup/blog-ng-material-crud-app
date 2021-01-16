import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEditFormComponent } from './crud-edit-form.component';

describe('CrudEditFormComponent', () => {
  let component: CrudEditFormComponent;
  let fixture: ComponentFixture<CrudEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
