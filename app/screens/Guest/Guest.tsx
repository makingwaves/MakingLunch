import React, {Component} from 'react';
import { View } from 'react-native';
import styles from './style';
import UserImage from "../../components/UserImage/UserImage";

class Guest extends Component {
    render() {
        return (
            <View style={styles.container}>
                <UserImage/>
            </View>
        );
    }
}

export default Guest;
