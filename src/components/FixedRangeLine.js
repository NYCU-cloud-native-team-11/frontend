import * as React from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import LineChart from '../chart/LineChart';
import moment from 'moment';
import PropTypes from 'prop-types';

function FixedRangeLine({props}) {
  const { tsmcData, asmlData, sumcoData, amData, dates } = props.trend
  const fixedRange = props.fixedRange;

  // console.log(tsmcData)
  // console.log(asmlData)
  // console.log(amData)
  // console.log(dates)
  // console.log(fix)
  
  function oneWeekLabel() {
    const now = new Date();
    let arr = [];
    let date;
    for (let i = fixedRange; i > 0; i--) { // from -8 to -1
      date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      arr.push( moment(Date.parse(date)).format("YYYY-MM-DD") );      
    }

    return arr;
  }
  const label = oneWeekLabel();
  // console.log(label)

  let amLine = {
    label: "Applied Materials",
    data: amData?.map((item) => (item.count)),
    backgroundColor: "rgba(255, 165, 0, 1)",
    borderColor: "rgba(255, 165, 0, 1)"
  };
  let asmlLine = {
    label: "ASML",
    data: asmlData?.map((item) => (item.count)),
    backgroundColor: "rgba(60, 179, 113, 1)",
    borderColor: "rgba(60, 179, 113, 1)"
  };
  let sumcoLine = {
    label: "SUMCO",
    data: sumcoData?.map((item) => (item.count)),
    backgroundColor: "rgba(106, 90, 205, 1)",
    borderColor: "rgba(106, 90, 205, 1)"
  };
  let tsmcLine = {
    label: "TSMC",
    data: tsmcData?.map((item) => (item.count)),
    backgroundColor: "rgba(75, 192, 192, 1)",
    borderColor: "rgba(75, 192, 192, 1)"
  };

  return (
      <Box>
        <Container maxWidth="md">
          <Box marginTop={3} >
            <LineChart chartData={ { labels: label, datasets: [tsmcLine, asmlLine, sumcoLine, amLine] } } />
          </Box>
        </Container>
      </Box> 
  );
}

export default FixedRangeLine;

FixedRangeLine.prototype = {
  tsmcData: PropTypes.arrayOf(PropTypes.object),
  asmlData: PropTypes.arrayOf(PropTypes.object),
  sumcoData: PropTypes.arrayOf(PropTypes.object),
  amData: PropTypes.arrayOf(PropTypes.object),
  dates: PropTypes.arrayOf(PropTypes.string)
}

FixedRangeLine.defaultProps = {
  tsmcData: [0],
  asmlData: [0],
  sumcoData: [0],
  amData: [0],
  dates: ['']
}