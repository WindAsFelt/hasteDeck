import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventosInscritosPage } from './eventos-inscritos.page';

describe('EventosInscritosPage', () => {
  let component: EventosInscritosPage;
  let fixture: ComponentFixture<EventosInscritosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosInscritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
