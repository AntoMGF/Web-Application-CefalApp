import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingscomponentComponent } from './settingscomponent.component';

describe('SettingscomponentComponent', () => {
  let component: SettingscomponentComponent;
  let fixture: ComponentFixture<SettingscomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingscomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
