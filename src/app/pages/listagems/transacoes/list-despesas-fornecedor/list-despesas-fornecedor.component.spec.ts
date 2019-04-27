import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDespesasFornecedorComponent } from './list-despesas-fornecedor.component';

describe('ListDespesasFornecedorComponent', () => {
  let component: ListDespesasFornecedorComponent;
  let fixture: ComponentFixture<ListDespesasFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDespesasFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDespesasFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
