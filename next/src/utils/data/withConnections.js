import useSWR from 'swr';
import { fetcherWithOptions } from '../axios';

const withConnections = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, mutate } = useSWR(
        {
            url: '/api/connections',
            method: 'get',
        },
        fetcherWithOptions,
    );

    return {
        connectionData: data,
        areConnectionsLoading: !error && !data,
        isConnectionsError: error,
        connectionsMutate: mutate,
    };
};

const withConnectionsTypes = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, mutate } = useSWR(
        {
            url: '/api/connections/types',
            method: 'get',
        },
        fetcherWithOptions,
    );

    return {
        connectionTypeData: data,
        areConnectionTypesLoading: !error && !data,
        isConnectionTypesError: error,
        connectionTypesMutate: mutate,
    };
};

export { withConnections, withConnectionsTypes };
