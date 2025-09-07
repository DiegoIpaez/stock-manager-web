'use client';

import clsx from 'clsx';
import { Fragment } from 'react';
import { Inbox } from 'lucide-react';
import Subtitle from '../typography/Subtitle';
import Spinner from '../feedback/Spinner';

type ColumnProps<T> = {
  key: string;
  title: string;
  className?: string;
  rowClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (row: T) => React.ReactNode | any;
};

type TableProps<T> = {
  columns?: ColumnProps<T>[];
  data?: T[];
  title?: string;
  selectedRow?: T | null;
  noDataMessage?: string;
  handleRowClick?: (row: T) => void;
  loading?: boolean;
  className?: string;
};

function NotFoundDataTable({
  columns,
  noDataMessage,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnProps<any>[];
  noDataMessage?: string;
}) {
  return (
    <tr>
      <td colSpan={columns.length} className="text-center p-[5rem]">
        <div className="flex flex-col justify-center items-center">
          <Inbox size={40} className="text-[#2a2a2a]" />
          <span className="mt-2 text-[13px] text-[#2a2a2a]">
            {noDataMessage && noDataMessage}
          </span>
        </div>
      </td>
    </tr>
  );
}

export default function Table<T>({
  columns = [],
  data = [],
  title = '',
  handleRowClick = () => {},
  selectedRow = null,
  noDataMessage = 'No data available',
  className = '',
  loading = false,
}: TableProps<T>) {
  return (
    <Fragment>
      {title && <Subtitle className="my-4 text-lg">{title}</Subtitle>}
      <div className="overflow-x-auto rounded-xl shadow">
        <table
          className={clsx('min-w-full text-sm text-left bg-white', {
            'min-h-[256px]': data?.length === 0 || loading,
            [className]: className,
          })}
        >
          <thead>
            <tr>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className={clsx(
                    'border-b-2 border-gray-200 bg-[#2a2a2a] text-white font-semibold p-3 ',
                    'first:rounded-tl-lg last:rounded-tr-lg',
                    column?.className && column?.className
                  )}
                >
                  {column?.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center">
                    <Spinner size={30} color="#000000ff" />
                  </div>
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => handleRowClick(row)}
                  className={clsx(
                    'hover:bg-[#BEDBFE] transition-colors cursor-pointer',
                    rowIndex % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100',
                    selectedRow === row
                      ? 'bg-blue-50 border-l-4 border-blue-400'
                      : ''
                  )}
                >
                  {columns?.map((column) => (
                    <td
                      key={column.key}
                      className={clsx(
                        'border-b border-gray-200 p-3',
                        'first:rounded-bl-lg last:rounded-br-lg text-black',
                        column?.rowClassName && column?.rowClassName
                      )}
                    >
                      {column?.render
                        ? column?.render(row)
                        : row?.[column?.key as keyof T]
                          ? row?.[column?.key as keyof T]
                          : ''}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <NotFoundDataTable
                columns={columns}
                noDataMessage={noDataMessage}
              />
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
