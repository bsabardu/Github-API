// == Import npm
import React from 'react';
import {
  Form,
  Input,
  Segment,
  Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

// == Import
import './styles.scss';

// == Composant
const Search = ({ inputLabel, onInputChange, onSearchSubmit }) => (
  <div className="header">
    <Segment>
      <Form onSubmit={onSearchSubmit}>

        <Input type="text" fluid icon="search" iconPosition="left" placeholder="Recherchez un repository" onChange={onInputChange} value={inputLabel} />
      </Form>
    </Segment>
    <Divider hidden />
  </div>
);

Search.propTypes = {
  onSearchSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
  inputLabel: PropTypes.string,
};

Search.defaultProps = {
  onSearchSubmit: () => {},
  onInputChange: () => {},
  inputLabel: '',
};

// == Export
export default Search;
