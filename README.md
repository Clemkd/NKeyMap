# NKeyMap

NKeyMap is a multi-key map where each stored value can be accessed thanks to a set of distinct keys.
NKeyMap do not **duplicate values** and allows you to **quick access** your stored objects.

# Example
```js
// Require library
const  NKeyMap  =  require('nkeymap');

// Instanciate map
const  nKeyMap  =  new  NKeyMap();

// Push values you want to store with multiple keys for each
nKeyMap.set(['a', 'b', 'c'], 12); 
nKeyMap.set(['d'], 'myStoredString');
nKeyMap.set(['key1', 'f'], { myProp1: 52, myProp2: true });

// Access stored values thanks to keys
nKeyMap.get('a');       // === 12
nKeyMap.get('b');       // === 12
nKeyMap.get('c');       // === 12

nKeyMap.get('d');       // === 'myStoredString'

nKeyMap.get('key1');    // === { myProp1: 52, myProp2: true }
nKeyMap.get('f');       // === { myProp1: 52, myProp2: true }

// Get current map size
nKeyMap.size();         // === 3

// Clear values from map
nKeyMap.clean();

nKeyMap.size();         // === 0

// When removed or not existing value
nKeyMap.get('a');               // === null
nKeyMap.get('notExistskey');    // === null
```

# Functions
## constructor
Create a new multi-key map

> *number* **maxElements** *(optional)* : Maximum length of the map. 
> If the size of the map exceeds the fixed limit, the first added elements are removed from the map (FIFO)

> By default, the map does not have a defined limit 

## get
Get your stored value thanks to one of the keys you had specified when you called the 'set' function

> *string* **key** : One of the keys that is referred to your stored value

## set
Push a new value into the map with some keys to access it later

> *Array*<*string*> **keys** : Array of keys that will allow you to access to your value later

> *Object* **value** : Value you want store into map

## clean
Remove all values from the map

## size
Get current count of elements available in the map
