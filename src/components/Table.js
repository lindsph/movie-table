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
            const colObject = {
                field: heading,
                headerName: heading,
                // adjust this dynamically later? scrollable?
                width: 300
            }

            // could also do the check alternatively outside of this function and check if the values are dates
            if (heading === "Released") {
                // similar to the sort function
                    // for example: v1 is 06 Jul 1994, v2 is 14 Oct 1994, and row1 and row2 are objects 
                    // turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
                colObject.sortComparator = (v1, v2, row1, row2) => new Date(row1.data.Released) - new Date(row2.data.Released)
            }

            return colObject;
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
                {tableReady ? <DataGrid rows={rows} columns={columns} pageSize={maxEntries} sortModel={sortModel} /> : null}
            </div>
        </>
    );
};

export default TableComponent;