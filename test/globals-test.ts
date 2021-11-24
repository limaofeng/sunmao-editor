import Dexie from 'dexie';
import fetchMock from 'jest-fetch-mock';

Dexie.dependencies.indexedDB = require('fake-indexeddb');
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 0));

require('moveable-helper').__esModule = true;

fetchMock.enableMocks();
