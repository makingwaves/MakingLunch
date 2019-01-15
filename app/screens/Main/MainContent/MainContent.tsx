import React, { PureComponent, RefObject, createRef, Fragment } from 'react';
import { View } from 'react-native';

import MapView from './MapView';
import UserLocation from './UserLocation';
import LunchSearcher from './LunchSearcher';

class MainContent extends PureComponent {
    private mapViewRef: RefObject<MapView>;

    constructor(props) {
        super(props);

        this.mapViewRef = createRef();
    }

    private onLocationClick = () => {
        this.mapViewRef.current.setCameraToUserLocation();
    ;}

    public render() {
        return (
            <Fragment>
                <MapView ref={this.mapViewRef} />
                <View>
                    <UserLocation onClick={this.onLocationClick} />
                    <LunchSearcher />
                </View>
            </Fragment>
        );
    }
}

export default MainContent;