import { Alert } from 'react-native';
import { connect } from 'react-redux';
import React, { PureComponent, Fragment, RefObject, createRef } from 'react';

import MapView from './MapView';
import ErrorPopup from '@app/components/ErrorPopup';
import { AppState } from '@app/state/state';
import LunchSearcher from './LunchSearcher';
import { navigationService } from '@app/services';
import { getPendingAndRunningLunches } from './selectors/mainContentSelector';
import { isBetweenOtherPendingLunches } from './utils/utils';
import { TimeSpan, LunchesMap, Lunch } from '@app/state/lunches/types';
import {getIfLunchesLoading, getLunchesError} from "@app/state/lunches/selectors";
import {getProfile} from "@app/state/profile/selectors";
import {lunchesSagaTriggers} from "@app/sagas/lunches/actions";
import {Profile} from "@app/state/profile/types";

export type LunchStage = 'chooseData' | 'searching' | 'waitingForData' | 'lunchAssigned';

export interface MainContentProps {
    profile: Profile;
    pending: LunchesMap;
    running: Lunch;
    errorMsg: string;
    isLoading: boolean;
    requestLunch: typeof lunchesSagaTriggers.requestLunch
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
            stage: 'waitingForData'
        };
    }

    public componentDidUpdate(prevProps: MainContentProps): void {
        if (prevProps !== this.props) {
            if (this.props.errorMsg || (!this.props.isLoading && this.state.stage === 'waitingForData'))
                this.setState(prevState => ({
                    stage: 'chooseData'
                }));
            else if (this.props.running)
                this.setState(prevState => ({
                    stage: 'lunchAssigned'
                }));
        }
    }

    private redirectToLunchesList = () => {
        navigationService.navigate('LunchesList');
    }

    private onLocationClick = () => {
        this.mapViewRef.current.navigateToUserLocation();
    }

    private onRequestLunchClick = async (timeSpan: TimeSpan): Promise<void> => {
        if (isBetweenOtherPendingLunches(timeSpan, this.props.pending, this.props.profile.id)) {
            Alert.alert('Error occured', 'You already have lunch, which has such a time range.',
                [{ text: 'Ok' }],
                { cancelable: false }
            );
        }
        else {
            const userLocation = await this.mapViewRef.current.getSelectedUserLocation();
            this.props.requestLunch(timeSpan, userLocation);

            Alert.alert('Lunch was assigned', 'Your lunch was successfully assigned',
                [{ text: 'Go to lunches', onPress: this.redirectToLunchesList }, { text: 'Ok' }],
                { cancelable: false }
            );
        }
    }

    public render() {
        const {
            running,
            errorMsg,
        } = this.props;
        const {
            stage
        } = this.state;

        return (
            <Fragment>
                <ErrorPopup title={'An error has occured'} description={errorMsg} showError={!!errorMsg} showDuration={3000} />
                <MapView
                    ref={this.mapViewRef}
                    stage={stage}
                    runningLunch={running}
                />
                <LunchSearcher
                    stage={stage}
                    running={running}
                    onSearchClick={this.onRequestLunchClick}
                    onLocationClick={this.onLocationClick}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    ...getPendingAndRunningLunches(state),
    profile: getProfile(state),
    errorMsg: getLunchesError(state),
    isLoading: getIfLunchesLoading(state)
});

const mapDispatchToProps = {
    requestLunch: lunchesSagaTriggers.requestLunch
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContent);
