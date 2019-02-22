# NKeyMap

NKeyMap is a multi-key map where each stored value can be accessed thanks to a set of distinct keys.
NKeyMap do not **duplicate values** and allows you to **quick access** your stored objects.

# Example
```js
// Require librairy
const  NKeyMap  =  require('nkeymap');

// Instanciate map with limit of elements
const  nKeyMap  =  new  NKeyMap(5);

// Push value with multiple keys
nKeyMap.set(['a', 'b', 'c'], 12); 
nKeyMap.set(['d'], 'myStoredString');
nKeyMap.set(['key1', 'f'], { myProp1: 52, myProp2: true });

// Obtain stored value thanks to keys
nKeyMap.get('a'); // === 12
nKeyMap.get('b'); // === 12
nKeyMap.get('c'); // === 12

nKeyMap.get('d'); // === 'myStoredString'

nKeyMap.get('key1'); // === { myProp1: 52, myProp2: true }
nKeyMap.get('f');	 // === { myProp1: 52, myProp2: true }
```

# Functions
## get
Get your stored value thanks to one of the keys you had specified when you called the 'set' function

> *string* **key** : One of the keys that is referred to your stored value

## set
Push a new value into the map with some keys to access it later

> *Array*<*string*> **keys** : Array of keys that will allow you to access to your value later

> *Object* **value** : Value you want store into map
