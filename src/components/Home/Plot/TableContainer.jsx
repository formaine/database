import React, { Fragment } from 'react'
import {FiChevronDown, FiDownload, FiChevronUp} from "react-icons/fi";




import {
    useTable,
    useSortBy,
    useFilters,
    useExpanded,
    usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input, CustomInput } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        visibleColumns,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        exportData,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultColumnFilter },
            initialState: { pageIndex: 0, pageSize: 10 },
            getExportFileBlob
        },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useExportData
    );

    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? <FiChevronDown /> : <FiChevronUp />) : '';
    };

    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));
    };

    const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
    };



    function getExportFileBlob({ columns, data, fileType, fileName }) {
        if (fileType === "csv") {
            // CSV example
            const headerNames = columns.map((col) => col.exportValue);
            const csvString = Papa.unparse({ fields: headerNames, data });
            return new Blob([csvString], { type: "text/csv" });
        }

        // Other formats goes here
        return false;
    }



    return (
        <Fragment>
            <Table bordered hover {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                <div {...column.getSortByToggleProps()}>
                                    {column.render('Header')}
                                    {generateSortingIndicator(column)}
                                </div>
                                <Filter column={column} />
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row);
                    return (
                        <Fragment key={row.getRowProps().key}>
                            <tr>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                            {row.isExpanded && (
                                <tr>
                                    <td colSpan={visibleColumns.length}>
                                        {renderRowSubComponent(row)}
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    );
                })}
                </tbody>
            </Table>

            <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
                <Col md={2}>
                    <Button
                        color='secondary'
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                    >
                        {'<'}
                    </Button>
                </Col>
                <Col md={3} style={{ marginTop: 7 }}>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </Col>
                <Col md={2}>
                    <Input
                        type='number'
                        min={1}
                        style={{ width: 70 }}
                        max={pageOptions.length}
                        defaultValue={pageIndex + 1}
                        onChange={onChangeInInput}
                    />
                </Col>

                <Col md={3}>
                    <Button color='secondary' onClick={nextPage} disabled={!canNextPage}>
                        {'>'}
                    </Button>
                </Col>
                <Col md={1}>

                <Button
                    color='info'
                    onClick={() => {
                        exportData("csv", false);
                    }}
                >
                    {<FiDownload/>}
                </Button>
                </Col>



            </Row>
        </Fragment>
    );
};

export default TableContainer;