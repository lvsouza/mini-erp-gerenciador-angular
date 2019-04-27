import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDespesaGeralComponent } from './list-despesa-geral.component';

describe('ListDespesaGeralComponent', () => {
  let component: ListDespesaGeralComponent;
  let fixture: ComponentFixture<ListDespesaGeralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDespesaGeralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDespesaGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
