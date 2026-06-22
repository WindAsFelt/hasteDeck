import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCrearQrPage } from './admin-crear-qr.page';

describe('AdminCrearQrPage', () => {
  let component: AdminCrearQrPage;
  let fixture: ComponentFixture<AdminCrearQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrearQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
