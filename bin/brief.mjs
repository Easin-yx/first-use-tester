#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const template = readFileSync(new URL('../skills/first-use-tester/assets/first-visit.md', import.meta.url), 'utf8');
export function brief(address, goal) {
  const url = new URL(address);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password)
    throw Error('入口须为不带账户密码的 HTTP(S) 地址');
  if (!goal?.trim()) throw Error('请填写想达成的结果');
  return template.replace(/{{(task|url)}}/g, (_, k) => k === 'url' ? url.href : goal.trim());
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 4) throw Error('用法：node bin/brief.mjs <网页地址> <一句任务>');
    process.stdout.write(brief(process.argv[2], process.argv[3]));
  } catch (err) {console.error(err.message); process.exitCode = 1;}
}
