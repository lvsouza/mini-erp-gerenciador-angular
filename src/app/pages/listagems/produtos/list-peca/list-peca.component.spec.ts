import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPecaComponent } from './list-peca.component';

describe('ListPecaComponent', () => {
  let component: ListPecaComponent;
  let fixture: ComponentFixture<ListPecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
