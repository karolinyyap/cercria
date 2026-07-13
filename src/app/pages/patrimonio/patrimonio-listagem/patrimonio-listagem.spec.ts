import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioListagem } from './patrimonio-listagem';

describe('PatrimonioListagem', () => {
  let component: PatrimonioListagem;
  let fixture: ComponentFixture<PatrimonioListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrimonioListagem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatrimonioListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
