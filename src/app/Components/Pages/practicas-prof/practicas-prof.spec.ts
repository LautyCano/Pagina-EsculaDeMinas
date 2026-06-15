import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticasProf } from './practicas-prof';

describe('PracticasProf', () => {
  let component: PracticasProf;
  let fixture: ComponentFixture<PracticasProf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticasProf],
    }).compileComponents();

    fixture = TestBed.createComponent(PracticasProf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
