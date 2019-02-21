import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import React, { PureComponent, Fragment, RefObject, createRef } from 'react';

import MapView from './MapView';
import { AppState } from '@app/state/state';
import LunchSearcher from './LunchSearcher';
import { MeetingRequest } from '@app/api/lunchesService/lunchesService';
import UserLocationButton from './UserLocationButton';
import { TimeSpan, LunchSagaActions, LunchesMap, LunchStatus } from '@app/state/lunches/types';

export type LunchStage = 'chooseData' | 'searching';

export interface MainContentProps {
    userId: string;
    lunches: LunchesMap;
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
            stage: 'chooseData'
        };
    }

    private onLocationClick = () => {
        this.mapViewRef.current.navigateToUserLocation();
    }

    private onSearchClick = async (timeSpan: TimeSpan): Promise<void> => {
        if (this.isBetweenOtherPendingLunches(timeSpan, this.props.lunches, this.props.userId)) {
            Alert.alert(
                'Error occured',
                'You already have lunch, which has such a time range.',
                [
                    { text: 'Ok' }
                ]
            );
        }
        else {
            const userLocation = await this.mapViewRef.current.getSelectedUserLocation();
            this.props.searchLunch({
                ...timeSpan,
                ...userLocation
            });

            this.setState(prevState => ({ stage: 'searching' }));
        }
    }

    private onCancelClick = (): void => {
        this.setState(prevState => ({ stage: 'chooseData' }));
    }

    private onStageChange = (stage: LunchStage): void => {
        this.setState(prevState => ({ stage }));
    }

    private isBetweenOtherPendingLunches(lunchTimeSpan: TimeSpan, lunches: LunchesMap, userId: string): boolean {
        return lunches && Object.keys(lunches)
            .filter(id => lunches[id].status === LunchStatus.pending)
            .some(id => this.timesCollide(lunches[id].times[userId], lunchTimeSpan.begin, lunchTimeSpan.end))
    }

    private timesCollide(lunchTime: TimeSpan, begin: string, end: string): boolean {
        if (this.isBetween(dayjs(begin), dayjs(lunchTime.begin), dayjs(lunchTime.end)))
            return true;
        if (this.isBetween(dayjs(end), dayjs(lunchTime.begin), dayjs(lunchTime.end)))
            return true;
        return false;
    }

    private isBetween(checkingTime: dayjs.Dayjs, begin: dayjs.Dayjs, end: dayjs.Dayjs): boolean {
        if (checkingTime.isAfter(begin) && checkingTime.isBefore(end))
            return true;
        return false;
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
                    <LunchSearcher
                        stage={stage}
                        onSearchClick={this.onSearchClick}
                        onCancelClick={this.onCancelClick}
                        onStageChange={this.onStageChange}
                    />
                </View>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    lunches: state.lunches.data,
    userId: state.auth.profile && state.auth.profile.id
});

const mapDispatchToProps = dispatch => ({
    searchLunch: (data: MeetingRequest) => dispatch({ type: LunchSagaActions.POST_LUNCH, payload: data })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContent);