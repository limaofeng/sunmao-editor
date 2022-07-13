import React, { useCallback } from 'react';

import { SketchProvider, useSketch } from 'sunmao';
import AsanyEditor, { useDeepCompareMemo } from '@asany/editor';
import type { AsanyProject } from '@asany/editor';

import { SunmaoEditorProps, SunmaoProject } from './typings';
import sketchPlugin from './plugin';
import './icons';

function InternalSunmaoEditor(props: SunmaoEditorProps) {
  const { id, name, data, dashboard, onSave } = props;

  const sketch = useSketch();

  const project = useDeepCompareMemo<SunmaoProject>(() => ({ id, name, data, type: 'component' }), [id, name, data]);

  const handleSave = useCallback(
    (project: AsanyProject) => {
      onSave && onSave(project.data);
    },
    [onSave]
  );

  return (
    <AsanyEditor
      plugins={[sketchPlugin(sketch, dashboard)]}
      onSave={handleSave}
      className="sunmao-editor"
      project={project}
    />
  );
}

function SunmaoEditor(props: SunmaoEditorProps) {
  return (
    <SketchProvider>
      <InternalSunmaoEditor {...props} />
    </SketchProvider>
  );
}

export default SunmaoEditor;
