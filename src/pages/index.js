import { useState, useEffect } from 'react'
import LineGraph from "./components/LineGraph"
import NavBar from './components/navBar';
import SomeRender from './components/somerender';


const MyPage = () => {
  let lineGraphData = {
    title: 'Line Graph',
    labels: ['2/2/23', '4/2/23', '9/2/23', '13/2/23', '22/2/23', '23/2/23', '2/3/23', '3/3/23', '11/3/23'],
    values: [0, 10, -10, 30, 5, 22, 31, 29, 29,]
  }
  function handle() {
    if (document.getElementsByClassName('block')[0].style.display === "none") {
      document.getElementsByClassName('block')[0].style.display = "block"
    }
    else {
      document.getElementsByClassName('block')[0].style.display = "none"
    }
  }
  function show(e) {
    var element = e.target || e.srcElement;
    if (document.getElementById('Ublock').style.display === "none") {
      document.getElementById('Ublock').style.display = "block"
      document.getElementById(element.id).appendChild(document.getElementById('Ublock'))
    }
    else {
      document.getElementById('Ublock').style.display = "none"
    }
  }
  useEffect(() => {
    async function getData() {
      const res = await fetch("https://cardano-preprod.blockfrost.io/api/v0/addresses/addr_test1vqultthqh369guqcx79xamcpfzz2095auvex7j4kf9qawncv5a7j0/transactions/?order=desc&count=40", {
        headers: {
          Project_id: "preprodbT8D6x2q3OR0EdQp3G31xrG0uX6uvMsQ"
        }
      })
        .then(res => (res).json())
        .catch((err) => console.log(err.message))
      const data1 = JSON.parse(JSON.stringify(res))
      const hash = data1.map((d) => d.tx_hash)
      function convertTimestampToDate(timestampString) {
        var timestamp = parseInt(timestampString);
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2) + " " + ("0" + day).slice(-2) + '/' + ("0" + month).slice(-2) + "/" + year + '<br>';
      }
      const dates = data1.map((d) => convertTimestampToDate(d.block_time));
      var temp1;

      // console.log(count)

        for (let i = 0 ; i < dates.length; i++) {
          if (typeof document !== 'undefined') {
            temp1 = document.createElement('div');
            temp1.className = 'results';
            temp1.id = 'results' + i
            temp1.innerHTML = dates[i] + 'tx_hash : ' + '<br>' + hash[i]
            temp1.addEventListener('click', show)
            document.getElementsByClassName('logData1')[0].appendChild(temp1);
          }
        }
    }
    getData();


  }, []);


  return (
    <div className='indexmain'>
      <NavBar />
      <div className='graph'>
        <div className="subGraph">
          <LineGraph data={lineGraphData} />
        </div>
      </div>
      <div className="logs">
        <button onClick={handle}>Logs</button>
        <SomeRender />
        <div className='block'>
          <div className='logsDiv'>
            <div className="logData1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage

async function getMetaData(data2) {
  const url = "https://cardano-preprod.blockfrost.io/api/v0/txs/" + data2 + "/metadata"
  const res = await fetch(url, {
    headers: {
      Project_id: "preprodbT8D6x2q3OR0EdQp3G31xrG0uX6uvMsQ"
    }
  })
    .then(res => (res).json())
    .catch((err) => console.log(err.message))
  const Data = JSON.parse(JSON.stringify(res))
  const metadata = Data.map((Time) => Time.json_metadata)
  return metadata
}