(function () {
    'use strict';

    const $ = id => document.getElementById(id);
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const norm = s => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

    // ---------------------------------------------------------------
    // Validação do manifesto
    // ---------------------------------------------------------------
    const seen = new Set();
    const TOOLS = (window.TOOLS || []).filter(t => {
        if (!t || !t.id || !t.name || !t.file) {
            console.warn('[hub] Ferramenta ignorada (faltam id, name ou file):', t);
            return false;
        }
        if (seen.has(t.id)) {
            console.warn('[hub] id duplicado ignorado:', t.id);
            return false;
        }
        seen.add(t.id);
        return true;
    });

    const toolUrl = t => 'tools/' + encodeURI(t.file);
    const byId = id => TOOLS.find(t => t.id === id);

    // ---------------------------------------------------------------
    // Elementos
    // ---------------------------------------------------------------
    const sidebar = $('sidebar');
    const navList = $('navList');
    const navSearch = $('navSearch');
    const homeView = $('homeView');
    const toolView = $('toolView');
    const toolGrid = $('toolGrid');
    const toolFrame = $('toolFrame');
    const toolTitle = $('toolTitle');
    const toolOpenNew = $('toolOpenNew');
    const toolReload = $('toolReload');
    const frameLoading = $('frameLoading');
    const menuBtn = $('menuBtn');
    const backdrop = $('backdrop');
    const toolCount = $('toolCount');

    // ---------------------------------------------------------------
    // Listas (menu lateral + cards da home)
    // ---------------------------------------------------------------
    function matches(t, q) {
        if (!q) return true;
        const hay = norm([t.name, t.description, ...(t.tags || [])].join(' '));
        return q.split(/\s+/).every(w => hay.includes(w));
    }

    function renderNav(activeId) {
        const q = norm(navSearch.value.trim());
        const list = TOOLS.filter(t => matches(t, q));
        if (!list.length) {
            navList.innerHTML = '<p class="text-xs text-gray-500 italic px-3 py-2">Nada encontrado.</p>';
            return;
        }
        navList.innerHTML = list.map(t => `
            <a href="#/${esc(t.id)}" data-id="${esc(t.id)}"
               class="nav-item flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition ${t.id === activeId ? 'active' : ''}">
                <span class="text-lg leading-none w-6 text-center">${esc(t.icon || '🧩')}</span>
                <span class="truncate">${esc(t.name)}</span>
            </a>`).join('');
    }

    function renderGrid() {
        if (!TOOLS.length) {
            toolGrid.innerHTML = `
                <div class="col-span-full text-center text-gray-500 italic py-16">
                    Nenhuma ferramenta cadastrada. Edite <code class="text-indigo-300">js/tools.js</code> para adicionar.
                </div>`;
            return;
        }
        toolGrid.innerHTML = TOOLS.map(t => `
            <a href="#/${esc(t.id)}" class="tool-card block bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div class="text-3xl mb-3">${esc(t.icon || '🧩')}</div>
                <h3 class="text-white font-semibold">${esc(t.name)}</h3>
                <p class="text-sm text-gray-500 mt-1">${esc(t.description || '')}</p>
                ${(t.tags || []).length ? `<div class="flex flex-wrap gap-1.5 mt-3">${t.tags.map(tag =>
                    `<span class="text-[11px] bg-gray-800 text-gray-400 border border-gray-700 rounded-full px-2 py-0.5">${esc(tag)}</span>`).join('')}</div>` : ''}
            </a>`).join('');
    }

    // ---------------------------------------------------------------
    // Roteamento por hash:  #/id-da-ferramenta
    // ---------------------------------------------------------------
    let currentId = null;

    function route() {
        const id = decodeURIComponent((location.hash || '').replace(/^#\/?/, ''));
        const tool = id ? byId(id) : null;

        closeMenu();

        if (!tool) {
            currentId = null;
            toolFrame.src = 'about:blank';
            toolView.classList.add('hidden');
            homeView.classList.remove('hidden');
            document.title = 'Central de Ferramentas';
            renderNav(null);
            return;
        }

        if (tool.id !== currentId) {
            currentId = tool.id;
            frameLoading.classList.remove('hidden');
            toolFrame.src = toolUrl(tool);
        }
        homeView.classList.add('hidden');
        toolView.classList.remove('hidden');
        toolTitle.textContent = `${tool.icon || '🧩'}  ${tool.name}`;
        toolOpenNew.href = toolUrl(tool);
        document.title = `${tool.name} · Central de Ferramentas`;
        renderNav(tool.id);
    }

    toolFrame.addEventListener('load', () => frameLoading.classList.add('hidden'));

    toolReload.addEventListener('click', () => {
        const t = byId(currentId);
        if (!t) return;
        frameLoading.classList.remove('hidden');
        toolFrame.src = toolUrl(t);
    });

    // ---------------------------------------------------------------
    // Menu mobile
    // ---------------------------------------------------------------
    function openMenu() { sidebar.classList.remove('closed'); backdrop.classList.remove('hidden'); }
    function closeMenu() { sidebar.classList.add('closed'); backdrop.classList.add('hidden'); }
    menuBtn.addEventListener('click', () => sidebar.classList.contains('closed') ? openMenu() : closeMenu());
    backdrop.addEventListener('click', closeMenu);

    navSearch.addEventListener('input', () => renderNav(currentId));

    // ---------------------------------------------------------------
    // Início
    // ---------------------------------------------------------------
    toolCount.textContent = `${TOOLS.length} ferramenta${TOOLS.length === 1 ? '' : 's'}`;
    renderGrid();
    window.addEventListener('hashchange', route);
    route();
})();
