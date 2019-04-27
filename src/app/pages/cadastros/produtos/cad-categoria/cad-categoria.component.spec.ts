import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCategoriaComponent } from './cad-categoria.component';

describe('CadCategoriaComponent', () => {
  let component: CadCategoriaComponent;
  let fixture: ComponentFixture<CadCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
