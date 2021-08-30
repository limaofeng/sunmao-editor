import React from 'react';
import { useEffect } from 'react';

import isEqual from 'lodash/isEqual';
import { useReactComponent, useSketch } from 'sunmao';
import { useEditor, useSelector } from '@asany/editor';

import { IComponentData } from '../typings';

function Workspace() {
  const editor = useEditor();
  const sketch = useSketch();

  const data = useSelector<IComponentData>((state) => state.project, isEqual);

  const component = useReactComponent(data.template, data.blocks);

  useEffect(() => {
    return sketch.on('block-click', (id: string) => {
      const component = sketch.getComponent(id)!;
      const block = sketch.getBlock(id)!;
      // 设置属性配置面板
      editor.scena.setSelectedTargets([document.getElementById(id)!]);
      // 打开属性配置面板
      const store = component.store;
      editor.aside.open({
        customizer: block.customizer!,
        value: store.getBlock(block.key)!.props,
        update: block.update,
        watchValue: (callback: (value: any) => void) => {
          const handleChange = () => {
            callback(store.getBlock(block.key)!.props);
          };
          return store.subscribe(handleChange);
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.createElement(component);
}

export default Workspace;
