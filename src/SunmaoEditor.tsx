import AsanyEditor, { useDeepCompareMemo } from '@asany/editor';
import React from 'react';
import { SketchProvider } from 'sunmao';

import SketchPlugin from './plugin';
import { SunmaoEditorProps, SunmaoProject } from './typings';

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
