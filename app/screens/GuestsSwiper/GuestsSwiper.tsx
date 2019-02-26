import { View } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenProps } from "react-navigation";
import { ParallaxSwiper, ParallaxSwiperPage } from 'react-native-parallax-swiper';
import React, { FunctionComponent, Fragment } from "react";

import styles from './style';

import { colors } from "@app/config/styles";
import BackButton from "@app/components/BackButton";
import { AppState } from "@app/state/state";
import { MembersMap } from "@app/state/members/types";
import GuestSwiperPage from "./GuestSwiperPage";

export interface GuestsSwiperProps extends NavigationScreenProps {
    members: MembersMap;
    membersId: string[];
};

const GuestsSwiper: FunctionComponent<GuestsSwiperProps> = ({
    members, membersId, navigation
}) => {
    const getSwiperForegroundComponent = (memberId: string) => <GuestSwiperPage member={members[memberId]} />;

    const getSwiperBackgroundComponent = () => <View style={styles.backgroundImage}></View>;

    return (
        <Fragment>
            <BackButton navigation={navigation} backgroundColor={colors.colorLight} />
            <ParallaxSwiper
                speed={0.15}
                dividerWidth={0}
                backgroundColor="black"
                showProgressBar={true}
                progressBarBackgroundColor="rgba(0,0,0,0.25)"
                progressBarValueBackgroundColor="white"
            >
                {membersId && membersId.map(memberId =>
                    <ParallaxSwiperPage
                        key={memberId}
                        ForegroundComponent={getSwiperForegroundComponent(memberId)}
                        BackgroundComponent={getSwiperBackgroundComponent()}
                    />
                )}
            </ParallaxSwiper>
        </Fragment>
    );
}

const mapStateToProps = (state: AppState, ownProps: GuestsSwiperProps) => ({
    members: state.members.data,
    membersId: ownProps.navigation.getParam('membersId')
});

export default connect(
    mapStateToProps
)(GuestsSwiper);