(function(t){function e(e){for(var r,a,s=e[0],u=e[1],c=e[2],l=0,d=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);p&&p(e);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,a=1;a<n.length;a++){var s=n[a];0!==o[s]&&(r=!1)}r&&(i.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},a={app:0},o={app:0},i=[];function s(t){return u.p+"js/"+({about:"about"}[t]||t)+"."+{about:"640ecd44"}[t]+".js"}function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n={about:1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise((function(e,n){for(var r="css/"+({about:"about"}[t]||t)+"."+{about:"91ca692a"}[t]+".css",o=u.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=i[s],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===r||l===o))return e()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){c=d[s],l=c.getAttribute("data-href");if(l===r||l===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var r=e&&e.target&&e.target.src||o,i=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[t],p.parentNode.removeChild(p),n(i)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[t]=0})));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var i=new Promise((function(e,n){r=o[t]=[e,n]}));e.push(r[2]=i);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=s(t);var d=new Error;c=function(e){l.onerror=l.onload=null,clearTimeout(p);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[t]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(e)},u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/SIDSDataPlatform/",u.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var p=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"0759":function(t,e,n){t.exports=n.p+"media/blue economy_1_3.03ea4a6a.mp4"},"1fab":function(t,e,n){},2512:function(t,e,n){},"36c3":function(t,e,n){"use strict";n("2512")},"527f":function(t,e,n){"use strict";n("7d74")},5364:function(t,e,n){t.exports=n.p+"img/RFSIDS.3c59c45b.png"},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"v-application v-application--is-ltr",attrs:{"data-app":"",id:"app",fluid:""}},[n("root-header"),n("v-row",{attrs:{"no-gutters":"",id:"content"}},[n("v-col",{staticClass:"menu-col",attrs:{cols:"0",md:"2"}},[n("nav-menu")],1),n("v-col",{attrs:{cols:"12",md:"10"}},[n("router-view",{staticClass:"root-router"})],1)],1),n("root-footer")],1)},o=[],i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"header"},[r("video",{staticClass:"header_video",attrs:{autoplay:"",muted:"",loop:""},domProps:{muted:!0}},[r("source",{attrs:{src:n("0759"),type:"video/mp4"}})]),t._m(0),t._m(1),t._m(2),r("img",{staticClass:"d-block d-md-none header-bar_logo-mobile",attrs:{src:n("5364"),alt:"Rising Up For Small Islands Developing States Logo"}})])},s=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"d-none d-md-block d-lg-block d-xl-block header-bar"},[r("a",{attrs:{href:"https://data.undp.org/",target:"_blank"}},[r("img",{staticClass:"header-bar_logo",attrs:{src:n("cf05"),alt:"UNDP COVID19 Data Futures Platform Logo"}})])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"header-text",attrs:{role:"main"}},[n("h1",{staticClass:"header-text_header header-text_header-big"},[t._v("Data Visualization Platform")]),n("h2",{staticClass:"header-text_header header-text_header-small"},[t._v("for the")]),n("h1",{staticClass:"header-text_header header-text_header-big"},[t._v("SMALL ISLAND DEVELOPING STATES ")]),n("hr",{staticClass:"d-none d-md-block d-lg-block d-xl-block header-text_divider"}),n("p",{staticClass:"d-none d-md-block d-lg-block d-xl-block header-text_description"},[t._v("UNDP’s integrated approach supports Small Island Developing States to accelerate transformative development based on three pillars: Climate Action, Blue Economy, and Digital Transformation. ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"header_button-down d-none d-md-block",attrs:{href:"#content"}},[n("img",{attrs:{alt:"Arrow Down Icon",src:"https://raw.githubusercontent.com/solodev/scroll-down-anchor/master/images/arrow-down-1.png"}})])}],u={name:"RootHeader"},c=u,l=(n("36c3"),n("2877")),d=Object(l["a"])(c,i,s,!1,null,"15fac761",null),p=d.exports,f=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},m=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"footer-root"},[n("p",{staticClass:"footer-root_text"},[t._v("Powered by the UNDP Data Futures Platform")])])}],g={name:"HelloWorld",props:{msg:String}},h=g,b=(n("6399"),Object(l["a"])(h,f,m,!1,null,"6b12ebaf",null)),v=b.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navigation-container"},[n("button",{staticClass:"navigation-menu-button d-md-none",on:{click:function(e){t.drawer=!t.drawer}}},[n("v-icon",{attrs:{size:"48",color:"blue darken-2"}},[t._v(" mdi-menu ")])],1),n("v-navigation-drawer",{staticClass:"navigation-menu-drawer d-md-none",attrs:{fixed:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{staticClass:"main-menu",attrs:{dense:""}},t._l(t.routes,(function(e){return n("v-list-item",{key:e.link,attrs:{to:e.link}},[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.name)}})],1)],1)})),1)],1),n("v-list",{staticClass:"main-menu d-none d-md-block",attrs:{dense:""}},t._l(t.routes,(function(e){return n("v-list-item",{key:e.link,attrs:{to:e.link}},[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.name)}})],1)],1)})),1)],1)},w=[],D=(n("b0c0"),n("4de4"),n("d3b7"),{name:"NavMenu",data:function(){return{drawer:!1}},computed:{isMobile:function(){return"xs"===this.$vuetify.breakpoint.name||"sm"===this.$vuetify.breakpoint.name},routes:function(){return this.$router.options.routes.filter((function(t){return"*"!==t.path}))}},props:{msg:String}}),S=D,C=(n("527f"),n("6544")),x=n.n(C),k=n("132d"),_=n("8860"),I=n("da13"),R=n("5d23"),j=n("f774"),A=Object(l["a"])(S,y,w,!1,null,"02bf1144",null),O=A.exports;x()(A,{VIcon:k["a"],VList:_["a"],VListItem:I["a"],VListItemContent:R["a"],VListItemTitle:R["c"],VNavigationDrawer:j["a"]});var P={name:"Root",components:{RootHeader:p,RootFooter:v,NavMenu:O}},M=P,E=(n("034f"),n("62ad")),L=n("a523"),F=n("0fd9"),q=Object(l["a"])(M,a,o,!1,null,null,null),N=q.exports;x()(q,{VCol:E["a"],VContainer:L["a"],VRow:F["a"]});var V=n("1da1"),K=(n("96cf"),n("3ca3"),n("ddb0"),n("ac1f"),n("1276"),n("8c4f")),T=n("2f62"),U=(n("caad"),n("2532"),n("d81d"),n("7db0"),n("bc3a")),$=n.n(U),B=n("5698"),G="https://raw.githubusercontent.com/Ben-Keller/smallislands/main/data",W="https://raw.githubusercontent.com/SIDS-Dashboard/SIDSDataPlatform/main/data",z={loadAllKeyData:H,loadMetaData:Q,loadFundingCategories:Y,loadSIDSData:tt,loadIndicatorsCategories:nt,loadIndicatorsMeta:at};function H(){return J.apply(this,arguments)}function J(){return J=Object(V["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,$.a.get("".concat(G,"/exports/allKeyData.json"));case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)}))),J.apply(this,arguments)}function Q(){return X.apply(this,arguments)}function X(){return X=Object(V["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,$.a.get("".concat(G,"/exports/keyMetadata.json"));case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)}))),X.apply(this,arguments)}function Y(){return Z.apply(this,arguments)}function Z(){return Z=Object(V["a"])(regeneratorRuntime.mark((function t(){var e,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,$.a.get("".concat(G,"/exports/fundingCategories.json"));case 2:for(r in e=t.sent,n=[],e.data)n.push(Object.assign({},e.data[r],{name:r}));return t.abrupt("return",n);case 6:case"end":return t.stop()}}),t)}))),Z.apply(this,arguments)}function tt(){return et.apply(this,arguments)}function et(){return et=Object(V["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,$.a.get("".concat(W,"/exports/sids_db.csv"));case 2:return e=t.sent,t.abrupt("return",B["b"](e.data));case 4:case"end":return t.stop()}}),t)}))),et.apply(this,arguments)}function nt(){return rt.apply(this,arguments)}function rt(){return rt=Object(V["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,$.a.get("/static/indicatorCategories.json");case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)}))),rt.apply(this,arguments)}function at(){return ot.apply(this,arguments)}function ot(){return ot=Object(V["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,$.a.get("/static/indicatorMeta.json");case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)}))),ot.apply(this,arguments)}var it={anguilla:"ai",antiguaAndBarbuda:"ag",aruba:"aw",bahamas:"bs",bahrain:"bh",barbados:"bb",belize:"bz",bermuda:"bm",britishVirginIslands:"vg",caboVerde:"cv",caymanIslands:"ky",comoros:"km",cookIslands:"ck",cuba:"cu",curacao:"cw",dominica:"dm",dominicanRepublic:"do",fiji:"fj",grenada:"gd",guineaBissau:"gw",guyana:"gy",haiti:"ht",jamaica:"jm",kiribati:"ki",kittsAndNevis:"kn",maldives:"mv",marshallIslands:"mh",mauritius:"mu",micronesia:"fm",montserrat:"ms",nauru:"nr",niue:"nu",palau:"pw",papuaNewGuinea:"pg",saintLucia:"lc",samoa:"ws",saoTomeAndPrincipe:"st",seychelles:"sc",singapore:"sg",sintMaarten:"sx",solomonIslands:"sb",stVincent:"vc",suriname:"sr",timorLeste:"tl",tokelau:"tk",tonga:"to",trinidadAndTobago:"tt",turksAndCaicos:"tc",tuvalu:"tv",vanuatu:"vu"},st=it,ut={namespaced:!0,state:{keyMetadata:null,allKeyData:null,fundingCategories:null,SIDSData:null,SIDSDataWithDonors:null,countryList:null},mutations:{setMetaData:function(t,e){t.keyMetadata=e},setKeyData:function(t,e){t.allKeyData=e},setFundingCategories:function(t,e){t.fundingCategories=e},setSIDSData:function(t,e){t.SIDSData=e},setSIDSDataWithDonors:function(t,e){t.SIDSDataWithDonors=e},setCountryList:function(t,e){t.countryList=e}},actions:{getMetaData:function(t){return Object(V["a"])(regeneratorRuntime.mark((function e(){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.state,r=t.commit,n.keyMetadata){e.next=6;break}return e.next=4,z.loadMetaData();case 4:a=e.sent,r("setMetaData",a);case 6:case"end":return e.stop()}}),e)})))()},getAllKeyData:function(t){return Object(V["a"])(regeneratorRuntime.mark((function e(){var n,r,a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.dispatch,r=t.state,a=t.commit,r.allKeyData){e.next=7;break}return e.next=4,z.loadAllKeyData();case 4:o=e.sent,a("setKeyData",o),n("generateCountryList",o);case 7:case"end":return e.stop()}}),e)})))()},setFundingCategories:function(t){return Object(V["a"])(regeneratorRuntime.mark((function e(){var n,r,a,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.state,r=t.commit,a=t.dispatch,n.fundingCategories){e.next=9;break}return e.next=4,z.loadFundingCategories();case 4:o=e.sent,i=o.filter((function(t){return n.SIDSData.some((function(e){return e.donors&&e.donors.includes(t.name)}))})),console.log(i),r("setFundingCategories",i),a("setFullDonorsInfo");case 9:case"end":return e.stop()}}),e)})))()},setSIDSData:function(t){return Object(V["a"])(regeneratorRuntime.mark((function e(){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.state,r=t.commit,n.SIDSData){e.next=7;break}return e.next=4,z.loadSIDSData();case 4:a=e.sent,console.log(a),r("setSIDSData",a);case 7:case"end":return e.stop()}}),e)})))()},generateCountryList:function(t,e){var n=t.commit,r=[];for(var a in e){var o=e[a]["Profile"];o.id=a,o.map="".concat("https://sids-dashboard.github.io/SIDSDataPlatform/maps/relief/"+o.id+"Relief.png"),o.photo="".concat("https://sids-dashboard.github.io/SIDSDataPlatform/images/countryPhotos/"+o.id+".jpg"),o.code=st[a],r.push(o)}n("setCountryList",r)},setFullDonorsInfo:function(t){var e=t.state,n=t.commit,r=e.SIDSData.map((function(t){var n;return n=t.donors?t.donors.split(";").map((function(t){var n=e.fundingCategories.find((function(e){return e.name===t}));return"undefined"===typeof n?{name:t}:n})):[],t.donors=n,t}));n("setSIDSDataWithDonors",r)}}},ct={namespaced:!0,state:{indicatorsCategories:null,indicatorsMeta:null},mutations:{setCategories:function(t,e){t.indicatorsCategories=e},setMeta:function(t,e){t.indicatorsMeta=e}},actions:{getCategories:function(t){return Object(V["a"])(regeneratorRuntime.mark((function e(){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.state,r=t.commit,n.keyMetadata){e.next=6;break}return e.next=4,z.loadIndicatorsCategories();case 4:a=e.sent,r("setCategories",a);case 6:case"end":return e.stop()}}),e)})))()},getMeta:function(t){return Object(V["a"])(regeneratorRuntime.mark((function e(){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.state,r=t.commit,n.allKeyData){e.next=6;break}return e.next=4,z.loadIndicatorsMeta();case 4:a=e.sent,r("setMeta",a);case 6:case"end":return e.stop()}}),e)})))()}}},lt={namespaced:!0,state:{activeGoal:0},mutations:{setActiveGoal:function(t,e){t.activeGoal=e-1}}};r["a"].use(T["a"]);var dt=new T["a"].Store({modules:{sids:ut,indicators:ct,goals:lt}});r["a"].use(K["a"]);var pt=[{path:"/portfolio",link:"/portfolio",name:"UNDP SIDS Portfolio",props:function(t){return{region:t.query.region||"All",year:t.query.year||"2021",fundingCategory:decodeURIComponent(t.query.fundingCategory||"All"),fundingSource:decodeURIComponent(t.query.fundingSource||"All Funding Sources")}},component:function(){return n.e("about").then(n.bind(null,"c9e5"))},beforeEnter:function(){var t=Object(V["a"])(regeneratorRuntime.mark((function t(e,n,r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,dt.dispatch("sids/getAllKeyData");case 2:return t.next=4,dt.dispatch("sids/setSIDSData");case 4:return t.next=6,dt.dispatch("sids/setFundingCategories");case 6:r();case 7:case"end":return t.stop()}}),t)})));function e(e,n,r){return t.apply(this,arguments)}return e}(),children:[{path:"samoa",name:"SAMOA",component:function(){return n.e("about").then(n.bind(null,"5a0b"))},props:function(t){return{region:t.query.region||"All",year:t.query.year||"all",fundingCategory:decodeURIComponent(t.query.fundingCategory||"All"),fundingSource:decodeURIComponent(t.query.fundingSource||"All Funding Sources")}}},{path:"sdgs",name:"SDGS",component:function(){return n.e("about").then(n.bind(null,"0b98"))},props:function(t){return{region:t.query.region||"All",year:t.query.year||"all",fundingCategory:decodeURIComponent(t.query.fundingCategory||"All"),fundingSource:decodeURIComponent(t.query.fundingSource||"All Funding Sources")}}},{path:"signature-solutions",name:"SignatureSolutions",component:function(){return n.e("about").then(n.bind(null,"cf68"))},props:function(t){return{region:t.query.region||"All",year:t.query.year||"all",fundingCategory:decodeURIComponent(t.query.fundingCategory||"All"),fundingSource:decodeURIComponent(t.query.fundingSource||"All Funding Sources")}}},{path:"*",redirect:"sdgs"},{path:"",redirect:"sdgs"}]},{path:"/development-indicators",link:"/development-indicators",name:"Development Indicators",component:function(){return n.e("about").then(n.bind(null,"59b7"))},props:function(){return{view:"indicators"}},beforeEnter:function(){var t=Object(V["a"])(regeneratorRuntime.mark((function t(e,n,r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,dt.dispatch("indicators/getCategories");case 2:return t.next=4,dt.dispatch("indicators/getMeta");case 4:r();case 5:case"end":return t.stop()}}),t)})));function e(e,n,r){return t.apply(this,arguments)}return e}()},{path:"/vulnerability",link:"/vulnerability",name:"Vulnerability",component:function(){return n.e("about").then(n.bind(null,"59b7"))},props:function(){return{view:"vulnerability"}}},{path:"/country-profiles/:country?",link:"/country-profiles",name:"Country Profiles",component:function(){return n.e("about").then(n.bind(null,"35f2"))},beforeEnter:function(){var t=Object(V["a"])(regeneratorRuntime.mark((function t(e,n,r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,dt.dispatch("sids/getMetaData");case 2:return t.next=4,dt.dispatch("sids/getAllKeyData");case 4:e.params.country||r({path:"/country-profiles/".concat(dt.state.sids.countryList[0].id)}),r();case 6:case"end":return t.stop()}}),t)})));function e(e,n,r){return t.apply(this,arguments)}return e}(),props:function(t){return{country:t.params.country||"",compare:t.query.compare&&t.query.compare.split(",")||[]}}},{path:"/geospatial-data",link:"/geospatial-data",name:"Geospatial Data",component:function(){return n.e("about").then(n.bind(null,"1f4d"))}},{path:"/about",link:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"*",redirect:"/about"}],ft=new K["a"]({mode:"history",base:"/SIDSDataPlatform/",routes:pt}),mt=n("f309");r["a"].use(mt["a"]);var gt=new mt["a"]({theme:{themes:{light:{primary:"#0969FA",secondary:"#E7F1FF",accent:"#8c9eff",error:"#b71c1c"}}}});n("52df"),n("1d15"),n("f80b");r["a"].config.productionTip=!1,new r["a"]({router:ft,store:dt,vuetify:gt,render:function(t){return t(N)}}).$mount("#app")},6399:function(t,e,n){"use strict";n("1fab")},"7d74":function(t,e,n){},"85ec":function(t,e,n){},cf05:function(t,e,n){t.exports=n.p+"img/logo.9a6ea078.png"}});
//# sourceMappingURL=app.c2bb46db.js.map