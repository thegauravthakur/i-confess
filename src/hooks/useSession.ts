import { useQuery, UseQueryOptions } from 'react-query';
import { useRouter } from 'next/router';
import { User } from 'next-auth';

type QueryConfig = Omit<
    UseQueryOptions<number, unknown, { user: User }, string[]>,
    'queryKey' | 'queryFn'
>;

interface UseSession {
    required?: boolean;
    redirectTo?: string;
    queryConfig?: QueryConfig;
}

export async function fetchSession() {
    const res = await fetch('/api/auth/session');
    const session = await res.json();
    if (Object.keys(session).length) {
        return session;
    }
    return null;
}

export function useSession({
    required = false,
    redirectTo = '/api/auth/signin?error=SessionExpired',
    queryConfig = {},
}: UseSession = {}): [{ user: User } | undefined, boolean] {
    const router = useRouter();
    const query = useQuery(['session'], fetchSession, {
        ...queryConfig,
        onSettled(data, error) {
            if (queryConfig.onSettled) queryConfig.onSettled(data, error);
            if (data || !required) return;
            router.push(redirectTo);
        },
    });
    return [query.data, query.status === 'loading'];
}
