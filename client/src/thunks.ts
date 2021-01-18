import {AppState} from './reducer';
import {AppAction, getTrmss, getUser } from './actions';
import {ThunkAction} from 'redux-thunk';
import trmsService from './trms/trms.service';
import userService from './user/user.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;


export const thunkGetTrmss = (): AppThunk => async dispatch => {
    const asyncResp = await trmsService.getTrmss();
    console.log('before thunk dispatch');
    dispatch(getTrmss(asyncResp));
}

export const thunkGetUser = (): AppThunk => async dispatch => {
    const asyncResp = await userService.getLogin();
    console.log('before thunk dispatch');
    dispatch(getUser(asyncResp));
}