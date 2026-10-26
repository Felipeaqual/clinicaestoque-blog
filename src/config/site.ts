export const site = {
  nome: 'Blog Clínica Estoque',
  descricao:
    'Guias práticos sobre controle de estoque, perdas por vencimento, compras e gestão do dia a dia de clínicas.',
  dominio: 'https://www.clinicaestoque.com.br',
  base: '/blog',
  idioma: 'pt-BR',
  autorPadrao: 'Clínica Estoque',
  publisher: {
    nome: 'Clínica Estoque',
    url: 'https://www.clinicaestoque.com.br',
    logo: 'https://www.clinicaestoque.com.br/blog/android-chrome-512x512.png',
    logoWidth: 512,
    logoHeight: 512,
  },
  cadastroUrl: 'https://www.clinicaestoque.com.br/auth?tab=signup',
  cta: {
    titulo: 'Testar grátis por 7 dias',
    texto: '7 dias grátis, sem cartão de crédito, cancele quando quiser.',
    botao: 'Testar grátis por 7 dias',
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
