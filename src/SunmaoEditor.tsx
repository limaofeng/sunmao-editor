import React from 'react';

import AsanyEditor, { useDeepCompareMemo } from '@asany/editor';
import { SketchProvider } from 'sunmao';

import { SunmaoEditorProps, SunmaoProject } from '../types';

import SketchPlugin from './plugin';

function SunmaoEditor(props: SunmaoEditorProps) {
  const { id, name, data } = props;

  const project = useDeepCompareMemo<SunmaoProject>(() => ({ id, name, data, type: 'component' }), [id, name, data]);

  return (
    <SketchProvider>
      <AsanyEditor
        plugins={[SketchPlugin]}
        onSave={(data) => console.log(data)}
        className="icon-editor"
        project={project}
      />
    </SketchProvider>
  );
}

export default SunmaoEditor;
