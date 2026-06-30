import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoControle } from './produto-controle';

describe('ProdutoControle', () => {
  let component: ProdutoControle;
  let fixture: ComponentFixture<ProdutoControle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoControle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoControle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
