import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoPresentePage } from './evento-presente.page';

describe('EventoPresentePage', () => {
  let component: EventoPresentePage;
  let fixture: ComponentFixture<EventoPresentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoPresentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
