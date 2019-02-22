const _ = require('lodash');

const DEFAULT_MAX_ELEMENTS = 50;

module.exports = class NKeyMap {

    /**
     * Create a new multi keys map
     * @param {Number} maxElements Max elements that can be stored into map
     */
    constructor(maxElements) {
        this.maxElements = _.isNil(maxElements) ? DEFAULT_MAX_ELEMENTS : maxElements;
        this.keysMap = {};
        this.valuesMap = {};
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

        const valuesMapKeys = Object.keys(this.valuesMap);

        // full map case
        if (valuesMapKeys.length >= this.maxElements) {

            // removing all ref keys
            const keysFromNkeyMapObject = this.valuesMap[0];
            for (let nkey in keysFromNkeyMapObject) {
                delete this.keysMap[nkey];
            }

            // removing stored value
            delete this.valuesMap[valuesMapKeys[0]];
            
        }

        this.valuesMap[primaryKey] = { keys, value };
    }

    clean() {
        delete this.keysMap;
        this.keysMap = {};

        delete this.valuesMap;
        this.valuesMap = {};
    }
}