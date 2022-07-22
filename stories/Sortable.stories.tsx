import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { IconProvider } from '@asany/icons';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sunmao, { SunmaoProvider, component, library, useBlock } from 'sunmao';
import { libraries } from '@asany/editor';

import SunmaoEditor from '../src/SunmaoEditor';

import Showme from './Showme';

import 'antd/dist/antd.css';
import Content from './sortable/Content';

const meta: Meta = {
  title: '编辑器/排序',
  parameters: {
    options: { showPanel: false },
  },
};

const client = new ApolloClient({
  uri: 'https://api.asany.cn/graphql',
  cache: new InMemoryCache(),
});

export default meta;

@library({ name: 'test', description: '测试库', namespace: 'cn.asany.ui.sunmao.test' })
class TestLibrary {
  @component({
    symbols: [
      {
        title: 'sdfsdf',
        selector: () => true,
      },
    ],
  })
  showme = Showme;

  @component({ name: 'Boot', title: 'Boot', icon: '', cover: 'http://localhost:5500/images/blocks/intro/hero-1.jpg' })
  boot() {
    return (props, ref) => {
      const { data, style, drag, className, index } = props;

      const {
        key,
        props: blockProps,
        Provider,
      } = useBlock({
        key: props.id ? props.id : 'Boot',
        icon: '',
        title: '',
        props: {
          title: 'xxx',
        },
        customizer: {
          fields: [
            {
              name: 'title',
              type: 'String',
            },
          ],
        },
      });

      console.log('key', props.id, key);

      return (
        <Provider clickable>
          <div ref={drag && drag(ref)} className={className} style={{ ...style }}>
            <div style={{ height: 100 }}>---boot--- {blockProps.title}</div>
          </div>
        </Provider>
      );
    };
  }

  @component({ name: 'PageContent', title: 'PageContent', icon: '' })
  PageContent() {
    return Content;
  }
}

const SunmaoEditorDemo = () => {
  const sunmao = new Sunmao();
  const x = new TestLibrary();
  sunmao.addLibrary(x as any);
  sunmao.addLibrary(...libraries);
  return (
    <DndProvider backend={HTML5Backend}>
      <SunmaoProvider sunmao={sunmao}>
        <SunmaoEditor
          id="0"
          name="测试"
          viewport="iPhone 8"
          onSave={(data) => console.log(data)}
          data={{
            id: '231',
            template: 'cn.asany.ui.sunmao.test.PageContent',
            blocks: [
              {
                key: 'content',
                props: {
                  items: [
                    {
                      id: 'f3fc09b8-4f52-43fc-83b5-06120710bff2',
                      name: '样式二十',
                      type: 'component',
                      component: 'cn.asany.ui.sunmao.test.Boot',
                      _registered: 'efaec573-08f3-4d02-9bd5-372e8ed7a93f',
                    },
                    {
                      id: '2951a14e-af6f-40ff-b3e0-56547b4427cf',
                      pos: [0],
                      name: '样式十四',
                      type: 'component',
                      index: 0,
                      component: 'cn.asany.ui.sunmao.test.Boot',
                      _registered: '473ee98b-36c6-4f85-bd23-8eaf9b3e0d90',
                    },
                    {
                      id: '620716a9-ac51-4a1b-b168-3f244a52ff9a',
                      pos: [1],
                      name: '样式八',
                      type: 'component',
                      index: 1,
                      component: 'cn.asany.ui.sunmao.test.Boot',
                      _registered: 'bed2fab9-e19e-4913-b333-a5104efc100d',
                    },
                    {
                      id: '0a1c4310-5d22-46ca-868a-f8e6bf90c871',
                      pos: [2],
                      name: '样式八',
                      type: 'component',
                      index: 2,
                      component: 'cn.asany.ui.sunmao.test.Boot',
                      _registered: 'd42e73cb-28b7-4b2a-bfb8-5e89e04f5b70',
                    },
                    {
                      id: '7aa2cdb0-b9c1-44c9-8e90-c3dd5d72423b',
                      pos: [3],
                      name: '样式八',
                      type: 'component',
                      index: 3,
                      component: 'cn.asany.ui.sunmao.test.Boot',
                      _registered: 'f389620c-6a06-43c4-81a0-d4fecec87069',
                    },
                  ],
                },
              },
              {
                key: 'content/f3fc09b8-4f52-43fc-83b5-06120710bff2',
                props: {
                  title: '1111',
                },
              },
              {
                key: 'content/2951a14e-af6f-40ff-b3e0-56547b4427cf',
                props: {
                  title: '22222',
                },
              },
              {
                key: 'content/620716a9-ac51-4a1b-b168-3f244a52ff9a',
                props: {
                  title: '33333',
                },
              },
              {
                key: 'content/0a1c4310-5d22-46ca-868a-f8e6bf90c871',
                props: {
                  title: '4444',
                },
              },
            ],
          }}
        />
      </SunmaoProvider>
    </DndProvider>
  );
};

const Template: Story<any> = (_args) => {
  return (
    <ApolloProvider client={client}>
      <IconProvider>
        <SunmaoEditorDemo />
      </IconProvider>
    </ApolloProvider>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.storyName = '编辑器/排序';

Default.args = {};
