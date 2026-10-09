export const site = {
  nome: 'Blog Clinica Estoque',
  descricao:
    'Guias praticos sobre controle de estoque, perdas por vencimento, compras e gestao do dia a dia de clinicas.',
  dominio: 'https://clinicaestoque.com.br',
  base: '/blog',
  idioma: 'pt-BR',
  autorPadrao: 'Clinica Estoque',
  publisher: {
    nome: 'Clinica Estoque',
    url: 'https://clinicaestoque.com.br',
    logo: 'https://clinicaestoque.com.br/clinica-estoque-logo.svg',
  },
  cadastroUrl: 'https://clinicaestoque.com.br/auth?tab=signup',
  cta: {
    titulo: 'Experimente a Clinica Estoque gratis por 7 dias',
    texto:
      'Controle seu estoque, evite perdas por vencimento e organize a clinica em menos de 5 minutos. Sem cartao de credito.',
    botao: 'Testar gratis',
  },
  postsPorPagina: 10,
  indexNowKey: 'cE2026blog9f4ab17a2ce14d9e9b4a5d2e8f1c7a06',
} as const;

export function urlAbsoluta(caminho: string): string {
  const base = site.base.endsWith('/') ? site.base.slice(0, -1) : site.base;
  const limpo = caminho.startsWith('/') ? caminho : `/${caminho}`;
  const semBase = limpo === base || limpo.startsWith(`${base}/`) ? limpo.slice(base.length) || '/' : limpo;
  const comBarra = semBase.endsWith('/') || semBase.includes('.') ? semBase : `${semBase}/`;
  return `${site.dominio}${base}${comBarra}`;
}
