import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAddFormComponent } from './crud-add-form.component';

describe('CrudAddFormComponent', () => {
  let component: CrudAddFormComponent;
  let fixture: ComponentFixture<CrudAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
