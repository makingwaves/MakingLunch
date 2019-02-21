import { NavigationScreenProp, NavigationParams, NavigationActions, StackActions } from "react-navigation";

class NavigationService {
    private navigation: NavigationScreenProp<NavigationParams>;

    public setNavigation(navigationRef: NavigationScreenProp<NavigationParams>): void {
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

    public navigateAndReset(routeName: string, params?: NavigationParams): void {
        this.navigation.dispatch(StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName, params
                })
            ]
        }))
    }
}

const navigationService = new NavigationService;

export default navigationService;