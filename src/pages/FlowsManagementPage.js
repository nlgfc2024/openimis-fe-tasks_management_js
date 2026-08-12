import React from 'react';
import {
  Helmet, withTooltip, useTranslations, useModulesManager, useHistory,
} from '@openimis/fe-core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  TASK_FLOW_CREATE,
  TASK_FLOW_SEARCH,
  TASKS_MANAGEMENT_ROUTE_FLOWS_FLOW,
} from '../constants';
import TaskFlowsSearcher from '../components/flows/TaskFlowsSearcher';

const useStyles = makeStyles((theme) => ({
  page: theme.page,
  fab: theme.fab,
}));

function FlowsManagementPage() {
  const modulesManager = useModulesManager();
  const classes = useStyles();
  const history = useHistory();
  const rights = useSelector((store) => store.core.user.i_user.rights ?? []);
  const { formatMessage } = useTranslations('tasksManagement', modulesManager);

  const onTaskFlowAdd = () => history.push(`/${modulesManager.getRef(TASKS_MANAGEMENT_ROUTE_FLOWS_FLOW)}`);

  return (
    rights.includes(TASK_FLOW_SEARCH) && (
    <div className={classes.page}>
      <Helmet title={formatMessage('flowsManagement.pageHelmet')} />
      <TaskFlowsSearcher rights={rights} />
      {rights.includes(TASK_FLOW_CREATE)
        && withTooltip(
          <div className={classes.fab}>
            <Fab color="primary" onClick={onTaskFlowAdd}>
              <AddIcon />
            </Fab>
          </div>,
          formatMessage('createButton.tooltip'),
        )}
    </div>
    )
  );
}

export default FlowsManagementPage;
