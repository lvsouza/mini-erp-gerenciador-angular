import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaEmpresaComponent } from './conta-empresa.component';

describe('ContaEmpresaComponent', () => {
  let component: ContaEmpresaComponent;
  let fixture: ComponentFixture<ContaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
