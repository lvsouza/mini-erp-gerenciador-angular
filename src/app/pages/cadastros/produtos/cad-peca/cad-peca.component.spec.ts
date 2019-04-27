import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadPecaComponent } from './cad-peca.component';

describe('CadPecaComponent', () => {
  let component: CadPecaComponent;
  let fixture: ComponentFixture<CadPecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadPecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
