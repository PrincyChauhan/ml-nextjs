"use client";

import { ColumnDef } from "@tanstack/react-table";

export type UserHistoryColumn = {
  accuracy: number;
  modalName: string;
  createdAt: string;
};

export const columns: ColumnDef<UserHistoryColumn>[] = [
  {
    accessorKey: "modalName",
    header: "Model Name",
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
