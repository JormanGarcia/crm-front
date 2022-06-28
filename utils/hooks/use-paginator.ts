import { useState } from "react";
import { PAGINATION_LIMIT_DEFAULT } from "utils/constants";

interface usePaginatorProps {
    total: number;
    refetch: any;
}

export function usePaginator(props: usePaginatorProps) {
    const { total, refetch } = props;
    const [limit] = useState(PAGINATION_LIMIT_DEFAULT);
    const [current, setCurrent] = useState(1);

    const totalPages = Math.ceil(total / limit);

    const isLastPage = totalPages <= current;

    async function handlePagination(NextPage: number) {
        await refetch({
            offset: (NextPage - 1) * 10,
        });

        setCurrent(NextPage);
    }

    return { totalPages: totalPages === 0 ? 1 : totalPages, isLastPage, current, handlePagination, limit };
}