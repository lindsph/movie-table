import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import config from '../../config';
import { setupRowsForTable, setupColsForTable } from './utils';

const TableComponent = ({data, maxEntries, allcurrentGenres, currentGenre}) => {
    const [columnHeadings, setColumnHeadings] = useState(null);
    const [columns, setColumns] = useState(null);
    const [rows, setRows] = useState(null);
    const [tableReady, setTableReady] = useState(false);

    const {headings} = config;

    useEffect(() => {
        data && setColumnHeadings(headings)
    }, [data]);

    useEffect(() => {
        if (columnHeadings && data && currentGenre) {
            const transformedCols = setupColsForTable(columnHeadings);
            setColumns(transformedCols);
            const transformedRows = setupRowsForTable(data, currentGenre);
            setRows(transformedRows);
            setTableReady(true);
        }

    }, [columnHeadings, data, currentGenre])

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                {tableReady ? <DataGrid rows={rows} columns={columns} pageSize={maxEntries} /> : null}
            </div>
        </>
    );
};

export default TableComponent;