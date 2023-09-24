import { MasterData } from '../../../Domain/Model/MasterDataModel';
import { ActionsTypes } from './ActionsConstants';

export type MasterDataAction = {
  type: string;
  payload?: MasterData;
};

export const setMasterData = (masterData: MasterData) => ({
  type: ActionsTypes.SET_MASTER_DATA,
  payload: masterData,
});
