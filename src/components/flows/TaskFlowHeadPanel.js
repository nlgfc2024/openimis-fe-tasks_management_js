import React from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import {
  withModulesManager,
  FormPanel,
  TextInput,
  NumberInput,
  FormattedMessage,
} from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import TaskSourcePicker from '../../pickers/TaskSourcePicker';

const styles = (theme) => ({
  tableTitle: theme.table.title,
  item: theme.paper.item,
  fullHeight: {
    height: '100%',
  },
  warning: {
    color: theme.palette.error.main,
    padding: theme.spacing(1),
  },
});

const renderHeadPanelTitle = (classes) => (
  <Grid container className={classes.tableTitle}>
    <Grid item>
      <Grid
        container
        align="center"
        justify="center"
        direction="column"
        className={classes.fullHeight}
      >
        <Grid item>
          <Typography>
            <FormattedMessage module="tasksManagement" id="taskFlow.detailsPage.headPanelTitle" />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

class TaskFlowHeadPanel extends FormPanel {
  render() {
    const {
      edited, classes, readOnly,
    } = this.props;
    const flow = { ...edited };
    const superseded = !!flow?.replacementUuid;
    return (
      <>
        {renderHeadPanelTitle(classes)}
        <Divider />
        {superseded && (
          <Typography className={classes.warning}>
            <FormattedMessage module="tasksManagement" id="taskFlow.superseded.warning" />
          </Typography>
        )}
        <Grid container className={classes.item}>
          <Grid item xs={3} className={classes.item}>
            <TextInput
              module="tasksManagement"
              label="taskFlow.code"
              readOnly={readOnly}
              value={flow?.code}
              onChange={(code) => this.updateAttribute('code', code)}
              required
            />
          </Grid>
          <Grid item xs={3} className={classes.item}>
            <TextInput
              module="tasksManagement"
              label="taskFlow.name"
              readOnly={readOnly}
              value={flow?.name}
              onChange={(name) => this.updateAttribute('name', name)}
            />
          </Grid>
          {!!flow?.uuid && (
            <>
              <Grid item xs={2} className={classes.item}>
                <NumberInput
                  module="tasksManagement"
                  label="taskFlow.version"
                  readOnly
                  value={flow?.version}
                />
              </Grid>
              <Grid item xs={2} className={classes.item}>
                <NumberInput
                  module="tasksManagement"
                  label="taskFlow.inFlightCount"
                  readOnly
                  value={flow?.inFlightCount ?? 0}
                />
              </Grid>
            </>
          )}
          <Grid item xs={6} className={classes.item}>
            <TaskSourcePicker
              readOnly={readOnly}
              value={flow?.taskSources}
              onChange={(sources) => this.updateAttribute('taskSources', sources)}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withModulesManager(injectIntl(withTheme(withStyles(styles)(TaskFlowHeadPanel))));
