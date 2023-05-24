import useSWR from 'swr';
import { fetcherWithOptions } from '../axios';

const withWalletOverview = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, mutate } = useSWR(
        {
            url: '/api/connections/overview',
            method: 'get',
        },
        fetcherWithOptions,
    );

    return {
        overviewData: data,
        isOverviewLoading: !error && !data,
        isOverviewError: error,
        overviewMutate: mutate,
    };
};

export { withWalletOverview };
