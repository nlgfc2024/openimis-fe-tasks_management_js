import React from 'react';

import {
  People, AccountTree,
} from '@material-ui/icons';

import { FormattedMessage } from '@openimis/fe-core';
import {
  RIGHT_TASK_EXECUTIONER_GROUPS,
  TASK_FLOW_SEARCH,
} from '../constants';

// `id` is required: when a deployment defines a fe-core `menus` configuration,
// MainMenuContribution positions entries by id and drops any entry the config
// does not place - an entry without an id is silently invisible.
function getAdminMainMenuContributions() {
  return [{
    text: <FormattedMessage module="tasksManagement" id="menu.taskExecutionerGroups" />,
    icon: <People />,
    route: '/tasks/groups',
    filter: (rights) => rights.includes(RIGHT_TASK_EXECUTIONER_GROUPS),
    id: 'admin.taskExecutionerGroups',
  }, {
    text: <FormattedMessage module="tasksManagement" id="menu.taskFlows" />,
    icon: <AccountTree />,
    route: '/tasks/flows',
    filter: (rights) => rights.includes(TASK_FLOW_SEARCH),
    id: 'admin.taskFlows',
  }];
}

export default getAdminMainMenuContributions;
