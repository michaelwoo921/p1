import React, { useState } from 'react';
import { Route, Link, Redirect, useLocation } from 'react-router-dom';

import LoginComponent from './user/login.component';
import TrmsComponent from './trms/trms.component';
import userService from './user/user.service';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions';
import { UserState } from './reducer';
import { User } from './user/user';
import  AddTrmsComponent from './trms/add.trms.component';
import  UpdateTrmsComponent from './trms/update.trms.component';
import TrmsDetailComponent from './trms/trmsdetail.component';
import TableComponent from './trms/table.component';



export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const [isNavOpen, setIsNavOpen] = useState(false);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const location = useLocation();
    function logout() {
        userService.logout().then(() => {
            dispatch(getUser(new User()));
        });
    }


 
    return (
        <div className='container-fluid'>
            <nav className="navbar navbar-expand-sm routing-nav">
            <div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    onClick ={() => setIsNavOpen(!isNavOpen)}>
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavOpen ? '' : 'collapse' } navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">
                    { (user.role==='Employee' || user.role==='Supervisor') && (
                        <li className="nav-item">
                          <Link  className='nav-link' to='/addTrms'  > Create Form    </Link>
                      </li>
                    )}

                  
                    { (user.role) && (
                            <li className="nav-item">
                                 <Link to='/trmss' className='nav-link'> View All Forms    </Link>
                             </li>
                    )}
                   
                    <li className="nav-item">
                        {user.name && (
                            <Link to='/' className='nav-link' onClick={logout}>
                                {`${user.name} (Position: ${user.role}) `}
                            </Link>
                        )}
                    </li>
                

                </ul>
                </div>
            </div>
            </nav>
            <>
                <Route exact path='/' component={LoginComponent} />
                <Route exact path='/addTrms' component={()=> <AddTrmsComponent />} />
                <Route
                    exact
                    path='/trmss/:nam/:dt'
                    component={TrmsDetailComponent}
                />
                <Route exact path='/trmss' component={TableComponent} />
                <Route exact path='/trmss/:nam/:dt/update' component={UpdateTrmsComponent} />

            </>

        </div>

    );
}
