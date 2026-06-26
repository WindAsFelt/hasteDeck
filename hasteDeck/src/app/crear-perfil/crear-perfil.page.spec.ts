import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPerfilPage } from './crear-perfil.page';

describe('CrearPerfilPage', () => {
  let component: CrearPerfilPage;
  let fixture: ComponentFixture<CrearPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
