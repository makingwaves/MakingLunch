import { Platform } from 'react-native';

export enum fontSizes {
    yotta = 70,
    zetta = 48,
    exa = 40,
    peta = 30,
    giga = 24,
    kilo = 18,
    base = 14,
    mini = 12,
    piko = 9
}

export enum fontWeights {
    medium = Platform.OS === 'ios' ? '500' : '400',
    semiBold = Platform.OS === 'ios' ? '600' : '500',
    heavyBold = Platform.OS === 'ios' ? '900' : '900'
}

export enum colors {
    backgroundColorLight = '#eee6e4',
    backgroundColorDark = '#5b4663',
    fontColor = '#5b4663',
    fontColorInverted = '#ffffff',
    colorLight = '#ffffff',
    colorDark = '#000000'
}