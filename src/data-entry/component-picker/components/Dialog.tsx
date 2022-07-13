import React, { useCallback, useRef } from 'react';

import { useClickAway } from 'react-use';
import type { SelectPopoverProps } from '@asany/editor/dist/typings';

import LibraryPanel from './LibraryPanel';

interface DialogProps extends SelectPopoverProps {
  close: () => void;
  visible: boolean;
  value?: string;
  onChange: (name: string) => void;
}

function Dialog({ value, close, visible, onChange, options: treeData }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    close();
  });

  const handleChange = useCallback(
    (name: string) => {
      console.log('handleChange', name);
      onChange(name);
      close();
    },
    [close, onChange]
  );

  return (
    <div ref={ref} className="ae-popover component-picker">
      <div className="ae-popover-header tw-flex tw-items-center">
        <span className="ae-popover-header-title tw-flex-1">组件</span>
      </div>
      <LibraryPanel visible={visible} value={value} treeData={treeData as any} onChange={handleChange} />
    </div>
  );
}

export default React.memo(Dialog);
