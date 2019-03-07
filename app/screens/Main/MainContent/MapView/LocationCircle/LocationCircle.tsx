import { Circle, Marker } from 'react-native-maps';
import React, { FunctionComponent, memo, Fragment } from 'react'

import { Lunch, Location, LunchLocationMap } from '@app/state/lunches/types';

export interface LocationCircleProps {
    lunch: Lunch;
};

export interface UserLocation extends Location {
    id: string;
};

export interface MappedLunchLocations {
    usersLocation: UserLocation[];
    lunchLocation: Location;
};

const ICON = require('./../img/location_icon.png');

const LocationCircle: FunctionComponent<LocationCircleProps> = ({
    lunch
}) => {
    const mapRunnigLunchLocations = (locations: LunchLocationMap, lunchId: string): MappedLunchLocations => {
        return locations && Object.keys(locations)
            .map(key => ({ id: key, ...locations[key] }))
            .reduce((locationObj, l) =>
                (l.id === lunchId ? locationObj.lunchLocation = l : locationObj.usersLocation.push(l), locationObj)
                , { lunchLocation: {}, usersLocation: [] } as MappedLunchLocations);
    }

    const { usersLocation, lunchLocation } = mapRunnigLunchLocations(lunch.locations, lunch.id);

    return (
        <Fragment>
            <Marker
                image={ICON}
                coordinate={{
                    latitude: lunchLocation.latitude,
                    longitude: lunchLocation.longitude
                }}
            />
            {usersLocation.map(uL =>
                <Circle
                    key={uL.id}
                    center={{
                        latitude: uL.latitude,
                        longitude: uL.longitude
                    }}
                    radius={uL.radiusInMeters}
                    fillColor={'rgba(91, 70, 99, .4)'}
                    strokeColor={'#5b4663'}
                />
            )}
        </Fragment>
    )
};

export default memo(LocationCircle);