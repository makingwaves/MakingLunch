import { Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export enum fontSizes {
    yotta = hp('8%')  >= 48 ? hp('10%') : 48,
    zetta = hp('6%')  >= 40 ? hp('6%') : 40,
    exa = hp('5%')  >= 32 ? hp('5%') : 32,
    peta = hp('4%')  >= 28 ? hp('4%') : 28,
    giga = hp('3%')  >= 24 ? hp('3%') : 24,
    kilo = hp('2.5%') >= 18 ? hp('2.5%') : 18,
    base = hp('2%') >= 14 ? hp('2%') : 14,
    mini = hp('1.5%') >= 12 ? hp('1.5%') : 12,
    piko = hp('1%') >= 9 ? hp('1%') : 9
}

export enum fontWeights {
    medium = Platform.OS === 'ios' ? '500' : '400',
    semiBold = Platform.OS === 'ios' ? '600' : '500',
    heavyBold = Platform.OS === 'ios' ? '900' : '900'
}

export enum colors {
    backgroundColorLight = '#eee6e4',
    backgroundColorDark = '#5b4663',
    textColorDark = '#5b4663',
    textColorLight = '#ffffff',
    colorLight = '#ffffff',
    colorDark = '#000000'
}

export enum borderRadius {
    borderRadiusBase = 25,
    borderRadiusNone = 0,
    borderRadiusLarge = 40
}

export enum spacing {
    gutterSmall = wp('4%'),
    gutter = wp('8%'),
    gutterLarge = wp('16%')
}

export enum widths {
    baseSize = wp('68%')
}
