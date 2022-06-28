import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Cars = {
  __typename?: 'Cars';
  brand: Scalars['String'];
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Scalars['String']>;
  comments: Scalars['String'];
  condition?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  images?: Maybe<Scalars['String']>;
  mileage: Scalars['Int'];
  model: Scalars['String'];
  position: Scalars['Float'];
  price: Scalars['Float'];
  status: Scalars['String'];
  transmission: Scalars['String'];
  updateAt: Scalars['DateTime'];
  year: Scalars['Int'];
};

export type CarsPaginator = {
  __typename?: 'CarsPaginator';
  count: Scalars['Int'];
  data: Array<Cars>;
};

export type CategoriesPaginator = {
  __typename?: 'CategoriesPaginator';
  count: Scalars['Int'];
  data: Array<Category>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime'];
  icon: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  products?: Maybe<Array<Cars>>;
  slug: Scalars['String'];
  updateAt: Scalars['DateTime'];
};

export type CreateCarsInput = {
  brand: Scalars['String'];
  category: Scalars['String'];
  comments?: InputMaybe<Scalars['String']>;
  mileage: Scalars['Int'];
  model: Scalars['String'];
  position: Scalars['Int'];
  price: Scalars['Float'];
  status: Scalars['String'];
  transmission: Scalars['String'];
  year: Scalars['Int'];
};

export type CreateInputCategory = {
  icon: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CreateInputUser = {
  comments?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  website?: InputMaybe<Scalars['String']>;
};

export type CreateProductInput = {
  categories?: InputMaybe<Array<Scalars['String']>>;
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  slug: Scalars['String'];
  status: Scalars['String'];
  stock: Scalars['Int'];
};

export type LoginInputObject = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  errors: Array<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
  user?: Maybe<UserData>;
};

export type Mutation = {
  __typename?: 'Mutation';
  create_car: Cars;
  create_category: Category;
  create_product: ProductObject;
  create_user: User;
  delete_car: Cars;
  delete_user: User;
  login: LoginResult;
  update_car: Cars;
};


export type MutationCreate_CarArgs = {
  object: CreateCarsInput;
};


export type MutationCreate_CategoryArgs = {
  object: CreateInputCategory;
};


export type MutationCreate_ProductArgs = {
  object: CreateProductInput;
};


export type MutationCreate_UserArgs = {
  object: CreateInputUser;
};


export type MutationDelete_CarArgs = {
  id: Scalars['String'];
};


export type MutationDelete_UserArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  object: LoginInputObject;
};


export type MutationUpdate_CarArgs = {
  id: Scalars['String'];
  object: UpdateCarInput;
};

export type OrderCarsBy = {
  category?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
};

export type OrderProductsBy = {
  createdAt?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type ProductObject = {
  __typename?: 'ProductObject';
  categories?: Maybe<Array<Category>>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  images: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  slug: Scalars['String'];
  status: Scalars['String'];
  stock: Scalars['Int'];
  updateAt: Scalars['DateTime'];
};

export type ProductsPaginator = {
  __typename?: 'ProductsPaginator';
  count: Scalars['Int'];
  data: Array<ProductObject>;
};

export type Query = {
  __typename?: 'Query';
  car: Cars;
  cars: CarsPaginator;
  categories: CategoriesPaginator;
  product: ProductObject;
  products: ProductsPaginator;
  users: UsersPaginator;
};


export type QueryCarArgs = {
  where: WhereCarsArg;
};


export type QueryCarsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderCarsBy>;
  search?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<WhereCarsArg>;
};


export type QueryProductArgs = {
  where: WhereProductArg;
};


export type QueryProductsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderProductsBy>;
  search?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<WhereProductArg>;
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WhereInputUser>;
};

