"use client";

import { DataTable } from "./_components/data_table";
import { useDataFetching } from "./_hooks/useDataFetching";
import { useRowSelection } from "./_hooks/useRowSelection";

export default function HomePage() {
    const { data, columns } = useDataFetching();

    // TASK 1 : Create the feature for selecting rows in DataTable
    const { rowSelection, setRowSelection } = useRowSelection();

    return (
        <div className="flex flex-col gap-10 items-center p-10">
            <span className="text-3xl text-gray-700 font-bold">Task Details</span>
            <div className="max-w-screen-lg flex size-full flex-col">
                <DataTable
                    columns={columns}
                    data={data}
                    setRowSelection={setRowSelection}
                    rowSelection={rowSelection}
                />
            </div>
        </div>
    );
}
