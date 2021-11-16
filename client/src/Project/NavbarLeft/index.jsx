import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import api from 'shared/utils/api';
import { removeStoredAuthToken, storeAuthToken } from 'shared/utils/authToken';
import useCurrentUser from 'shared/hooks/currentUser';

import { Icon, AboutTooltip } from 'shared/components';
import withVista from 'shared/utils/vista';

import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from './Styles';

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
};

const switchUser = async (userId, history) => {
  const { authToken } = await api.get(`/getToken/${userId}`);

  removeStoredAuthToken();
  storeAuthToken(authToken);
  history.push('/');
};

const ProjectNavbarLeft = ({ issueSearchModalOpen, issueCreateModalOpen }) => {
  const history = useHistory();
  const { currentUserId } = useCurrentUser({ cachePolicy: 'no-cache' });
  console.log(currentUserId)
  return (
    <NavLeft>
      <LogoLink to="/">
        <StyledLogo color="#fff" />
      </LogoLink>

      <Item onClick={issueSearchModalOpen}>
        <Icon type="search" size={22} top={1} left={3} />
        <ItemText>Search issues</ItemText>
      </Item>

      {withVista(currentUserId, 'create', 'issues', '*', () => {
        return (
          <Item onClick={issueCreateModalOpen}>
            <Icon type="plus" size={27} />
            <ItemText>Create Issue</ItemText>
          </Item>);
      })}

      <Bottom>
        <Item onClick={() => switchUser(1, history)}>
          <Icon type="chevron-right" size={27} />
          <ItemText>Richard - Manager</ItemText>
        </Item>

        <Item onClick={() => switchUser(2, history)}>
          <Icon type="chevron-right" size={27} />
          <ItemText>Monica - Cont.</ItemText>
        </Item>

        <Item onClick={() => switchUser(3, history)}>
          <Icon type="chevron-right" size={27} />
          <ItemText>Dinesh - Engineer</ItemText>
        </Item>

        <AboutTooltip
          placement="right"
          offset={{ top: -218 }}
          renderLink={linkProps => (
            <Item {...linkProps}>
              <Icon type="help" size={25} />
              <ItemText>About</ItemText>
            </Item>
          )}
        />
      </Bottom>
    </NavLeft>
  );
};

ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;
