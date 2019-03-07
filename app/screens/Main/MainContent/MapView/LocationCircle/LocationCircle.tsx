import { Circle, Marker } from 'react-native-maps';
import React, { FunctionComponent, memo, Fragment } from 'react'

import { UserLocation } from '../MapView';

export interface LocationCircleProps {
    userLocations: UserLocation[];
};

const ICON = require('./../img/location_icon.png');

const LocationCircle: FunctionComponent<LocationCircleProps> = ({
    userLocations
}) => {
    return (
        <Fragment>
            {userLocations.map(userLocation =>
                <Fragment key={userLocation.id}>
                    <Circle
                        center={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude
                        }}
                        radius={userLocation.radiusInMeters}
                        fillColor={'rgba(91, 70, 99, .4)'}
                        strokeColor={'#5b4663'}
                    />
                    <Marker
                        image={ICON}
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude
                        }}
                    />
                </Fragment>
            )}
        </Fragment>
    )
};

export default memo(LocationCircle);