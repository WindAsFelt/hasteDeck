import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarEventosPage } from './buscar-eventos.page';

describe('BuscarEventosPage', () => {
  let component: BuscarEventosPage;
  let fixture: ComponentFixture<BuscarEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
