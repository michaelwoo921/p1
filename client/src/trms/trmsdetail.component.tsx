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
                <p className=''>{trms.name}</p>
                <p className='deliverytime'>{trms.date_created}</p>
                <p className='rating'>{trms.event_location}</p>
                <p className='foodtype'>{trms.event_type}</p>
                <p className='chef'>{trms.event_cost}</p>
                <div className='attachments'>
                    {' '}
                    <label id='labelAttachment'>Attachment:</label>{' '}
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
                    {' '}
                    <label id='labelApproval'>Approval:</label>{' '}
                    { trms.approval && trms.approval.map((item) => {
                        return (
                            <div>
                                <div>{`${item.date}`}</div>
                                <div>{`${item.status}`}</div>
                                <div>{`${item.type}`}</div>
                                <div>{`approval: ${item.reason}`}</div>
                            </div>
                        );
                    })  
                    }
                </div>

                <p className='cost'>{JSON.stringify(trms.event_cost)}</p>
            </div>
            {userContext.role === 'Employee' && (
                <>
                    <Link
                        className='btn btn-secondary'
                        to={'/trmss/' + trms.name + '/' + trms.date_created +'/update'}
                    >
                        Update Trms
                    </Link>
                    <button className='btn btn-danger' onClick={handleDelete}>
                        Delete Trms
                    </button>
                </>
            )}
        </div>
    );
}
