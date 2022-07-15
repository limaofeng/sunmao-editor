import React from 'react';

import { createRoot } from 'react-dom/client';

import { SunmaoEditorDemo as SunmaoEditor } from '../stories/Thing.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<SunmaoEditor />);
    root.unmount();
  });
});
