import _ from 'lodash';
import { fromJS } from 'immutable';
import {
  TABLE_HEADERS,
  SONGS,
  SORT_SONGS,
  FILTER_SONGS
} from './constants';

const initialState = fromJS( {
  tableHeaders  : TABLE_HEADERS,
  allSongs      : SONGS,
  songs         : SONGS,
  incrementSort : true
} );

function AppReducer ( state = initialState, action ) {
  switch ( action.type ) {
    case SORT_SONGS:
      return state
        .set( 'incrementSort', !state.get( 'incrementSort' ) )
        .set( 'songs', state.get( 'songs' )
          .sort( ( prev, next ) => {
            const isIncrement = state.get( 'incrementSort' );
            const increment   = next.get( action.header ).toString().localeCompare( prev.get( action.header ).toString() );
            const decrement   = prev.get( action.header ).toString().localeCompare( next.get( action.header ).toString() );

            return isIncrement ? increment : decrement;
          } ) );

    case FILTER_SONGS:
      return state
        .set( 'songs', state.get( 'allSongs' )
          .filter( ( song ) => {
            return song.get( action.searchKey ).toString().toLowerCase().includes( action.searchText.toString().toLowerCase() )
          } ) );

    default:
      return state;
  }
}

export default AppReducer;
