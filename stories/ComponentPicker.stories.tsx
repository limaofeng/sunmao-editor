import React, { useState } from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { IconProvider } from '@asany/icons';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sunmao, { SunmaoProvider, component, library } from 'sunmao';
import { libraries } from '@asany/editor';

import ComponentPicker from '../src/data-entry/component-picker';

import Showme from './Showme';

import '@asany/editor/src/style/index.less';
import '../src/icons';

import 'antd/dist/antd.css';

const meta: Meta = {
  title: '属性面板组件/ComponentPicker',
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
    title: 'Showme',
    tags: ['测试'],
    cover: 'https://share.cleanshot.com/GY3hef/download',
    symbols: [
      {
        title: 'sdfsdf',
        selector: () => true,
      },
    ],
  })
  showme = Showme;

  @component({
    name: 'Boot',
    title: 'Boot',
    tags: ['测试'],
    icon: '',
    cover: 'https://share.cleanshot.com/BUDLJm/download',
  })
  boot() {
    return () => <div>---boot---</div>;
  }
}

function ComponentPickerDemo() {
  const [value, setValue] = useState<string>();

  return <ComponentPicker value={value} onChange={setValue} />;
}

const Demo = () => {
  const sunmao = new Sunmao();
  const x = new TestLibrary();
  sunmao.addLibrary(x as any);
  sunmao.addLibrary(...libraries);

  return (
    <DndProvider backend={HTML5Backend}>
      <SunmaoProvider sunmao={sunmao}>
        <div style={{ width: 400, padding: 30 }}>
          <ComponentPickerDemo />
        </div>
      </SunmaoProvider>
    </DndProvider>
  );
};

const Template: Story<any> = (_args) => {
  return (
    <ApolloProvider client={client}>
      <IconProvider>
        <Demo />
      </IconProvider>
    </ApolloProvider>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.storyName = 'ComponentPicker';

Default.args = {};
