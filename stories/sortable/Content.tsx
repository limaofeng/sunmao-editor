import { forwardRef, memo, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { dragPreview, ISortableItem, SortableItemProps } from '@asany/sortable';
import Sortable from '@asany/sortable';
import ComponentLoader from './ComponentLoader';
import { useBlock, useReactComponent, useSketch, useBlockContext } from 'sunmao';
import { useSelector as useSketchSelector } from '@asany/editor';
import React from 'react';

const ContentItemRender = memo(
  forwardRef((props: SortableItemProps<any> & any, ref: any) => {
    const { data, style, drag, className, index } = props;

    return (
      <div ref={drag && drag(ref)} className={className} style={{ ...style, background: '#fff' }}>
        <ComponentLoader
          id={data.id}
          component={data.component}
          className={classnames({ 'header-stick': index == 0 })}
        />
      </div>
    );
  })
);

const ContentItemPreview = React.forwardRef(function ContentItemPreview({ data, style }: any) {
  const id = useSketchSelector((state) => state.project.data.id);
  const sketch = useSketch();
  const blocks = sketch.getComponentData(id);

  const { key } = useBlockContext(data.id);

  const ReactComponent = useReactComponent(data.component, blocks);

  return (
    <div style={{ ...style, background: '#fff' }}>
      <ReactComponent id={key} />
    </div>
  );
});

function Content() {
  const { props, update, Provider } = useBlock({
    key: 'content',
    title: '内容区',
    icon: '',
    props: {
      items: [],
    },
    customizer: {
      fields: [
        {
          name: 'items',
          type: 'JSON',
          wrappers: [
            {
              component: 'MultipleWrapper',
              props: {
                canAddItem: false,
              },
            },
          ],
          renderer: {
            component: 'DefaultMultipleWrapperItem',
            props: {
              nameLink: 'name',
              editable: false,
            },
          },
        },
      ],
    },
  });

  const { items } = props;

  const setItems = useCallback((value: any) => {
    update(
      'items',
      value.map(({ id, name, component }: any) => ({ id, name, component }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback((value: any[]) => {
    setItems(value.map(({ id, name, component }) => ({ id, name, component })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zoom = useRef(1);
  const _zoom = useSketchSelector((state) => state.ui.scena.zoom);
  zoom.current = _zoom;

  return (
    <Provider style={{ width: '100%' }}>
      <section id="content">
        <Sortable
          tag="div"
          items={items}
          accept={['component']}
          layout="grid"
          itemRender={ContentItemRender}
          className={classnames('content-wrap', { _holder: !items.length })}
          onChange={handleChange}
          preview={{
            render: dragPreview(ContentItemPreview as any, {
              scale: () => zoom.current,
            }),
            container: document.body,
          }}
        />
      </section>
    </Provider>
  );
}

export default Content;
