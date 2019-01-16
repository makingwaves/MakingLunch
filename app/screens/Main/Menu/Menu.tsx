import React, { PureComponent, Fragment } from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

import MenuItems from './MenuItems';
import HocFetchData from '../../../components/HocFetchData';
import HamburgerItem from './HamburgerItem';
import { AppState } from '../../../state/state';
import { RequestState } from '../../../state/common/types';
import { AuthSagaActions, Profile } from '../../../state/auth/types';
import ConditionalAnimation from '../../../components/ConditionalAnimation';

export interface MenuProps {
    logOut: () => void;
    userData: Profile;
    getUserData: () => void;
};

export interface MenuState {
    menuItemsVisible: boolean;
};

class Menu extends PureComponent<MenuProps, MenuState> {
    public state: MenuState;

    constructor(props: MenuProps) {
        super(props);

        this.state = {
            menuItemsVisible: false
        };
    }

    public componentDidMount(): void {
        this.props.getUserData();
    }

    private toggleMenuVisibility = () => {
        this.setState(prevState => ({ menuItemsVisible: !prevState.menuItemsVisible }));
        console.log('clicked');
    }

    public render() {
        const {
            logOut,
            userData,
        } = this.props;
        const {
            menuItemsVisible
        } = this.state;

        return (
            <Fragment>
                <View style={styles.viewContainer}>
                    <ConditionalAnimation 
                        condition={menuItemsVisible}
                        duration={200}
                        animationViewStyles={styles.animationViewStyles}
                        showAnimationStyles={styles.showMenuStyles}
                        hideAnimatioStyles={styles.hideMenuStyles}
                    >
                        <MenuItems logOut={logOut} userData={userData} /> 
                    </ConditionalAnimation>
                </View>
                <HamburgerItem
                    isClicked={menuItemsVisible}
                    onHamburgerClick={this.toggleMenuVisibility}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile,
    isLoading: state.auth.request.state === RequestState.inProgress,
    errorMsg: state.auth.request.errorMsg
});

const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch({ type: AuthSagaActions.GET_USER_DATA }),
    logOut: () => dispatch({ type: AuthSagaActions.LOGOUT })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HocFetchData(Menu));

 