import './style/index.less';
import 'overlayscrollbars/css/OverlayScrollbars.css';

import { EditorPlugin } from '@asany/editor';
import React from 'react';

import Navigation from './components/Navigation';
import Workspace from './components/Workspace';
import reducer from './reducer';

export default {
  id: 'icon',
  description: '',
  types: ['component'],
  toolbar: {
    content: Navigation,
  },
  reducer,
  sidebar: {
    visible: true,
    // content: Sidebar,
    tools: [
      {
        id: 'selecto',
        name: '选择',
        icon: 'SelectFilled',
        position: 'top',
        mutex: 'icons-actions',
        useSelector: (state) => state.workspace.icon.selecto,
        isSelected: (selecto) => selecto,
        onClick: (editor) => {
          return editor.sidebar.select('selecto');
          //   // const active = !editor.state.workspace.icon.selecto;
          //   // editor.dispatch({ type: IconActionType.SELECTO, payload: active });
        },
      },
      {
        id: 'move',
        name: '选择',
        icon: 'Move',
        position: 'top',
        mutex: 'icons-actions',
        useSelector: (state) => state.workspace.icon.move,
        isSelected: (move) => move,
        onClick: (editor) => {
          return editor.sidebar.select('move');
        },
      },
      {
        id: 'bottom',
        icon: 'HandTouchSolid',
        position: 'bottom',
        onClick: (editor) => {
          editor.sidebar.open('bottom', '弹出面板', () => {
            return (
              <div
                style={{
                  color: '#727d83',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                弹出面板
              </div>
            );
          });
        },
      },
    ],
  },
  scena: {
    workspace: Workspace,
    /*  onClick: (editor) => {
      editor.aside.open(
        '属性面板',
        () => {
          return (
            <div
              style={{
                padding: 8,
                color: '#727d83',
                fontSize: 16,
                height: 'calc(100vh - 270px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>属性面板</span>
            </div>
          );
        },
        {
          width: 380,
        }
      );
    }, */
  },
  features: ['zoom', 'ruler'],
} as EditorPlugin;
