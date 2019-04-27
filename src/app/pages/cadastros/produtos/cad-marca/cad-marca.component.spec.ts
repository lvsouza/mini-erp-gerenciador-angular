import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadMarcaComponent } from './cad-marca.component';

describe('CadMarcaComponent', () => {
  let component: CadMarcaComponent;
  let fixture: ComponentFixture<CadMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
