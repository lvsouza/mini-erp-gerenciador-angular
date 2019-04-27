import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCargoComponent } from './cad-cargo.component';

describe('CadCargoComponent', () => {
  let component: CadCargoComponent;
  let fixture: ComponentFixture<CadCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
