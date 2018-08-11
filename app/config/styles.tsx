import { Platform } from 'react-native';

export const fontSizes = {
    yotta: 70,
    zetta: 48,
    exa: 40,
    peta: 30,
    giga: 24,
    kilo: 18,
    base: 14,
    mini: 12,
    piko: 9
};

export const fontWeights = {
    medium: Platform.OS === 'ios' ? '500' : '400',
    semiBold: Platform.OS === 'ios' ? '600' : '500',
    heavyBold: Platform.OS === 'ios' ? '900' : '900'
};
