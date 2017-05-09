import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';
import { Table, Icon, Grid } from 'semantic-ui-react';

import TableFilter from '../../components/TableFilter';
import { sortSongs, filterSongs } from './actions';
import { selectTableHeaders, selectSongs, selectIncrementSort } from './selectors';

const HeaderWrapper = styled.div`
  background-color : #435052;
`;

const Header = styled.div`
  margin: auto;
  width: 1024px;
  padding: 10px;
  color: white;
`;

const Content = styled.div`
  margin: auto;
  width: 1024px;
  padding: 20px 10px;
`;

const TableWrapper = styled.div`
  overflow: scroll;
  height: 600px;
`

class App extends Component {
  render() {
    return (
      <div>
        <HeaderWrapper>
          <Header>
            <Grid divided="vertically">
              <Grid.Row>
                <Grid.Column width="11" style={{ marginBottom : '0px' }}>
                  <h1>song-grid</h1>
                </Grid.Column>
                <Grid.Column width="5" style={{ marginBottom : '0px' }}>
                  <TableFilter
                    headers={this.props.tableHeaders}
                    handleFilter={this.props.onSongFilter}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Header>
        </HeaderWrapper>

        <Content>
          <TableWrapper>
            <Table collapsing>
              <Table.Header>
                <Table.Row>
                  {_.map( this.props.tableHeaders, ( header ) => (
                    <Table.HeaderCell key={header}
                      onClick={() => this.props.handleSort( header )}>
                      {header}
                      <Icon name={`caret ${this.props.isIncrementSort ? 'down' : 'up'}`} size="small" />
                    </Table.HeaderCell>
                  ) )}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {_.map( this.props.songs, ( song, index ) => (
                  <Table.Row key={index}>
                    {_.map( this.props.tableHeaders, ( header, index ) => (
                      <Table.Cell key={header}>
                        {song[ header ]}
                      </Table.Cell>
                    ) )}
                  </Table.Row>
                ) )}
                {!( this.props.songs || [] ).length ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={this.props.tableHeaders.length}
                      style={{ textAlign : 'center' }}
                    >
                      No results found.
                    </Table.Cell>
                  </Table.Row>
                ) : null}
              </Table.Body>
            </Table>
          </TableWrapper>
        </Content>
      </div>
    );
  }
}

App.propTypes = {
  tableHeaders    : PropTypes.array.isRequired,
  songs           : PropTypes.array.isRequired,
  handleSort      : PropTypes.func.isRequired,
  onSongFilter    : PropTypes.func.isRequired,
  isIncrementSort : PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector( {
  tableHeaders    : selectTableHeaders(),
  songs           : selectSongs(),
  isIncrementSort : selectIncrementSort()
} );


function mapDispatchToProps ( dispatch ) {
  return {
    handleSort   : ( header ) => dispatch( sortSongs( header ) ),
    onSongFilter : _.debounce( ( searchKey, searchText ) => dispatch( filterSongs( searchKey, searchText ) ), 200 )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
