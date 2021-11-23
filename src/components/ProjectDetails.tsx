import React from 'react';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useSelector } from '@asany/editor';

function ProjectDetails() {
  const project = useSelector((state) => state.project);

  return (
    <div className="sidebar-subpanel">
      <div className="sidebar-subpanel-header">
        <div className="header-left">项目详情</div>
        <div className="header-right"></div>
      </div>
      <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'scroll' } }} style={{ height: '100%' }}>
        <div style={{ padding: '8px 8px 0 16px' }}>{project.name}</div>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default ProjectDetails;