export type UpdateCarInput = {
  brand?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  comments?: InputMaybe<Scalars['String']>;
  mileage?: InputMaybe<Scalars['Int']>;
  model?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['String']>;
  transmission?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  cars?: Maybe<Array<Cars>>;
  comments: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type UserData = {
  __typename?: 'UserData';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type UsersPaginator = {
  __typename?: 'UsersPaginator';
  count: Scalars['Int'];
  data: Array<User>;
};

export type WhereCarsArg = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type WhereInputUser = {
  role?: InputMaybe<Scalars['String']>;
};

export type WhereProductArg = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type GetCarsQueryVariables = Exact<{
  where?: InputMaybe<WhereCarsArg>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderCarsBy>;
}>;


export type GetCarsQuery = { __typename?: 'Query', cars: { __typename?: 'CarsPaginator', count: number, data: Array<{ __typename?: 'Cars', id: string, position: number, condition?: string | null, brand: string, status: string, year: number, mileage: number, price: number, images?: string | null, model: string, comments: string, category?: string | null, transmission: string, categories?: Array<{ __typename?: 'Category', slug: string, icon: string, id: string, name: string }> | null }> } };

export type CreateCarMutationVariables = Exact<{
  object: CreateCarsInput;
}>;


export type CreateCarMutation = { __typename?: 'Mutation', create_car: { __typename?: 'Cars', id: string } };

export type DeleteCarMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCarMutation = { __typename?: 'Mutation', delete_car: { __typename?: 'Cars', id: string } };

export type GetCarByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetCarByIdQuery = { __typename?: 'Query', car: { __typename?: 'Cars', id: string, position: number, condition?: string | null, brand: string, status: string, year: number, mileage: number, price: number, images?: string | null, model: string, comments: string, category?: string | null, transmission: string } };

export type UpdateCarMutationVariables = Exact<{
  id: Scalars['String'];
  object: UpdateCarInput;
}>;


export type UpdateCarMutation = { __typename?: 'Mutation', update_car: { __typename?: 'Cars', id: string } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'CategoriesPaginator', count: number, data: Array<{ __typename?: 'Category', slug: string, id: string, name: string, createdAt: any, icon: string, products?: Array<{ __typename?: 'Cars', id: string }> | null }> } };

export type CreateCategoryMutationVariables = Exact<{
  object: CreateInputCategory;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', create_category: { __typename?: 'Category', slug: string, id: string, name: string } };

export type GetProductsQueryVariables = Exact<{
  where?: InputMaybe<WhereProductArg>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderProductsBy>;
}>;


export type GetProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductsPaginator', count: number, data: Array<{ __typename?: 'ProductObject', slug: string, id: string, name: string, createdAt: any, stock: number, status: string }> } };

export type CreateProductOneMutationVariables = Exact<{
  object: CreateProductInput;
}>;


export type CreateProductOneMutation = { __typename?: 'Mutation', create_product: { __typename?: 'ProductObject', slug: string, id: string, name: string } };

export type GetUsersQueryVariables = Exact<{
  where?: InputMaybe<WhereInputUser>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersPaginator', count: number, data: Array<{ __typename?: 'User', id: string, name: string, website?: string | null, email: string, role: string, password: string, comments: string, cars?: Array<{ __typename?: 'Cars', id: string }> | null }> } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', delete_user: { __typename?: 'User', id: string } };

export type LoginMutationVariables = Exact<{
  object: LoginInputObject;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', errors: Array<string>, ok: boolean, token?: string | null, user?: { __typename?: 'UserData', name: string, role: string, email: string, id: string } | null } };


export const GetCarsDocument = gql`
    query GetCars($where: WhereCarsArg, $limit: Int, $offset: Int, $orderBy: OrderCarsBy) {
  cars(where: $where, limit: $limit, orderBy: $orderBy, offset: $offset) {
    data {
      id
      position
      condition
      brand
      status
      year
      mileage
      price
      images
      model
      comments
      category
      transmission
      categories {
        slug
        icon
        id
        name
      }
    }
    count
  }
}
    `;

/**
 * __useGetCarsQuery__
 *
 * To run a query within a React component, call `useGetCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetCarsQuery(baseOptions?: Apollo.QueryHookOptions<GetCarsQuery, GetCarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarsQuery, GetCarsQueryVariables>(GetCarsDocument, options);
      }
export function useGetCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarsQuery, GetCarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarsQuery, GetCarsQueryVariables>(GetCarsDocument, options);
        }
export type GetCarsQueryHookResult = ReturnType<typeof useGetCarsQuery>;
export type GetCarsLazyQueryHookResult = ReturnType<typeof useGetCarsLazyQuery>;
export type GetCarsQueryResult = Apollo.QueryResult<GetCarsQuery, GetCarsQueryVariables>;
export const CreateCarDocument = gql`
    mutation CreateCar($object: CreateCarsInput!) {
  create_car(object: $object) {
    id
  }
}
    `;
export type CreateCarMutationFn = Apollo.MutationFunction<CreateCarMutation, CreateCarMutationVariables>;

/**
 * __useCreateCarMutation__
 *
 * To run a mutation, you first call `useCreateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCarMutation, { data, loading, error }] = useCreateCarMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateCarMutation(baseOptions?: Apollo.MutationHookOptions<CreateCarMutation, CreateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCarMutation, CreateCarMutationVariables>(CreateCarDocument, options);
      }
export type CreateCarMutationHookResult = ReturnType<typeof useCreateCarMutation>;
export type CreateCarMutationResult = Apollo.MutationResult<CreateCarMutation>;
export type CreateCarMutationOptions = Apollo.BaseMutationOptions<CreateCarMutation, CreateCarMutationVariables>;
export const DeleteCarDocument = gql`
    mutation DeleteCar($id: String!) {
  delete_car(id: $id) {
    id
  }
}
    `;
export type DeleteCarMutationFn = Apollo.MutationFunction<DeleteCarMutation, DeleteCarMutationVariables>;

/**
 * __useDeleteCarMutation__
 *
 * To run a mutation, you first call `useDeleteCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCarMutation, { data, loading, error }] = useDeleteCarMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCarMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCarMutation, DeleteCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCarMutation, DeleteCarMutationVariables>(DeleteCarDocument, options);
      }
export type DeleteCarMutationHookResult = ReturnType<typeof useDeleteCarMutation>;
export type DeleteCarMutationResult = Apollo.MutationResult<DeleteCarMutation>;
export type DeleteCarMutationOptions = Apollo.BaseMutationOptions<DeleteCarMutation, DeleteCarMutationVariables>;
export const GetCarByIdDocument = gql`
    query GetCarById($id: String) {
  car(where: {id: $id}) {
    id
    position
    condition
    brand
    status
    year
    mileage
    price
    images
    model
    comments
    category
    transmission
  }
}
    `;

/**
 * __useGetCarByIdQuery__
 *
 * To run a query within a React component, call `useGetCarByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCarByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetCarByIdQuery, GetCarByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarByIdQuery, GetCarByIdQueryVariables>(GetCarByIdDocument, options);
      }
export function useGetCarByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarByIdQuery, GetCarByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarByIdQuery, GetCarByIdQueryVariables>(GetCarByIdDocument, options);
        }
export type GetCarByIdQueryHookResult = ReturnType<typeof useGetCarByIdQuery>;
export type GetCarByIdLazyQueryHookResult = ReturnType<typeof useGetCarByIdLazyQuery>;
export type GetCarByIdQueryResult = Apollo.QueryResult<GetCarByIdQuery, GetCarByIdQueryVariables>;
export const UpdateCarDocument = gql`
    mutation UpdateCar($id: String!, $object: UpdateCarInput!) {
  update_car(object: $object, id: $id) {
    id
  }
}
    `;
export type UpdateCarMutationFn = Apollo.MutationFunction<UpdateCarMutation, UpdateCarMutationVariables>;

/**
 * __useUpdateCarMutation__
 *
 * To run a mutation, you first call `useUpdateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarMutation, { data, loading, error }] = useUpdateCarMutation({
 *   variables: {
 *      id: // value for 'id'
 *      object: // value for 'object'
 *   },
 * });
 */
export function useUpdateCarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarMutation, UpdateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCarMutation, UpdateCarMutationVariables>(UpdateCarDocument, options);
      }
export type UpdateCarMutationHookResult = ReturnType<typeof useUpdateCarMutation>;
export type UpdateCarMutationResult = Apollo.MutationResult<UpdateCarMutation>;
export type UpdateCarMutationOptions = Apollo.BaseMutationOptions<UpdateCarMutation, UpdateCarMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    data {
      slug
      id
      name
      createdAt
      icon
      products {
        id
      }
    }
    count
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($object: CreateInputCategory!) {
  create_category(object: $object) {
    slug
    id
    name
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const GetProductsDocument = gql`
    query GetProducts($where: WhereProductArg, $limit: Int, $offset: Int, $orderBy: OrderProductsBy) {
  products(where: $where, limit: $limit, orderBy: $orderBy, offset: $offset) {
    data {
      slug
      id
      name
      createdAt
      stock
      status
    }
    count
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const CreateProductOneDocument = gql`
    mutation CreateProductOne($object: CreateProductInput!) {
  create_product(object: $object) {
    slug
    id
    name
  }
}
    `;
export type CreateProductOneMutationFn = Apollo.MutationFunction<CreateProductOneMutation, CreateProductOneMutationVariables>;

/**
 * __useCreateProductOneMutation__
 *
 * To run a mutation, you first call `useCreateProductOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductOneMutation, { data, loading, error }] = useCreateProductOneMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateProductOneMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductOneMutation, CreateProductOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductOneMutation, CreateProductOneMutationVariables>(CreateProductOneDocument, options);
      }
export type CreateProductOneMutationHookResult = ReturnType<typeof useCreateProductOneMutation>;
export type CreateProductOneMutationResult = Apollo.MutationResult<CreateProductOneMutation>;
export type CreateProductOneMutationOptions = Apollo.BaseMutationOptions<CreateProductOneMutation, CreateProductOneMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers($where: WhereInputUser, $limit: Int, $offset: Int) {
  users(where: $where, limit: $limit, offset: $offset) {
    data {
      id
      name
      website
      email
      role
      password
      comments
      cars {
        id
      }
    }
    count
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: String!) {
  delete_user(id: $id) {
    id
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($object: LoginInputObject!) {
  login(object: $object) {
    errors
    ok
    token
    user {
      name
      role
      email
      id
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;