import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import UserImage from "../../components/UserImage/UserImage";
import Bubble from "../../components/Bubble/Bubble";
import { borderRadius } from "../../config/styles";
import {triangleSides} from "../../components/Triangle/Triangle";
import InfoBar from "../../components/InfoBar/InfoBar";

export interface GuestProps {
    readonly name: string;
    readonly description: string;
    readonly imageUri: string;
    readonly meetings: number;
}

class Guest extends Component<GuestProps> {
    render() {
        const { name, description, imageUri, meetings } = this.props;
        return (
            <View
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <UserImage imageUri={imageUri}/>
                <Bubble
                    borderRadiusBottomLeft={borderRadius.borderRadiusNone}
                    borderRadiusTopRight={borderRadius.borderRadiusNone}
                    triangleSide={triangleSides.bottomLeft}>
                    <Text style={[styles.title, styles.text]}>{name}</Text>
                </Bubble>
                <Bubble
                    borderRadiusTopLeft={borderRadius.borderRadiusNone}
                    borderRadiusBottomRight={borderRadius.borderRadiusNone}
                    triangleSide={triangleSides.bottomRight}>
                    <Text style={styles.text}>{description}</Text>
                </Bubble>
               <InfoBar number={meetings}/>
            </View>
        );
    }
}

export default Guest;
