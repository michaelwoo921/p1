import { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { TrmsState } from '../reducer';
import './trms.css';
import trmsService from './trms.service';
import { changeTrms } from '../actions';
import { Trms } from './trms';
import formatDate from '../formatDate';
import { eventRefTable } from '../eventRefTable';
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
        trmsService.addTrms(props.trms).then(() => {
            props.updateTrms(new Trms());
            // call the callback function from the parent component so that it will re-render
            history.push('/trmss');
        });
    }

    const FIELDS_READONLY = ['name', 'supervisor_name', 'date_created'];
    const FIELDS = ['event_name', 'event_start_date',
     'event_location', 
    'event_description', 'justification', 'event_cost'
    ];
    let weight =0;
    return (
        <div className='col trms card'>
            {FIELDS_READONLY.map((fieldName) => {
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
            <div key='input-field-event_type'>
                <label>event_type</label>
                <select id="event_type" name='event_type' onChange={handleFormInput} className='form-control'>
                    {eventRefTable.map((item: any) => {
                        if( props.trms['event_type']===item.type){
                            weight= item.weight;
                        } 
                        return (
                            <option value={item.type}>{item.type}
                            </option>
                        );
                    })}
                </select>
            </div>
                <div>
                {eventRefTable.map((item: any) => {
                        if( props.trms['event_type']===item.type){
                            weight= item.weight;
                        } 
                        return null;
                    })}
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
                <select id="event_grading_format" name='event_grading_format' className='form-control'>
                    
                    <option value='letter grade'>letter grade</option>
                    <option value='presentation'> presentation </option>
                   
                </select>
            </div>

            <div key={'input-field-pro_reimbursement'}>
                <label>Projected Reimbursement</label>
                <input type='text'  className='form-control'
                    name='pro_reimbursement'
                    id='tr_pro_reimbursement'
                    value={ props.trms['event_cost']*weight}
                ></input>
            </div>
            <button className='btn btn-primary' onClick={submitForm}>
                Create Trms
            </button>
        </div>
    );
}

//connect my prop and dispatcher to my component
export default connector(AddTrmsComponent);
