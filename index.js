const _ = require('lodash');

module.exports = class NKeyMap {

    /**
     * Create a new multi keys map
     * @param {Number} maxElements Max elements that can be stored into map
     */
    constructor(maxElements) {
        this.maxElements = maxElements;
        this.keysMap = {};
        this.valuesMap = {};
        this.length = 0;
    }

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

    set(keys, value) {
        const primaryKey = keys[0];

        for (let key of keys) {
            this.keysMap[key] = primaryKey;
        }

        // full map case
        if (!_.isNil(this.maxElements) && this.length >= this.maxElements) {
            // removing all ref keys
            const keysFromNkeyMapObject = this.valuesMap[0];
            for (let nkey in keysFromNkeyMapObject) {
                delete this.keysMap[nkey];
            }

            // removing stored value
            let firstPropertyKey = null;
            for (let property in this.valuesMap) {
                firstPropertyKey = property;
                break;
            }

            delete this.valuesMap[firstPropertyKey];
            this.length--;
        }

        this.valuesMap[primaryKey] = { keys, value };
        this.length++;
    }

    clean() {
        delete this.keysMap;
        this.keysMap = {};

        delete this.valuesMap;
        this.valuesMap = {};
        this.length = 0;
    }

    size() {
        return this.length;
    }
}