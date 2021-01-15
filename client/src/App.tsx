import React, { useState, useEffect } from 'react';
import './App.css';
import RouterComponent from './routing.component';
import userService from './user/user.service';
import { useDispatch } from 'react-redux';
import { getUser } from './actions';
import { BrowserRouter } from 'react-router-dom';
import TemporaryComponent from './tempReference.component';

function App() {
    /* useState: A hook that can create a variable and a 
      setter to add to the state of the application and modify
      that state to trigger a render.*/
    const [cond, setCond] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        userService.getLogin().then((user) => {
            console.log(user);
            dispatch(getUser(user));
        });
    }, [dispatch]);

    return (
            <div className='container'>
                {/* {'user'+user?.name} */}
                
                <BrowserRouter>
                    <RouterComponent></RouterComponent>
                </BrowserRouter>
             
                <button type="submit" onClick={() => setCond(!cond)}>Click me</button>
                <div >{ cond? <a href="https://docs.google.com/document/d/10-npAabNmTablYkPSbwzwHTaiBfwGVOaziGbX-5NFBM/edit?usp=sharing">
                    TRMS doc </a> : null}</div>
                <div >{ cond? <TemporaryComponent /> : null}</div>
                
            </div>

    );
}

export default App;
