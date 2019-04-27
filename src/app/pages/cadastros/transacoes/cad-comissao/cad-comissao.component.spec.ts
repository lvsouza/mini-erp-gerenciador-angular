import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadComissaoComponent } from './cad-comissao.component';

describe('CadComissaoComponent', () => {
  let component: CadComissaoComponent;
  let fixture: ComponentFixture<CadComissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadComissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadComissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
