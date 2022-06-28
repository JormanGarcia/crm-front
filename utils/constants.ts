import { PRODUCT_STATUS } from "types/product-status";

export const PAGINATION_LIMIT_DEFAULT = 10

export const SELECT_STATUS_OPTIONS = [
    {
        label: "Published",
        value: PRODUCT_STATUS.PUBLISHED,
    },
    {
        label: "Draft",
        value: PRODUCT_STATUS.DRAFT,
    },
];