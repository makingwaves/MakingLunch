import React, { PureComponent, Fragment, RefObject, createRef, ReactElement, FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import LunchSearcher from './LunchSearcher';
import MapView from './MapView';
import UserLocationButton from './UserLocationButton';
import { AppState } from './../../../state/state';
import { LunchRequest } from './../../../api/lunchesService/lunchesService';
import { LunchSagaActions, TimeSpan } from '../../../state/lunches/types';
import { connect } from 'react-redux';

export type LunchStage = 'chooseData' | 'searching';

export interface MainContentProps {
    searchLunch: (data: LunchRequest) => void;
};

export interface MainContentState {
    stage: LunchStage;
};

class MainContent extends PureComponent<MainContentProps, MainContentState> {
    public state: MainContentState;

    private mapViewRef: RefObject<MapView>;

    constructor(props: MainContentProps) {
        super(props);

        this.mapViewRef = createRef();

        this.state = {
            stage: 'chooseData'
        };
    }

    private onLocationClick = () => {
        this.mapViewRef.current.navigateToUserLocation();
    }

    private onSearchClick = (timeSpan: TimeSpan): void => {
        const userLocation = this.mapViewRef.current.getSelectedUserLocation();
        this.props.searchLunch({
            ...timeSpan,
            ...userLocation
        });

        this.setState(prevState => ({ stage: 'searching' }));
    }

    private onCancelClick = (): void => {
        this.setState(prevState => ({ stage: 'chooseData' }));
    }

    public render() {
        const {
            stage
        } = this.state;

        return (
            <Fragment> 
                <MapView ref={this.mapViewRef} /> 
                <View>
                    {stage === 'chooseData' && <UserLocationButton onClick={this.onLocationClick} />}
                    <LunchSearcher onSearchClick={this.onSearchClick} onCancelClick={this.onCancelClick} stage={stage} />
                </View>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({

});

const mapDispatchToProps = dispatch => ({
    searchLunch: (data: LunchRequest) => dispatch({ type: LunchSagaActions.POST_LUNCH, payload: data })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContent);