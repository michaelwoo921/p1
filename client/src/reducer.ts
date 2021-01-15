import * as Actions from './actions';
import { User } from './user/user';
import { Trms } from './trms/trms';



// Define the items that are in our state

export interface TrmsState {
    // The list of all restaurants, loaded from the db.
    trmss: Trms[];
    // The specific restaurant we have selected for view, edit, or add
    trms: Trms;
}

export interface UserState {
    user: User;
    loginUser: User;
}
export interface AppState extends UserState, TrmsState { }

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

export const initialState: AppState = {
    user: new User(),
    trmss: [],
    trms: new Trms(),
    loginUser: new User()
}

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (state: AppState = initialState, action: Actions.AppAction): AppState => {
    console.log(action);
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = {...state}; // If we return this, it will re render the application. (call setState)

    switch (action.type) {   
        case Actions.TrmsActions.GetTrmss:
            newState.trmss = action.payload as Trms[];
            return newState;
        case Actions.TrmsActions.ChangeTrms:
            newState.trms = action.payload as Trms;
            return newState; 
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            newState.loginUser = new User();
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        default: 
            return state;
    }
}

export default reducer;