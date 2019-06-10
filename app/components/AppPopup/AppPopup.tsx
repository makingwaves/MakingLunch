import React, { PureComponent } from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

import styles from './style';
import Display from '../Display';


// export interface AppPopupProps {
//     title: string;
//     iconUrl?: ImageSourcePropType;
//     showError: boolean;
//     description?: string;
//     showDuration: number;
// };

export interface AppPopupState {
    isVisible: boolean;
};

class AppPopup extends PureComponent<object, AppPopupState> {
    public state: AppPopupState;

    constructor(props: object) {
        super(props);
    }

    public render() {

        return (
            <Text>Elo</Text>
        )
    }
}

const mapStateToProps = (store: IAppSta)
export default AppPopup;