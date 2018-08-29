import {makeAction} from '../../utils/redux';
import {ActionTypes, Time, Location} from './types';

export const LunchActionsMap = {
    setRadius: (radius: number) => makeAction(ActionTypes.SET_RADIUS, radius),
    setLocation: (location: Location) => makeAction(ActionTypes.SET_LOCATION, location),
    setTime: (time: Time) => makeAction(ActionTypes.SET_TIME, time),
};
