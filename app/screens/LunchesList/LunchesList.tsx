import React, { PureComponent }  from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SectionList, Text, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { colors } from '../../config/styles';

import BackButton from '../../components/BackButton';
import { AppState } from './../../state/state';
import HocFetchData from './../../components/HocFetchData';
import { RequestState } from '../../state/common/types';
import { LunchesMap, LunchSagaActions, LunchStatus, Lunch } from '../../state/lunches/types';
import SingleLunch from './SingleLunch';

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
                <SectionList
                    style={styles.sectionList}
                    renderSectionHeader={({ section: { title, data } }) => (
                        <View>
                            {data && !!data.length && <Text style={styles.sectionTitle}>{title}</Text>}
                        </View>
                    )}
                    renderItem={({ item, section }) => (
                        <SingleLunch lunch={item} subTitle={this.lunchTypesTitles[section.title].subTitle} />
                    )}
                    sections={lunchTypes}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }

    private splitLunchesByStatus(lunches: LunchesMap): { title: LunchStatus, data: Lunch[] }[] {
        return lunches && Object.keys(lunches)
            .reduce((statusArray, lunchId) => {
                const lunch = lunches[lunchId];
                return statusArray.map(statusType => {
                    if(statusType.title === lunch.status)
                        return { title: statusType.title, data: (statusType.data.push(lunch), statusType.data) };
                    return statusType;
                });
            }, this.getDefaultStatusObject());
    }

    private getDefaultStatusObject(): { title: LunchStatus, data: Lunch[] }[] {
        return [
            { title: LunchStatus.pending, data: [] },
            { title: LunchStatus.running, data: [] },
            { title: LunchStatus.finished, data: [] }
        ]
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
