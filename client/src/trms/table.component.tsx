import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trms } from './trms';
import trmsService from './trms.service';
import TrmsRow from './trms-row';
import {TrmsState} from '../reducer'
import { getTrmss } from '../actions';
import { thunkGetTrmss } from '../thunks';

function groupIntoThrees(trmss: Trms[]): Trms[][] {
    let arr: Trms[][] = [];
    for (let i = 0; i < trmss.length / 3; i++) {
        arr.push(trmss.slice(i * 3, (i + 1) * 3));
    }

    return arr;
}
export default function TableComponent() {
    // Create a constant that is of the type of state.restaurants
    const selectTrms = (state: TrmsState) => state.trmss;
    // Retrieve the restaurants array from redux.
    const trmss = useSelector(selectTrms);
    // Get access to the dispatcher. Feed the dispatcher Actions for your Reducer.
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetTrmss())
    }, [dispatch]);

    return (
        <section className='trmss container' id='trmss'>
            {groupIntoThrees(trmss).map((value, index: number) => {
                return (
                    <TrmsRow
                        key={'trms-row-' + index}
                        trmss={value}
                    ></TrmsRow>
                );
            })}
        </section>
    );
}
