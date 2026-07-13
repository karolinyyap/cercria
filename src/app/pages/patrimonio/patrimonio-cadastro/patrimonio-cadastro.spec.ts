import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioCadastro } from './patrimonio-cadastro';

describe('PatrimonioCadastro', () => {
  let component: PatrimonioCadastro;
  let fixture: ComponentFixture<PatrimonioCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrimonioCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatrimonioCadastro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
