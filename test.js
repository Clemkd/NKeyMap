const assert = require('assert');

const NKeyMap = require('./index');

const nKeyMap = new NKeyMap(5);

nKeyMap.set(['a', 'b', 'c'], 12);   // will be removed cause of limit (5 elements) when the value 17 is stored
nKeyMap.set(['d'], 13);             
nKeyMap.set(['e', 'f'], 14);        
nKeyMap.set(['f', 'g'], 15);        
nKeyMap.set(['h', 'i'], 16);        
nKeyMap.set(['j', 'k', 'l'], 17);   

// Removed cause of maximum
assert.strictEqual(nKeyMap.get('a'), null);
assert.strictEqual(nKeyMap.get('b'), null);
assert.strictEqual(nKeyMap.get('c'), null);

assert.strictEqual(nKeyMap.get('d'), 13);

assert.strictEqual(nKeyMap.get('e'), 14);

assert.strictEqual(nKeyMap.get('f'), 15);
assert.strictEqual(nKeyMap.get('g'), 15);

assert.strictEqual(nKeyMap.get('h'), 16);
assert.strictEqual(nKeyMap.get('i'), 16);

assert.strictEqual(nKeyMap.get('j'), 17);
assert.strictEqual(nKeyMap.get('k'), 17);
assert.strictEqual(nKeyMap.get('l'), 17);

console.log(nKeyMap.maxElements);
console.log(nKeyMap.keysMap);
console.log(nKeyMap.valuesMap);