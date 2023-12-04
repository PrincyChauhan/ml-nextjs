import Heading from "@/components/heading";
import { getUserHistroy } from "@/lib/get-user-history";
import { HistoryIcon } from "lucide-react";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const page = async () => {
  const userHistory = await getUserHistroy();

  console.log(userHistory);

  return (
    <div>
      <Heading
        title="History"
        description="History"
        icon={HistoryIcon}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />

      <div className="px-4 lg:px-8">
        <DataTable columns={columns} data={userHistory!} searchKey="userName" />
      </div>
    </div>
  );
};

export default page;
