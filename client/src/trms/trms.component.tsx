import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './trms.css';
import { Trms } from './trms';
import  formatDate, { calculateTimeLapseInDays} from '../formatDate';


interface TrmsProps {
    data: Trms;
}

function TrmsComponent(props: TrmsProps) {
    const history = useHistory();

    function goToTrms() {
        history.push('/trmss/'+props.data.name + '/' + props.data.date_created);
    }
    const timeLapse: number = calculateTimeLapseInDays(formatDate(new Date()), props.data.event_start_date)
   
    return (
        <div className='col trms card' style={{backgroundColor:  '#96c0ca'}}>
            <div className="card-head" style={{fontWeight: 'bold'}}>
                TRMS form submitted: 
            </div>
            <div className='card-body' style ={{ border: 'solid'}}>
                <p>Created by: {props.data.name}</p>

                <p >Submission Date: {props.data.date_created}</p>
                <p>Event Name: {props.data.event_name}</p>
                <p>Event Type: {props.data.event_type}</p>
                <p>Event starts: {props.data.event_start_date}</p>
   
                <h4>Approval Status:</h4>

                {props.data.role ==='Employee' ? <p> Status: {props.data.approval.sup.status==='' ? 'Not reviewed ' : props.data.approval.sup.status } 
                     by {props.data.supervisor_name } </p> : '' } 
                <p> Status:  {props.data.approval.head.status==='' ? 'Not reviewed ' : props.data.approval.head.status } 
                by Department Head </p>
                <p> Status:  {props.data.approval.benco.status === '' ? 'Not reviewed ' : props.data.approval.benco.status} 
                by Benco </p>

                <p> Approval additional Info:
                    {props.data.approval.sup.additional_info}<br /> 
                    {props.data.approval.head.additional_info}<br />
                    {props.data.approval.benco.additional_info}
                </p>
                
                <p className="text-danger"> {(timeLapse>0) && (timeLapse < 14)
                &&  `Urgent: Course starts in ${timeLapse} days. Please approve`  }
                  </p>
            
                
                <Link to={`/trmss/${props.data.name}/${props.data.date_created}`}>
                    {' '}
                    See more info{' '}
                </Link>
            </div>
        </div>
    );
}

export default TrmsComponent;

