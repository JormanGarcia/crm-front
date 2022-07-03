import { GetProductsQueryVariables, useGetProductsQuery } from "./genenerated"


export function getProducts(variables: GetProductsQueryVariables) {
    const { data, refetch } = useGetProductsQuery({
        variables: variables,
        fetchPolicy: "no-cache"
    })

    return {
        products: data.products.data ?? [],
        count: data.products.count ?? 0,
        refetch
    }
}
