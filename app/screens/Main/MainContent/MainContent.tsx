import React, { PureComponent, Fragment, RefObject, createRef } from 'react';
import { View } from 'react-native';

import LunchSearcher from './LunchSearcher';
import MapView from './MapView';
import UserLocationButton from './UserLocationButton';

class MainContent extends PureComponent {
    private mapViewRef: RefObject<MapView>;

    constructor(props) {
        super(props);

        this.mapViewRef = createRef();
    }

    private onLocationClick = () => {
        this.mapViewRef.current.navigateToUserLocation();
    }

    public render() {
        return (
            <Fragment> 
                <MapView ref={this.mapViewRef} /> 
                <View>
                    <UserLocationButton onClick={this.onLocationClick} />
                    <LunchSearcher />
                </View>
            </Fragment>
        );
    }
}

export default MainContent;