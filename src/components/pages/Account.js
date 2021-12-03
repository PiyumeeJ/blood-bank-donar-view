import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Profile from '../Profile';
import History from '../History';
import CampDetails from '../CampDetails';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {/* <Typography>{children}</Typography> */}
          {children}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: 624,
    marginLeft: '100px',
    marginRight: '200px',
    marginTop: '30px'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 200
  },
  tab: {
      minWidth: 500,
      width: 500
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
      console.log(newValue);
    setValue(newValue);
  };

  const { token, setToken } = useState();
//   if(!token) {
//     return <Home/>
//   }

useEffect(() => {
  
}, [])

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
    
      >
        <Tab label="Profile Details" {...a11yProps(0)} />
        {/* <Tab label="Messages" {...a11yProps(1)} /> */}
        <Tab fullWidth label="Donation History" {...a11yProps(1)} />
        <Tab label="Camp Details" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Profile/>
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        Item Two
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <History/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CampDetails/>
      </TabPanel>
    </div>
  );
}
