import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoErroComponent } from './aviso-erro.component';

describe('AvisoErroComponent', () => {
  let component: AvisoErroComponent;
  let fixture: ComponentFixture<AvisoErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
