import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const perfilGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  // Usuário logado
  const usuarioSalvo = sessionStorage.getItem('usuario');

  if (!usuarioSalvo) {
    toastr.error('Você precisa estar logado.', 'Acesso negado');
    router.navigate(['/home']);

    return false;
  }

  let usuario: any;

  try {
    usuario = JSON.parse(usuarioSalvo);
  } catch {
    sessionStorage.removeItem('usuario');
    toastr.error('Sessão inválida.', 'Acesso negado');
    router.navigate(['/home']);

    return false;
  }

  // Cargo do usuário
  const cargo = usuario.cargo;

  // Cargos permitidos definidos na rota
  const cargosPermitidos = route.data['cargos'] as string[];

  // Se a rota não tiver restrição
  if (!cargosPermitidos || cargosPermitidos.length === 0) {
    return true;
  }

  // Verifica se o cargo possui acesso
  if (cargosPermitidos.includes(cargo)) {
    return true;
  }

  // Sem permissão
  toastr.error('Você não possui permissão para acessar esta página.', 'Acesso negado');
  router.navigate(['/home']);

  return false;
};
