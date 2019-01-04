import React, { PureComponent }  from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { colors } from '../../config/styles';

import LunchType from './LunchType/LunchType';
import BackButton from '../../components/BackButton';
import { AppState } from './../../state/state';
import HocFetchData from './../../components/HocFetchData';
import { RequestState } from '../../state/common/types';
import { LunchesMap, LunchSagaActions, LunchStatus, Lunch } from '../../state/lunches/types';

export interface LunchesListProps extends NavigationScreenProps {
    lunches: LunchesMap;
    getLunches: () => void;
};

export type LunchType = {
    [key in LunchStatus]: {
        title: string;
        subTitle: string;
    };
}

class LunchesList extends PureComponent<LunchesListProps> {
    private lunchTypesTitles: LunchType = {
        [LunchStatus.pending]: {
            title: 'Pending',
            subTitle: 'Pending'
        },
        [LunchStatus.running]: {
            title: 'Current',
            subTitle: 'Searching'
        },
        [LunchStatus.finished]: {
            title: 'Lunch history',
            subTitle: 'Finished'
        }
    };

    public componentDidMount(): void {
        this.props.getLunches();
    }

    public render() {
        const {
            lunches,
            navigation
        } = this.props;

        const lunchTypes = this.splitLunchesByStatus(lunches);

        return (
            <View style={styles.lunchesListContainer}>
                <BackButton navigation={navigation} screenTitle={'Your lunches'} backgroundColor={colors.brandColorSecondary} />
                <View style={styles.lunchTypesContainer}>
                    {lunchTypes && Object.keys(lunchTypes)
                        .map(type => (
                            <LunchType 
                                key={type}
                                titles={this.lunchTypesTitles[type]}
                                lunches={lunchTypes[type]}
                            />
                        ))
                    }
                </View>
            </View>
        );
    }

    private splitLunchesByStatus(lunches: LunchesMap): { [key in LunchStatus]: Lunch[] } {
        return lunches && Object.keys(lunches)
            .reduce((statusObject, lunchId) => {
                const lunch = lunches[lunchId];
                return (statusObject[lunch.status].push(lunch), statusObject);
            }, this.getDefaultStatusObject());
    }

    private getDefaultStatusObject(): { [key in LunchStatus]: Lunch[] } {
        return {
            [LunchStatus.pending]: [],
            [LunchStatus.running]: [],
            [LunchStatus.finished]: []
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    lunches: state.lunches.data,
    isLoading: state.lunches.request.state === RequestState.inProgress,
    errorMsg: state.lunches.request.errorMsg
});

const mapDispatchToProps = dispatch => ({
    getLunches: () => dispatch({ type: LunchSagaActions.GET_LUNCHES })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HocFetchData(LunchesList, 'Fetching lunches data..'));
