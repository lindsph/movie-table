export const setupRowsForTable = (data, currentGenre) => {
    const rows = data && data[currentGenre] && data[currentGenre].map((movie, index) => {
        return {
            // make this more unique
            id: index,
            ...movie
        }
    })
    return rows || [];
}

export const setupColsForTable = (columnHeadings) => {
    const columns = columnHeadings && columnHeadings.map(heading => {
        const colObject = {
            field: heading,
            headerName: heading,
            // adjust this dynamically later? scrollable?
            width: 300
        }

        // could also do the check alternatively outside of this function and check if the values are dates
        if (heading === "Released") {
            colObject.sortComparator = (v1, v2, row1, row2) => new Date(row1.data.Released) - new Date(row2.data.Released)
        }

        return colObject;
    });

    return columns || [];
}

