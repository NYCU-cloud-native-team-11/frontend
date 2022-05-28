// code refactoring pending

// import axios from "axios";
// import _axios from "axios"
import { useState, useEffect } from 'react';
import * as React from 'react';
import api from "./api";


function TrendData() {
  const [amData, setAmData]  = useState([]);
  const [asmlData, setAsmlData] = useState([]);
  const [sumcoData, setSumcoData] = useState([]);
  const [tsmcData, setTsmcData] = useState([]);

  const [data, setData] = useState(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/trends/");
        console.log(response.data)
        setData(response.data.data);
      } catch (error) {
        if (error.response){
          //  not in the 200 response range
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    }

    fetchData()
  });


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get("/api/trends/");
  //       console.log(response.data)
  //       setData(response.data.data);
  //     } catch (error) {
  //       if (error.response){
  //         //  not in the 200 response range
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       } else {
  //         console.log(`Error: ${error.message}`);
  //       }
  //     }
  //   }

  //   fetchData()
  // }, [])


  for (let index = 0; index < data.length; index++) {
    switch (data[index].company) {
      case "TSMC":
        tsmcData.push(data[index]);
        break;
      case "ASML":
        asmlData.push(data[index]);
        break;
      case "SUMCO":
        sumcoData.push(data[index]);
        break;
      case "Applied Materials":
        amData.push(data[index]);
        break;
      default:
        asmlData.push(data[index]);// fake intel 
        break;
    }
  }


  // data.forEach(element => {
  //   switch (element.company) {
  //     case "TSMC":
  //       setTsmcData(oldArray => [...oldArray, element]);
  //       break;
  //     case "ASML":
  //       setAsmlData(oldArray => [...oldArray, element]);
  //       break;
  //     case "Applied Materials":
  //       setAmData(oldArray => [...oldArray, element]);
  //       break;
  //     case "SUMCO":
  //       setSumcoData(oldArray => [...oldArray, element]);
  //       break;
  //     case "Intel":// fake
  //       setSumcoData(oldArray => [...oldArray, element]);
  //       break;
  //     default:
  //       break;
  //   }
  // });

  return { tsmcData, asmlData, amData, sumcoData }
}

export default TrendData;

// const axios = (baseURL) => {
//     //建立一個自定義的axios
//     const instance = _axios.create({
//             baseURL: baseURL || 'http://localhost:3003', //JSON-Server端口位置
//             timeout: 1000,
//         });

//      return instance;
// }

// export {axios};
// export default axios();




// function TrendData(){
//   TrendData = [];
//   axios({
//     method: 'get',
//     baseURL: 'https://cloud-11-backend.herokuapp.com',
//     url: '/api/trends/',
//     'Content-Type': 'application/json',
//   })
//     .then((result) => { console.log(result.data) })
//     .catch((err) => { console.error(err) })
// }

// export default TrendData;


// function TrendData() {
//   // create a promise for the axios request
//   const promise = axios.get(url)

//   // using .then, create a new promise which extracts the data
//   const dataPromise = promise.then((response) => response.data)

//   // return it
//   return dataPromise
// }
// now we can use that data from the outside!
// TrendData()
//   .then(data => {
//       response.json({ message: 'Request received!', data })
//   })
//   .catch(err => console.log(err))



// setChartData({
//   datasets:[
//     {
//       label: "TSMC",
//       data: tsmcData.map((data) => data.count),
//       backgroundColor: "rgba(75, 192, 192, 1)",

//     },
//     {
//       label: "ASML",
//       data: asmlData.map((data) => data.count),
//       backgroundColor: "rgba(60, 179, 113, 1)",

//     },
//     {
//       label: "SUMCO",
//       data: tsmcData.map((data) => data.count),
//       backgroundColor: "rgba(106, 90, 205, 1)",

//     },
//     {
//       label: "Applied Materials",
//       data: tsmcData.map((data) => data.count),
//       backgroundColor: "rgba(255, 165, 0, 1)",

//     },
//   ]
// })