export const permissoes = {
  funcionario: {
    cadastrar: ['Coordenador', 'Auxiliar Administrativo'],
    listar: ['Coordenador', 'Auxiliar administrativo'],
    editar: ['Coordenador', 'Auxiliar administrativo'],
    excluir: ['Coordenador'],
  },

  medicamento: {
    cadastrar: ['Coordenador', 'Enfermeiro(a)', 'Psicólogo(a)', 'Auxiliar administrativo'],
    listar: ['Coordenador', 'Psicólogo(a)', 'Auxiliar administrativo', 'Enfermeiro(a)'],
    editar: ['Coordenador', 'Enfermeiro(a)', 'Psicólogo(a)', 'Auxiliar administrativo'],
    excluir: ['Coordenador', 'Enfermeiro(a)'],

    entrada: ['Coordenador', 'Enfermeiro(a)', 'Psicólogo(a)'],
    saida: ['Coordenador', 'Enfermeiro(a)', 'Psicólogo(a)'],
    administracao: ['Coordenador', 'Enfermeiro(a)', 'Psicólogo(a)'],
  },

  produto: {
    cadastrar: ['Coordenador', 'Auxiliar administrativo'],
    listar: [
      'Coordenador',
      'Psicólogo(a)',
      'Auxiliar administrativo',
      'Enfermeiro(a)',
      'Cozinheiro(a)',
      'Auxiliar de cozinha',
      'Auxiliar de serviços gerais',
    ],
    editar: ['Coordenador', 'Auxiliar administrativo'],
    excluir: ['Coordenador', 'Auxiliar administrativo'],

    controle: ['Coordenador', 'Auxiliar administrativo'],
  },

  patrimonio: {
    cadastrar: ['Coordenador', 'Auxiliar administrativo'],
    listar: ['Coordenador', 'Auxiliar administrativo'],
    editar: ['Coordenador', 'Auxiliar administrativo'],
    excluir: ['Coordenador', 'Auxiliar administrativo'],
  },

  evento: {
    cadastrar: ['Coordenador', 'Auxiliar administrativo', 'Psicólogo(a)', 'Enfermeiro(a)'],
    listar: [
      'Coordenador',
      'Psicólogo(a)',
      'Auxiliar administrativo',
      'Enfermeiro(a)',
      'Cozinheiro(a)',
      'Auxiliar de cozinha',
      'Auxiliar de serviços gerais',
    ],
    editar: ['Coordenador', 'Auxiliar administrativo', 'Psicólogo(a)', 'Enfermeiro(a)'],
    excluir: ['Coordenador', 'Auxiliar administrativo', 'Psicólogo(a)', 'Enfermeiro(a)'],
  },

  acolhido: {
    cadastrar: ['Coordenador', 'Psicólogo(a)', 'Auxiliar administrativo'],
    listar: ['Coordenador', 'Psicólogo(a)', 'Auxiliar administrativo', 'Enfermeiro(a)'],
    editar: ['Coordenador', 'Psicólogo(a)', 'Auxiliar administrativo'],
    excluir: ['Coordenador', 'Auxiliar administrativo'],
  },
};
