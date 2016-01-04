import * as fs from 'fs'
import * as tap from 'tap'
import {default as remark} from 'remark'
import {default as behead} from '../lib/index'

const MAXWEIGHT = '#'
const MINWEIGHT = '######'

tap.test('Add heading weight', (assert) => {
  let expected = '# Heading\n'
  let actual = remark
    .use(behead, {weight: 1})
    .process('## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove heading weight', (assert) => {
  let expected = '## Heading\n'
  let actual = remark
    .use(behead, {weight: -1})
    .process('# Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add max heading weight', (assert) => {
  let expected = MAXWEIGHT + ' Heading\n'
  let actual = remark
    .use(behead, {weight: 10})
    .process('## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading weight', (assert) => {
  let expected = MINWEIGHT + ' Heading\n'
  let actual = remark
    .use(behead, {weight: -10})
    .process('## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading w/o preserve', (assert) => {
  let expected = ' Heading\n'
  let actual = remark
    .use(behead, {weight: -10, preserve: false})
    .process('## Heading')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add heading weight after', (assert) => {
  let expected = '## Heading 1\n\n## Heading 2\n'
  let actual = remark
    .use(behead, {weight: -1, after: '## Heading 1'})
    .process('## Heading 1\n# Heading 2')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove heading weight after', (assert) => {
  let expected = '## Heading 1\n\n# Heading 2\n'
  let actual = remark
    .use(behead, {weight: 1, after: '## Heading 1'})
    .process('## Heading 1\n## Heading 2')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add max heading weight after', (assert) => {
  let expected = '## Heading 1\n\n' + MAXWEIGHT + ' Heading 2\n'
  let actual = remark
    .use(behead, {weight: 10, after: '## Heading 1'})
    .process('## Heading 1\n## Heading 2')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading weight after', (assert) => {
  let expected = '## Heading 1\n\n' + MINWEIGHT + ' Heading 2\n'
  let actual = remark
    .use(behead, {weight: -10, after: '## Heading 1'})
    .process('## Heading 1\n## Heading 2')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading weight w/o preserve after', (assert) => {
  let expected = '## Heading 1\n\n Heading 2\n'
  let actual = remark
    .use(behead, {weight: -10, after: '## Heading 1', preserve: false})
    .process('## Heading 1\n## Heading 2')

  assert.equal(actual, expected)
  assert.end()
})


tap.test('Add heading weight before', (assert) => {
  let expected = '### Heading 1\n\n## Heading 2\n'
  let actual = remark
    .use(behead, {weight: -1, before: '## Heading 2'})
    .process('## Heading 1\n## Heading 2')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove heading weight before', (assert) => {
  let expected = '# Heading 1\n\n## Heading 2\n'
  let actual = remark
    .use(behead, {weight: 1, before: '## Heading 2'})
    .process('## Heading 1\n## Heading 2')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Add max heading weight before', (assert) => {
  let expected = MAXWEIGHT + ' Heading 1\n\n## Heading 2\n'
  let actual = remark
    .use(behead, {weight: 10, before: '## Heading 2'})
    .process('## Heading 1\n## Heading 2')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading weight before', (assert) => {
  let expected = MINWEIGHT + ' Heading 1\n\n## Heading 2\n'
  let actual = remark
    .use(behead, {weight: -10, before: '## Heading 2'})
    .process('## Heading 1\n## Heading 2')

  assert.equal(actual, expected)
  assert.end()
})

tap.test('Remove max heading weight w/o preserve before', (assert) => {
  let expected = ' Heading 1\n\n## Heading 2\n'
  let actual = remark
    .use(behead, {weight: -10, before: '## Heading 2', preserve: false})
    .process('## Heading 1\n## Heading 2')

  assert.equal(actual, expected)
  assert.end()
})
