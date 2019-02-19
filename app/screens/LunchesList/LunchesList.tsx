import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SectionList, Text, View } from 'react-native';

import styles from './style';

import { colors } from '@app/config/styles';
import BackButton from '@app/components/BackButton';
import SingleLunch from './SingleLunch';
import { AppState } from '@app/state/state';
import { mapLunchesToArray } from './lunchesListSelectors';
import { LunchStatus, Lunch } from '@app/state/lunches/types';

export interface LunchesListDto {
    data: Lunch[];
    title: LunchStatus;
};

export interface LunchesListProps extends NavigationScreenProps {
    userId: string;
    lunches: LunchesListDto[];
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

    public render() {
        const {
            userId,
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
                        <SingleLunch lunch={item} userId={userId} subTitle={this.lunchTypesTitles[section.title].subTitle} />
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
    userId: state.auth.profile.id
});

export default connect(
    mapStateToProps
)(LunchesList);
