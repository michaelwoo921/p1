import { SyntheticEvent } from 'react';
import './login.component.css';
import userService from './user.service';
import { useHistory } from 'react-router-dom';
import { UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../actions';
import {currentYear } from '../constants';

// Function Component
function LoginComponent() {
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...user };
        if((e.target as HTMLInputElement).name === 'name'){
            u.name = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        dispatch(loginAction(u));
    }

    
    function submitForm() {
        userService.login(user).then((user) => {
            dispatch(getUser(user));
            history.push('/trmss');
        });
    }
    return (
    <div className="row trms-container">
        <div className="col-12 col-md-8 trms-body">
            <h1> Tuition Reimbursement Management System</h1>
            <p> We invest in our employee's professional development</p>
            <div>
                <img  className="trms-img" src="images/j-kelly-brito-PeUJyoylfe4-unsplash.jpg"  />
                <span style={{fontSize: '8px' }}>Photo by 
                <a href="https://unsplash.com/@hellokellybrito?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">J. Kelly Brito</a> on <a href="https://unsplash.com/s/photos/education?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
            </div>
        </div>
     

         <div className="col-12 col-md-4 trms-form">
             <h2 className="trms-form-heading mb-3"> Tuition Reimbursement</h2>
             <div>
                 <div className="mb-3">
                   <label htmlFor="name" className="form-label">username</label>
                   <input type="text" className="form-control" id="name" name="name" onChange={handleFormInput} />
                 </div>
                 <div className="mb-3">
                   <label htmlFor="password" className="form-label">Password</label>
                   <input type="password" className="form-control" id="password" name="password" onChange={handleFormInput}/>
                 </div>
                 <button id="submit" type="submit" className="btn btn-primary" onClick={submitForm}>
                     Login</button>
             </div>
         </div>
    
     </div>
    );
}

export default LoginComponent;
