import { createSelector } from 'reselect';

const selectAppState = ( state ) => state.get( 'app' );

const selectTableHeaders = () => createSelector(
	selectAppState,
	( substate ) => substate.get( 'tableHeaders' ).toJS()
);

const selectSongs = () => createSelector(
	selectAppState,
	( substate ) => substate.get( 'songs' ).toJS()
);

const selectIncrementSort = () => createSelector(
	selectAppState,
	( substate ) => substate.get( 'incrementSort' )
);

export {
	selectAppState,
  selectTableHeaders,
  selectSongs,
  selectIncrementSort
}
