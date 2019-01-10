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
import { LunchSagaActions, LunchStatus, Lunch } from '../../state/lunches/types';
import SingleLunch from './SingleLunch';
import { mapLunchesToArray } from './lunchesListSelectors';

export interface LunchesListDto {
    title: LunchStatus;
    data: Lunch[];
};

export interface LunchesListProps extends NavigationScreenProps {
    lunches: LunchesListDto[];
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
                    sections={lunches}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    lunches: mapLunchesToArray(state),
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
