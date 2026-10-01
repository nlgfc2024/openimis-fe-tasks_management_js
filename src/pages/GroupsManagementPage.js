import React from 'react';
import {
  Helmet, useTranslations, useModulesManager,
} from '@openimis/fe-core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import {
  TASK_GROUP_SEARCH,
} from '../constants';
import TaskGroupsSearcher from '../components/groups-management/TaskGroupsSearcher';

const useStyles = makeStyles((theme) => ({
  page: theme.page,
}));

function GroupsManagementPage() {
  const modulesManager = useModulesManager();
  const classes = useStyles();
  const rights = useSelector((store) => store.core.user.i_user.rights ?? []);
  const { formatMessage } = useTranslations('tasksManagement', modulesManager);

  return (
    rights.includes(TASK_GROUP_SEARCH) && (
    <div className={classes.page}>
      <Helmet title={formatMessage('groupsManagement.groupHelmet')} />
      <TaskGroupsSearcher rights={rights} />
    </div>
    )
  );
}

export default GroupsManagementPage;
