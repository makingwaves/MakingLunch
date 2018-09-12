import React, {Component} from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import UserImage from "../../components/UserImage/UserImage";
import Bubble from "../../components/Bubble/Bubble";
import {borderRadius, fontSizes} from "../../config/styles";

class Guest extends Component {
    render() {
        return (
            <View style={styles.container}>
                <UserImage/>
                <Bubble borderRadiusBottomLeft={borderRadius.borderRadiusNone} borderRadiusTopRight={borderRadius.borderRadiusNone}>
                    <Text style={[styles.title, styles.text]}>Guest name</Text>
                </Bubble>
                <Bubble borderRadiusTopLeft={borderRadius.borderRadiusNone} borderRadiusBottomRight={borderRadius.borderRadiusNone}>
                    <Text style={styles.text}>Sed ut perspiciatis undeom nis iste natus error sit volup tatem accusantium.</Text>
                </Bubble>

            </View>
        );
    }
}

export default Guest;

