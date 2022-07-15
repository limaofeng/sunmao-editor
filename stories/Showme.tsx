import React from 'react';

import { useBlock } from 'sunmao';

function Second({ className, id }: any) {
  const { key, props, Provider } = useBlock({
    key: 'Second-' + id,
    icon: '',
    title: '',
    props: {
      title: 'Second',
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
  return (
    <Provider className={className} clickable={true}>
      Second: {props.title} <br /> key = {key}
    </Provider>
  );
}

function Showme() {
  const { key, props, Provider } = useBlock({
    key: 'xxx',
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

  return (
    <Provider style={{ flex: 1 }} clickable>
      Show me your code: {props.title} <br /> key = {key}
      <br />
      <Second id="1" className="moveable-x" />
      <Second id="2" className="moveable-x" />
    </Provider>
  );
}

export default Showme;
