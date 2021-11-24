import React, { DependencyList, useCallback, useEffect, useRef } from 'react';

import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import lodashThrottle from 'lodash/throttle';

export function useDebounce<T extends (...args: any) => any>(fn: T, delay: number, deps?: DependencyList) {
  return useCallback(debounce(fn, delay), deps || []);
}

export interface TreeOptions<T> {
  idKey: string;
  pidKey: string;
  childrenKey?: string;
  getParentKey?: (data: T) => string;
  converter?: (data: T) => T;
  sort?: (l: T, r: T) => number;
}

export function tree<T>(
  list: T[],
  {
    idKey = 'id',
    pidKey = 'parent_id',
    childrenKey = 'children',
    getParentKey = (data: any) => getFieldValue(data, pidKey),
    converter = undefined,
    sort = undefined,
  }: TreeOptions<T>
) {
  const start = new Date().getTime();
  try {
    let roots = list.filter((item: any) => {
      if (getParentKey(item)) {
        const parent = list.find((parent) => (parent as any)[idKey].toString() === getParentKey(item).toString());
        if (!parent) {
          return true;
        }
        if (!(parent as any)[childrenKey]) {
          (parent as any)[childrenKey] = [];
        }
        const children = (parent as any)[childrenKey];
        // TODO 逻辑漏洞
        item['parent'] = parent;
        children.push(item);
        if (sort) {
          (parent as any)[childrenKey] = children.sort(sort);
        }
        return false;
      }
      return true;
    });

    const converterFunc = (item: any) => {
      if (item[childrenKey]) {
        item[childrenKey] = item[childrenKey].map(converterFunc);
      }
      return converter ? converter(item) : item;
    };
    roots = sort ? roots.sort(sort) : roots;
    return converter ? roots.map(converterFunc) : roots;
  } finally {
    console.log('list -> tree 耗时', new Date().getTime() - start, 'ms');
  }
}

// 获取元素的绝对位置坐标（像对于浏览器视区左上角）
export function getElementViewPosition(element: any): { x: number; y: number } {
  // 计算x坐标
  let elementScrollLeft, elementScrollTop;
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft + current.clientLeft;
    current = current.offsetParent;
  }
  if (document.compatMode === 'BackCompat') {
    elementScrollLeft = document.body.scrollLeft;
  } else {
    elementScrollLeft = document.documentElement.scrollLeft;
  }
  const left = actualLeft - elementScrollLeft;
  // 计算y坐标
  let actualTop = element.offsetTop;
  current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop;
    current = current.offsetParent;
  }
  if (document.compatMode === 'BackCompat') {
    elementScrollTop = document.body.scrollTop;
  } else {
    elementScrollTop = document.documentElement.scrollTop;
  }
  return { x: left, y: actualTop - elementScrollTop };
}

export function urlToList(url: string) {
  const urllist = url.split('/').filter((i) => i);
  return urllist.map((_, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}

export const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, time);
  });

export function generateUUID() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint32Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

export const dispatchWindowResize = lodashThrottle(() => {
  window.dispatchEvent(new Event('resize'));
}, 500);

export type ThrottleOptions = {
  compare: (a: any, b: any) => boolean;
};

export const throttle = (callback: Function, options?: ThrottleOptions) => {
  const { compare = isEqual } = options || {};
  let prev: any = null;
  return {
    apply(...args: any) {
      if (compare(prev, args)) {
        return;
      }
      callback(...args);
      prev = args;
    },
  };
};

export function LightenColor(hex: string, lum: number) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;
  // convert to decimal and change luminosity
  let rgb = '#',
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }
  return rgb;
}

function deepCompareEquals(a: any, b: any) {
  return isEqual(a, b);
}

function useDeepCompareMemoize(value: any) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier
  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(effect: React.EffectCallback, dependencies?: Object) {
  useEffect(effect, useDeepCompareMemoize(dependencies));
}

export function getFieldValue(root: any, path: string) {
  let value = root;
  for (const key of path.split('.')) {
    if (!value) {
      return;
    }
    value = value[key];
  }
  return value;
}

export function setFieldValue<T>(root: T, path: string, value: any): T {
  path.split('.').reduce((obj: any, key: string, currentIndex: number, array: string[]) => {
    if (currentIndex === array.length - 1) {
      obj[key] = value;
    } else if (obj[key] === undefined || obj[key] === null) {
      return (obj[key] = {});
    }
    return null;
  }, root);
  return root;
}

export function assign(target: any, ...sources: any[]) {
  sources.forEach((source) => {
    let descriptors = Object.keys(source).reduce((descriptors: any, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});
    Object.getOwnPropertySymbols(source).forEach((sym) => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if ((descriptor as any).enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}
