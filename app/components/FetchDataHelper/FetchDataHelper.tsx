import { ImageSourcePropType } from 'react-native';
import React, { Fragment, FunctionComponent, memo, ReactNode } from 'react';

import ScreenLoader from '@app/components/ScreenLoader';

export interface FetchDataHelper {
    children: ReactNode;
    isLoading: boolean;
};

const FetchDataHelper: FunctionComponent<FetchDataHelper> = ({
    isLoading, children
}) => {
    return (
        <Fragment>
            <ScreenLoader isVisible={isLoading} />
            {children}
        </Fragment>
    )
}


export default memo(FetchDataHelper);