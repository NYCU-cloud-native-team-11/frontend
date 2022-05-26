export const UserData = [
  {
    id: 1,
    year: 2016,
    company: "TSMC",
    count: 823,

  },
  {
    id: 2,
    year: 2017,
    company: "TSMC",
    count: 345,
  },
  {
    id: 3,
    year: 2018,
    company: "TSMC",
    count: 555,
  },
  {
    id: 4,
    year: 2019,
    company: "TSMC",
    count: 4555,
  },
  {
    id: 5,
    year: 2020,
    company: "TSMC",
    count: 234,
  },
  {
    id: 6,
    year: 2016,
    company: "ASML",
    count: 883,

  },
  {
    id: 7,
    year: 2017,
    company: "ASML",
    count: 3465,
  },
  {
    id: 8,
    year: 2018,
    company: "ASML",
    count: 333,
  },
  {
    id: 9,
    year: 2019,
    company: "ASML",
    count: 555,
  },
  {
    id: 10,
    year: 2020,
    company: "ASML",
    count: 2341,
  },
];

let tsmcData = [];
let asmlData = [];
console.log("UserData: ", UserData)

for (let index = 0; index < UserData.length; index++) {
  switch (UserData[index].company) {
    case "TSMC":
      tsmcData.push(UserData[index]);
      break;
    case "ASML":
      asmlData.push(UserData[index]);
      break;
  
    default:
      break;
  }
}
