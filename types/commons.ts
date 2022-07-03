import { QueryResult } from "@apollo/client";
import { Column } from "react-table";
import type * as Stitches from '@stitches/react';

export interface DataTableProps<TVariables = any> {
    data: Readonly<any[]>;
    refetch: QueryResult<any, TVariables>["refetch"]
    count: number;
    refetching: boolean;
    loading: boolean;
}

export type TableColumnsType = Column<any>[]

export type StitchesComponent = { css?: Stitches.CSS }