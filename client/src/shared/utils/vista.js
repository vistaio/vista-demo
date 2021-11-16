
import React from 'react';
import { VistaCheck } from '@vista.io/react-vista-js';

const withVista = (userId, action, resourceType, resourceId, componentFn) => {
  if (!userId) {
    return (<React.Fragment />);
  }

  return (<VistaCheck
    // how to generate 'read tokens' https://docs.govista.io/Guides/React%20Components/Authentication
    read_tokens={{ access_token: '9ZL6LGqw2J27QrNbxE018dIM_a0iiuZOSq-BlyH4Kd1wfLVG' }}
    hostname='http://localhost:8080'
    user_id={userId}
    action={action}
    resource_type={resourceType}
    resource_id={resourceId}
    branch="test"
    handleError={(err) => console.log(err)}>
    {componentFn()}
  </VistaCheck>);
};

export default withVista;
