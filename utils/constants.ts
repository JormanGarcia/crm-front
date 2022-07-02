import { CAR_CATEGORIES } from "types/car-categories";
import { CAR_STATUS } from "types/car-status";
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


export const SELECT_CAR_STATUS_OPTIONS = [
    { label: "En Venta", value: CAR_STATUS.ON_SALE },
    { label: "Vendido", value: CAR_STATUS.SELLED },
];

export const SELECT_TRANSMISSIONS_OPTIONS = [
    { label: "MT", value: "MT" },
    { label: "AT", value: "AT" },
];

export const SELECT_CATEGORIES_OPTIONS = [
    { label: "Sedan", value: CAR_CATEGORIES.SEDAN },
    { label: "Suv", value: CAR_CATEGORIES.SUV },
    { label: "Pick up", value: CAR_CATEGORIES.PICK_UP },
    { label: "Motos", value: CAR_CATEGORIES.MOTO },
    { label: "Otros", value: CAR_CATEGORIES.OTHERS },
];

export const SELECT_PRICE_OPTIONS = [
    {
        label: "$0 - $5.000.000",
        value: [0, 5000000],
    },
    {
        label: "$5.000.000 - $7.500.000",
        value: [5000000, 7500000],
    },
    {
        label: "$7.500.000 - $10.000.000",
        value: [7500000, 10000000],
    },
    {
        label: "$10.000.000 - $12.500.000",
        value: [10000000, 12500000],
    },
    {
        label: "$12.500.000 - $15.000.000",
        value: [12500000, 15000000],
    },
    {
        label: "$15.000.000 - $50.000.000",
        value: [15000000, 50000000],
    },
    {
        label: "$50.000.000 - $100.000.000",
        value: [50000000, 100000000],
    },
]


const year = new Date().getFullYear();
const years = Array.from(new Array(80), (val, index) => year - index);

export const SELECT_YEAR_OPTIONS = years.map((year: number) => ({
    label: year,
    value: year,
}));