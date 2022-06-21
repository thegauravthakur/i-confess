import { useQuery, UseQueryOptions } from 'react-query';

interface Confession {
    id: string;
    description: string;
    author: string;
}

type QueryConfig = Omit<
    UseQueryOptions<number, unknown, Confession[], string[]>,
    'queryKey' | 'queryFn'
>;

interface UseConfessionsProps {
    queryConfig: QueryConfig;
}
export function useConfessions({ queryConfig }: UseConfessionsProps) {
    const { data: confessions } = useQuery(
        ['confessions'],
        async () => {
            const result = await fetch('/api/confession/get');
            return result.json();
        },
        { ...queryConfig }
    );
    return [confessions];
}
