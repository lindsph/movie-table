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
        data && currentGenre && setColumnHeadings(headings)
    }, [data, currentGenre]);

    useEffect(() => {
        if (columnHeadings && data && currentGenre) {
            setupColsForTable();
            setupRowsForTable();
            setTableReady(true);
            
            let string = '';
            for (const key in data[currentGenre][0]) {
                if (typeof data[currentGenre][0][key] !== "string") {
                    // console.log(key)
                    data[currentGenre][0][key].map(part => {
                        string += `${part['Source']}: ${part['Value']} `
                    })
                }
            }
            console.log(string)
        }

    }, [columnHeadings, data, currentGenre])

    const setupColsForTable = () => {
        const columns = columnHeadings && columnHeadings.map(heading => {
            return {
                field: heading,
                headerName: heading,
                // sortComparator: 
                // adjust this dynamically later?
                width: 300
            }
        });

        setColumns(columns);
    }

    const setupRowsForTable = () => {
        const rows = data && data[currentGenre].map((movie, index) => {
            return {
                id: index,
                // rating:
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