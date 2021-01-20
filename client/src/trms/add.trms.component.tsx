import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { TrmsState, UserState } from '../reducer';
import './trms.css';
import trmsService from './trms.service';
import { changeTrms } from '../actions';
import { Trms } from './trms';
import { eventRefTable } from '../eventRefTable';
import { useSelector} from 'react-redux';
import { letter_grade, presentation} from '../constants';
import  formatDate, { calculateTimeLapseInDays} from '../formatDate';
import userService from '../user/user.service';


// This is the prop I want to connect from redux
const trmsProp = (state: TrmsState) => ({trms: state.trms});
// This is the dispatcher I want to use from redux
const mapDispatch = {
    updateTrms: (trms: Trms) => changeTrms(trms),
};
// Put them in the connector
const connector = connect(trmsProp, mapDispatch);

// Function Component
// get the types of the props we created above so we can tell our component about them.

type PropsFromRedux = ConnectedProps<typeof connector>;

function AddTrmsComponent(props: PropsFromRedux) {

    const user = useSelector((state : UserState)=> state.user);
    // const FIELDS = ['name', 'date', 'start_date', 'location', 'cost'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let tr: any = { ...props.trms };
        tr[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateTrms(tr);
    }
    function submitForm() {
   
        
        let u ={ ...user};
        if(props.trms.pro_reimbursement){
            u.fund_available = user.fund_available - Number(props.trms.pro_reimbursement);
        }
        userService.update(u).then(()=> {}).catch(() => {});
        
        trmsService.addTrms(props.trms).then(() => {
            props.updateTrms(new Trms());
            // call the callback function from the parent component so that it will re-render
            history.push('/trmss');
        });


        
     
    }

    const USER_FIELDREAD =['name', 'role', 'supervisor_name', 'date_created']
    
    const FIELDS = ['event_description', 'event_location',  'event_cost', 'justification'];
    
    const UPDATEFIELDS =['comments', 'grade', 'attachments', 'reimbursement' ]
    // default selection of event_type and event_grading_format
 
    let weight =0;
    // props.trms['event_type'] = eventRefTable[0].type;
    props.trms['event_grading_format'] = letter_grade;
    let fundAvailable = user.fund_available;
    return (
        <div className='col trms card' style={{backgroundColor:  '#96c0ca'}}
        >
            <div className=" card-body">

           
             {USER_FIELDREAD.map((fieldName) => {


                (props.trms as any)[fieldName] = 
                (fieldName === 'date_created') 
                ? formatDate(new Date()) 
                : (user as any)[fieldName];

                return (
                    <div key={'input-field-' + fieldName}>
                        <label>{fieldName}</label>
                        <input
                            type='text'
                            className='form-control'
                            name={fieldName}
                            id={'tr_' + fieldName}
                            value={(props.trms as any)[fieldName]}
                        ></input>
                    </div>
                );
            })}

            <div key={'input-field-event_name'}>
                <label>event_name</label>
                <input
                    type='text'
                    className='form-control'
                    name='event_name'
                    id='tr_event_name'
                    value={(props.trms as any)['event_name']}
                    onChange={handleFormInput}
                ></input>
            </div>

            <>
            {eventRefTable.map((item: any) => {
                    if( props.trms['event_type']===item.type){
                        weight= item.weight;
                    } 
                    return null;
                })}
            </>


            <div key='input-field-event_type'>
                <label>event_type</label>
                <select id="event_type" name='event_type' onChange={handleFormInput} 
                className='form-control' style={{backgroundColor:  '#96c0ca'}}
                 >
                    { 
                    eventRefTable.map((item: any) => {
                        if( props.trms['event_type']===item.type){
                            weight= item.weight;
                            props.trms['pro_reimbursement']=props.trms['event_cost']*weight;
                        } 
                        return (
                            <option value={item.type}>{item.type}
                            </option>
                        );
                    })}
                </select>
            </div>



       
       
            <div key={'input-field-event_start_date'}>
                <label>event_start_date</label>
                <input
                    type='text'
                    className='form-control'
                    name='event_start_date'
                    id='tr_event_start_date'
                    placeholder='enter in format: yyyy-mm-dd'
                    value={(props.trms as any)['event_start_date']}
                    onChange={handleFormInput}
                ></input>
            </div>

                <div key={'input-field-event_end_date'}>
                <label>event_end_date</label>
                <input
                    type='text'
                    className='form-control'
                    name='event_end_date'
                    id='tr_event_end_date'
                    placeholder='enter in format: yyyy-mm-dd'
                    value={(props.trms as any)['event_end_date']}
                    onChange={handleFormInput}
                ></input>
            </div>  

            {FIELDS.map((fieldName) => {
                return (
                    <div key={'input-field-' + fieldName}>
                        <label>{fieldName}</label>
                        <input
                            type='text'
                            className='form-control'
                            name={fieldName}
                            id={'tr_' + fieldName}
                            value={(props.trms as any)[fieldName]}
                            onChange={handleFormInput}
                        ></input>
                    </div>
                );
            })}


            <div key='input-field-event_type'>
                <label>event_grading_format</label>
                <select id="event_grading_format" name='event_grading_format' 
                    onChange= {handleFormInput} className='form-control'
                    style={{backgroundColor:  '#96c0ca'}}>
                    <option value= {letter_grade} selected>letter grade</option>
                    <option value= {presentation}> presentation </option>
                   
                </select>
            </div>

            <div key={'input-field-pro_reimbursement'}>
                <label>Projected Reimbursement</label>
                <input type='text'  className='form-control'
                    name='pro_reimbursement'
                    id='tr_pro_reimbursement'
                    value= {fundAvailable > props.trms['event_cost']*weight ? 
                    props.trms['event_cost']*weight :
                    fundAvailable
                    }
                    onChange={handleFormInput}
            
                ></input>
            </div>

            <hr />
            <h4 style={{fontStyle: 'italic'}}> Fields to be updated  </h4>
            {UPDATEFIELDS.map((fieldName) => {
                return (
                    <div key={'input-field-' + fieldName}>
                        <label>{fieldName}</label>
                        <input
                            type='text'
                            className='form-control'
                            name={fieldName}
                            id={'tr_' + fieldName}
                            value={(props.trms as any)[fieldName]}
                        ></input>
                    </div>
                );
            })}


            {  ( calculateTimeLapseInDays(formatDate(new Date()), props.trms.event_start_date) > 7) ?

                <button className='btn btn-primary'  onClick={() => {
                    // props.trms['pro_reimbursement'] = props.trms['event_cost']*weight;
                    

                    submitForm()} }>
                    Create Trms
                </button>
                
                : <p className= " text-danger mt-1"> Submit 7 days before the event </p>
            }
            
            </div>
        </div>
    );
}

//connect my prop and dispatcher to my component
export default connector(AddTrmsComponent);
