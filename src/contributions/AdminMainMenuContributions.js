import React from 'react';

import {
  People, AccountTree,
} from '@material-ui/icons';

import { FormattedMessage } from '@openimis/fe-core';
import {
  RIGHT_TASK_EXECUTIONER_GROUPS,
  TASK_FLOW_SEARCH,
} from '../constants';

function getAdminMainMenuContributions() {
  return [{
    text: <FormattedMessage module="tasksManagement" id="menu.taskExecutionerGroups" />,
    icon: <People />,
    route: '/tasks/groups',
    filter: (rights) => rights.includes(RIGHT_TASK_EXECUTIONER_GROUPS),
  }, {
    text: <FormattedMessage module="tasksManagement" id="menu.taskFlows" />,
    icon: <AccountTree />,
    route: '/tasks/flows',
    filter: (rights) => rights.includes(TASK_FLOW_SEARCH),
  }];
}

export default getAdminMainMenuContributions;
