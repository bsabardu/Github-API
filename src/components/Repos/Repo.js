// == Import npm
import React from 'react';
import { Card, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types';

import './styles.scss';

const Repo = ({
  name,
  owner,
  description,
  html_url: url,
}) => {
  const { login, avatar_url: imageUrl } = owner;
  return (
    <Card fluid className="repo" href={url}>
      <Image src={imageUrl} centered wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span>{login}</span>
        </Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

// On déclare le type de props attendu
Repo.propTypes = {
  name: PropTypes.string,
  owner: PropTypes.shape({
    login: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  description: PropTypes.string,
  html_url: PropTypes.string,
};

Repo.defaultProps = {
  name: 'Aucun Titre',
  owner: 'Aucun propriétaire',
  description: 'Aucune description',
  html_url: '',
};

export default Repo;
