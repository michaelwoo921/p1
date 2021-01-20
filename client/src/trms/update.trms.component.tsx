import { SyntheticEvent, useEffect, useState } from 'react';
import './trms.css';
import trmsService from './trms.service';

import {withRouter, useHistory} from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { TrmsState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeTrms } from '../actions';
import { Trms } from './trms';
import formatDate, { calculateTimeLapseInDays} from '../formatDate';


interface Params {
    nam: string;
    dt: string;
}

const options =[
    { 
        label:"Approve",
        value: "approved"
    },
    {
        label: "Reject",
        value: "rejected"
    },
    {
        label: "Info Needed",
        value: ""
    }
]

// Function Component
function UpdateTrmsComponent(props: RouteComponentProps<Params>) {
    const trmsSelector = (state: TrmsState) => state.trms;
    const trms = useSelector(trmsSelector);
    const user = useSelector((state : UserState)=> state.user);

    let [appValue, setAppValue]= useState('');
    // alert(JSON.stringify(user));
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(props);
        console.log(props.match.params.nam, props.match.params.dt);
        trmsService.getTrms(props.match.params.nam, props.match.params.dt).then((trms)=> {
            console.log(trms);
            dispatch(changeTrms(trms));
        })
    }, [dispatch, props, props.match.params.nam, props.match.params.dt]);

    const READFIELDS = ['name', 'supervisor_name', 'date_created', 'event_name', 'event_type', 'event_start_date', 'event_end_date',
    'event_location', 
   'event_description', 'event_cost','pro_reimbursement', 'event_grading_format']
    const UPDATEFIELDS = ['grade', 'comment', 'attachments',  'approval'];
    
   const READFIELDSBYSUP = ['name', 'supervisor_name', 'date_created', 'event_name', 'event_type', 'event_start_date', 'event_end_date',
   'event_location', 
  'event_description', 'event_cost','pro_reimbursement', 'event_grading_format', 'grade', 'attachments'];
   

   
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.

    let today = formatDate(new Date());

    function handleFormInput(e: SyntheticEvent) {
        let tr: any = { ...trms };
        tr[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        

        console.log(tr.attachments);
        dispatch(changeTrms(tr));
    }
    function submitForm() {
        if( user.role==='Supervisor'){
            trms.approval.sup.status = appValue;
            trms.approval.sup.date = formatDate(new Date());
        }
        if( user.role ==='DeptHead'){
            trms.approval.head.status = appValue;
            trms.approval.head.date = formatDate(new Date()); 
        }
        if(user.role==='Benco') {
            trms.approval.benco.status = appValue;
            trms.approval.benco.date = formatDate(new Date()); 
        }
        alert('trms:' + JSON.stringify(trms.approval));

        trmsService.updateTrms(trms).then(() => {
            dispatch(changeTrms(new Trms()));
            console.log('Updating trms!')
            // call the callback function from the parent component so that it will re-render
            history.push('/trmss');
        });
        
          
        

    }
    return (
        <div className='col trms card' style={{backgroundColor:  '#96c0ca'}}>
            <div className =" card-body" style={{backgroundColor:  '#96c0ca'}}>
              
              
            {/*  marked urgent if course already started less than 2 weeks */}
            { 
            (calculateTimeLapseInDays(trms['event_start_date'], today) < 14 ) &&
            ( calculateTimeLapseInDays(trms['event_start_date'], today) >0 ) && 
                <div className="text-danger"> Urgent </div>
            }

            {/* auto-approve if sup does not respond in four weeks   */}
            {
                ( calculateTimeLapseInDays(trms['event_start_date'], today) >28 )  &&
                (trms.approval.sup.status ==='' ) &&
                (trms.approval.sup.status ='auto_approved') && (trms.approval.sup.date = today)

            }

            {/*  auto approve if head does not respond in two weeks after sup approval */}

            {
           ( ( trms.approval.sup.status === 'auto_approved') ||  ( trms.approval.sup.status === 'approved')) &&
                (trms.role === 'Employee') && (trms.approval.head.status === '') &&
                (calculateTimeLapseInDays(trms.approval.sup.date, today) > 14 ) &&
                (trms.approval.head.status = 'auto_approved') && (trms.approval.head.date = today )
            
            }

             {/* benco does not approve 2 weeks after all documents completed then escalation email send   */}
            {
               ( (trms.approval.head.status === 'auto_approved') || ( trms.approval.head.status === 'approved')) &&
               (calculateTimeLapseInDays(trms.approval.head.date, today) > 14 )  &&
               (calculateTimeLapseInDays(trms.event_end_date, today) > 14 ) &&
               (trms.approval.benco.status === '') &&
               <a href="mailto:king@bencosup.com"> Escalation email to Benco Supervisor   </a> 

            }

            {/* user same as trms.name */}
            {
                (user.name === trms.name )  &&
               <> {READFIELDS.map((fieldName: any) => {
                    return (
                        <div key={'input-field-' + fieldName}>
                            <label>{fieldName}</label>
                            <input
                                type='text'
                                className='form-control'
                                style={{backgroundColor:  '#96c0ca'}}
                                name={fieldName}
                                id={'tr_' + fieldName}
                                value={(trms as any)[fieldName]}
                            ></input>
                        </div>
                    );
                }) 
                 }
                {UPDATEFIELDS.map((fieldName: any) => {
                    return (
                        <div key={'input-field-' + fieldName}>
                            <label>{fieldName}</label>
                            <input
                                type='text'
                                className='form-control'
                                style={{backgroundColor:  '#96c0ca'}}
                                name={fieldName}
                                id={'tr_' + fieldName}
                                value={(trms as any)[fieldName]}
                            ></input>
                        </div>
                    );
                })
                }
                </>
            }
            {/*  user.name is supervisor and trms.name is Employee */}
            {   (user.name === trms.supervisor_name) && (trms.role==='Employee') &&
                (trms.approval.sup.status ==='') &&
                <>
                {READFIELDSBYSUP.map((fieldName: any) => {
                    return (
                        <div key={'input-field-' + fieldName}>
                            <label>{fieldName}</label>
                            <input
                                type='text'
                                className='form-control'
                                style={{backgroundColor:  '#96c0ca'}}
                                name={fieldName}
                                id={'tr_' + fieldName}
                                value={(trms as any)[fieldName]}
                            ></input>
                        </div>
                    );
                    }) 
                }   
                <div key={'input-field-comments'}>
                    <label>Comment</label>
                    <input
                        type='text'
                        className='form-control'
                        style={{backgroundColor:  '#96c0ca'}}
                        name='comments'
                        id={'tr_comments'}
                        value={(trms as any)['comments']}
                        onChange= {handleFormInput}
                    ></input>
                </div>  
            
                <div key={'input-field-approval'}>
                    <label>Approve</label>

                    <select value={appValue} onChange ={(e) => {
                        alert(appValue);
                        setAppValue(e.target.value); alert(e.target.value);
                    }}>
                        {options.map((option) =>(
                           <option value={option.value}> {option.label}</option> 
                        ))}
                    </select>
                </div>
                </>

            }
            {/*  user.name is DeptHead and trms.name is Employee and approved by sup or is sup */}
             {
                 (user.role==='DeptHead') && (trms.role==='Employee') && 
                 ((trms.approval.sup.status ==='approved') || (trms.approval.sup.status === 'auto_approved')) &&
                 setAppValue('') &&
            
                 <div key={'input-field-approval'}>
                        <label>Approve</label>

                        <select value={appValue} onChange ={(e) => {
                            setAppValue(e.target.value); alert(e.target.value);
                        }}>
                            {options.map((option) =>(
                                <option value={option.value}> {option.label}</option> 
                            ))}
                        </select>
                </div>
             } 

            {
                 (user.role==='DeptHead') && (trms.role==='Supervisor') && 
                 (trms.approval.head.status ==='') &&
                 setAppValue('') &&
                 <div key={'input-field-approval'}>
                    <label>Approve</label>

                    <select value={appValue} onChange ={(e) => {
                        setAppValue(e.target.value); alert(e.target.value);
                    }}>
                        {options.map((option) =>(
                            <option value={option.value}> {option.label}</option> 
                        ))}
                    </select>
                </div>
             }

            {/* user.name is benco and trms.name is approved by DeptHead  */}

            {
                 (user.role==='Benco') && 
                 ((trms.approval.head.status ==='approved') || (trms.approval.head.status ==='auto_approved') ) &&
                 setAppValue('') &&
                 <div key={'input-field-approval'}>
                    <label>Approve</label>

                    <select value={appValue} onChange ={(e) => {
                        setAppValue(e.target.value); alert(e.target.value); }}>
                        {options.map((option) =>(
                            <option value={option.value}> {option.label}</option> 
                        ))}
                    </select>
                </div>
             }


            { (trms.name === user.name)  && 
            <div key={'input-field-attachments'}>
                <label> File Attachments</label>
                <input
                            type='file'
                            className='form-control'
                            style={{backgroundColor:  '#96c0ca'}}
                            name='attachments'
                            id='tr_attachements'
                            value={(trms as any)['attachments']}
                            onChange={handleFormInput}
                />
             </div> 
            }




            <button className='btn btn-primary' onClick={submitForm}>
                Update Trms
            </button>

            </div>
        </div>

    );
}

export default withRouter(UpdateTrmsComponent);
