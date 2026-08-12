import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  ProgressOrError, useModulesManager, useTranslations, formatDateFromISO,
} from '@openimis/fe-core';
import { fetchTaskDecisions } from '../../actions';

const useStyles = makeStyles((theme) => ({
  paper: theme.paper.paper,
  tableTitle: theme.table.title,
  item: theme.paper.item,
}));

function TaskDecisionsPanel({
  edited, taskDecisions, fetchingTaskDecisions, errorTaskDecisions, fetchedTaskDecisions,
  submittingMutation,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations('tasksManagement', modulesManager);
  const task = { ...edited };

  useEffect(() => {
    if (task?.id && !submittingMutation) {
      dispatch(fetchTaskDecisions(modulesManager, [`taskId: "${task.id}"`, 'isDeleted: false']));
    }
  }, [task?.id, task?.businessStatus, submittingMutation]);

  const decisionUser = (decision) => [decision?.user?.username, decision?.user?.lastName]
    .filter(Boolean).join(' - ');

  const decisionStep = (decision) => (decision?.flowStep
    ? `#${decision.flowStep.order} ${decision.flowStep?.taskGroup?.code ?? ''}`
    : formatMessage('taskDecision.flatTask'));

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.tableTitle}>
        <Grid item className={classes.item}>
          <Typography>
            {formatMessage('taskDecision.panelTitle')}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <ProgressOrError progress={fetchingTaskDecisions} error={errorTaskDecisions} />
      {fetchedTaskDecisions && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{formatMessage('taskDecision.step')}</TableCell>
              <TableCell>{formatMessage('taskDecision.user')}</TableCell>
              <TableCell>{formatMessage('taskDecision.decision')}</TableCell>
              <TableCell>{formatMessage('taskDecision.recordId')}</TableCell>
              <TableCell>{formatMessage('taskDecision.date')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskDecisions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="body2">
                    {formatMessage('taskDecision.empty')}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {taskDecisions.map((decision) => (
              <TableRow key={decision.uuid}>
                <TableCell>{decisionStep(decision)}</TableCell>
                <TableCell>{decisionUser(decision)}</TableCell>
                <TableCell>{decision.decision}</TableCell>
                <TableCell>{decision.recordId}</TableCell>
                <TableCell>
                  {formatDateFromISO(modulesManager, null, decision.dateCreated)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  taskDecisions: state.tasksManagement.taskDecisions,
  fetchingTaskDecisions: state.tasksManagement.fetchingTaskDecisions,
  fetchedTaskDecisions: state.tasksManagement.fetchedTaskDecisions,
  errorTaskDecisions: state.tasksManagement.errorTaskDecisions,
  submittingMutation: state.tasksManagement.submittingMutation,
});

export default connect(mapStateToProps)(TaskDecisionsPanel);
