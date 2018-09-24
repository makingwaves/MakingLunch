import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import styles from './style';
import UserImage from "../../components/UserImage/UserImage";
import Bubble from "../../components/Bubble/Bubble";
import { borderRadius } from "../../config/styles";
import {triangleSides} from "../../components/Triangle/Triangle";

export interface GuestProps {
    readonly name: string;
    readonly description: string;
    readonly imageUri: string;
}

class Guest extends Component<GuestProps> {
    render() {
        const { name, description, imageUri } = this.props;
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={{alignItems: 'stretch'}}
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
            </ScrollView>
        );
    }
}

export default Guest;
