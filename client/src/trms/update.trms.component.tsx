import { SyntheticEvent, useEffect } from 'react';
import './trms.css';
import trmsService from './trms.service';
import {withRouter, useHistory} from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { TrmsState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeTrms } from '../actions';
import { Trms } from './trms';


interface Params {
    nam: string;
    dt: string;
}
// Function Component
function UpdateTrmsComponent(props: RouteComponentProps<Params>) {
    const trmsSelector = (state: TrmsState) => state.trms;
    const trms = useSelector(trmsSelector);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(props);
        console.log(props.match.params.nam, props.match.params.dt);
        trmsService.getTrms(props.match.params.nam, props.match.params.dt).then((trms)=> {
            console.log(trms);
            dispatch(changeTrms(trms));
        })
    }, [dispatch, props, props.match.params.nam, props.match.params.dt]);

    const FIELDS = ['name', 'supervisor_name', 'date_created', 'event_name', 'event_type', 'event_start_date',
    'event_location', 
   'event_description', 'event_cost', 'event_grading_format', 'pro_reimbursement'
   ];
   
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let tr: any = { ...trms };
        tr[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        dispatch(changeTrms(tr));
    }
    function submitForm() {
        trmsService.updateTrms(trms).then(() => {
            dispatch(changeTrms(new Trms()));
            console.log('Updating trms!')
            // call the callback function from the parent component so that it will re-render
            history.push('/trmss');
        });
    }
    return (
        <div className='col trms card'>
            {FIELDS.map((fieldName) => {
                return (
                    <div key={'input-field-' + fieldName}>
                        <label>{fieldName}</label>
                        <input
                            type='text'
                            className='form-control'
                            name={fieldName}
                            id={'tr_' + fieldName}
                            value={(trms as any)[fieldName]}
                            onChange={handleFormInput}
                            //placeholder='blabla'//{rest.fieldName}
                        ></input>
                    </div>
                );
            })}
            <button className='btn btn-primary' onClick={submitForm}>
                Update Trms
            </button>
        </div>
    );
}

export default withRouter(UpdateTrmsComponent);
