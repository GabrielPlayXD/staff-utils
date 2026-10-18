/*
 * ============================================================
 *  LISTA DE FERRAMENTAS  —  é só este arquivo que você edita!
 * ============================================================
 *
 * ADICIONAR uma ferramenta:
 *   1. Coloque o arquivo .html dela na pasta  tools/
 *   2. Copie um bloco abaixo, cole no fim da lista e ajuste.
 *
 * REMOVER uma ferramenta:
 *   1. Apague o bloco dela aqui.
 *   2. (Opcional) apague o arquivo da pasta tools/.
 *
 * Campos:
 *   id          identificador único, sem espaços (usado na URL: #/id)
 *   name        nome exibido
 *   description frase curta explicando para que serve
 *   file        caminho do arquivo dentro da pasta tools/
 *   icon        um emoji (opcional)
 *   tags        lista de palavras-chave para a busca (opcional)
 */
window.TOOLS = [
    {
        id: 'buscador-comandos',
        name: 'Buscador de Comandos',
        description: 'Veja quem usou cada comando nos logs do servidor Minecraft.',
        file: 'buscador-comandos.html',
        icon: '⌨️',
        tags: ['logs', 'minecraft', 'comandos', 'jogadores'],
    },
    {
        id: 'transferencias',
        name: 'Auditoria de Transações',
        description: 'Analise gave / took / paid e saldos a partir de um arquivo de log da economia.',
        file: 'transferencias.html',
        icon: '💰',
        tags: ['economia', 'logs', 'transações', 'saldo'],
    },

    // --- Exemplo para copiar (remova as barras // para ativar) ---
    // {
    //     id: 'minha-ferramenta',
    //     name: 'Minha Ferramenta',
    //     description: 'O que ela faz.',
    //     file: 'minha-ferramenta.html',
    //     icon: '🛠️',
    //     tags: ['exemplo'],
    // },
];
