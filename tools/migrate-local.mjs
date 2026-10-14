import { execFileSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
const base=['--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config','dist/server/wrangler.json','--persist-to','.wrangler/state'];
function run(args,json=false){const output=execFileSync(process.execPath,[...base,...args,...(json?['--json']:[])],{encoding:'utf8',stdio:['ignore','pipe','inherit']});return json?JSON.parse(output):output;}
run(['--command','CREATE TABLE IF NOT EXISTS _cdc_local_migrations (name TEXT PRIMARY KEY NOT NULL)']);
const rows=run(['--command','SELECT name FROM _cdc_local_migrations'],true).flatMap(x=>x.results||[]),applied=new Set(rows.map(r=>r.name));
for(const file of (await readdir('drizzle')).filter(f=>/^[\w-]+\.sql$/.test(f)).sort()){
 if(applied.has(file)){console.log('Already applied: '+file);continue;}
 console.log(run(['--file','drizzle/'+file]));
 run(['--command',"INSERT INTO _cdc_local_migrations (name) VALUES ('"+file+"')"]);
 console.log('Applied: '+file);
}
