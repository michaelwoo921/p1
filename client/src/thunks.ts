import {AppState} from './reducer';
import {AppAction, getTrmss } from './actions';
import {ThunkAction} from 'redux-thunk';
import trmsService from './trms/trms.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;


export const thunkGetTrmss = (): AppThunk => async dispatch => {
    const asyncResp = await trmsService.getTrmss();
    console.log('before thunk dispatch');
    dispatch(getTrmss(asyncResp));
}