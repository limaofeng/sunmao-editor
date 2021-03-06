import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { IconProvider } from '@asany/icons';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sunmao, { SunmaoProvider, component, library } from 'sunmao';
import { libraries } from '@asany/editor';

import SunmaoEditor from '../src/SunmaoEditor';

import Showme from './Showme';

import 'antd/dist/antd.css';

const meta: Meta = {
  title: '编辑器/Sketch',
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
    return () => <div>---boot---</div>;
  }
}

export const SunmaoEditorDemo = () => {
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
          onSave={(data) => console.log(data)}
          data={{
            id: '231',
            template: 'cn.asany.ui.sunmao.test.Showme',
            blocks: [
              {
                key: 'xxx',
                props: { title: '观自在菩萨' },
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

Default.storyName = 'Sketch';

Default.args = {};
