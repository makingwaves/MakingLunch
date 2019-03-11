import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export enum fontSizes {
    yotta = wp('8%') >= 48 ? wp('6%') : 48,
    zetta = wp('6%') >= 40 ? wp('5%') : 40,
    exa = wp('5%') >= 32 ? wp('4%') : 32,
    peta = wp('4%') >= 28 ? wp('3%') : 28,
    giga = wp('3%') >= 24 ? wp('2.5%') : 24,
    kilo = wp('2.5%') >= 18 ? wp('2%') : 18,
    base = wp('2%') >= 14 ? wp('1.5%') : 14,
    mini = wp('1.5%') >= 12 ? wp('1%') : 12,
    piko = wp('1%') >= 9 ? wp('0.5%') : 9,
}

export enum fontWeights {
    medium = Platform.OS === 'ios' ? '500' : '400',
    semiBold = Platform.OS === 'ios' ? '600' : '500',
    heavyBold = Platform.OS === 'ios' ? '900' : '900',
}

export enum colors {
    brandColorPrimary = '#5b4663',
    brandColorSecondary = '#50e3c2',
    brandColorTetriary = '#ff5c5c',
    colorLight = '#eee6e4',
    colorLightest = '#ffffff',
}

export enum borderRadius {
    borderRadiusBase = 25,
    borderRadiusNone = 0,
    borderRadiusLarge = 40,
}

export enum spacing {
    gutterSmall = wp('4%'),
    gutter = wp('8%'),
    gutterLarge = wp('16%'),
}

export enum sizes {
    baseSize = wp('68%'),
}
