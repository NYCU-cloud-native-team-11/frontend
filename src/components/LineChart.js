import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import PropTypes from 'prop-types';

function LineChart({props}) {
  const { data, options } = props;
  return <Line data={data} options={options} />;
}

export default LineChart;


LineChart.prototype = {
  datasets: PropTypes.array,
  options: PropTypes.object
}

LineChart.defaultProps = {
  datasets: [],
  options: {}
}