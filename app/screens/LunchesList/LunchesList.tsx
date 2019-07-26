import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SectionList, Text, View } from 'react-native';

import styles from './style';

import { colors } from '@app/config/styles';
import BackButton from '@app/components/BackButton';
import SingleLunch from './SingleLunch';
import { AppState } from '@app/state/state';
import { mapLunchesToArray } from './selectors/lunchesListSelectors';
import { LunchStatus, Lunch } from '@app/state/lunches/types';
import LunchesPlaceholder from './LunchesPlaceholder';
import { LunchSagaActions } from '@app/state/lunches/types';

export interface LunchesListDto {
    data: Lunch[];
    title: LunchStatus;
};

export interface LunchesListProps extends NavigationScreenProps {
    userId: string;
    lunches: LunchesListDto[];
    cancelMeeting: (lunchId: string) => void;
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
            title: 'PENDING',
            subTitle: 'Searching'
        },
        [LunchStatus.running]: {
            title: 'RUNNING',
            subTitle: 'Running'
        },
        [LunchStatus.finished]: {
            title: 'LUNCH HISTORY',
            subTitle: 'Finished'
        }
    };

    public render() {
        const {
            userId,
            lunches,
            navigation,
            cancelMeeting
        } = this.props;

        return (
            <View style={styles.lunchesListContainer}>
                <BackButton navigation={navigation} screenTitle={'Your lunches'} backgroundColor={colors.brandColorSecondary} />
                <LunchesPlaceholder onReady={!!lunches} animate={'fade'}>
                    <SectionList
                        style={styles.sectionList}
                        renderSectionHeader={({ section: { title, data } }) => (
                            <View>
                                {data && !!data.length && <Text style={styles.sectionTitle}>{this.lunchTypesTitles[title].title}</Text>}
                            </View>
                        )}
                        renderItem={({ item, section }) => (
                            <SingleLunch lunch={item} userId={userId} subTitle={this.lunchTypesTitles[section.title].subTitle} cancelMeeting={cancelMeeting} />
                        )}
                        sections={lunches}
                        keyExtractor={(item, index) => item + index}
                        ListFooterComponent={<View style={styles.sectionListBottom}></View>}
                    />
                </LunchesPlaceholder>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    userId: state.auth.profile && state.auth.profile.id,
    lunches: mapLunchesToArray(state)
});

const mapDispatchToProps = (dispatch) => ({
    cancelMeeting: (lunchId: string) => dispatch({ type: LunchSagaActions.CANCEL_LUNCH, lunchId })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LunchesList);
