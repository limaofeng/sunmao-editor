import type { ComponentType, CSSProperties } from 'react';
import React from 'react';
import { useComponent } from 'sunmao';

type ComponentLoaderProps = {
  id?: string;
  className?: string;
  component: string;
  style?: CSSProperties;
};

function ComponentLoader({ id, component, className, style }: ComponentLoaderProps, ref: any) {
  const info = useComponent(component);
  // console.log('ComponentLoader', id, info);

  if (!info) {
    return <div>组件缺失：{component}</div>;
  }
  const ReactComponent: ComponentType<any> = info.component;
  return <ReactComponent ref={ref} id={id} className={className} style={style} />;
}

export default React.forwardRef(ComponentLoader);
