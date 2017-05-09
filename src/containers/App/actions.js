import {
	SORT_SONGS,
	FILTER_SONGS
} from './constants';

export function sortSongs ( header ) {
	return {
		type : SORT_SONGS,
    header
	};
}

export function filterSongs ( searchKey, searchText ) {
	return {
		type : FILTER_SONGS,
		searchKey,
		searchText
	}
}
