import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { TrmsState } from '../reducer';
import './trms.css';
import trmsService from './trms.service';
import { changeTrms } from '../actions';
import { Trms } from './trms';
import formatDate from '../formatDate';
import { eventRefTable } from '../eventRefTable';
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
    const FIELDS = ['location', 'cost'];
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
    return (
        <div className='col trms card'>
            <div >
                <label> name</label>
                <input placeholder='only sup and emp fill this' 
                  type='text'
                  className='form-control'
                  name='name'
                  value={'loggedInName'}
                />
            </div>
            <div >
                <label> date</label>
                <input placeholder='auto generate' 
                  type='text'
                  className='form-control'
                  name='date'
                  value={formatDate(new Date())}
                />
            </div>
            <div>
                <label>Event Type</label>
                <select name='event_type' className='form-control'>
                    <option value="e1">{ eventRefTable.e1[0]}</option>
                    <option value="e2">{ eventRefTable.e2[0]}</option>
                    <option value="e3">{ eventRefTable.e3[0]}</option>
                    <option value="e4">{ eventRefTable.e4[0]}</option>
                    <option value="e5">{ eventRefTable.e5[0]}</option>
                    <option value="e6">{ eventRefTable.e6[0]}</option>
                </select>
            </div>
            <div >
                <label> Supervisor Name</label>
                <input placeholder='only sup and emp fill this' 
                  type='text'
                  className='form-control'
                  name='name'
                  value={'loggedInName.supervisor'}
                />
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
            <button className='btn btn-primary' onClick={submitForm}>
                Create Trms
            </button>
        </div>
    );
}

//connect my prop and dispatcher to my component
export default connector(AddTrmsComponent);
