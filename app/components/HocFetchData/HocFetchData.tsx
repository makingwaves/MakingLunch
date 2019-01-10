import React, { Component, Fragment } from 'react';

import ErrorPopup from '../ErrorPopup';
import ScreenLoader from '../ScreenLoader';

export interface HocFetchDataProps {
    readonly errorMsg: string;
    readonly isLoading: boolean;
};

export interface HocFeatchDataState {
    showErrorPopup: boolean;
};

const HocFetchData = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    loadingText: string = 'Loading',
    
) => (
    class extends Component<P & HocFetchDataProps, HocFeatchDataState> {
        public state: HocFeatchDataState;

        constructor(props: P & HocFetchDataProps) {
            super(props);
            
            this.state = {
                showErrorPopup: false
            }
        }

        public componentDidUpdate(prevProps: HocFetchDataProps): void {
            if(prevProps.errorMsg !== this.props.errorMsg && !this.state.showErrorPopup) 
                this.setState(prevState => ({ showErrorPopup: this.isValidString(this.props.errorMsg) }));
        }

        private isValidString(errorMsg: string): boolean {
            return typeof errorMsg === 'string' && !!errorMsg
        }

        private onPopupClose = (): void => {
            this.setState(prevState => ({ showErrorPopup: false }));
        }

        public render(): JSX.Element {
            const {
                errorMsg,
                isLoading,
            } = this.props as any; // :(
            const {
                showErrorPopup
            } = this.state;

            return (
                <Fragment>
                    <ScreenLoader isVisible={isLoading} text={loadingText} />
                    <ErrorPopup title={'An error has occurred'} errorOccured={showErrorPopup} errorMsg={errorMsg} closePopup={this.onPopupClose} />
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
);

export default HocFetchData;