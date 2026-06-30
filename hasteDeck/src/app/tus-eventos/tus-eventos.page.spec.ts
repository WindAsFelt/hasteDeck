import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TusEventosPage } from './tus-eventos.page';

describe('TusEventosPage', () => {
  let component: TusEventosPage;
  let fixture: ComponentFixture<TusEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TusEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
