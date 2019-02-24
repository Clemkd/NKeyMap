const _ = require('lodash');

module.exports = class NKeyMap {

    /**
     * Create a new multi-key map
     * @param {Number} maxElements Max elements that can be stored into map
     */
    constructor(maxElements) {
        this.maxElements = maxElements;
        this.keysMap = {};
        this.valuesMap = {};
        this.length = 0;
    }

    /**
     * Get stored value
     * @param {string} key One of the reference keys of the desired value
     */
    get(key) {
        if (!this.keysMap.hasOwnProperty(key)) {
            return null;
        }
        
        const primaryKey = this.keysMap[key];
        if (!this.valuesMap.hasOwnProperty(primaryKey)) {
            // Not normal case !
            return null;
        }

        const nKeyMapObject = this.valuesMap[primaryKey]
        return nKeyMapObject.value;
    }

    /**
     * Store a new value into the map
     * @param {Array<string>} keys Reference keys to the value
     * @param {*} value Value to add
     */
    set(keys, value) {
        const primaryKey = keys[0];

        for (let key of keys) {
            this.keysMap[key] = primaryKey;
        }

        // full map case
        if (!_.isNil(this.maxElements) && this.length >= this.maxElements) {

            // get first property key from values map
            let firstPropertyKey = null;
            for (let property in this.valuesMap) {
                firstPropertyKey = property;
                break;
            }

            // deletes all reference keys
            const nkeyValueMapObject = this.valuesMap[firstPropertyKey];
            for (let nkey of nkeyValueMapObject.keys) {
                delete this.keysMap[nkey];
            }

            delete this.valuesMap[firstPropertyKey];
            this.length--;
        }

        this.valuesMap[primaryKey] = { keys, value };
        this.length++;
    }

    /**
     * Remove all values stored into the map
     */
    clean() {
        delete this.keysMap;
        this.keysMap = {};

        delete this.valuesMap;
        this.valuesMap = {};
        this.length = 0;
    }

    /**
     * Current number of values stored into the map
     */
    size() {
        return this.length;
    }
}