import React, { useCallback, useMemo } from 'react';

import { IBlockCoreData, toBlockCoreDatas, useSketch } from 'sunmao';
import Tree from '@asany/tree';
import { useDispatch, useSelector } from '@asany/editor';

import { tree } from '../utils';
import { SketchActionType } from '../reducer';

const formatTreeData = (items: IBlockCoreData[]) => {
  return tree(items, {
    idKey: 'key',
    pidKey: 'parentKey',
  });
};

function BlockLayers() {
  const sketch = useSketch();
  const dispatch = useDispatch<SketchActionType>();

  const activeKey = useSelector((state) => {
    const activeKey = state.workspace.sunmao.activeKey;
    if (!activeKey) {
      return undefined;
    }
    return activeKey.split(':')[1];
  });

  const id = useSelector((state) => state.project.data.id);

  const blocks = sketch.useSelector(id, (state) => {
    if (!state.blocks) {
      return [];
    }
    return toBlockCoreDatas(state.blocks);
  });

  const treeData = useMemo(() => {
    return formatTreeData(blocks);
  }, [blocks]);

  const handleSelect = useCallback((e) => {
    dispatch({ type: SketchActionType.BLOCK_ACTIVE_KEY, payload: e.node.component + ':' + e.node.key });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sidebar-block-layers">
      <Tree
        treeData={treeData}
        expandedKeys={treeData.filter((item) => !!item.children?.length).map((item) => item.key)}
        onSelect={handleSelect}
        selectedKeys={activeKey ? [activeKey] : []}
      />
    </div>
  );
}

export default React.memo(BlockLayers);
