import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import config from '../config';

const TableComponent = ({data, maxEntries, allcurrentGenres, currentGenre}) => {
    const [columnHeadings, setColumnHeadings] = useState(null);
    const [columns, setColumns] = useState(null);
    const [rows, setRows] = useState(null);
    const [tableReady, setTableReady] = useState(false);

    const {headings, sortModel} = config;

    useEffect(() => {
        data && setColumnHeadings(headings)
    }, [data]);

    useEffect(() => {
        if (columnHeadings && data && currentGenre) {
            setupColsForTable();
            setupRowsForTable();
            setTableReady(true);
        }

    }, [columnHeadings, data, currentGenre])

    const setupColsForTable = () => {
        const columns = columnHeadings && columnHeadings.map(heading => {
            return {
                field: heading,
                headerName: heading,
                // sortComparator: 
                // adjust this dynamically later? scrollable?
                width: 300
            }
        });

        setColumns(columns);
    }

    const setupRowsForTable = () => {
        const rows = data && data[currentGenre].map((movie, index) => {
            return {
                // make this more unique
                id: index,
                ...movie
            }
        })

        setRows(rows);
    }

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                {tableReady ? <DataGrid rows={rows} columns={columns} pageSize={maxEntries} /> : null}
            </div>
        </>
    );
};

export default TableComponent;