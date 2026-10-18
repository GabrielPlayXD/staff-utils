# Central de Ferramentas

Site estático (HTML + CSS + JS + Tailwind via CDN) que reúne várias ferramentas em um só lugar. Pronto para o GitHub Pages.

## Estrutura

```
index.html        página principal (menu lateral + área da ferramenta)
css/style.css     estilos extras
js/app.js         lógica do hub (não precisa mexer)
js/tools.js       LISTA DE FERRAMENTAS  ← único arquivo que você edita
tools/            um arquivo .html por ferramenta
```

## Adicionar uma ferramenta

1. Salve o `.html` dela em `tools/` (ex.: `tools/minha-ferramenta.html`).
2. Em `js/tools.js`, adicione um bloco à lista:

```js
{
    id: 'minha-ferramenta',
    name: 'Minha Ferramenta',
    description: 'O que ela faz.',
    file: 'minha-ferramenta.html',
    icon: '🛠️',
    tags: ['palavra', 'chave'],
},
```

Pronto: ela aparece no menu e na home. O link direto fica `seusite/#/minha-ferramenta`.

## Remover uma ferramenta

Apague o bloco dela em `js/tools.js` (e, se quiser, o arquivo em `tools/`).

## Publicar no GitHub Pages

1. Suba o conteúdo desta pasta para um repositório.
2. Em **Settings → Pages**, escolha a branch (`main`) e a pasta `/ (root)`.
3. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Dicas

- Cada ferramenta é uma página independente (carregada num `iframe`), então pode ter seu próprio HTML/JS sem conflitar com as outras. Mantenha o `<script src="https://cdn.tailwindcss.com">` em cada uma.
- Para testar localmente, abra o `index.html` direto no navegador ou rode `python3 -m http.server` dentro da pasta.
- Os arquivos de log são lidos no próprio navegador; nada é enviado para servidor algum.
