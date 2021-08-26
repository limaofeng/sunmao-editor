import { ICustomizer } from 'sunmao';
import { IPluginActionType, AsanyAction } from '@asany/editor';

export enum SketchActionType {
  /**
   * 更新 Block 定制器
   */
  USER_CUSTOMIZER = 'USER_CUSTOMIZER',
}

export interface ISketchState {
  value?: any;
  customizer?: ICustomizer;
  change?: (value: any) => void;
}

const defaultState: ISketchState = {};

export default function reducer(
  state: ISketchState,
  action: AsanyAction<SketchActionType | IPluginActionType>
): ISketchState {
  if (action.type === IPluginActionType.PluginStateInit) {
    return defaultState;
  }
  if (action.type === SketchActionType.USER_CUSTOMIZER) {
    const { customizer } = action.payload;
    return { ...state, customizer };
  }
  return state;
}
