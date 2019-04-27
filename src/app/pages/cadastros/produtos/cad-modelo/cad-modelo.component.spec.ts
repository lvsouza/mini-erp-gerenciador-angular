import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadModeloComponent } from './cad-modelo.component';

describe('CadModeloComponent', () => {
  let component: CadModeloComponent;
  let fixture: ComponentFixture<CadModeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadModeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
