import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VendorTable from './VendorTable'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.background.paper,
  },
}));

export default function VendorOrderTabs({tabPage, setTabPage, orders, refreshTable}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(tabPage);

  let preparing = [];
  let ready = [];
  let completed = [];
  
  if (orders && orders.length) {
    orders.map(order => {
      // display all the outstanding order items
      if (order.status && (order.status === 'outstanding')) {
        preparing.push(order)
      } else if (order.status && (order.status === 'ready')) {
        ready.push(order)
      } else if (order.status && (order.status === 'completed')) {
        completed.push(order)
      }
    })
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Preparing" {...a11yProps(0)} />
          <Tab label="Ready" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
        </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <VendorTable orderList={preparing} setTabPage={setTabPage} refreshTable={refreshTable} status={"ready"} index={0} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <VendorTable orderList={ready} setTabPage={setTabPage} refreshTable={refreshTable} status={"completed"} index={1} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <VendorTable orderList={completed} setTabPage={setTabPage} refreshTable={refreshTable} status={""} index={3} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}