"use client";

import { ColumnDef } from "@tanstack/react-table";

export type UserHistoryColumn = {
  userName: string;
  accuracy: number;
  graphType: string;
  createdAt: string;
};

export const columns: ColumnDef<UserHistoryColumn>[] = [
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "graphType",
    header: "Graph Type",
  },
  {
    accessorKey: "accuracy",
    header: "Accuracy",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
