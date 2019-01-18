import React, { FunctionComponent, Fragment } from "react";
import { connect } from "react-redux";
import { ParallaxSwiper, ParallaxSwiperPage } from 'react-native-parallax-swiper';
import { NavigationScreenProps } from "react-navigation";
import { View } from "react-native";

import styles from './style';

import { AppState } from "../../state/state";
import { MembersMap } from "../../state/members/types";
import GuestSwiperPage from "./GuestSwiperPage";
import BackButton from "../../components/BackButton";
import { colors } from "../../config/styles";

export interface GuestsSwiperProps extends NavigationScreenProps  {
    members: MembersMap;
    membersId: string[];
}

const GuestsSwiper: FunctionComponent<GuestsSwiperProps> = ({
    members, membersId, navigation
}) => {
    const getSwiperForegroundComponent = (memberId: string) => {
        return (
            <GuestSwiperPage member={members[memberId]} />
        )
    }
    const getSwiperBackgroundComponent = () => {
        return (
            <View style={styles.backgroundImage}></View>
        )
    };

    return (
        <Fragment>
            <BackButton navigation={navigation} backgroundColor={colors.colorLight} />  
            <ParallaxSwiper 
                speed={0.5}
            > 
                {membersId && membersId  
                    .map(memberId => ( 
                        <ParallaxSwiperPage 
                            key={memberId} 
                            ForegroundComponent={getSwiperForegroundComponent(memberId)} 
                            BackgroundComponent={getSwiperBackgroundComponent()}
                        />
                    ))
                }
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