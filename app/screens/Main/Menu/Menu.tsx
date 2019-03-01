import Display from 'react-native-display';
import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';

import styles from './style';

import MenuItems from './MenuItems';
import { AppState } from '@app/state/state';
import HamburgerItem from './HamburgerItem';
import { Profile, AuthSagaActions } from '@app/state/auth/types';

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
                <Display style={styles.viewContainer} enable={menuItemsVisible} enter={'fadeInDownBig'} exit={'fadeOutUpBig'} defaultDuration={300}>
                    <MenuItems logOut={logOut} userData={userData} />
                </Display>
                <HamburgerItem onHamburgerClick={this.toggleMenuVisibility} />
            </Fragment>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch({ type: AuthSagaActions.GET_USER_DATA }),
    logOut: () => dispatch({ type: AuthSagaActions.LOGOUT })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

