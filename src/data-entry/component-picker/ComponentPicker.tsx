import React, { useMemo } from 'react';

import { ComponentTreeNode } from 'sunmao/dist/typings';
import { Select } from '@asany/editor';
import { useSunmao } from 'sunmao';

import { ComponentPickerProps } from '../../typings';

import Dialog from './components/Dialog';

function handleGetComponent(nodes: ComponentTreeNode[], key: string): ComponentTreeNode | undefined {
  for (const node of nodes) {
    if (node.value === key) {
      console.log('node', node);
      return node;
    }
    const _node = node.children?.length ? handleGetComponent(node.children, key) : undefined;
    console.log('node', _node);
    if (_node) {
      return _node;
    }
  }
  return undefined;
}

function ComponentPicker(props: ComponentPickerProps) {
  const { placeholder = '未选择组件', value, tags, onChange } = props;

  const sunmao = useSunmao();

  const treeDate = useMemo(() => {
    if (props.treeDate) {
      return props.treeDate;
    }
    return sunmao.getTreeDate(tags);
  }, [props.treeDate, sunmao, tags]);

  return (
    <div className="asanyeditor-config-component">
      <Select
        value={value}
        placeholder={placeholder}
        popover={Dialog}
        onChange={onChange}
        options={treeDate as any}
        getOption={handleGetComponent as any}
        popoverClassName={'asanyeditor-config-component-popover asanyeditor-dsign-light-popover'}
        icon="SunmaoEditor/ComponentInstance"
      />
    </div>
  );
}

export default ComponentPicker;
