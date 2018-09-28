import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalerrorComponent } from './modalerror.component';

describe('ModalerrorComponent', () => {
  let component: ModalerrorComponent;
  let fixture: ComponentFixture<ModalerrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalerrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
