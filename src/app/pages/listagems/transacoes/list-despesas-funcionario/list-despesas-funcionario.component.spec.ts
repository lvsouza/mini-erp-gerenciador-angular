import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDespesasFuncionarioComponent } from './list-despesas-funcionario.component';

describe('ListDespesasFuncionarioComponent', () => {
  let component: ListDespesasFuncionarioComponent;
  let fixture: ComponentFixture<ListDespesasFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDespesasFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDespesasFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
