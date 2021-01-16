import React from 'react';
import { Trms } from './trms';

import trmsService from './trms.service';

interface TProps {
    which: number;
}
interface TState {
    data: Trms[];
}
class TrmsClassComponent extends React.Component<TProps, TState> {
    
    // The constructor brings in the props.
    constructor(props: any) {
        // The Props are the data being passed to the component.
        super(props);
        console.log('Mounting: Constructor!');
        this.state = {data: []};
    }

    // gets called at end of mount phase.
    componentDidMount() {
        console.log('Mounted Component');
        trmsService.getTrmss().then((data) => {
            console.log(data[0]);
            // Looks at the new state and the old state, if they are different objects (== comparison), then update.
            this.setState({data: data});
        });
    }

    componentWillUnmount(){
        console.log('Component is removed from dom.');
    }

    shouldComponentUpdate(){
        // Don't override this unless you have a very good reason.
        console.log('If this returns false, it will not update');
        return true;
    }

    // gets called at end of update phase
    componentDidUpdate() {
        console.log('updated Component');
    }

    render() {
        // Called by React whenever the state changes and during mounting to actually make the display.
        console.log('render');
        return (
            <div>
            <h1>My Trms</h1>
            <p>{this.state.data.length ? this.state.data[this.props.which].name: ''}</p>
            </div>
        );
    }
}

export default TrmsClassComponent;