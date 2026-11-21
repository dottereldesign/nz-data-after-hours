const indicators=[
  ["Gambled online","Reported any NZ-based or overseas online gambling in the previous 12 months."],
  ["Used an overseas site","Reported overseas online gambling in the previous 12 months. This group is included in everyone who gambled online."],
  ["Took part in gambling","Reported at least one gambling activity in the previous 12 months."],
  ["Scored above zero on the risk screen","The Problem Gambling Severity Index groups scores above zero into low, moderate and problem gambling risk. This figure combines those groups."],
  ["Reported household or wider-family harm","Reported at least one gambling-related argument, unmet need or unpaid bill, or time away from study or work in the household or wider family over the previous 12 months."]
];
choices("age",Object.keys(surveyFigures[0].groups).map(x=>x==="Total"?"All ages (15+)":x));
function drawSurvey() {
  const age=get("age").selectedIndex===0?"Total":get("age").value;
  const topic=get("topic").selectedIndex;
  const indexes=topic===0?[0,1]:[topic+1];
  const [first]=indexes;
  const percent=surveyFigures[first].groups[age][0];
  const overseas=topic===0?Math.round(surveyFigures[1].groups[age][0]):0;
  get("survey-title").textContent=["Who went online?","Who gambled?","Who was at some risk?","Whose household was affected?"][topic];
  get("dots").replaceChildren();
  for(let i=0;i<100;i++) get("dots").append(element("i",null,i<overseas?"overseas":i<Math.round(percent)?"hit":""));
  const values=get("survey-values");
  values.replaceChildren(element("p",topic===0?"Green and burgundy dots show online gambling. Burgundy marks the subset using overseas sites. Each dot represents about one in 100 people.":"Each filled dot represents about one in 100 people in the selected age group."));
  for (const index of indexes) {
    const entry=surveyFigures[index], [pct,interval]=entry.groups[age];
    const group=age==="Total"?"everyone aged 15+": "people aged "+age;
    values.append(figure(indicators[index][0],pct.toFixed(1)+"%",indicators[index][1]+" Health NZ’s weighted estimate for "+group+" is "+pct+"%, with a 95% confidence interval of "+interval+"%. The dots round this estimate to the nearest whole person in 100.",["Health NZ · indicator, question and results",entry.url],["Ministry of Health · survey methodology","https://www.health.govt.nz/monitoring-statistics/surveys/new-zealand-gambling-survey"]));
  }
}
get("topic").onchange=drawSurvey;
get("age").onchange=drawSurvey;
drawSurvey();
