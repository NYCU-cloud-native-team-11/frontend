import { useState, useEffect } from 'react';
import * as React from 'react';
import './index.css';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { AppBar } from '@mui/material'
import { Toolbar}  from '@mui/material';
import { Typography } from '@mui/material';
import { Tab } from '@mui/material';
import { Tabs } from '@mui/material';
import { Paper } from '@mui/material';
// import Helmet from 'react-helmet';
import StandardQuery from './components/StandardQuery';
import CustomizedQuery from './components/CustomizedQuery';
import SevenDaysData from './API/SevenDaysData';
import ThirtyDaysData from './API/ThirtyDaysData';
import Last24Data from './API/Last24Data';

function App() {
  const sevenDaysData = SevenDaysData();
  const thirtyDaysData = ThirtyDaysData()
  const last24Data = Last24Data()
  console.log("7", sevenDaysData.tsmcData[0])
  console.log("30", thirtyDaysData.tsmcData[0])
  // console.log("24", last24Data.tsmcData[0])

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`chart-switch-tabpanel-${index}`}
        aria-labelledby={`chart-switch-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'} >{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `chart-switch-${index}`,
      'aria-controls': `chart-switch-tabpanel-${index}`,
    };
  }

  const [tabVal, setTabVal] = useState(0);

  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };

  return (
    <>
      {/* <Helmet>
        <title>Dashboard</title>
      </Helmet> */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NYCU Cloud Native Development Team 11
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 3 }}>
          <Tabs value={tabVal} onChange={handleChange} aria-label="Chart Switch" variant='fullWidth'>
            <Tab label="Last 24 Hours" {...a11yProps(0)} />
            <Tab label="Last 7 Days" {...a11yProps(1)} />
            <Tab label="Last 30 Days" {...a11yProps(2)} />
            <Tab label="Customized Time" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <Paper variant='outlined'>
          <TabPanel value={tabVal} index={0}>
            <StandardQuery props={last24Data} />
          </TabPanel>
          <TabPanel value={tabVal} index={1}>
            <StandardQuery props={sevenDaysData} />
          </TabPanel>
          <TabPanel value={tabVal} index={2}>
            <StandardQuery props={thirtyDaysData} />
          </TabPanel>
          <TabPanel value={tabVal} index={3}>
            <CustomizedQuery />
          </TabPanel>
        </Paper>

      </Container>
    </>
  );
}

export default App;
