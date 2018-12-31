import React, { SFC } from 'react'
import { View, Text } from 'react-native';

import styles from './style';

import { Lunch } from '../../../state/lunches/types';
import SingleLunch from '../SingleLunch';

export interface LunchTypeProps {
    title: string;
    lunches: Lunch[];
};

const LunchType: SFC<LunchTypeProps> = ({
    title, lunches
}) => {
    return (
        <View>
            {!!lunches.length && 
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    {lunches.map(l => (
                        <SingleLunch 
                            key={l.id}
                            lunch={l}
                        />
                    ))}
                </View>
            }
        </View>
    );
}

export default LunchType;