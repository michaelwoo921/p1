
import {User} from './user/user';
import {Trms} from './trms/trms';

export enum TrmsActions {
    GetTrmss = 'GET_TRMSS',
    ChangeTrms = 'CHANGE_TRMS'
}

export enum UserActions {
    GetUser = 'GET_USER',
    LoginChange = 'CHANGE_LOGIN',

}

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction extends AppAction {
    type: UserActions;
    payload: User;
}

export interface TrmsAction extends AppAction {
    type: TrmsActions;
    payload: Trms | Trms[];
}

export function getTrmss(trmss: Trms[]): TrmsAction {
    const action: TrmsAction = {
        type: TrmsActions.GetTrmss,
        payload: trmss
    }
    return action;
}

export function changeTrms(trms: Trms): TrmsAction {
    const action: TrmsAction = {
        type: TrmsActions.ChangeTrms,
        payload: trms
    }
    return action;
}


export function getUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}