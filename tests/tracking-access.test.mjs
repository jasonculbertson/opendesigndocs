import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { transform } from '@astrojs/compiler';
import { readFile } from 'node:fs/promises';

const admin = 'user_2ycNsYsOHZUfRlxgP2ysOCztGkt';
async function loadRoute(name) {
  const result = await build({
    entryPoints: [`src/pages/api/${name}.ts`], bundle: true, write: false,
    platform: 'node', format: 'esm', define: {'import.meta.env': JSON.stringify({SUPABASE_URL:'https://example.supabase.co',SUPABASE_SERVICE_ROLE_KEY:'test'})},
    plugins: [{name:'test-database',setup(b) {
      b.onResolve({filter:/^@supabase\/supabase-js$/},()=>({path:'database',namespace:'test'}));
      b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:`export function createClient() { return { from() { const q = new Proxy({}, {get(_, key) { return key === 'then' ? (resolve) => resolve({data: [], error: null}) : () => q; }}); return q; } }; }`}));
    }}],
  });
  return import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
}
for (const name of ['email-tracking-dashboard','analytics','recruiter-analytics']) {
  test(`${name}: rejects URL credentials and non-admin sessions before querying data`, async()=>{
    const {GET}=await loadRoute(name);
    for (const locals of [{},{auth:()=>({userId:'ordinary-user'})},{auth:()=>({userId:null})},{auth:()=>{throw Error('invalid session');}}]) {
      const url=new URL(`https://example.test/api/${name}?admin=jason2024&user_id=${admin}`);
      const response=await GET({request:new Request(url),url,locals});
      assert.ok([401,403].includes(response.status));
    }
  });
  test(`${name}: verified admin reaches database path`,async()=>{
    const {GET}=await loadRoute(name);
    const url=new URL(`https://example.test/api/${name}`);
    const response=await GET({request:new Request(url),url,locals:{auth:()=>({userId:admin})}});
    // An authorized request can complete with a synthetic empty dataset.
    assert.equal(response.status,200);
  });
}
for (const name of ['email-tracking','admin-links']) {
  test(`${name}: Astro page compiles with server-side admin gate`,async()=>{
    const source=await readFile(`src/pages/docs/recruiters/${name}.astro`,'utf8');
    await transform(source);
    assert.match(source,/isTrackingAdmin\(Astro.locals\)/);
    assert.doesNotMatch(source,/jason2024/);
  });
}
test('fresh tracking migrations never grant browser roles unrestricted table access', async()=>{
  for (const name of ['20250117_create_analytics_table.sql','20250127_create_email_tracking_table.sql']) {
    const sql=await readFile(`supabase/migrations/${name}`,'utf8');
    assert.doesNotMatch(sql,/FOR\s+ALL\s+USING\s*\(true\)/i);
    assert.doesNotMatch(sql,/GRANT\s+ALL[^;]+TO\s+(?:anon|authenticated)/i);
    assert.match(sql,/REVOKE ALL ON TABLE public\.\w+ FROM PUBLIC, anon, authenticated/);
  }
});

// Execute the actual page frontmatter with the real shared guard. Layout rendering
// is outside this authorization test; compile the complete Astro page separately.
async function loadAnalyticsPageGate() {
  const source = await readFile('src/pages/analytics.astro', 'utf8');
  await transform(source);
  const frontmatter = source.split('---')[1];
  const imports = frontmatter.match(/^import .*;$/gm) || [];
  const body = frontmatter.replace(/^import .*;$/gm, '');
  const result = await build({
    stdin: {
      contents: `${imports.filter(line => !line.includes('Layout.astro')).join('\n')}\nexport function run(Astro) {${body}}`,
      resolveDir: new URL('../src/pages/', import.meta.url).pathname,
      loader: 'ts',
    },
    bundle: true, write: false, platform: 'node', format: 'esm',
  });
  return import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'));
}

test('/analytics: verified administrator reaches dashboard rendering', async () => {
  const { run } = await loadAnalyticsPageGate();
  assert.equal(run({
    locals: { auth: () => ({ userId: admin }) },
    redirect: () => assert.fail('Verified administrator must not be redirected'),
  }), undefined);
});

test('/analytics: signed-out, nonadmin, and invalid sessions redirect home', async () => {
  const { run } = await loadAnalyticsPageGate();
  for (const locals of [
    {},
    { auth: () => ({ userId: null }) },
    { auth: () => ({ userId: 'ordinary-user' }) },
    { auth: () => { throw new Error('Invalid session'); } },
    { auth: { user: { id: admin, emailAddresses: [{ emailAddress: 'jculbertson@gmail.com' }] } } },
  ]) {
    const response = run({ locals, redirect: path => new Response(null, { status: 302, headers: { Location: path } }) });
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('Location'), '/');
  }
});

test('/analytics: client requests use session cookies without identity query parameters', async () => {
  const source = await readFile('src/pages/analytics.astro', 'utf8');
  assert.match(source, /fetch\('\/api\/analytics'\)/);
  assert.match(source, /fetch\('\/api\/recruiter-analytics'\)/);
  assert.doesNotMatch(source, /analyticsUserId|user_id|define:vars/);
});
