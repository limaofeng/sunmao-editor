import React, { useCallback, useEffect, useReducer, useRef } from 'react';

import useMergedRef from '@react-hook/merged-ref';
import { SketchProvider, useSketch } from 'sunmao';
import AsanyEditor, { IAsanyEditor, useDeepCompareMemo } from '@asany/editor';
import type { AsanyProject } from '@asany/editor';

import { SunmaoEditorProps, SunmaoProject } from './typings';
import sketchPlugin from './plugin';
import './icons';

const InternalSunmaoEditor = React.forwardRef(function InternalSunmaoEditor(
  props: SunmaoEditorProps,
  ref?: React.ForwardedRef<IAsanyEditor>
) {
  const { id, name, data, dashboard, onSave, onBack } = props;

  const [version, forceRender] = useReducer((s) => s + 1, 0);
  const sketch = useSketch();
  const api = useRef<IAsanyEditor>(null);

  const project = useDeepCompareMemo<SunmaoProject>(() => ({ id, name, data, type: 'component' }), [id, name, data]);

  const handleSave = useCallback(
    (project: AsanyProject) => {
      onSave && onSave(project.data);
    },
    [onSave]
  );

  const multiRef = useMergedRef(api, ref!, () => {
    forceRender();
  });

  useEffect(() => {
    if (!props.viewport || !api.current) {
      return;
    }
    if (typeof props.viewport == 'string') {
      api.current!.scena.viewport(props.viewport);
    } else {
      api.current!.scena.viewport(props.viewport.size[0], props.viewport.size[1]);
    }
  }, [version, props.viewport]);

  return (
    <AsanyEditor
      ref={multiRef}
      plugins={[sketchPlugin(sketch, dashboard)]}
      onSave={handleSave}
      onBack={onBack}
      className="sunmao-editor"
      project={project}
    />
  );
});

function SunmaoEditor(props: SunmaoEditorProps, ref?: React.ForwardedRef<IAsanyEditor>) {
  return (
    <SketchProvider>
      <InternalSunmaoEditor {...props} ref={ref} />
    </SketchProvider>
  );
}

export default React.forwardRef(SunmaoEditor);
