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
                
            </div>

    );
}

export default App;
