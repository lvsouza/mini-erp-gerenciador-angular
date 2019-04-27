import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComissaoComponent } from './list-comissao.component';

describe('ListComissaoComponent', () => {
  let component: ListComissaoComponent;
  let fixture: ComponentFixture<ListComissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
