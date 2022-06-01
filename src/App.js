import { useState, useEffect } from 'react';
import * as React from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { AppBar } from '@mui/material'
import { Toolbar}  from '@mui/material';
import { Typography } from '@mui/material';
import { Tab } from '@mui/material';
import { Tabs } from '@mui/material';
import { Paper } from '@mui/material';
// import { UserData } from "./FakeData";
import LineChart from "./chart/LineChart";
import TrendData from './TrendData';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import FixedRangeLine from './components/FixedRangeLine';
import CustomizedLine from './components/CustomizedLine';

function App() {
  const trend = TrendData()
  // console.log(trend.tsmcData)

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
      <Box>
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
              <Tab label="Today" {...a11yProps(0)} />
              <Tab label="Last 7 Days" {...a11yProps(1)} />
              <Tab label="Last 30 Days" {...a11yProps(2)} />
              <Tab label="Customized Time" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <Paper variant='outlined'>
            <TabPanel value={tabVal} index={0}>
              Today
            </TabPanel>
            <TabPanel value={tabVal} index={1}>
              <FixedRangeLine props={{trend, fixedRange: 7}} />
            </TabPanel>
            <TabPanel value={tabVal} index={2}>
              <FixedRangeLine props={{trend, fixedRange: 30}} />
            </TabPanel>
            <TabPanel value={tabVal} index={3}>
              <CustomizedLine props={trend} />
            </TabPanel>
          </Paper>

        </Container>
      </Box>
  );
}

export default App;
