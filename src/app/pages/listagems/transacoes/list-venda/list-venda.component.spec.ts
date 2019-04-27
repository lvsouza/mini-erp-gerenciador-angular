import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVendaComponent } from './list-venda.component';

describe('ListVendaComponent', () => {
  let component: ListVendaComponent;
  let fixture: ComponentFixture<ListVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
