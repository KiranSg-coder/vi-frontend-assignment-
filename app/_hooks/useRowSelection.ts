import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

export function useRowSelection() {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    return {
        rowSelection,
        setRowSelection,
    };
}
