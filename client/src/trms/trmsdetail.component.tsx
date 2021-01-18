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
        <div className='col trms card'>

            <div className='card-body'>
                <p className='name'>{trms.name}</p>
                <p className='date_created'>{trms.date_created}</p>
                <p className='event_location'>{trms.event_location}</p>
                <p className='event_type'>{trms.event_type}</p>
                <p className='event_cost'>{trms.event_cost}</p>
                <div className='attachments'>
                    {' '}
                    <label id='labelAttachment'>Attachments:</label>{' '}
                    { trms.attachments && trms.attachments.map((item) => {
                        return (
                            <div>
                                <div>{`${item.type}`}</div>
                                <div>{`attachment: ${item.type}`}</div>
                            </div>
                        );
                    })  
                    }
                </div>
                <div className='approvals'>
                    
                    <label id='labelApproval'>Approval:</label>
                    <h1> More work here</h1>
                    
              
                    
                </div>

                <p className='cost'>{JSON.stringify(trms.event_cost)}</p>
            </div>
            { ((userContext.role === 'Employee') || (userContext.role === 'Supervisor'))  && 
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
        </div>
    );
}
