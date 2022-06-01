import { useState, useEffect } from 'react';
import * as React from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { AppBar } from '@mui/material'
import { Toolbar}  from '@mui/material';
import { Typography } from '@mui/material';
// import { UserData } from "./FakeData";
import LineChart from "./chart/LineChart";
import TrendData from './TrendData';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

function DatesLine() {
  const trend = TrendData()
  console.log(trend.tsmcData)

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
      // _line.data.push( {x:_trenddata[i].date, y:_trenddata[i].count} )
      _line.data.push( _trenddata[i].count )
    }
  }

  if(trend.tsmcData && trend.amData && trend.asmlData && trend.sumcoData){
    setChartData(trend.tsmcData, tsmcLine)
    setChartData(trend.amData, amLine)
    setChartData(trend.asmlData, asmlLine)
    setChartData(trend.sumcoData, sumcoLine)
  }

  const now = new Date()
  const [label, setLabel] = useState([]);
  const [startDate, setStartDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7));
  const [endDate, setEndDate] = useState(now);

  function filterDate(){
    const labelTmp = [...trend.dates];
    console.log(labelTmp)

    if (labelTmp !== []) {
      console.log("startDate", moment(Date.parse(startDate)).format("YYYY-MM-DD"), " endDate", moment(Date.parse(endDate)).format("YYYY-MM-DD"))
      // const indexStartDate = dynamicLabel.indexOf( moment(Date.parse(startDate)).format("YYYY-MM-DD") )
      // const indexEndDate = dynamicLabel.indexOf( moment(Date.parse(endDate)).format("YYYY-MM-DD") )
      
      let indexStartDate = 0;
      let indexEndDate = labelTmp.length-1;
      // console.log("start: ", typeof(startDate), " labelTmp: ", typeof(labelTmp[1]))

      for (let i = 0; i < labelTmp.length; i++) {
        if (startDate == labelTmp[i]) {
          indexStartDate = i;
          break;
        } else if (startDate > labelTmp[i]) {
          indexStartDate = i+1;
          break;
        }
      }

      for (let i = labelTmp.length-1; i >= 0; i--) {
        if (endDate == labelTmp[i]) {
          indexEndDate = i;
          break;
        } else if (endDate < labelTmp[i]) {
          indexEndDate = i-1;
          break;
        }
        
      }
      console.log("startindex", indexStartDate, " endindex", indexEndDate)

      const dateRange = labelTmp.slice(indexStartDate, indexEndDate)
      console.log("dateRange", dateRange)
      setLabel(dateRange)
    }

      // console.log(dynamicLabel.indexOf("2022-05-02"))

      // const filterDate = dynamicLabel.slice(indexStartDate, indexEndDate+1)
      // setLabel(filterDate);
      // console.log("label", label)
  }

  function handelStartClick(_date){
    setStartDate(_date)
    filterDate()
  }

  function handelEndClick(_date){
    setEndDate(_date)
    filterDate()
  }

  return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NYCU Cloud Native Development Team 11
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Box marginTop={3} >
            <LineChart chartData={ { labels: ['2022-05-20', '2022-05-21', '2022-05-26'], datasets: [tsmcLine, asmlLine, sumcoLine, amLine] } } />
          </Box>

          <Box marginTop={3}>
            {/* <input type="date" id="startdate" defaultValue={startDate} value={startDate} onChange={(e)=>{handelStartClick(e.target.value)}} />
            <input type="date" id="enddate" defaultValue={endDate} value={endDate} onChange={(e)=>{handelEndClick(e.target.value)}} /> */}
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => handelStartClick(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => handelEndClick(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
            /> */}
          </Box>
        </Container>
      </Box>
  );
}

export default DatesLine;
