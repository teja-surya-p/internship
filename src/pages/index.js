import LineGraph from "./components/LineGraph"
import NavBar from './components/navBar';

let data = [];
function setData(dat) {
  data = [...data, ...dat];
}
let page = 1;
function setPage(pag) { page = pag }
const BKFST_API = process.env.NEXT_PUBLIC_BKFST_API;


async function getData() {
  const res = await fetch(`https://cardano-preprod.blockfrost.io/api/v0/addresses/addr_test1vqultthqh369guqcx79xamcpfzz2095auvex7j4kf9qawncv5a7j0/transactions/?order=desc&count=10&page=` + page, {
    headers: {
      Project_id: BKFST_API.toString()
    }
  })
    .then(res => (res).json())
    .catch((err) => console.log(err.message))
  const data1 = await JSON.parse(JSON.stringify(res))
  setData(data1);
  setPage(page + 1);

}

async function append() {
  const hash = data.map((d) => d.tx_hash)
  const dates = data.map((d) => convertTimestampToDate(d.block_time));
  var temp1, di5, div2, label1, label2, label3, label4, label51, label52;
  var di1, di2, di3, di4, h1, l1, l2, l3, l4, l5;

  for (let i = 0; i < 10; i++) {
    if (typeof document !== 'undefined') {
      if (data === null) {
        return <div>Loading...</div>;
      }
      temp1 = document.createElement('div');
      temp1.className = 'results';
      temp1.id = 'results' + " " + ((page - 2) * 10) + i
      temp1.innerHTML = dates[((page - 2) * 10) + i] + 'tx_hash : ' + '<br>' + hash[(((page - 2) * 10) + i)]
      temp1.addEventListener('click', show)
      const meta = await getMetaData(hash[(((page - 2) * 10) + i)])


      di1 = document.createElement('div')
      di1.className = "disAll"
      di1.id = "Ublock" + " " + ((page - 2) * 10) + i

      di2 = document.createElement('div')
      di2.className = "mSR"

      h1 = document.createElement('h1')
      h1.innerHTML = 'METADATA'

      di3 = document.createElement('div')
      di3.className = "SR"

      di4 = document.createElement('div')
      di4.className = "subSR1"

      l1 = document.createElement('label')
      l1.innerHTML = "Timestamp"
      di4.appendChild(l1)

      l2 = document.createElement('label')
      l2.innerHTML = "temperature"
      di4.appendChild(l2)

      l3 = document.createElement('label')
      l3.innerHTML = "onchain_server_sha256"
      di4.appendChild(l3)

      l4 = document.createElement('label')
      l4.innerHTML = "iot_server_sha256"
      di4.appendChild(l4)

      l5 = document.createElement('label')
      l5.innerHTML = "feta_node_id"
      di4.appendChild(l5)

      if (meta == "no Data") {
        di5 = document.createElement('div')
        di5.className = "subSR2"
        label1 = document.createElement('label')
        label1.innerHTML = "no Data "
        label2 = document.createElement('label')
        label2.innerHTML = "no Data "
        label3 = document.createElement('label')
        label3.innerHTML = "no Data "
        label4 = document.createElement('label')
        label4.innerHTML = "no Data "
        div2 = document.createElement('div')
        label51 = document.createElement('label')
        label51.innerHTML = "no Data "
        label52 = document.createElement('label')
        label52.innerHTML = "no Data "
      }
      else {
        di5 = document.createElement('div')
        di5.className = "subSR2"
        label1 = document.createElement('label')
        label1.innerHTML = meta[0].timestamp
        label2 = document.createElement('label')
        label2.innerHTML = meta[0].temperature
        label3 = document.createElement('label')
        label3.innerHTML = meta[0].onchain_server_sha256
        label4 = document.createElement('label')
        label4.innerHTML = meta[0].iot_server_sha256
        div2 = document.createElement('div')
        div2.className = 'tempp'
        label51 = document.createElement('label')
        label51.innerHTML = meta[0].feta_node_id
      }
      div2.appendChild(label51)

      di5.appendChild(label1)
      di5.appendChild(label2)
      di5.appendChild(label3)
      di5.appendChild(label4)
      di5.appendChild(div2)
      di3.appendChild(di4)
      di3.appendChild(di5)
      di2.appendChild(h1)
      di2.appendChild(di3)
      di1.appendChild(di2)



      temp1.appendChild(di1)
      document.getElementsByClassName('logData1')[0].appendChild(temp1);
    }
  }
}

async function handleScroll() {
  if (page < 50) {
    await getData()
    await append()
  }
  else {
    alert("you have viewed 500 transactions!!! Cannot view more")
  }
}

function show(e) {
  var element = e.target.id || e.srcElement;
  var res = element.split(" ");
  if (document.getElementById('Ublock' + " " + res[1]).style.display === "none") {
    document.getElementById('Ublock' + " " + res[1]).style.display = "block"
  }
  else
    document.getElementById('Ublock' + " " + res[1]).style.display = 'none'
}

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

function handle() {
  if (typeof document !== 'undefined') {
    if (document.getElementsByClassName('block')[0].style.display === "none") {
      document.getElementsByClassName('block')[0].style.display = "block"
    }
    else {
      document.getElementsByClassName('block')[0].style.display = "none"
    }
  }
}

async function getMetaData(data2) {
  const url = "https://cardano-preprod.blockfrost.io/api/v0/txs/" + data2 + "/metadata"
  const res = await fetch(url, {
    headers: {
      Project_id: BKFST_API.toString()
    }
  })
    .then(res => (res).json())
    .catch((err) => console.log(err.message))
  const Data = JSON.parse(JSON.stringify(res))
  const metadata = Data.map((Time) => Time.json_metadata)
  if (metadata[0])
    return metadata
  return "no Data"
}

export default function MyPage() {

  let lineGraphData = {
    title: 'Line Graph',
    labels: ['2/2/23', '4/2/23', '9/2/23', '13/2/23', '22/2/23', '23/2/23', '2/3/23', '3/3/23', '11/3/23'],
    values: [0, 10, -10, 30, 5, 22, 31, 29, 29,]
  }

  handleScroll()



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
        <div className='block'>
          <div className='logsDiv'>
            <div className="logData1">
            </div>
            <button id='moreButton' onClick={handleScroll}>Load More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

