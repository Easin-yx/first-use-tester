import test from 'node:test';
import assert from 'node:assert/strict';
import {brief} from '../bin/brief.mjs';

test('puts only the supplied entry and outcome into the neutral brief', () => {
  const task = '读出旅行笔记的标题，再回到刚才的位置。';
  const result = brief('http://localhost:3000/', task);
  assert.ok(result.includes('任务：' + task));
  assert.ok(result.includes('入口：http://localhost:3000/'));
  assert.ok(!/{{(url|task)}}/.test(result));
  assert.ok(!result.includes('点收藏'));
});
test('rejects unusable tasks, nonweb URLs and embedded login info', () => {
  for (const args of [['https://example.org',' '],['file:///tmp/a','返回'],['https://name:pass@example.org/','阅读']])
    assert.throws(() => brief(...args));
});
