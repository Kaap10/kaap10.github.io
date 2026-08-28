"use strict";(globalThis.webpackChunkkaap10_portfolio=globalThis.webpackChunkkaap10_portfolio||[]).push([[6806],{54425(e,t,a){a.d(t,{diagram:()=>D});var i=a(77454),l=a(5637),r=a(44818),n=a(76385),o=a(31293),s=a(86827),p=a(34376),c=a(39952),d=n.UI.pie,h={sections:new Map,showData:!1,config:d},g=h.sections,u=h.showData,f=structuredClone(d),m=(0,s.K)(()=>structuredClone(f),"getConfig"),$=(0,s.K)(()=>{g=new Map,u=h.showData,(0,n.IU)()},"clear"),x=(0,s.K)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);g.has(e)||(g.set(e,t),o.R.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),w=(0,s.K)(()=>g,"getSections"),S=(0,s.K)(e=>{u=e},"setShowData"),b=(0,s.K)(()=>u,"getShowData"),k={getConfig:m,clear:$,setDiagramTitle:n.ke,getDiagramTitle:n.ab,setAccTitle:n.SV,getAccTitle:n.iN,setAccDescription:n.EI,getAccDescription:n.m7,addSection:x,getSections:w,setShowData:S,getShowData:b},y=(0,s.K)((e,t)=>{(0,i.S)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),C={parse:(0,s.K)(async e=>{let t=await (0,p.qg)("pie",e);o.R.debug(t),y(t,k)},"parse")},v=(0,s.K)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),T=(0,s.K)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return(0,c.rLf)().value(e=>e.value).sort(null)(a)},"createPieArcs"),D={parser:C,db:k,renderer:{draw:(0,s.K)((e,t,a,i)=>{o.R.debug("rendering pie chart\n"+e);let s=i.db,p=(0,n.D7)(),d=(0,r.$t)(s.getConfig(),p.pie),h=(0,l.D)(t),g=h.append("g");g.attr("transform","translate(225,225)");let{themeVariables:u}=p,[f]=(0,r.I5)(u.pieOuterStrokeWidth);f??=2;let m=d.legendPosition,$=d.textPosition,x=d.donutHole>0&&d.donutHole<=.9?d.donutHole:0,w=(0,c.JLW)().innerRadius(185*x).outerRadius(185),S=(0,c.JLW)().innerRadius(185*$).outerRadius(185*$),b=g.append("g");b.append("circle").attr("cx",0).attr("cy",0).attr("r",185+f/2).attr("class","pieOuterCircle");let k=s.getSections(),y=T(k),C=[u.pie1,u.pie2,u.pie3,u.pie4,u.pie5,u.pie6,u.pie7,u.pie8,u.pie9,u.pie10,u.pie11,u.pie12],v=0;k.forEach(e=>{v+=e});let D=y.filter(e=>"0"!==(e.data.value/v*100).toFixed(0)),K=(0,c.UMr)(C).domain([...k.keys()]);b.selectAll("mySlices").data(D).enter().append("path").attr("d",w).attr("fill",e=>K(e.data.label)).attr("class",e=>{let t="pieCircle";return"hover"===d.highlightSlice?t+=" highlightedOnHover":d.highlightSlice===e.data.label&&(t+=" highlighted"),t}),b.selectAll("mySlices").data(D).enter().append("text").text(e=>(e.data.value/v*100).toFixed(0)+"%").attr("transform",e=>"translate("+S.centroid(e)+")").style("text-anchor","middle").attr("class","slice");let A=g.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText"),R=[...k.entries()].map(([e,t])=>({label:e,value:t})),O=g.selectAll(".legend").data(R).enter().append("g").attr("class","legend");O.append("rect").attr("width",18).attr("height",18).style("fill",e=>K(e.label)).style("stroke",e=>K(e.label)),O.append("text").attr("x",22).attr("y",14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let M=Math.max(...O.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0)),z=450,W=490,F=22*R.length;switch(m){case"center":O.attr("transform",(e,t)=>"translate("+(-M/2-22)+","+(22*t-22*R.length/2)+")");break;case"top":z+=F,O.attr("transform",(e,t)=>`translate(${-M/2-22}, ${22*t-185})`),b.attr("transform",()=>`translate(0, ${F+22})`);break;case"bottom":z+=F,O.attr("transform",(e,t)=>"translate("+(-M/2-22)+","+(22*t- -207)+")");break;case"left":W+=22+M,O.attr("transform",(e,t)=>"translate(-207,"+(22*t-22*R.length/2)+")"),b.attr("transform",()=>`translate(${M+18+4}, 0)`);break;default:W+=22+M,O.attr("transform",(e,t)=>"translate(216,"+(22*t-22*R.length/2)+")")}let H=A.node()?.getBoundingClientRect().width??0,L=Math.min(0,225-H/2),I=Math.max(W,225+H/2)-L;h.attr("viewBox",`${L} 0 ${I} ${z}`),(0,n.a$)(h,z,I,d.useMaxWidth)},"draw")},styles:v}}}]);