import { IBlockCoreData } from 'sunmao';
import { AsanyProject } from '@asany/editor';

export interface IComponentData {
  template: string;
  blocks: IBlockCoreData[];
}

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
}

export type SunmaoProjectType = 'component';

export type SunmaoProject = AsanyProject<IComponentData, SunmaoProjectType>;
