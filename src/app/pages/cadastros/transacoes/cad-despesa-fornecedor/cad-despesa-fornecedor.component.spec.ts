import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadDespesaFornecedorComponent } from './cad-despesa-fornecedor.component';

describe('CadDespesaFornecedorComponent', () => {
  let component: CadDespesaFornecedorComponent;
  let fixture: ComponentFixture<CadDespesaFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadDespesaFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadDespesaFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
