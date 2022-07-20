import { ReactNode } from 'react';

import { ComponentTreeNode, IComponentBlockData } from 'sunmao';
import { AsanyProject } from '@asany/editor';

export interface IComponentData {
  id: string;
  template: string;
  blocks: IComponentBlockData[];
}

export type OnSave = (data: IComponentData) => void;

export type Viewport =
  | 'iPhone 8'
  | 'iPhone 8 Plus'
  | '10.2" iPad'
  | '10.5" iPad Air'
  | '11" iPad Pro'
  | '12.9" iPad Pro'
  | 'Desktop'
  | 'Desktop HD'
  | 'Apple TV'
  | 'A4'
  | 'fullscreen'
  | {
      size: [number, number];
    };
export interface SunmaoEditorProps {
  /**
   * 唯一标识
   */
  id: string;
  /**
   * 名称
   * 会展示在编辑器左上角
   */
  name: string;
  /**
   * 数据
   */
  data: IComponentData;
  /**
   * 自定义面板, 位于左边栏上部分
   */
  dashboard?: ReactNode;

  onSave: OnSave;

  onBack?: OnBack;
  /**
   * 视图
   */
  viewport?: Viewport;
}

export type OnBack = () => void;

export type SunmaoProjectType = 'component';

export type SunmaoProject = AsanyProject<IComponentData, SunmaoProjectType>;

export type ComponentPickerProps = {
  value?: string;
  treeDate?: ComponentTreeNode[];
  onChange?: (value: string) => void;
  tags?: string[];
  placeholder?: string;
};
