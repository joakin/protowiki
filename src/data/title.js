export function normalize (title) {
  return title.replace(/ /g, '_')
    // Strip Unicode bidi override characters.
    .replace(/\xE2\x80[\x8E\x8F\xAA-\xAE]/g, '')
    // Clean up whitespace
    .replace(/[ \xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+/g, '_')
    // Trim _ from beginning and end
    .replace(/(?:^_+)|(?:_+$)/g, '');
}
