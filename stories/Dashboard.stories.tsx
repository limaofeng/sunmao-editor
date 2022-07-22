import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import Sunmao, { SunmaoProvider, getMetadata, library, component, useReactComponent, useBlock } from 'sunmao';
import SunmaoEditor from '../src/SunmaoEditor';
import { HTML5Backend } from 'react-dnd-html5-backend';

const meta: Meta = {
  title: '编辑器/Dashboard',
  // component: ,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const defaultPortalState = {
  widgets: [],
  layout: [],
  compactType: 'vertical',
  settings: {
    verticalCompact: true,
    compactType: 'vertical',
    containerPadding: [0, 0],
    cols: 24,
    rowHeight: 60,
    margin: [30, 30],
  },
  backgroundColor: '#f6f6f6',
};

function Showme() {
  const {
    props: otherProps,
    update,
    Provider,
  } = useBlock({
    key: `portal`,
    icon: '',
    title: '门户组件',
    props: defaultPortalState,
    customizer: {
      fields: [
        {
          name: 'compactType',
          label: '压缩类型',
          type: 'String',
          renderer: {
            component: 'ImagePicker',
            props: {
              options: {
                size: '75x63',
              },
            },
          },
        },
        {
          name: 'settings',
          label: '布局网格',
          type: 'JSON',
        },
        {
          name: 'backgroundColor',
          label: '背景颜色',
          type: 'String',
          renderer: 'ColorPicker',
        },
        {
          name: 'panels',
          label: '面板数组',
          type: 'JSON',
          visible: false,
        },
        {
          name: 'layout',
          label: '布局参数',
          type: 'JSON',
          visible: false,
        },
      ],
    },
  });

  console.log('props', otherProps);

  return <div>Show me your code</div>;
}

@library({ name: 'test', description: '测试库', namespace: 'cn.asany.ui.sunmao.test' })
class TestLibrary {
  @component({
    name: 'Dashboard',
    title: 'Dashboard',
    tags: ['a/b'],
    symbols: [
      {
        title: 'sdfsdf',
        selector: () => true,
      },
    ],
  })
  showme = Showme;

  @component({ name: 'Boot', title: 'Boot', xx: '12313', tags: ['a/b'] })
  boot() {
    return () => <div>---boot---</div>;
  }
}

const blocks = [
  {
    key: 'portal',
    props: {
      widgets: [
        {
          id: 'dd39fe07-136b-45a9-9b12-3d87bbca920a',
          type: 'widget/mini-chart',
          name: 'Widget4',
          component: 'cn.asany.ui.admin.metronic.Widget4',
          layout: { w: 6, h: 3 },
        },
        {
          id: '94ffce17-8d58-41d7-a031-6fdf08d5ba13',
          type: 'widget/mini-chart',
          name: 'Widget5',
          component: 'cn.asany.ui.admin.metronic.Widget5',
          layout: { w: 6, h: 3 },
        },
        {
          id: 'c5cc8263-d63f-4ceb-9255-d7ae6ba6d835',
          type: 'widget/mini-chart',
          name: 'Widget6',
          component: 'cn.asany.ui.admin.metronic.Widget6',
          layout: { w: 6, h: 3 },
        },
        {
          id: '8be63bab-077e-40f3-92fe-e7a19bc9d472',
          type: 'widget/mini-chart',
          name: 'Widget7',
          component: 'cn.asany.ui.admin.metronic.Widget7',
          layout: { w: 6, h: 3 },
        },
        {
          id: '8de64b2e-cc2b-4201-8d93-a9c376687138',
          type: 'widget/mini-chart',
          name: 'Widget2',
          component: 'cn.asany.ui.admin.metronic.Widget2',
          layout: { w: 12, h: 6 },
        },
        {
          id: '9f20996c-f737-45cd-94c6-449dc04ce471',
          type: 'widget/mini-chart',
          name: 'Widget3',
          component: 'cn.asany.ui.admin.metronic.Widget3',
          layout: { w: 12, h: 6 },
        },
      ],
      layout: [
        {
          w: 6,
          h: 3,
          x: 0,
          y: 0,
          id: 'dd39fe07-136b-45a9-9b12-3d87bbca920a',
          moved: false,
          static: false,
        },
        {
          w: 6,
          h: 3,
          x: 0,
          y: 3,
          id: '94ffce17-8d58-41d7-a031-6fdf08d5ba13',
          moved: false,
          static: false,
        },
        {
          w: 6,
          h: 3,
          x: 6,
          y: 0,
          id: 'c5cc8263-d63f-4ceb-9255-d7ae6ba6d835',
          moved: false,
          static: false,
        },
        {
          w: 6,
          h: 3,
          x: 6,
          y: 3,
          id: '8be63bab-077e-40f3-92fe-e7a19bc9d472',
          moved: false,
          static: false,
        },
        {
          w: 12,
          h: 6,
          x: 12,
          y: 0,
          id: '8de64b2e-cc2b-4201-8d93-a9c376687138',
          moved: false,
          static: false,
        },
        {
          w: 12,
          h: 6,
          x: 0,
          y: 6,
          id: '9f20996c-f737-45cd-94c6-449dc04ce471',
          moved: false,
          static: false,
        },
      ],
      compactType: 'vertical',
      settings: {
        verticalCompact: true,
        compactType: 'vertical',
        containerPadding: [0, 0],
        cols: 24,
        rowHeight: 60,
        margin: [30, 30],
      },
      backgroundColor: '#f6f6f6',
    },
  },
];

function TestSunmao() {
  return (
    <SunmaoEditor
      id="0"
      name="测试"
      viewport="iPhone 8"
      onSave={(data) => console.log(data)}
      data={{
        id: '231',
        template: 'cn.asany.ui.sunmao.test.Dashboard',
        blocks,
      }}
    />
  );
}

const Template: Story = () => {
  const sunmao = new Sunmao();

  const x = new TestLibrary();

  const components = (x as any).components;

  console.log('components', components);

  for (const com of components) {
    console.log('>>>', getMetadata(com));
  }

  sunmao.addLibrary(x as any);

  useEffect(() => {
    console.log('sunmao', sunmao.getTreeDate());
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <SunmaoProvider sunmao={sunmao}>
        <TestSunmao />
      </SunmaoProvider>
    </DndProvider>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
