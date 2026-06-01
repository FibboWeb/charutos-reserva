/**
 * create-menus.js
 *
 * Cria os submenus necessários para o nav_group do header via Shopify GraphQL Admin API.
 * Cada submenu é criado com o mesmo handle da collection do item (charutos, cigarrilhas…),
 * para que seja referenciado nos blocos "Item do menu de navegação" do admin do tema.
 *
 * Uso:
 *   node scripts/create-menus.js              → cria/atualiza os menus
 *   node scripts/create-menus.js --dry-run    → mostra o que seria criado sem criar
 *   node scripts/create-menus.js --list       → lista os menus atuais da loja
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ─── Config ───────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_PATH  = resolve(__dirname, '../.env');
const API_VER   = '2024-01';

// ─── Parse .env (aceita aspas simples, espaços ao redor do = e ponto e vírgula) ──

function parseEnv(filePath) {
  const vars = {};
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eqIdx = t.indexOf('=');
    if (eqIdx === -1) continue;
    const key = t.slice(0, eqIdx).trim();
    const val = t.slice(eqIdx + 1).trim().replace(/;$/, '').replace(/^['"]|['"]$/g, '');
    vars[key] = val;
  }
  return vars;
}

const env   = parseEnv(ENV_PATH);
const SHOP  = env.SHOP_NAME;
const TOKEN = env.SHOPIFY_TOKEN;

if (!SHOP || !TOKEN) {
  console.error('❌  SHOP_NAME ou SHOPIFY_TOKEN não encontrados no .env');
  process.exit(1);
}

const GQL_URL = `https://${SHOP}.myshopify.com/admin/api/${API_VER}/graphql.json`;

// ─── Estrutura dos submenus a criar ───────────────────────────────────────────
//
// handle  : identificador do menu (= valor do campo "submenu" no bloco nav_group)
// title   : nome exibido no Shopify admin
// links   : itens do dropdown
//           url  → URL relativa da collection/page (ex: /collections/charutos-nacionais)
//           type → COLLECTION | PAGE | HTTP  (usado para resolver resourceId)
//
// Os handles de collection são os mesmos da loja (confirmados na query anterior).

const MENUS = [
  {
    handle: 'charutos',
    title:  'Charutos — Submenu',
    links: [
      { title: 'Ver todos os Charutos',       url: '/collections/charutos',                 type: 'COLLECTION' },
      { title: 'Charutos Nacionais',          url: '/collections/charutos-nacionais',       type: 'HTTP' },
      { title: 'Charutos Importados',         url: '/collections/charutos-importados',      type: 'HTTP' },
      { title: 'Por Vitola (Tamanho)',        url: '/collections/charutos-por-vitola',      type: 'HTTP' },
      { title: 'Por Marca',                   url: '/collections/charutos-por-marca',       type: 'HTTP' },
      { title: 'Charutos em Caixa',           url: '/collections/charutos-em-caixa',        type: 'HTTP' },
      { title: 'Charutos Avulsos',            url: '/collections/charutos-avulsos',         type: 'HTTP' },
    ],
  },
  {
    handle: 'cigarrilhas',
    title:  'Cigarrilhas — Submenu',
    links: [
      { title: 'Ver todas as Cigarrilhas',    url: '/collections/cigarrilhas',              type: 'COLLECTION' },
      { title: 'Com Filtro',                  url: '/collections/cigarrilhas-com-filtro',   type: 'HTTP' },
      { title: 'Sem Filtro',                  url: '/collections/cigarrilhas-sem-filtro',   type: 'HTTP' },
      { title: 'Nacionais',                   url: '/collections/cigarrilhas-nacionais',    type: 'HTTP' },
      { title: 'Importadas',                  url: '/collections/cigarrilhas-importadas',   type: 'HTTP' },
    ],
  },
  {
    handle: 'fumos',
    title:  'Fumos e Tabaco — Submenu',
    links: [
      { title: 'Ver todos os Fumos',          url: '/collections/fumos',                    type: 'COLLECTION' },
      { title: 'Tabaco para Cachimbo',        url: '/collections/tabaco-para-cachimbo',     type: 'HTTP' },
      { title: 'Tabaco para Narguile',        url: '/collections/tabaco-para-narguile',     type: 'HTTP' },
      { title: 'Tabaco de Corda',             url: '/collections/tabaco-de-corda',          type: 'HTTP' },
      { title: 'Palheiros',                   url: '/collections/palheiros',                type: 'COLLECTION' },
    ],
  },
  {
    handle: 'palheiros',
    title:  'Palheiros — Submenu',
    links: [
      { title: 'Ver todos os Palheiros',      url: '/collections/palheiros',                type: 'COLLECTION' },
      { title: 'Palheiros Nacionais',         url: '/collections/palheiros-nacionais',      type: 'HTTP' },
      { title: 'Palheiros Tradicionais',      url: '/collections/palheiros-tradicionais',   type: 'HTTP' },
    ],
  },
  {
    handle: 'cachimbos',
    title:  'Cachimbos — Submenu',
    links: [
      { title: 'Ver todos os Cachimbos',      url: '/collections/cachimbos',                type: 'COLLECTION' },
      { title: 'Cachimbos de Briar',          url: '/collections/cachimbos-de-briar',       type: 'HTTP' },
      { title: 'Cachimbos de Espuma do Mar',  url: '/collections/cachimbos-meerschaum',     type: 'HTTP' },
      { title: 'Cachimbos de Água',           url: '/collections/cachimbos-de-agua',        type: 'HTTP' },
      { title: 'Narguile',                    url: '/collections/narguile',                  type: 'HTTP' },
    ],
  },
  {
    handle: 'acessorios',
    title:  'Acessórios — Submenu',
    links: [
      { title: 'Ver todos os Acessórios',     url: '/collections/acessorios',               type: 'COLLECTION' },
      { title: 'Cortadores de Charuto',       url: '/collections/cortadores',               type: 'HTTP' },
      { title: 'Cinzeiros',                   url: '/collections/cinzeiros',                type: 'HTTP' },
      { title: 'Porta-Charutos',              url: '/collections/porta-charutos',           type: 'HTTP' },
      { title: 'Humidores',                   url: '/collections/humidores',                type: 'HTTP' },
      { title: 'Umidificadores',              url: '/collections/umidificadores',           type: 'HTTP' },
    ],
  },
  {
    handle: 'zippos',
    title:  'Zippos e Acendedores — Submenu',
    links: [
      { title: 'Ver todos os Zippos',         url: '/collections/zippos',                   type: 'COLLECTION' },
      { title: 'Zippo Originais',             url: '/collections/zippos-originais',         type: 'HTTP' },
      { title: 'Isqueiros de Tocha',          url: '/collections/isqueiros-de-tocha',       type: 'HTTP' },
      { title: 'Fósforos de Cedro',           url: '/collections/fosforos-de-cedro',        type: 'HTTP' },
      { title: 'Palitos de Cedro',            url: '/collections/palitos-de-cedro',         type: 'HTTP' },
    ],
  },
  {
    handle: 'rape',
    title:  'Rapé — Submenu',
    links: [
      { title: 'Ver todo o Rapé',             url: '/collections/rape',                      type: 'COLLECTION' },
      { title: 'Rapé Indígena',               url: '/collections/rape-indigena',             type: 'HTTP' },
      { title: 'Rapé Premium',                url: '/collections/rape-premium',              type: 'HTTP' },
      { title: 'Kuripes e Tepi',              url: '/collections/kuripes-e-tepi',            type: 'HTTP' },
    ],
  },
  {
    handle: 'kits',
    title:  'Kits e Presentes — Submenu',
    links: [
      { title: 'Ver todos os Kits',           url: '/collections/kits',                     type: 'COLLECTION' },
      { title: 'Presentes',                   url: '/collections/presentes',                type: 'COLLECTION' },
      { title: 'Kit Iniciante',               url: '/collections/kit-iniciante',            type: 'HTTP' },
      { title: 'Kit Premium',                 url: '/collections/kit-premium',              type: 'HTTP' },
      { title: 'Caixas de Presente',          url: '/collections/caixas-de-presente',       type: 'HTTP' },
    ],
  },
  {
    handle: 'presentes',
    title:  'Presentes — Submenu',
    links: [
      { title: 'Ver todos os Presentes',      url: '/collections/presentes',                type: 'COLLECTION' },
      { title: 'Kits',                        url: '/collections/kits',                     type: 'COLLECTION' },
      { title: 'Caixas de Presente',          url: '/collections/caixas-de-presente',       type: 'HTTP' },
      { title: 'Kits Personalizados',         url: '/collections/kits-personalizados',      type: 'HTTP' },
    ],
  },
];

// ─── Helpers GraphQL ──────────────────────────────────────────────────────────

async function gql(query, variables = {}) {
  const res = await fetch(GQL_URL, {
    method:  'POST',
    headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json' },
    body:    JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors, null, 2));
  return json.data;
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Buscar coleções por handle (para obter resourceId) ───────────────────────

async function fetchCollectionGids(handles) {
  const gids = {};
  // busca em lotes de 10 para não estourar custo de query
  for (let i = 0; i < handles.length; i += 10) {
    const batch = handles.slice(i, i + 10);
    const parts = batch.map((h, idx) => `
      c${idx}: collectionByHandle(handle: "${h}") { id handle }
    `).join('\n');
    const data = await gql(`{ ${parts} }`);
    for (const [alias, col] of Object.entries(data)) {
      if (col) gids[col.handle] = col.id;
    }
    await sleep(300);
  }
  return gids;
}

// ─── Listar menus atuais ──────────────────────────────────────────────────────

async function listMenus() {
  const data = await gql(`{
    menus(first: 50) {
      edges {
        node {
          id handle title
          items { id title url type }
        }
      }
    }
  }`);
  return data.menus.edges.map(e => e.node);
}

// ─── Criar menu ───────────────────────────────────────────────────────────────

const CREATE_MENU = `
mutation menuCreate($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) {
  menuCreate(title: $title, handle: $handle, items: $items) {
    menu { id handle title }
    userErrors { field message }
  }
}`;

const UPDATE_MENU = `
mutation menuUpdate($id: ID!, $title: String, $handle: String, $items: [MenuItemCreateInput!]!) {
  menuUpdate(id: $id, title: $title, handle: $handle, items: $items) {
    menu { id handle title }
    userErrors { field message }
  }
}`;

function buildItems(links, collectionGids) {
  return links.map(l => {
    const handle = l.url.replace('/collections/', '');
    const gid    = collectionGids[handle];

    if (l.type === 'COLLECTION' && gid) {
      return { title: l.title, type: 'COLLECTION', resourceId: gid };
    }
    // fallback: HTTP link com URL absoluta
    const absolute = l.url.startsWith('http')
      ? l.url
      : `https://${SHOP}.myshopify.com${l.url}`;
    return { title: l.title, type: 'HTTP', url: absolute };
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args   = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const doList = args.includes('--list');

  console.log(`\n🏪  Loja : ${SHOP}.myshopify.com`);
  console.log(`🔑  Token: ${TOKEN.slice(0, 12)}…\n`);

  // ── Busca menus existentes ──
  let existingMenus;
  try {
    existingMenus = await listMenus();
  } catch (e) {
    console.error('❌  Erro ao listar menus:', e.message);
    process.exit(1);
  }

  // ── Modo --list ──
  if (doList) {
    console.log(`📋  ${existingMenus.length} menu(s) na loja:\n`);
    for (const m of existingMenus) {
      console.log(`  ┌ ${m.handle.padEnd(35)} "${m.title}"`);
      for (const item of m.items) {
        console.log(`  │   • ${item.title.padEnd(35)} ${item.url}`);
      }
      console.log('  └');
    }
    return;
  }

  // ── Mostra menu principal atual ──
  const headerMenu = existingMenus.find(m => m.handle === 'header-menu' || m.handle === 'main-menu');
  if (headerMenu) {
    console.log(`📌  Menu principal atual: "${headerMenu.title}" (${headerMenu.handle})\n`);
    for (const item of headerMenu.items) {
      console.log(`     • ${item.title.padEnd(30)} ${item.url}`);
    }
    console.log('');
  }

  // ── Coleta handles de collections para resolver GIDs ──
  console.log('🔍  Resolvendo collections…\n');
  const allHandles = [
    ...new Set(
      MENUS.flatMap(m => m.links
        .filter(l => l.type === 'COLLECTION')
        .map(l => l.url.replace('/collections/', ''))
      )
    ),
  ];
  const collectionGids = await fetchCollectionGids(allHandles);
  const resolved = Object.keys(collectionGids).length;
  console.log(`   ${resolved}/${allHandles.length} collections encontradas na loja\n`);

  // ── Mapeia handles existentes para IDs ──
  const existingMap = {};
  for (const m of existingMenus) existingMap[m.handle] = m.id;

  // ── Cria / atualiza submenus ──
  console.log(`${dryRun ? '🔍  [DRY RUN] ' : ''}Processando ${MENUS.length} submenus…\n`);

  const created = [], updated = [], failed = [];

  for (const menu of MENUS) {
    const exists  = menu.handle in existingMap;
    const verb    = exists ? 'Atualizar' : 'Criar    ';
    const icon    = exists ? '♻️ ' : '✨';
    const items   = buildItems(menu.links, collectionGids);
    const collectionItems = items.filter(i => i.type === 'COLLECTION').length;
    const httpItems       = items.filter(i => i.type === 'HTTP').length;

    if (dryRun) {
      console.log(`${icon}  [${verb}] ${menu.handle.padEnd(20)} "${menu.title}"`);
      for (const item of items) {
        const badge = item.type === 'COLLECTION' ? '🔗' : '🌐';
        console.log(`            ${badge} ${item.title}`);
      }
      console.log(`            (${collectionItems} collection, ${httpItems} HTTP)\n`);
      continue;
    }

    try {
      if (exists) {
        const data = await gql(UPDATE_MENU, {
          id:     existingMap[menu.handle],
          title:  menu.title,
          handle: menu.handle,
          items,
        });
        const errs = data.menuUpdate.userErrors;
        if (errs.length) throw new Error(errs.map(e => e.message).join(', '));
        console.log(`♻️   Atualizado: ${menu.handle.padEnd(20)} "${menu.title}" (${items.length} links)`);
        updated.push(menu.handle);
      } else {
        const data = await gql(CREATE_MENU, { title: menu.title, handle: menu.handle, items });
        const errs = data.menuCreate.userErrors;
        if (errs.length) throw new Error(errs.map(e => e.message).join(', '));
        console.log(`✅  Criado:     ${menu.handle.padEnd(20)} "${menu.title}" (${items.length} links)`);
        created.push(menu.handle);
      }
    } catch (e) {
      console.error(`❌  Erro em "${menu.handle}": ${e.message}`);
      failed.push(menu.handle);
    }

    await sleep(400);
  }

  // ── Sumário ──
  console.log('\n─────────────────────────────────────────');
  console.log(`✅  Criados : ${created.length}  (${created.join(', ') || '—'})`);
  console.log(`♻️   Atualizados: ${updated.length}  (${updated.join(', ') || '—'})`);
  if (failed.length) console.log(`❌  Falhas  : ${failed.length}  (${failed.join(', ')})`);

  console.log('\n🎉  Concluído!\n');
  console.log('─── Próximos passos ─────────────────────────────────────────────────');
  console.log('  1. No Shopify admin, confirme as collections criadas e ajuste os links HTTP.');
  console.log('  2. No admin do tema → Header → adicione blocos "Item do menu de navegação":');
  console.log('');
  const all = [...MENUS];
  for (const m of all) {
    console.log(`       handle do submenu: "${m.handle}"   →  ${m.title}`);
  }
  console.log('');
}

main().catch(e => {
  console.error('\nErro fatal:', e.message);
  process.exit(1);
});
