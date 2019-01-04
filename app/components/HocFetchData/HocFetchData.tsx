import React, { Component, Fragment } from 'react';

import ScreenLoader from '../ScreenLoader/ScreenLoader';

export interface HocFetchData {
    readonly errorMsg: string;
    readonly isLoading: boolean;
};

const HocFetchData = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    loadingText: string = 'Loading'
) => (
    class extends Component<P & HocFetchData> {
        public render(): JSX.Element {
            const {
                errorMsg,
                isLoading,
                ...restProps
            } = this.props as any; // :(

            return (
                <Fragment>
                    <ScreenLoader isVisible={isLoading} text={loadingText} />
                    <WrappedComponent {...restProps} />
                </Fragment>
            );
        }
    }
);

export default HocFetchData;