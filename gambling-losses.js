// DIA nominal expenditure, NZD millions, in the same order as labels below.
const nationalSpend = {
  "2010/11": [
    448.336517,
    856.099356,
    404.477,
    272.793
  ],
  "2011/12": [
    482.662296,
    853.954456,
    418.739,
    282.951
  ],
  "2012/13": [
    489.57317,
    826.779202,
    431.824,
    294.285
  ],
  "2013/14": [
    485.655266,
    806.271431,
    463.06,
    310.171
  ],
  "2014/15": [
    527.103884,
    818.113112,
    420.377,
    325.051
  ],
  "2015/16": [
    585.621625,
    843.483162,
    437.262,
    342.291
  ],
  "2016/17": [
    571.567862,
    869.910326,
    554.651,
    337.735
  ],
  "2017/18": [
    577.899267,
    894.935995,
    560.611,
    349.868
  ],
  "2018/19": [
    615.973437,
    923.876723,
    530.267,
    331.768
  ],
  "2019/20": [
    503.516155,
    802.411541,
    630.809,
    315.105
  ],
  "2020/21": [
    558.670295,
    986.652226,
    694.452,
    384.867
  ],
  "2021/22": [
    386.955825,
    833.386895,
    653.802,
    380.201
  ],
  "2022/23": [
    604.449693,
    1070.473652,
    710.476,
    375.606336
  ],
  "2023/24": [
    592.431462,
    1036.595242,
    791.917,
    371.330719
  ],
  "2024/25": [
    545.124093,
    1015.358561,
    754.261,
    393.386981
  ]
};
const yearPicker = document.querySelector("#spend-year");
const nationalChart = document.querySelector("#spend-chart");
const labels = ["Casino gambling","Pub and club pokies","Lotto NZ","TAB racing and sports betting"];
for (const year of Object.keys(nationalSpend).reverse()) yearPicker.add(new Option(year, year));
function drawNational() {
  const amounts = nationalSpend[yearPicker.value];
  const total = amounts.reduce((sum,n) => sum + n, 0);
  document.querySelector("#spend-total").textContent = "$" + (total/1000).toFixed(2) + " billion";
  nationalChart.replaceChildren();
  for (const [i,value] of amounts.entries()) {
    const row = document.createElement("div");
    row.className = "chart-row";
    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = labels[i];
    const figure = document.createElement("strong");
    figure.textContent = "$" + Math.round(value).toLocaleString("en-NZ") + "m";
    label.append(figure);
    const track = document.createElement("div"), bar = document.createElement("div");
    track.className = "bar-track";
    bar.className = "bar-fill";
    bar.style.width = (100 * value / Math.max(...amounts)) + "%";
    track.append(bar);
    row.append(label, track);
    nationalChart.append(row);
  }
}
yearPicker.addEventListener("change",drawNational);
drawNational();
