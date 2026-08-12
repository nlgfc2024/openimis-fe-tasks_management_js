import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import _debounce from 'lodash/debounce';
import { TextInput } from '@openimis/fe-core';
import {
  CONTAINS_LOOKUP, DEFAULT_DEBOUNCE_TIME, EMPTY_STRING,
} from '../../constants';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: '0 0 10px 0',
    width: '100%',
  },
  item: {
    padding: theme.spacing(1),
  },
}));

function TaskFlowsFilter({
  filters,
  onChangeFilters,
  formatMessage,
}) {
  const classes = useStyles();

  const debouncedOnChangeFilters = _debounce(onChangeFilters, DEFAULT_DEBOUNCE_TIME);

  const filterTextFieldValue = (filterName) => filters?.[filterName]?.value ?? EMPTY_STRING;

  const onChangeStringFilter = (filterName, lookup = null) => (value) => {
    debouncedOnChangeFilters([
      {
        id: filterName,
        value,
        filter: lookup ? `${filterName}_${lookup}: "${value}"` : `${filterName}: "${value}"`,
      },
    ]);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item xs={3} className={classes.item}>
        <TextInput
          module="tasksManagement"
          label={formatMessage('taskFlow.code')}
          value={filterTextFieldValue('code')}
          onChange={onChangeStringFilter('code', CONTAINS_LOOKUP)}
        />
      </Grid>
      <Grid item xs={3} className={classes.item}>
        <TextInput
          module="tasksManagement"
          label={formatMessage('taskFlow.name')}
          value={filterTextFieldValue('name')}
          onChange={onChangeStringFilter('name', CONTAINS_LOOKUP)}
        />
      </Grid>
    </Grid>
  );
}

export default TaskFlowsFilter;
