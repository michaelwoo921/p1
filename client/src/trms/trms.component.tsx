import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './trms.css';
import { Trms } from './trms';

interface TrmsProps {
    data: Trms;
}

function TrmsComponent(props: TrmsProps) {
    const history = useHistory();

    function goToTrms() {
        history.push('/trmss/'+props.data.name + '/' + props.data.date_created);
    }

    return (
        <div className='col trms card'>
            <div onClick ={goToTrms}>Get trms</div>
            <div className='card-body'>
                <p>{props.data.name}</p>

                <p >{props.data.date_created}</p>
                <p className=''>{props.data.event_start_date}</p>
                <p className=''>{props.data.event_cost}</p>
                <Link to={`/trmss/${props.data.name}/${props.data.date_created}`}>
                    {' '}
                    See more info{' '}
                </Link>
            </div>
        </div>
    );
}

export default TrmsComponent;

