import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadDespesaFuncionarioComponent } from './cad-despesa-funcionario.component';

describe('CadDespesaFuncionarioComponent', () => {
  let component: CadDespesaFuncionarioComponent;
  let fixture: ComponentFixture<CadDespesaFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadDespesaFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadDespesaFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
