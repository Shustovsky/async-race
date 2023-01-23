(()=>{"use strict";var e={474:(e,t,n)=>{n.r(t)},647:function(e,t){var n=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,o){function i(e){try{s(a.next(e))}catch(e){o(e)}}function c(e){try{s(a.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}s((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Api=void 0;const a="http://localhost:3000",r=a+"/garage",o=a+"/engine";t.Api=class{getCars(e,t=7){return n(this,void 0,void 0,(function*(){const n=yield fetch(`${r}?_page=${e}&_limit=${t}`);return{items:yield n.json(),count:n.headers.get("X-Total-Count")}}))}getCar(e){return n(this,void 0,void 0,(function*(){return(yield fetch(`${r}/${e}`)).json()}))}deleteCar(e){return n(this,void 0,void 0,(function*(){return(yield fetch(`${r}/${e}`,{method:"DELETE"})).json()}))}createCar(e){return n(this,void 0,void 0,(function*(){return(yield fetch(r,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json()}))}updateCar(e,t){return n(this,void 0,void 0,(function*(){return(yield fetch(`${r}/${e}`,{method:"PUT",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})).json()}))}startEngine(e){return n(this,void 0,void 0,(function*(){return(yield fetch(`${o}?id=${e}&status=started`)).json()}))}stopEngine(e){return n(this,void 0,void 0,(function*(){return(yield fetch(`${o}?id=${e}&status=started`)).json()}))}drive(e){return n(this,void 0,void 0,(function*(){const t=yield fetch(`${o}?id=${e}&status=drive`).catch();return 200!==t.status?{success:!1}:Object.assign({},yield t.json)}))}}},993:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.carModal=t.carBrand=void 0,t.carBrand=["Acura","Alfa Romeo","Alpine","Apollo","Apple","Aston Martin","Audi","Automobili Pininfarina","Bentley","BMW","Bollinger","Brilliance","Bugatti","Buick","BYD","Cadillac","Chana","Chery","Chevrolet","Chrysler","Citroen","Continental","CUPRA","Dacia","Daewoo","Daihatsu","Datsun","Detroit Electric","Dodge","DS Automobiles","FAW","Ferrari","Fiat","Fisker","Ford","Foxtron","Geely","Genesis","GMC","Great Wall","Haval","Honda","Hummer","Hyundai","Ineos","Infiniti","Iran Khodro","JAC","Jaguar","Jeep","JETOUR","KIA","Koenigsegg","Lada","Lamborghini","Lancia","Land Rover","Lexus","Lifan","Lincoln","Lordstown","Lotus","Lucid","LvChi","Lynk & Co","Maserati","Maybach","Mazda","MCLaren","Mercedes-Benz","MG","MINI","Mitsubishi","Nikola","NIO","Nissan","Opel","Pagani","Peugeot","Polestar","Porsche","Qoros","Range Rover","Ravon","Renault","Rimac","Rivian","Rolls-Royce","Saab","Saipa","SEAT","Skoda","smart","SsangYong","SSC North America","Stellantis","Subaru","Suzuki","Tata","Tesla","Torsus","Toyota","VinFast","Volkswagen","Volvo","Xpeng","Zotye"],t.carModal=["Durango","Ram","Challenger","Charger","Grand Caravan","X7","X5","X3","X6 M","X6","X1","X4","C3 Aircross","C5 Aircross","Duster","CR-V","Corolla","C4 Cactus","DS3 Crossback","C1","C3","Berlingo Multispace","DS4 Crossback","UX 250h","NX 300h","LC 500","RX 350/200t","Rapid","Largus","IS 200t","LS 500h","RX","ES 200/250/350","Hatchback","CX-5","Sedan","CX-30","CX-9","CX-3","MX-5 Roadster","Phantom","Camry","Polo","Cullinan","Ghost","Dawn","Duster","Arkana","Sandero","Logan","Trafic Fourgon","Logan MCV","Captur","Kadjar","RAV4","Rio","Creta","Solaris"]},720:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.store=void 0,t.store={cars:[],carsCount:0,carsOnPage:[],page:1,sortBy:"time",sorDirection:"az",winner:[],winnersCount:0,winnersPage:1}},489:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const a=n(458),r=n(377),o=n(183);t.App=class{constructor(){this.header=new a.Header,this.garage=new r.Garage,this.winners=new o.Winners}start(){this.header.createHeader(),this.garage.createGarage(),this.winners.createWinners()}}},377:function(e,t,n){var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,o){function i(e){try{s(a.next(e))}catch(e){o(e)}}function c(e){try{s(a.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}s((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Garage=void 0;const r=n(647),o=n(720),i=n(993);t.Garage=class{constructor(){this.api=new r.Api}createGarage(){const e=document.querySelector("header"),t=this.createMainElement();null==e||e.after(t)}createMainElement(){const e=document.createElement("main"),t=this.createContainerElement();return e.append(t),e}createContainerElement(){const e=document.createElement("div");e.className="container";const t=this.createGarageWrapper();return e.append(t),e}createGarageWrapper(){const e=document.createElement("div");e.className="garage_wrapper";const t=this.createGarageFormsWrapper(),n=this.createGarageControl();return e.append(t,n),e}createGarageFormsWrapper(){const e=document.createElement("div");e.className="garage__forms";const t=this.createGarageForm("create",this.api.createCar),n=this.createGarageForm("update",(e=>this.updateCar(e)));return e.prepend(t),e.append(n),e}createGarageForm(e,t){const n=document.createElement("form");n.className=`garage_form_${e}`;const r=document.createElement("input");r.id=`input-name_${e}`,r.className="input-name",r.type="text";const i=document.createElement("input");i.id=`input-color_${e}`,i.className="input-color",i.type="color";const c=document.createElement("button");return c.id=`btn-${e}`,c.textContent=e,c.addEventListener("click",(()=>a(this,void 0,void 0,(function*(){yield t({name:r.value,color:i.value}),yield this.api.getCars(o.store.page)})))),n.prepend(r),n.append(i),n.append(c),n}updateCar(e){return a(this,void 0,void 0,(function*(){const t=document.getElementById("btn-update"),n=Number(null==t?void 0:t.getAttribute("item-update-id"));return console.log(n),console.log(e),yield this.api.updateCar(n,e)}))}createGarageControl(){const e=document.createElement("div");e.className="garage__control";const t=this.createRaceBtn(),n=this.createResetBtn(),a=this.createGenerateBtn();return e.append(t,n,a),this.renderCars(),e}createRaceBtn(){const e=this.createBtn("race");return e.addEventListener("click",(e=>{o.store.winner=[],e.target.disabled=!0,document.getElementById("reset").disabled=!1})),e}createResetBtn(){const e=this.createBtn("reset");return e.disabled=!0,e.addEventListener("click",(e=>{e.target.disabled=!0,document.getElementById("race").disabled=!1})),e}createGenerateBtn(){const e=this.createBtn("generate");return e.addEventListener("click",(()=>a(this,void 0,void 0,(function*(){return this.generateCars().forEach((e=>a(this,void 0,void 0,(function*(){yield this.api.createCar(e)})))),yield this.api.getCars(o.store.page),this.renderCars()})))),e}generateCars(e=100){const t=new Array(e).fill(void 0);return t.forEach(((e,n)=>{t[n]={name:this.generateName(),color:this.generateColor()}})),t}generateName(){return`${i.carBrand[Math.floor(Math.random()*i.carBrand.length)]} ${i.carModal[Math.floor(Math.random()*i.carModal.length)]}`}generateColor(){return"#"+Math.random().toString(16).substr(-6)}createBtn(e){const t=document.createElement("button");return t.className="garage__control_btn",t.id=e,t.textContent=e,t}renderCars(){return a(this,void 0,void 0,(function*(){const e=yield this.api.getCars(o.store.page,7),t=document.querySelector(".garage_wrapper"),n=document.querySelector(".garage__main");n&&n.remove();const a=this.createGarageMain();a.append(this.createTitle(e)),a.append(this.createPageNumb()),null==t||t.append(a),this.addCars(e),a.append(this.createPagination())}))}createGarageMain(){const e=document.createElement("div");return e.className="garage__main",e.innerHTML="",e}createTitle(e){const t=document.createElement("h1");return t.textContent=`Garage (${e.count})`,t}createPageNumb(){const e=document.createElement("h2");return e.textContent=`Page #${o.store.page}`,e}addCars(e){const t=document.querySelector(".garage__main");e.items.forEach((e=>{const n=this.createCar(e);t.append(n)}))}createCar(e){const t=document.createElement("div");return t.className="item",t.setAttribute("item-id",`${e.id}`),t.append(this.createControlBtnWrapper(e)),t.append(this.createRoadWrapper(e)),t.append(this.createCarTrack(e)),t}createControlBtnWrapper(e){const t=document.createElement("div");return t.className="item__control",t.append(this.createControlSelectBtn(e),this.createControlRemoveBtn(e),this.createName(e)),t}createControlSelectBtn(e){const t=document.createElement("button");return t.className="btn select-btn",t.innerHTML="Select",t.addEventListener("click",(()=>{const t=document.getElementById("btn-update");null==t||t.setAttribute("item-update-id",`${e.id}`);const n=document.getElementById("input-color_update"),a=document.getElementById("input-name_update");n.value=e.color,a.value=e.name})),t}createControlRemoveBtn(e){const t=document.createElement("button");return t.className="btn remove-btn",t.innerHTML="Remove",t.addEventListener("click",(()=>a(this,void 0,void 0,(function*(){yield this.api.deleteCar(e.id||0),this.renderCars()})))),t}createName(e){const t=document.createElement("span");return t.textContent=e.name,t}createRoadWrapper(e){const t=this.createControlEngineWrapper();return t.append(this.createStartButton(e)),t.append(this.createStopButton(e)),t}createControlEngineWrapper(){const e=document.createElement("div");return e.className="item__control-engine",e}createStartButton(e){const t=document.createElement("button");return t.className="item__control-engine_start",t.id=`start-car-${e.id}`,t.innerHTML="A",t.addEventListener("click",(()=>{const n=document.getElementById(`stop-car-${e.id}`);t.disabled=!0,n.disabled=!1,this.startController(e.id||0)})),t}startController(e){}createStopButton(e){const t=document.createElement("button");return t.className="item__control-engine_start",t.id=`stop-car-${e.id}`,t.innerHTML="B",t.addEventListener("click",(()=>{document.getElementById(`start-car-${e.id}`).disabled=!1,t.disabled=!0,this.stopController(e.id||0)})),t}stopController(e){}createCarTrack(e){const t=document.createElement("div");return t.className="car-track",t.append(this.createCarBody(e)),t.append(this.createFlag()),t}createCarBody(e){const t=document.createElement("div");t.classList.add("car-body"),t.setAttribute("data-car-id",`${e.id}`);const n=this.renderCarImage(e.color);return t.innerHTML=n,t.addEventListener("transitionend",(()=>a(this,void 0,void 0,(function*(){})))),t}renderCarImage(e){return`\n       <?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"\n "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\n<svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n width="1280.000000pt" height="667.000000pt" viewBox="0 0 1280.000000 667.000000"\n preserveAspectRatio="xMidYMid meet">\n<metadata>\nCreated by potrace 1.15, written by Peter Selinger 2001-2017\n</metadata>\n<g transform="translate(0.000000,667.000000) scale(0.100000,-0.100000)"\nfill="${e}" stroke="none">\n<path d="M5385 5078 c-88 -4 -209 -12 -270 -18 -60 -5 -200 -17 -310 -25 -110\n-9 -218 -20 -240 -25 -39 -8 -260 -43 -380 -60 -146 -21 -343 -71 -403 -104\n-72 -40 -198 -88 -302 -116 -63 -17 -149 -41 -190 -55 -41 -13 -133 -40 -205\n-60 -128 -36 -492 -152 -570 -182 -22 -9 -80 -26 -130 -39 -49 -12 -117 -32\n-149 -43 -33 -12 -80 -21 -106 -21 -55 0 -161 -18 -175 -30 -6 -5 -17 -5 -25\n0 -8 6 -40 10 -71 10 -62 0 -74 8 -78 56 -2 29 32 118 49 129 5 3 79 1 166 -4\n155 -10 159 -9 181 11 33 31 28 64 -17 125 -53 70 -69 79 -174 98 -49 9 -101\n21 -115 27 -14 5 -73 16 -131 24 -58 8 -123 16 -145 19 -59 9 -105 -22 -105\n-70 0 -19 -1 -35 -2 -35 -2 -1 -39 -8 -83 -16 -44 -9 -107 -19 -140 -23 -33\n-4 -69 -12 -80 -18 -16 -9 -26 -8 -50 7 -67 41 -238 81 -449 104 -106 11 -109\n11 -139 -11 -17 -13 -34 -28 -38 -35 -13 -20 29 -66 132 -145 55 -42 99 -83\n99 -92 0 -9 -5 -45 -10 -81 -26 -168 -31 -221 -31 -304 0 -95 6 -110 82 -211\n16 -22 32 -56 35 -75 4 -31 -2 -44 -48 -104 -29 -37 -64 -83 -78 -102 -14 -18\n-52 -66 -86 -106 -142 -170 -153 -203 -134 -376 6 -56 9 -106 7 -110 -2 -4 2\n-45 9 -92 16 -102 18 -244 4 -270 -11 -20 26 -148 58 -202 28 -48 122 -80 342\n-117 30 -5 87 -18 125 -29 39 -11 88 -23 110 -26 37 -6 84 -14 210 -37 76 -14\n249 -38 358 -50 113 -13 122 -9 122 49 l0 37 45 0 c42 0 46 -2 66 -41 51 -96\n144 -209 236 -284 136 -112 206 -148 361 -187 92 -23 113 -25 221 -19 66 4\n138 11 160 15 23 5 68 15 101 21 165 32 268 84 388 199 l48 46 162 0 c89 0\n207 6 262 13 76 10 248 12 710 9 563 -3 851 -10 1645 -37 162 -6 593 -15 958\n-21 630 -10 664 -10 690 7 20 13 54 19 134 22 59 3 119 1 134 -2 17 -5 66 -46\n119 -99 140 -143 203 -179 413 -233 141 -37 278 -41 432 -15 69 11 147 28 174\n36 84 26 178 85 262 167 l80 78 89 -4 c77 -3 90 -7 96 -23 5 -15 20 -22 61\n-26 29 -4 326 -7 660 -7 482 0 639 3 760 16 207 21 368 49 422 72 46 21 86 54\n86 73 0 6 -25 34 -56 63 -52 48 -55 53 -45 79 10 25 8 31 -11 48 -13 10 -28\n18 -34 19 -6 0 -18 8 -28 18 -14 16 -15 32 -10 106 7 82 9 88 33 97 14 6 44\n26 67 45 23 19 46 34 51 34 12 0 4 291 -10 318 -8 17 -18 22 -34 19 -16 -3\n-24 2 -29 15 -3 10 -36 51 -72 91 -37 41 -74 87 -83 104 -13 24 -25 31 -58 36\n-23 3 -61 19 -88 39 -52 36 -106 63 -258 128 -55 24 -136 60 -180 81 -44 20\n-107 47 -140 60 -33 12 -69 28 -80 35 -11 8 -29 14 -40 14 -11 0 -33 7 -50 16\n-42 22 -246 89 -378 124 -62 16 -170 45 -242 65 -71 19 -141 35 -155 35 -14 0\n-54 9 -90 21 -77 24 -373 89 -410 90 -8 0 -35 7 -60 15 -94 29 -320 84 -470\n114 -58 11 -136 28 -175 38 -45 10 -119 17 -209 18 l-139 1 -34 37 c-43 47\n-81 49 -105 6 -29 -50 -51 -41 -303 130 -55 37 -120 77 -144 89 -24 13 -65 38\n-91 56 -26 18 -69 45 -96 60 -27 14 -71 40 -99 57 -27 17 -72 43 -100 58 -65\n36 -192 110 -280 164 -38 23 -90 54 -115 68 -49 27 -132 77 -192 115 -21 13\n-41 23 -44 23 -4 0 -28 13 -54 29 -81 50 -251 102 -410 125 -308 46 -569 59\n-855 44z m-3691 -530 c46 -24 48 -26 28 -37 -38 -20 -131 -5 -207 33 l-70 36\n100 -3 c84 -3 108 -8 149 -29z m-334 9 c0 -7 -6 -36 -14 -63 -8 -27 -17 -80\n-20 -119 -12 -125 -15 -134 -53 -150 -20 -8 -41 -15 -47 -15 -7 0 -23 37 -37\n83 -20 67 -30 84 -52 95 -40 19 -33 32 18 32 35 0 49 5 70 28 15 15 24 35 21\n45 -3 12 3 21 17 27 12 5 33 18 47 29 29 24 50 27 50 8z m134 -160 c36 -49 64\n-93 60 -98 -3 -5 -17 -9 -32 -9 -15 0 -52 -7 -82 -15 -30 -8 -56 -15 -57 -15\n-2 0 0 46 3 103 6 95 16 132 35 125 4 -2 37 -43 73 -91z m-652 25 c12 -16 34\n-48 48 -71 14 -23 42 -67 62 -99 21 -31 38 -60 38 -63 0 -3 -34 -9 -77 -13\n-42 -4 -90 -10 -106 -13 l-30 -6 6 109 c8 126 16 184 27 184 5 0 19 -13 32\n-28z m836 -28 c28 -18 49 -61 36 -73 -5 -5 -28 -11 -51 -14 -39 -5 -43 -3 -66\n32 -13 20 -30 47 -37 60 l-12 24 53 -7 c30 -4 64 -14 77 -22z m-660 -20 c69\n-30 95 -70 91 -142 -5 -72 -15 -68 -101 39 -107 134 -105 153 10 103z"/>\n</g>\n</svg>\n\n        `}createFlag(){const e=document.createElement("div");return e.className="flag",e.innerHTML="🏴",e}createPagination(){const e=document.createElement("div");e.className="garage__pagination";const t=document.createElement("button");t.id="pag-prev",t.textContent="Prev";const n=document.createElement("button");return n.id="pag-next",n.textContent="Next",t.addEventListener("click",(()=>a(this,void 0,void 0,(function*(){o.store.page>1&&(o.store.page-=1),yield this.api.getCars(o.store.page),this.renderCars()})))),n.addEventListener("click",(()=>a(this,void 0,void 0,(function*(){o.store.page+=1,yield this.api.getCars(o.store.page),this.renderCars()})))),e.append(t,n),e}}},458:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0,t.Header=class{createHeader(){const e=this.createHeaderElement(),t=this.createContainerElement(),n=this.createNavElement(),a=this.createButtonElement("To garage","btn-garage"),r=this.createButtonElement("To winners","btn-winners");n.prepend(a),n.append(r),t.prepend(n),e.prepend(t),document.body.prepend(e),this.attachButtonListeners(a,r),this.attachButtonListeners(r,a)}createHeaderElement(){return document.createElement("header")}createContainerElement(){const e=document.createElement("div");return e.className="container",e}createNavElement(){const e=document.createElement("nav");return e.className="nav",e}createButtonElement(e,t){const n=document.createElement("button");return n.className=t,n.innerText=e,n}attachButtonListeners(e,t){e.addEventListener("click",(()=>{this.toggleElement(".garage_wrapper"),this.toggleElement(".winners_wrapper"),e.disabled=!0,t.disabled=!1}))}toggleElement(e){const t=document.querySelector(e);null==t||t.classList.toggle("inactive")}}},183:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Winners=void 0,t.Winners=class{createWinners(){const e=document.querySelector("main > .container"),t=document.createElement("div");t.className="winners_wrapper inactive";const n=document.createElement("h2");n.className="winners_title",n.innerHTML="Winners (0)";const a=document.createElement("h4");a.className="winners_page",a.innerHTML="Page #1",t.append(n,a,this.createTable()),null==e||e.append(t)}createTable(){const e=this.createElement("table"),t=this.createTableHead();return e.append(t),e}createTableHead(){const e=this.createElement("table__head"),t=this.createElement("table_head_number","#"),n=this.createElement("table__head_car","Car"),a=this.createElement("table__head_model","Model"),r=this.createElement("table__head_wins","Wins"),o=this.createElement("table__head_time","Time");return e.append(t,n,a,r,o),e}createElement(e,t=""){const n=document.createElement("div");return n.className=e,n.innerText=t,n}}}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,n),o.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const e=n(489);n(474),(new e.App).start()})()})();