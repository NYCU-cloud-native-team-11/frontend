import { useState, useEffect } from 'react';
import * as React from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { AppBar } from '@mui/material'
import { Toolbar}  from '@mui/material';
import { Typography } from '@mui/material';
// import { UserData } from "./FakeData";
import LineChart from "./Chart/LineChart";
import TrendData from './TrendData';

function App() {
  const trend = TrendData()

  let amLine = {
    label: "Applied Materials",
    data: [],
    backgroundColor: "rgba(255, 165, 0, 1)",
    borderColor: "rgba(255, 165, 0, 1)"
  };
  let asmlLine = {
    label: "ASML",
    data: [],
    backgroundColor: "rgba(60, 179, 113, 1)",
    borderColor: "rgba(60, 179, 113, 1)"
  };
  let sumcoLine = {
    label: "SUMCO",
    data: [],
    backgroundColor: "rgba(106, 90, 205, 1)",
    borderColor: "rgba(106, 90, 205, 1)"
  };
  let tsmcLine = {
    label: "TSMC",
    data: [],
    backgroundColor: "rgba(75, 192, 192, 1)",
    borderColor: "rgba(75, 192, 192, 1)"
  };

  function setChartData(_trenddata, _line){
    for (let i = 0; i < _trenddata.length; i++) {
      _line.data.push( {x:_trenddata[i].date, y:_trenddata[i].count} )
    }
  }

  if(trend.tsmcData && trend.amData && trend.asmlData && trend.sumcoData){
    setChartData(trend.tsmcData, tsmcLine)
    setChartData(trend.amData, amLine)
    setChartData(trend.asmlData, asmlLine)
    setChartData(trend.sumcoData, sumcoLine)
  }

  return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NYCU Cloud Native Development
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Box marginTop={3} >
            <LineChart chartData={ { labels: trend.label, datasets: [tsmcLine, asmlLine, sumcoLine, amLine]} } />
          </Box>
        </Container>
      </Box>
  );
}

export default App;
