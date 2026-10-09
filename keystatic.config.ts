import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: { owner: 'Felipeaqual', name: 'clinicaestoque-blog' },
  },
  ui: {
    brand: { name: 'Blog Clinica Estoque' },
    navigation: {
      'Conteudo': ['posts', 'autores'],
    },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'titulo',
      path: 'src/content/posts/*',
      format: { contentField: 'conteudo' },
      entryLayout: 'content',
      columns: ['titulo', 'dataPublicacao', 'publicado'],
      schema: {
        titulo: fields.slug({
          name: {
            label: 'Titulo',
            description: 'Aparece como H1 do post, na aba do navegador e nas listas.',
            validation: { length: { min: 1, max: 120 } },
          },
          slug: {
            label: 'Endereco (slug)',
            description:
              'Gerado automaticamente do titulo. Pode editar. Use somente letras minusculas, numeros e hifen. Nao use acento nem espaco.',
          },
        }),
        descricaoGoogle: fields.text({
          label: 'Descricao para o Google',
          description:
            'Resumo que o Google e o WhatsApp mostram abaixo do titulo. Escreva entre 50 e 160 caracteres, uma frase direta sobre o que o leitor vai aprender. Esse texto nao aparece dentro do post.',
          multiline: true,
          validation: { length: { min: 50, max: 160 } },
        }),
        imagemCapa: fields.image({
          label: 'Imagem de capa',
          description:
            'Aparece no topo do post, nas listas e nos compartilhamentos. Use pelo menos 1200 por 630 pixels.',
          directory: 'src/content/posts/_imagens',
          publicPath: './_imagens/',
          validation: { isRequired: true },
        }),
        imagemCapaAlt: fields.text({
          label: 'Texto alternativo da capa',
          description:
            'Descreva a imagem em uma frase. Serve para quem usa leitor de tela e para o Google entender o que a imagem mostra.',
          validation: { length: { min: 3, max: 180 } },
        }),
        dataPublicacao: fields.date({
          label: 'Data de publicacao',
          description: 'Dia em que o post deve aparecer como publicado no blog.',
          validation: { isRequired: true },
        }),
        dataAtualizacao: fields.date({
          label: 'Data de atualizacao',
          description:
            'Preencha quando reescrever ou corrigir o post. Deixe em branco se nunca atualizou.',
        }),
        autor: fields.relationship({
          label: 'Autor',
          collection: 'autores',
          validation: { isRequired: true },
        }),
        publicado: fields.checkbox({
          label: 'Publicado',
          description:
            'Marque somente quando o post estiver pronto para ir ao ar. Posts desmarcados ficam no repositorio mas nao aparecem no blog.',
          defaultValue: false,
        }),
        conteudo: fields.markdoc({
          label: 'Conteudo',
          options: {
            heading: [2, 3, 4],
            bold: true,
            italic: true,
            link: true,
            blockquote: true,
            unorderedList: true,
            orderedList: true,
            image: {
              directory: 'src/content/posts/_imagens',
              publicPath: './_imagens/',
              schema: {
                alt: fields.text({
                  label: 'Texto alternativo',
                  description:
                    'Descreva a imagem em uma frase. Obrigatorio para acessibilidade.',
                  validation: { length: { min: 3, max: 180 } },
                }),
                title: fields.text({ label: 'Legenda (opcional)' }),
              },
            },
            code: false,
            codeBlock: false,
            strikethrough: false,
            table: false,
            divider: false,
          },
        }),
      },
    }),
    autores: collection({
      label: 'Autores',
      slugField: 'nome',
      path: 'src/content/autores/*',
      format: 'yaml',
      columns: ['nome'],
      schema: {
        nome: fields.slug({
          name: {
            label: 'Nome',
            validation: { length: { min: 1, max: 80 } },
          },
          slug: {
            label: 'Endereco (slug)',
            description: 'Use letras minusculas, numeros e hifen. Sem acento.',
          },
        }),
        foto: fields.image({
          label: 'Foto',
          description: 'Foto quadrada, pelo menos 400 por 400 pixels.',
          directory: 'src/content/autores/_imagens',
          publicPath: './_imagens/',
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
