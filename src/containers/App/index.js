import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';
import { Table } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

import { sortSongs } from './actions';
import { selectTableHeaders, selectSongs, selectIncrementSort } from './selectors';

const HeaderWrapper = styled.div`
  background-color : #435052;
`;

const Header = styled.div`
  margin: auto;
  width: 1024px;
  padding: 10px;
  color: #485658;
`;

const Content = styled.div`
  margin: auto;
  width: 1024px;
  padding: 20px 10px;
`;

const TableWrapper = styled.div`
  overflow: scroll;
  height: 600px;
  padding: 10px;
`

class App extends Component {
  render() {
    return (
      <div>
        <HeaderWrapper>
          <Header>
            <h1>song-grid</h1>
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
  isIncrementSort : PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector( {
  tableHeaders    : selectTableHeaders(),
  songs           : selectSongs(),
  isIncrementSort : selectIncrementSort()
} );


function mapDispatchToProps ( dispatch ) {
  return {
    handleSort : ( header ) => dispatch( sortSongs( header ) )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
