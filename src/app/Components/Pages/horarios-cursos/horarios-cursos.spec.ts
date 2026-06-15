import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosCursos } from './horarios-cursos';

describe('HorariosCursos', () => {
  let component: HorariosCursos;
  let fixture: ComponentFixture<HorariosCursos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosCursos],
    }).compileComponents();

    fixture = TestBed.createComponent(HorariosCursos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
