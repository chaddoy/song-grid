import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Dropdown } from 'semantic-ui-react';

class TableFilter extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      filters    : [],
      options    : [],
      header     : 'Title',
      searchText : ''
    };

    this.renderDropdown   = this.renderDropdown.bind( this );
    this.onDropdownChange = this.onDropdownChange.bind( this );
  }

  componentWillMount () {
    this.setState( {
      options : this.props.headers.map( ( header ) => ( {
        key   : header,
        text  : header,
        value : header
      } ) )
    } );
  }

  onDropdownChange ( event, data ) {
    this.setState( {
      header : data.value
    } );
    this.props.handleFilter( data.value, this.state.searchText );
  }

  renderDropdown () {
    return (
      <Dropdown
        value={this.state.header}
        options={this.state.options}
        onChange={this.onDropdownChange}
        search
      />
    );
  }

  render () {
    return (
      <Input
        label={this.renderDropdown()}
        labelPosition="left"
        placeholder="Search a song"
        fluid
        onChange={( event, data ) => {
          this.props.handleFilter( this.state.header, data.value );
          this.setState( { searchText : data.value } );
        }}
      />
    );
  }
}

TableFilter.propTypes = {
  headers      : PropTypes.array.isRequired,
  handleFilter : PropTypes.func.isRequired
}

export default TableFilter;
