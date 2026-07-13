import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioEdicao } from './patrimonio-edicao';

describe('PatrimonioEdicao', () => {
  let component: PatrimonioEdicao;
  let fixture: ComponentFixture<PatrimonioEdicao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrimonioEdicao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatrimonioEdicao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
