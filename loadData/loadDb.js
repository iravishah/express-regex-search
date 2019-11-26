const { readFileSync } = require('fs');

let data = readFileSync('/home/ravs@eur.ad.sag/Ravi/personal/github/express-regex-search/loadData/city_list.csv', 'utf-8');
data = data.split('\n');
data = data.splice(1, data.length);
data = data.map((ele) => {
  ele = ele.split(',');
  return {
    sr_no: ele[0],
    town: ele[1],
    Urban_status: ele[2],
    State_code: ele[3],
    State: ele[4],
    District_code: ele[5],
    District: ele[6]
  };
});

function bulkInsert(data) {
  // code to create record in db
}

bulkInsert(data);