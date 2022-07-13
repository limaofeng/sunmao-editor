import React, { useCallback } from 'react';

import classnames from 'classnames';
import { ListTree, ScrubbableControl } from '@asany/editor';
import { IComponent, ListTreeNode, ListTreeNodeRenderProps } from '@asany/editor/dist/typings';
import { Icon } from '@asany/icons';

interface IconRenderProps extends ListTreeNodeRenderProps, IComponent {
  value: string;
  label: string;
}

const ComponentRender: React.ComponentType<IconRenderProps> = function (props: IconRenderProps) {
  const { selected, ...item } = props;

  const onChange = props.onChange;
  const value = props.value;

  console.log('handleClick', props);

  const handleClick = useCallback(() => {
    console.log('handleClick', value);
    onChange && onChange(value);
  }, [onChange, value]);

  return (
    <li
      onClick={handleClick}
      className={classnames('tree-node-item tw-flex tw-flex-col tw-justify-end tw-items-center', { active: selected })}
    >
      <Icon name={item.icon || 'SunmaoEditor/ListItemBack'} />
      <span className="tree-node-item-title">{item.name}</span>
    </li>
  );
};

interface LibraryPanelProps {
  value?: string;
  visible: boolean;
  treeData: ListTreeNode[];
  onChange: (name: string) => void;
}

function LibraryPanel(props: LibraryPanelProps) {
  const { value, visible, onChange, treeData } = props;

  const handleChange = useCallback(
    (data: any) => {
      onChange(data.value);
    },
    [onChange]
  );

  return (
    <>
      <div className="ae-popover-search tw-flex tw-items-center">
        <ScrubbableControl
          icon="SunmaoEditor/Search"
          className="basic-input"
          trigger="change"
          autoSelect={false}
          value=""
        />
      </div>
      <div className="ae-popover-content">
        <ListTree
          reload={visible}
          value={value}
          onChange={handleChange}
          treeData={treeData}
          keyName="value"
          labelName="label"
          itemRender={ComponentRender as any}
        />
      </div>
    </>
  );
}

export default LibraryPanel;
