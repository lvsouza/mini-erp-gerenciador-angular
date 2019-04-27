import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadDespesaGeralComponent } from './cad-despesa-geral.component';

describe('CadDespesaGeralComponent', () => {
  let component: CadDespesaGeralComponent;
  let fixture: ComponentFixture<CadDespesaGeralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadDespesaGeralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadDespesaGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
