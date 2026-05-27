import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoControle } from './medicamento-controle';

describe('MedicamentoControle', () => {
  let component: MedicamentoControle;
  let fixture: ComponentFixture<MedicamentoControle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicamentoControle],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicamentoControle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
