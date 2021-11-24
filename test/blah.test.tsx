import React from 'react';

import * as ReactDOM from 'react-dom';

import { SunmaoEditorDemo as SunmaoEditor } from '../stories/Thing.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SunmaoEditor />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
