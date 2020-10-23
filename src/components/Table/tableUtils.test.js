import React from 'react';
import { setupRowsForTable } from './utils';

describe('test utils', () => {

    describe('test setupRowsForTable function', () => {
        it('returns the data in the correct format', () => {
            const mockData = {
                action: [
                    {
                        "Title": "The Avengers",
                        "Year": 2012,
                        "Rated": "PG-13"
                    }
                ]
            };

            const mockCurrentGenre = "action";

            expect(setupRowsForTable(mockData, mockCurrentGenre)).toEqual([{
                "id": 0,
                "Title": "The Avengers",
                "Year": 2012,
                "Rated": "PG-13"
            }])
        });

        it('returns an empty array if the genre doesn\'t exist', () => {
            const mockData = {
                action: [
                    {
                        "Title": "The Avengers",
                        "Year": 2012,
                        "Rated": "PG-13"
                    }
                ]
            };

            const mockCurrentGenre = "romanticComedy";
            expect(setupRowsForTable(mockData, mockCurrentGenre)).toEqual([])

        })
    });
});


