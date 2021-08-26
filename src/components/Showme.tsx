import React, { useEffect } from 'react';
import { useBlock } from 'sunmao';
import { ComponentPropertyType } from 'sunmao';

function Second({ className, id }: any) {
  const { key, props, update, Provider } = useBlock({
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
          type: ComponentPropertyType.String,
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
  const { key, props, update, Provider } = useBlock({
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
          type: ComponentPropertyType.String,
        },
      ],
    },
  });

  console.log('>>>>>', props.title);

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
