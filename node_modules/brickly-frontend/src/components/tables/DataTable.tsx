import React, { useMemo, useState } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  Column
} from 'react-table'

interface DataTableProps {
  data: any[]
  columns: Column<any>[]
  defaultSortKey?: string
  colFilter?: boolean
}

export default function DataTable({ data, columns, defaultSortKey, colFilter }: DataTableProps) {
  const defaultColumn = useMemo(() => ({
    Filter: ({ column: { filterValue, setFilter } }: any) => (
      <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value || undefined)}
        placeholder="Filtra..."
        className="w-full px-1 py-0.5 border border-gray-300 rounded text-sm"
      />
    )
  }), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: defaultSortKey
        ? { sortBy: [{ id: defaultSortKey, desc: false }] }
        : {}
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  )

  return (
    <div className="overflow-x-auto text-sm bg-white border border-gray-200 rounded-md">
      <table {...getTableProps()} className="min-w-full">
        <thead className="bg-gray-100 text-left">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="px-3 py-2 border" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="flex items-center justify-between">
                    {column.render('Header')}
                    {column.isSorted && (
                      <span>{column.isSortedDesc ? ' 🔽' : ' 🔼'}</span>
                    )}
                  </div>
                  {colFilter && column.canFilter ? <div>{column.render('Filter')}</div> : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-3 py-1 border">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
