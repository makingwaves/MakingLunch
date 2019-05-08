import { ImageSourcePropType } from 'react-native';
import React, { Fragment, FunctionComponent, memo, ReactNode } from 'react';

import ErrorPopup from '@app/components/ErrorPopup';
import ScreenLoader from '@app/components/ScreenLoader';

export interface FetchDataHelper {
    children: ReactNode;
    showError: boolean;
    isLoading: boolean;
    errorTitle: string;
    errorIcon?: ImageSourcePropType;
    errorDescription?: string;
    showErrorDuration?: number;
};

const FetchDataHelper: FunctionComponent<FetchDataHelper> = ({
    errorTitle, errorDescription, errorIcon, showErrorDuration, showError, isLoading, children
}) => {
    return (
        <Fragment>
            <ScreenLoader isVisible={isLoading} />
            <ErrorPopup
                showError={showError}
                title={errorTitle}
                description={errorDescription}
                iconUrl={errorIcon}
                showDuration={showErrorDuration}
            />
            {children}
        </Fragment>
    )
}


export default memo(FetchDataHelper);