const assert = require('assert');
const NKeyMap = require('../index');

describe('nkeymap', () => {
    let nkeymap = null;

    beforeEach(() => {
        nkeymap = new NKeyMap(5);
    });

    afterEach(() => {
        nkeymap.clean();
    });

    describe('get & set', () => {

        it('should get values successfully', () => {
            nkeymap.set(['d'], 13);             
            nkeymap.set(['e', 'f'], 14);        
            nkeymap.set(['f', 'g'], "15");        
            nkeymap.set(['h', 'i'], { val: 16 });   
            
            assert.strictEqual(nkeymap.get('d'), 13);
            assert.strictEqual(nkeymap.get('e'), 14);
            assert.strictEqual(nkeymap.get('f'), "15");
            assert.strictEqual(nkeymap.get('g'), "15");
            assert.deepEqual(nkeymap.get('h'), { val: 16 });
            assert.deepEqual(nkeymap.get('i'), { val: 16 });
        });


        const tests = [
            { keys: [ 'a', 'b' ], value: 'stringtest' },
            { keys: [ 'myCustomKey' ], value: 13 },
            { keys: [ 'ownKey1', 'ownKey2' ], value: { myObject: { nested: 1 }, val: true } },
        ]
        
        for (let test of tests) {
            it(`should get value "${JSON.stringify(test.value)}" successfully`, () => {
                nkeymap.set(test.keys, test.value);

                for (let key of test.keys) {

                    if(typeof test.value === 'object')
                        assert.deepEqual(nkeymap.get(key), test.value);
                    else
                        assert.strictEqual(nkeymap.get(key), test.value);
                }
            });
        }
    });

    describe('roll', () => {
        it('should remove first added elements', () => {
            nkeymap.set(['removed', 'another-removed'], { l: 1, m: 32, y: [1, 2, 3] });             
            nkeymap.set(['rm too'], 'val');        
            nkeymap.set(['f', 'g'], 15);        
            nkeymap.set(['h', 'i'], { val: 16 });        
            nkeymap.set(['j', 'k', 'l'], "17");
            nkeymap.set(['keys14'], { l: 12, m: 64, y: [1, 2, 3] });
            nkeymap.set(['a'], 0); 

            assert.strictEqual(nkeymap.size(), 5);
            assert.strictEqual(nkeymap.get('removed'), null);
            assert.strictEqual(nkeymap.get('another-removed'), null);
            assert.strictEqual(nkeymap.get('rm too'), null);
            assert.strictEqual(nkeymap.get('f'), 15);
        });

        it('should remove values to respect max elements limit', () => {
            const max = 99999;
            const limit = 10;
            const nmap = new NKeyMap(limit);
            
            for (let i = 0; i < max; i++) {
                nmap.set([`k${i}`], i);
                assert.strictEqual(nmap.size(), (i + 1) > limit ? limit : (i + 1), `Expected: ${(i + 1) > limit ? limit : (i + 1)}, Got: ${nmap.size()}`);
            }

            for (let i = 0; i < max; i++) {
                if (i >= max - limit) {
                    assert.strictEqual(nmap.get(`k${i}`), i, `Expected: ${i}, Got: ${nmap.get(`k${i}`)}`);
                } else {
                    assert.strictEqual(nmap.get(`k${i}`), null, `Expected: null, Got: ${nmap.get(`k${i}`)}`);
                }
            }
        });

        it('should not remove values with undefined max elements limit', () => {
            const nmap = new NKeyMap();

            for (let i = 0; i < 99999; i++)
                nmap.set([`k${i}`], i);

            for (let i = 0; i < 99999; i++)
                assert.strictEqual(nmap.get(`k${i}`), i, `Expected: ${i}, Got: ${nmap.get(`k${i}`)}`);
        });
    });

    describe('clean', () => {

        it('should clean map successfully', () => {
            nkeymap.set(['d'], 13);             
            nkeymap.set(['e', 'f'], 14);        
            nkeymap.set(['f', 'g'], 15);        
            nkeymap.set(['h', 'i'], { val: 16 });        
            nkeymap.set(['j', 'k', 'l'], "17");
            
            assert.strictEqual(nkeymap.size(), 5);
            
            nkeymap.clean();

            assert.strictEqual(nkeymap.size(), 0);
        });
    });
});