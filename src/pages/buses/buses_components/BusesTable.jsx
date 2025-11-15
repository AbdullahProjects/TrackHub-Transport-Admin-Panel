import React from "react";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";

const BusesTable = () => {
  const tableData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div>
      <div className="buses-table-container bg-white mt-4 rounded-md shadow-sm shadow-black/5 overflow-x-auto">
        <table className="w-full">
          <thead className="border-b-2 border-tableDarkBorder">
            <tr className="text-left">
              <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                Sr.No
              </th>
              <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                Bus ID
              </th>
              <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                Driver Info
              </th>
              <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                Condition
              </th>
              <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                Seats
              </th>
              <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                Route Name
              </th>
              <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                Total Stops
              </th>
              <th className="px-2 py-3 text-[14px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr className="border-b border-tableLightBorder">
                <td className="px-2 py-3 text-[14px]">1</td>
                <td className="px-2 py-3 text-[14px]">BUS1234</td>
                <td className="px-2 py-3 text-[14px]">John Doe</td>
                <td className="px-2 py-3 text-[14px]">Active</td>
                <td className="px-2 py-3 text-[14px]">40</td>
                <td className="px-2 py-3 text-[14px]">Route A</td>
                <td className="px-2 py-3 text-[14px]">10</td>
                <td className="px-2 py-3 text-[14px]">
                  <div className="flex flex-row gap-2">
                    <div className="icon border border-menuActiveColor rounded-sm p-1 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white">
                      <MdModeEdit />
                    </div>
                    <div className="icon border border-menuActiveColor rounded-sm p-1 cursor-pointer transition-all duration-200 hover:bg-red-600 hover:border-red-600 hover:text-white">
                      <AiFillDelete />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="table-pagination mt-4 flex flex-row items-center justify-end gap-4">
        <div>
          <label htmlFor="rowsPerPage" className="text-textLight text-[14px]">Rows per page:</label>
          <select id="rowsPerPage" className="rounded-sm px-1 py-1 text-[14px] ml-2 border border-tableDarkBorder">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <span className="ml-2 text-textLight text-[14px]">1-10 of 100</span>
        <div className="flex flex-row gap-1 text-[14px]">
          <button className="rounded-md px-2 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-100">
            <GrPrevious />
          </button>
          <button className="rounded-md px-2 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-1    00">
            <GrPrevious style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusesTable;
