// == Import npm
import React from 'react';
import {
  Grid,
  Segment,
  Header,
  Icon,
  Message,
  Dimmer,
  Loader,
  Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

// == Import
import './styles.scss';

// == Import Component
import Repo from './Repo';

// == Composant
const Repos = ({
  loading, // Loading is used to tell that we have a pending request to api and to show loading
  repos, // Array of repos items
  results, // Number of api result
  inputLabel,
  init, // Init is used to set "starting" status of the repo list : without any search
  onClickSeeMore,
  loadingSeeMore, // Bool to set loading status of Button
}) => (
  <div className="repos">
    {init
    && !loading && (
      <Segment placeholder>
        <Header icon>
          <Icon name="search" />
          Vous pouvez faire une recherche via le champs ci-dessus
        </Header>
      </Segment>
    )}
    {loading
    && (
      <Segment placeholder>
        <Dimmer active inverted>
          <Loader inverted>Votre recherche est en cours</Loader>
        </Dimmer>
      </Segment>
    )}
    {repos && !!repos.length
    && !init && !loading && (
      <>
        <Message>
          <p className="repos__results"> La recherche a donné {results} résultats </p>
        </Message>
        <Grid columns={3} doubling stackable>
          {repos.map((repo) => (
            <Grid.Column>
              <Repo
                key={repo.id}
                {...repo}
              />
            </Grid.Column>
          ))}
        </Grid>
        {(results > 9) && (
        <Grid columns={1}>
          <Grid.Column textAlign="center">
            <Button loading={loadingSeeMore} onClick={onClickSeeMore}>Voir plus</Button>
          </Grid.Column>
        </Grid>
        )}
      </>
    )}
    {!init && results === 0 && (
    <Segment>
      <Header icon textAlign="center">
        <Icon name="coffee" />
        Pas de résultat pour la recherche {inputLabel}
      </Header>
    </Segment>
    )}
  </div>
);

// On déclare le type de props attendu
Repos.propTypes = {
  inputLabel: PropTypes.string,
  loading: PropTypes.bool,
  loadingSeeMore: PropTypes.bool,
  init: PropTypes.bool,
  onClickSeeMore: PropTypes.func,
  results: PropTypes.number,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

Repos.defaultProps = {
  inputLabel: '',
  loading: false,
  loadingSeeMore: false,
  init: true,
  onClickSeeMore: () => {},
  results: 0,
  repos: [],
};

// == Export
export default Repos;
