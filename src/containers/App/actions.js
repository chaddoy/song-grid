import {
	SORT_SONGS
} from './constants';

export function sortSongs ( header ) {
	return {
		type : SORT_SONGS,
    header
	};
}
