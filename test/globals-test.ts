import Dexie from 'dexie';

Dexie.dependencies.indexedDB = require('fake-indexeddb');
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

require('moveable-helper').__esModule = true;

require('jest-fetch-mock').enableMocks();
