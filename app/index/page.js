import React from 'react';
import BaseComponent from '../base-component';
import CommonChild from '../common/common-child';

//store
import TrainTimeTableStore from '../stores/train-timetable-store';

//actions
import TrainTimetableActions from '../actions/train-timetable-actions';

class Page extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind(
            '_getGeolocation',
            '_storeChange'
        );
        this.state = {
            latitude : 0,
            longitude: 0
        }
    }
    componentWillMount() {
        this._getGeolocation();
    }
    componentDidMount() {
        TrainTimeTableStore.addChangeListener(this._storeChange);
    }
    componentWillUnmount() {
        TrainTimeTableStore.removeChangeListener(this._storeChange);
    }
    _storeChange() {
        console.log('_storeChange');
    }
    _getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    latitude : position.coords.latitude,
                    longitude: position.coords.longitude
                });
                TrainTimetableActions.getTrainTimetable({latitude:position.coords.latitude, longitude:position.coords.longitude});
            });
        } else {

        }
    }
    render() {
        return (
            <div>
                <p>latitude : {this.state.latitude}</p>
                <p>longitude: {this.state.longitude}</p>
                <CommonChild />
            </div>
        );
    }
}

export default Page;
