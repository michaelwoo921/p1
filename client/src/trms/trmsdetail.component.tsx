import { useEffect } from 'react';
import { useHistory, Link, RouteComponentProps } from 'react-router-dom';
import { Trms } from './trms';
import trmsService from './trms.service';
import { TrmsState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeTrms } from '../actions';

interface MatchParams {
    nam: string;
    dt: string;
}

interface MatchProps extends RouteComponentProps<MatchParams>{

}

export default function TrmsDetailComponent(
    props: MatchProps
) {
    const trmsSelector = (state: TrmsState) => state.trms;
    const trms = useSelector(trmsSelector);
    const userContext = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        console.log(props.match.params);
        console.log(JSON.stringify(userContext));
    
        trmsService.getTrms(props.match.params.nam, props.match.params.dt).then((trms)=> {
            console.log(trms);
            dispatch(changeTrms(trms));
        })
    }, [dispatch, props.match.params.nam, props.match.params.dt]);

    function handleDelete() {
        trmsService.deleteTrms(trms.name, trms.date_created).then(() => {
            dispatch(changeTrms(new Trms()))
            history.push('/trmss');
        });
    }

    return (
        <div className='col trms card' style={{backgroundColor:  '#96c0ca'}}>

            <div className='card-body' style={{backgroundColor:  '#96c0ca'}}>
                <p className='name'>Submitted by {trms.name} on {trms.date_created}</p>
                <p className='event_location'>Event: {trms.event_name} starts on {trms.event_start_date} ends on {trms.event_end_date}</p>
                <p className='event_location'>Event type: {trms.event_type}</p>
                <p>Event Cost ${trms.event_cost}, Projected Reimbursement ${ trms.pro_reimbursement}</p>
                <p className='attachments'> {trms.attachments} </p>
                
            </div>
            { ((userContext.role === 'Employee') || (userContext.role === 'Supervisor'))  && 
                (trms.approval.sup.status ==='') &&
                <>
                    <Link
                        className='btn btn-secondary'
                        to={'/trmss/' + trms.name + '/' + trms.date_created +'/update'}
                    >
                        Update Trms
                    </Link>
                    { userContext.name === trms.name &&   <button className='btn btn-danger' onClick={handleDelete}>
                        Delete Trms
                    </button> 
                    }
                   
                </>
            }
            {/*  user is dept head */}
            { (userContext.role ==='DeptHead') && ( trms.role==="Supervisor") && 
                    (trms.approval.head.status ==='') &&

                <>
                <Link
                    className='btn btn-secondary'
                    to={'/trmss/' + trms.name + '/' + trms.date_created +'/update'}
                >
                    Update Trms
                </Link>
              
                </>                       
            }

            { (userContext.role ==='DeptHead') && ( trms.role==="Employee") && 
                ((trms.approval.sup.status ==='approved') ||  (trms.approval.sup.status ==='auto_approved') )&&
                (trms.approval.head.status === '') &&
                <>
                    <Link
                        className='btn btn-secondary'
                        to={'/trmss/' + trms.name + '/' + trms.date_created +'/update'}
                    >
                        Update Trms
                    </Link>

                </>                       
            }

            {/* user is benco  */}

            { 
                (userContext.role==='Benco') && (
                    ( trms.approval.head.status==='approved') || ( trms.approval.head.status==='auto_approved')

                ) && (trms.approval.benco.status==='')  &&
                <>
                <Link
                    className='btn btn-secondary'
                    to={'/trmss/' + trms.name + '/' + trms.date_created +'/update'}
                >
                    Update Trms
                </Link>

                </>  
            }

        </div>
    );
}
