import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import LineChart from './LineChart';
import PropTypes from 'prop-types';
import 'chartjs-adapter-moment';
import { utc } from 'moment';

function StandardQuery({props}) {
  const { tsmcData, asmlData, sumcoData, amData } = props
  // console.log("chartjs", tsmcData[0])

  const [ config, setConfig ] = useState({
    data: {
      datasets: []
    },
    options: {}
  })
  // console.log("config", config)

  useEffect(() => {
    setConfig({
      data: {
        datasets: [
          {
            label: "Applied Materials",
            data: amData?.map((item) => ({x: item.date, y: item.count})),
            backgroundColor: "rgba(255, 165, 0, 1)",
            borderColor: "rgba(255, 165, 0, 1)"
          },
          {
            label: "ASML",
            data: asmlData?.map((item) => ({x: item.date, y: item.count})),
            backgroundColor: "rgba(60, 179, 113, 1)",
            borderColor: "rgba(60, 179, 113, 1)"
          },
          {
            label: "SUMCO",
            data: sumcoData?.map((item) => ({x: item.date, y: item.count})),
            backgroundColor: "rgba(106, 90, 205, 1)",
            borderColor: "rgba(106, 90, 205, 1)"
          },
          {
            label: "TSMC",
            data: tsmcData?.map((item) => ({x: item.date, y: item.count})),
            backgroundColor: "rgba(75, 192, 192, 1)",
            borderColor: "rgba(75, 192, 192, 1)"
          }
        ]
      },
      options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                unitStepSize: 1,
                displayFormats: {
                   'hour': 'yyy-MM-DD HH:00'
                },
                // zone: utc, 
                // parser: function (utcMoment) {
                //   return moment(utcMoment).utcOffset('+0000');
                // }
              },
            }
        }
      }
    })
  }, [tsmcData, asmlData, sumcoData, amData])

  return (
      <Box>
        <Container maxWidth="lg">
          <Box marginTop={3} >
            <LineChart props={ config } />
          </Box>
        </Container>
      </Box> 
  );
}

export default StandardQuery;

StandardQuery.prototype = {
  tsmcData: PropTypes.arrayOf(PropTypes.object),
  asmlData: PropTypes.arrayOf(PropTypes.object),
  sumcoData: PropTypes.arrayOf(PropTypes.object),
  amData: PropTypes.arrayOf(PropTypes.object),
  fixedRange: PropTypes.number
}

StandardQuery.defaultProps = {
  tsmcData: [0],
  asmlData: [0],
  sumcoData: [0],
  amData: [0],
  fixedRange: 0
}