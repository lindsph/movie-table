const config = {
    headings: [
        'Title',
        'Year',
        'Rated',
        'Released',
        'Runtime',
        'Genre',
        'Director',
        'Writer',
        'Actors',
        'Plot',
        'Language',
        'Country',
        'Awards',
        // removed Poster
        // removed Ratings (array) for now since data shows up in Metascore, imdbRating/imdbVotes
        'Metascore',
        'imdbID',
        // removed Type
        // removed DVD
        // removed BoxOffice
        'Production',
        // removed Website
        // removed Response

    ],
    sortModel: [{
        field: 'Released',
        sort: "date"
    }]
}

export default config;