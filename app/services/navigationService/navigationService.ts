import { NavigationScreenProp, NavigationParams, NavigationActions, StackActions } from "react-navigation";

class NavigationService {
    private navigation: NavigationScreenProp<NavigationParams>;

    public setNavigation(navigationRef: NavigationScreenProp<NavigationParams>): void {
        if(!this.navigation)
            this.navigation = navigationRef;
    }

    public navigate(routeName: string, params?: NavigationParams): void {
        this.navigation.dispatch(
            NavigationActions.navigate({
                routeName,
                params
            })
        );
    }
}

const navigationService = new NavigationService;

export default navigationService;