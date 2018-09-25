import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './style';
import { Svg } from 'expo';
import {widthPercentageToDP as wp } from 'react-native-responsive-screen';

const BackButton = (props: any) => {
    const { navigation } = props;
    const { Defs, LinearGradient, Stop, Rect, Polygon } = Svg;
    return (

        <TouchableOpacity style={styles.container} onPress={()=> { navigation.goBack() }}>
            <Svg height={wp('10%')}
                 width={wp('10%')}
                 viewBox="0 0 100 100">
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
                        <Stop offset="1" stopColor="#412b4a" stopOpacity="1"/>
                        <Stop offset="0" stopColor="#5b4663" stopOpacity="1"/>
                    </LinearGradient>
                </Defs>
                <Polygon points="0 50, 50 100, 50 0" fill="url(#grad)"/>
                <Rect x="49" y="25" width="50" height="50" fill="url(#grad)"/>
            </Svg>

        </TouchableOpacity>
    );
};

export default BackButton;
