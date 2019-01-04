import React, { FunctionComponent } from 'react'
import { View, Text } from 'react-native';

import styles from './style';

import { Lunch } from '../../../state/lunches/types';
import SingleLunch from '../SingleLunch';

export interface LunchTypeProps {
    titles: {
        title: string;
        subTitle: string;
    };
    lunches: Lunch[];
};

const LunchType: FunctionComponent<LunchTypeProps> = ({
    titles, lunches
}) => {
    return (
        <View>
            {!!lunches.length && 
                <View style={styles.container}>
                    <Text style={styles.title}>{titles.title}</Text>
                    {lunches
                        .map(l => (
                            <SingleLunch 
                                key={l.id}
                                lunch={l}
                                subTitle={titles.subTitle}
                            />
                        ))}
                </View>
            }
        </View>
    );
}

export default LunchType;