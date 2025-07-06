/*
 * Export files list for /pages folder
 */

function kebabCase (str) {
  const result = str.replace(
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
    match => '-' + match.toLowerCase()
  )
  return (str[0] === str[0].toUpperCase())
    ? result.substring(1)
    : result
}

function slugify (str) {
  return encodeURIComponent(String(str).trim().replace(/\s+/g, '-'))
}

const pages = [
  { file: 'Test1', title: 'Test1.vue', path: slugify(kebabCase('Test1')) },
  { file: 'TestQInputEx', title: 'TestQInputEx.vue', path: slugify(kebabCase('TestQInputEx')) }
]

export default pages