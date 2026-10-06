import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaerLibroComponent } from './creaer-libro.component';

describe('CreaerLibroComponent', () => {
  let component: CreaerLibroComponent;
  let fixture: ComponentFixture<CreaerLibroComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaerLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
