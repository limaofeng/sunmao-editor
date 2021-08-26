import isEqual from 'lodash-es/isEqual';
import React from 'react';
import { useEffect } from 'react';
import { useReactComponent, useSketch } from 'sunmao';

import { buildAside, useEditor, useSelector } from '@asany/editor';
import { IComponentData } from '../typings';

function Workspace() {
  const editor = useEditor();
  const sketch = useSketch();

  const data = useSelector<IComponentData>((state) => state.project.data, isEqual);

  const component = useReactComponent(data.template, data.props);

  useEffect(() => {
    return sketch.on('block-click', (id: string) => {
      const component = sketch.getComponent(id)!;
      const block = sketch.getBlock(id)!;
      // 设置属性配置面板
      editor.scena.setSelectedTargets([document.getElementById(id)!]);
      // 打开属性配置面板
      const tabs = buildAside(block.customizer!);
      const store = component.store;
      editor.aside.open(tabs, {
        value: store.getState().blocks.find((item) => item.key === block.key)!.props,
        update: block.update,
        watchValue: (callback: (value: any) => void) => {
          const handleChange = () => {
            callback(store.getState().blocks.find((item) => item.key === block.key)!.props);
          };
          return store.subscribe(handleChange);
        },
      });
    });
  }, []);

  return React.createElement(component);
}

export default Workspace;
