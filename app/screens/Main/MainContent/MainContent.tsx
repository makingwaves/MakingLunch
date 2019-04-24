import { Alert } from 'react-native';
import { connect } from 'react-redux';
import React, { PureComponent, Fragment, RefObject, createRef } from 'react';

import MapView from './MapView';
import ErrorPopup from '@app/components/ErrorPopup';
import { AppState } from '@app/state/state';
import LunchSearcher from './LunchSearcher';
import { RequestState } from '@app/state/common/types';
import { MeetingRequest } from '@app/api/lunchesService/lunchesService';
import { navigationService } from '@app/services';
import { getPendingAndRunningLunches } from './selectors/mainContentSelector';
import { isBetweenOtherPendingLunches } from './utils/utils';
import { TimeSpan, LunchSagaActions, LunchesMap, Lunch } from '@app/state/lunches/types';

export type LunchStage = 'chooseData' | 'searching' | 'waitingForData' | 'lunchAssigned';

export interface MainContentProps {
    userId: string;
    pending: LunchesMap;
    running: Lunch;
    errorMsg: string;
    isLoading: boolean;
    searchLunch: (data: MeetingRequest) => void;
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

    private onSearchClick = async (timeSpan: TimeSpan): Promise<void> => {
        if (isBetweenOtherPendingLunches(timeSpan, this.props.pending, this.props.userId)) {
            Alert.alert('Error occured', 'You already have lunch, which has such a time range.',
                [{ text: 'Ok' }],
                { cancelable: false }
            );
        }
        else {
            const userLocation = await this.mapViewRef.current.getSelectedUserLocation();
            this.props.searchLunch({
                ...timeSpan,
                ...userLocation
            });
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
                <MapView ref={this.mapViewRef} stage={stage} runningLunch={running} />
                <LunchSearcher stage={stage} running={running} onSearchClick={this.onSearchClick} onLocationClick={this.onLocationClick} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    ...getPendingAndRunningLunches(state),
    userId: state.auth.profile && state.auth.profile.id,
    errorMsg: state.lunches.request.errorMsg || state.auth.request.errorMsg,
    isLoading: state.lunches.request.state === RequestState.inProgress
});

const mapDispatchToProps = dispatch => ({
    searchLunch: (data: MeetingRequest) => dispatch({ type: LunchSagaActions.POST_LUNCH, payload: data }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContent);