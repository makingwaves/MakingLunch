import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import styles from './style';
import UserImage from "../../components/UserImage/UserImage";
import Bubble from "../../components/Bubble/Bubble";
import { borderRadius } from "../../config/styles";
import BackButton from "../../components/BackButton/BackButton";
import { NavigationScreenProps } from 'react-navigation';

class Guest extends Component<NavigationScreenProps> {
    render() {
        const { navigation } = this.props;
        return (
            <ScrollView style={styles.container}>
                <BackButton navigation={navigation}></BackButton>
                <UserImage/>
                <Bubble borderRadiusBottomLeft={borderRadius.borderRadiusNone} borderRadiusTopRight={borderRadius.borderRadiusNone}>
                    <Text style={[styles.title, styles.text]}>Guest name</Text>
                </Bubble>
                <Bubble borderRadiusTopLeft={borderRadius.borderRadiusNone} borderRadiusBottomRight={borderRadius.borderRadiusNone}>
                    <Text style={styles.text}>Sed ut perspiciatis undeom nis iste natus error sit volup tatem accusantium.</Text>
                </Bubble>

            </ScrollView>
        );
    }
}

export default Guest;
