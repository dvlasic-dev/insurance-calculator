import { useQuery } from "react-query";
import { ColumnDef } from "@tanstack/react-table";
import { getEstimates } from "../../utils/fetchData";
import Table from "../Shared/Table";
import Modal from "../Shared/Modal";
import { useMemo, useState } from "react";
import { PriceMatch } from "../../utils/types";
import { formatCurrency } from "../../utils/functions";

const Review = () => {
  const { data, isFetching } = useQuery("estimates", getEstimates);
  const [modal, setModal] = useState<{
    open: boolean;
    data: null | PriceMatch;
  }>({ open: false, data: null });

  const handleCloseModal = () => {
    setModal({ open: false, data: null });
  };
  const columns = useMemo<ColumnDef<PriceMatch>[]>(
    () => [
      { header: () => "Name", accessorKey: "name" },
      {
        header: () => "City",
        accessorKey: "city",
      },
      {
        header: () => "Vehicle power",
        accessorKey: "vehiclePower",
      },
      {
        header: () => "Total price",
        accessorKey: "totalPrice",
        cell: (info) => formatCurrency(info.row.original.totalPrice),
      },
      {
        header: () => "View",
        accessorKey: "_id",
        cell: (info) => (
          <button
            onClick={() => setModal({ open: true, data: info.row.original })}
          >
            Open
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <div className="my-4">
      <h1 className="text-3xl font-bold">Insurance estimates</h1>
      <div className="mx-auto mt-14 w-full max-w-5xl">
        {isFetching ? null : <Table data={data} columns={columns} />}
      </div>
      <div>
        {modal.open && modal.data ? (
          <Modal
            open={modal.open}
            data={modal.data}
            onCloseModal={handleCloseModal}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Review;
