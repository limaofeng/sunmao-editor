import Dexie from 'dexie';
import fetchMock from 'jest-fetch-mock';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();

global.document = dom.window._document;
global.window = dom.window as any;

Dexie.dependencies.indexedDB = require('fake-indexeddb');
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 0));

require('moveable-helper').__esModule = true;

fetchMock.enableMocks();
