import * as path from './paths.js'

export function createOption(inner, value, container) {
   var opt = document.createElement("option")
   opt.innerHTML = inner
   opt.value = value
   container.append(opt)
}

export async function postData(json, path) {
   try {
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(json)
      }
      const rawResponse = await fetch(path, options)
      const responseJson = await rawResponse.json();
      return responseJson
   }
   catch (error) {
      console.log(error)
   }
}

export function showStateQuery(container) {
   container.innerHTML = ''
   const div = document.createElement('div')
   const str = `
        <div>
            <label for="">State:</label>
            <select name="" id="select-state">
                
            </select>
        </div>
        <div>
            <label for="">County:</label>
            <select name="" id="select-county">
                
            </select>
        </div>
        <button id="searchbystate-button">GO!</button>
    `
   div.innerHTML = str
   container.append(div)

   document.querySelector("#search-container-hr").style.display = 'block'
}

export async function loadStates() {
   const container = document.querySelector('#select-state');
   const result = await fetch(path.getStates)
   const json = await result.json()
   container.innerHTML = ""
   for (let i = 0; i < json.features.length; i++) {
      var statesIndex = json.features[i]
      manager.createOption(statesIndex.properties.NAME, statesIndex.properties.STATE, container)
   }
}

/*export function byStateJson(){
    var state = document.querySelector('#select-state')
    state = state.options[state.selectedIndex].innerHTML
    const county = document.querySelector('#select-county').value

    const str = `{"state":"${state}", "county":"${county}"}`
    const json = JSON.parse(str)
    //console.log(json)
    return json
}*/

export function listJson(state, list, otc) {
   const str = `{
         "state":"${state}",
         "list":"${list}",
         "otc":"${otc}"
      }`

   const json = JSON.parse(str)
   return json
}

export function stateJson(state, id) {
   const str = `{
      "state":"${state}",
      "id":"${id}",
      "stateNumber":"${id}"
   }`
   const json = JSON.parse(str)
   return json
}

export async function filterByState(extJson, intJson) { //---> extJson = The json that API send me, intJson = the search criteria on user page
   var arr = []

   extJson.forEach(element => {
      if (element.state !== null) {
         const toUpperCase1 = element.state.toUpperCase()
         if (intJson.state == element.state) {
            arr.push(element)
         } else if (intJson.state == toUpperCase1) {
            arr.push(element)
         }
      }
   })

   return arr
}

export function filterByCounty(extJson, intJson) { //---> extJson = The json that API send me, intJson = the search criteria on user page
   var arr = []

   const countyStr = `${intJson.county} County`
   for (let i = 0; i < extJson.length; i++) {
      var resIndex = extJson[i]
      if (intJson.state == resIndex.state && countyStr == resIndex.county_name) {
         arr.push(resIndex)
      }
   }
   return arr
}

export function renderResult(element, container) {
   const div = document.createElement('tr')
   //div.classList.add('result-item')
   const str = `
         <td data-label="Estado" >${element.state}</td>
         <td data-label="Condado" >${element.county_name}</td>
         <td data-label="Data" >${ddmmyyyyFormat(element.sale_date)}</td>
         <td data-label="Propriedades" >${element.OTC_1}</td>
         <td data-label="Procedimentos" >${element.bid_procedures}</td>
         <td data-label="Tipo" >${element.auction_type}</td>
         <td data-label="Arquivo" >
           <button id="${element.auto_id}" value="${element.auto_id}">Download</button>
           <div style="display:none;">${element.auto_id}</div>
         </td> 
   `
   div.innerHTML = str
   container.append(div)
   div.children[0].addEventListener('click', () => {
      accordion(div.children[0])
   })

   document.getElementById(element.auto_id).addEventListener('click', async () => {
      const sessionId = await fetch('/sessionID')
      const json = await sessionId.json()

      const url = `https://www.taxsaleresources.com/DHHandlerinterim.aspx?UserID=${json.sessionId}&UserName=dhapi&Password=7jOsbudk[!&file_id=${element.auto_id}&file_type=raw_list`
      window.open(url, '_blank');
   })
}

function ddmmyyyyFormat(dateCont) {
   const date = new Date(dateCont)
   const day = ("" + date.getDate()).slice(-2)
   const month = ("" + (date.getMonth() + 1)).slice(-2)
   const ddmmyyyy = `${day}/${month}/${date.getFullYear()}`

   return ddmmyyyy
}

export function renderStateInfo(element, container, countyList, calendarInfo) {
   const div = document.createElement('div')
   const str = `
      <div id="result-state">

      <h3 class="result-state__title">
        ${element.state}
      </h3>
         <div id="result-state__details">
             <div class="stateDetails-container">

               <div class="detailsContainer_item"> 

                  <div class="detailsContainer_item_column">

                     <span class="itemColumn-title">
                        Endereço:
                     </span>

                     <span class="itemColumn-result">
                        ${element.info.address}
                     </span>

                  </div>

                  <div class="detailsContainer_item_column"> 

                     <span class="itemColumn-title">
                        Website: 
                     </span>

                     <span class="itemColumn-result">
                        <a href="${element.info.site}">
                           WebSite
                        </a>
                     </span>
                  </div>

                </div>

                <div class="detailsContainer_item">

                  <div class="detailsContainer_item_column"> 
                     <span class="itemColumn-title">
                        Telefone:
                     </span>

                     <span class="itemColumn-result">
                        ${element.info.phone}
                     </span>
                  </div>

                  <div class="detailsContainer_item_column"> 

                     <span class="itemColumn-title">
                        Site de informações:
                     </span>

                     <span class="itemColumn-result"> 
                        <a href="${element.info.infoSite}">
                           WebSite
                        </a>
                     </span>

                  </div>

                </div>

                <div class="detailsContainer_item">

                  <div class="detailsContainer_item_column"> 

                     <span class="itemColumn-title">
                        Categoria
                     </span>

                     <span class="itemColumn-result">
                        ${element.info.category}
                     </span>

                  </div>

                  <div class="detailsContainer_item_column"> 

                     <span class="itemColumn-title">
                        Site de associação de condados:
                     </span>

                     <span class="itemColumn-result">
                        <a href="${element.info.appraisalDistrictWebsite}">
                           WebSite
                        </a>
                     </span>
                  </div>

                </div>

                <div class="detailsContainer_item">
                  <div class="detailsContainer_item_column">
                     <span class="itemColumn-title">
                        Tipo de leilão:
                     </span>

                     <span class="itemColumn-result">
                        ${element.info.auctionType}
                     </span>
                  </div>

                  <div class="detailsContainer_item_column">

                     <span class="itemColumn-title">
                        Taxa de Juros:
                     </span>

                     <span class="itemColumn-result">
                        ${element.info.interestRate}
                     </span>

                  </div>

                </div>

                <div class="detailsContainer_item"> 
                  <div class="detailsContainer_item_column">

                     <span class="itemColumn-title">
                        Número de condados:
                     </span>

                     <span class="itemColumn-result">
                        ${element.info.counties}
                     </span>
                  </div>

                  <div class="detailsContainer_item_column">

                     <span class="itemColumn-title">
                        Prazo de resgate:
                     </span>

                     <span class="itemColumn-result">
                        ${element.info.redemptionPeriod}
                     </span>

                  </div>

                </div>
             </div>

             </div>
         </div>
      </div>

      <div id="result_coountyAndCalendar">
          <div class="result_county__container">              
           <h3 class="result_county__title">
             Lista de condados
           </h3>

            <ul id="mappage_countylist">
               
            </ul>
          </div>
          
          <div class="result_county__container">              
             <h3 class="result_county__title">
               Proximos leiloes
             </h3>

            <ul id="mappage_calendar">
               
            </ul>
          </div>
      </div>

      <div id="result_coountyAndCalendar">
          <div class="result_county__container result_guia__container">              
           <h3 class="result_county__title">
             Guia
           </h3>

            <ul id="">
               <li>${element.info.details}</li>
            </ul>
          </div>
          
          
      </div>
    `
   div.innerHTML = str

   container.append(div)

   const countyListContainer = container.querySelector('#mappage_countylist')
   countyListContainer.innerHTML = ''
   countyList.data.forEach(element => createLi(element.name, countyListContainer, 'result_county__item', ''));

   const calendarContainer = container.querySelector('#mappage_calendar')
   calendarContainer.innerHTML = ''
   if (calendarInfo.length > 0) {
      calendarInfo.forEach(element => {
         const dateStr = ddmmyyyyFormat(element.sale_date)
         createLi(dateStr, calendarContainer, 'result_county__item', `- ${element.county_name}`)
      })
   } else {
      createLi('Sem resultados', calendarContainer, 'result_county__item', '')
   }

}

export function createLi(element, container, className, element2) {
   const li = document.createElement('li')
   li.classList.add(className)
   li.innerHTML = `${element} ${element2}`
   container.append(li)
}

export function renderGuideItem(element, container) {
   const div = document.createElement('div')
   div.classList.add('guide')

   const str = `
      <div class="guide-header">
         <h1>${element.state}</h1>
      </div>

      <div class="guide-content">
        <div class="guide-content__item">
          <p>
            ${element.info.details}
          </p>
        </div>
      </div>
   
   `
   div.innerHTML = str
   container.append(div)
}

export function renderAttorneyItem(element, container) {
   const div = document.createElement('div')
   div.classList.add('guide')

   const str = `
      <div class="guide-header">
         <h1>${element.name}</h1>
      </div>

      <div class="guide-content">
        <div class="attorneys-content__item">
            <h2>${element.primary_contact}</h2>
        </div>
        <div class="attorneys-content__item">
            <h2>Endereço:</h2><h3> ${element.address}</h3>
        </div>
        <div class="attorneys-content__item">
            <h2>Telefone: </h2><h3>${element.phone}</h3>
        </div>
        <div class="attorneys-content__item">
            <h2>Fax: </h2><h3>${element.fax}</h3>
        </div>
        <div class="attorneys-content__item">
            <h2>Email: </h2><h3>${element.email}</h3>
        </div>
        <div class="attorneys-content__item">
            <h2>Website: </h2><h3>${element.website}</h3>
        </div>
        <div class="attorneys-content__item">
            <h2>Sobre: </h2><h3>${element.about}</h3>
        </div>
      </div>
   
   `
   div.innerHTML = str
   container.append(div)
}

export function renderWiki(element, container, text) {
   const url = 'https://pt.wikipedia.org/wiki/'
   let path
   if(element.state.includes(' ')){
      path = element.state.replace(/ /g, '_')
   }else{
      path = element.state
   } 
   const fullUrl = `${url}${path}`


   const div = document.createElement('div')
   const str = `
      
      <div id="result-state">
      <h3 class="result-state__title">
        ${element.state}
      </h3>
         <div id="result-state__details">
             <div class="stateDetails-container">

               <div class="detailsContainer_item"> 

                  <div class="detailsContainer_item_column">

                     <span class="itemColumn-title">
                        Lema:
                     </span>

                     <span class="itemColumn-result">
                        ${element.lema}
                     </span>

                  </div>

                  <div class="detailsContainer_item_column"> 

                     <span class="itemColumn-title">
                        Apelido: 
                     </span>

                     <span class="itemColumn-result">
                        ${element.nick}
                     </span>
                  </div>

                </div>

                <div class="detailsContainer_item">

                  <div class="detailsContainer_item_column"> 
                     <span class="itemColumn-title">
                        Capital:
                     </span>

                     <span class="itemColumn-result">
                        ${element.capital}
                     </span>
                  </div>

                  <div class="detailsContainer_item_column"> 

                     <span class="itemColumn-title">
                        Maior Cidade:
                     </span>

                     <span class="itemColumn-result"> 
                        ${element.biggerCity}
                     </span>

                  </div>

                </div>

                <div class="detailsContainer_item">

                  <div class="detailsContainer_item_column"> 

                     <span class="itemColumn-title">
                        Área
                     </span>

                     <span class="itemColumn-result">
                        ${element.area} Km²
                     </span>

                  </div>

                  


                  <div class="detailsContainer_item_column"> 

                     <span class="itemColumn-title">
                        Densidade Populacional
                     </span>

                     <span class="itemColumn-result">
                        ${element.density} habitantes por Km²
                     </span>
                  </div>

                </div>

                <div class="detailsContainer_item">
                  <div class="detailsContainer_item_column">
                     <span class="itemColumn-title">
                        PIB
                     </span>

                     <span class="itemColumn-result">
                        ${element.pib} de Dólares
                     </span>
                  </div>

                  <div class="detailsContainer_item_column">

                     <span class="itemColumn-title">
                        IDH:
                     </span>

                     <span class="itemColumn-result">
                        ${element.idh}
                     </span>

                  </div>

                </div>

                <div class="detailsContainer_item"> 
                  <div class="detailsContainer_item_column">

                     <span class="itemColumn-title">
                        Fuso Horario:
                     </span>

                     <span class="itemColumn-result">
                        ${element.fuso}
                     </span>
                  </div>

                  <div class="detailsContainer_item_column"> 

                     <span class="itemColumn-title">
                        População:
                     </span>

                     <span class="itemColumn-result">
                        ${element.population} habitantes
                     </span>
                  </div>
                </div>
             </div>

             </div>
         </div>
      </div>

      <div id="result-state" class="wiki_img">
         <img src="img/wiki_images/${element.state}.png" style="width:700px; align-self:center;"/>

      </div>

      <div id="result_coountyAndCalendar">
          <div class="result_county__container result_guia__container wiki_text_container">              
           <h3 class="result_county__title">
             
           </h3>

            <ul>
               <li>${text} <a href="${fullUrl}">Continuar Lendo...</a></li>
               
            </ul>
          </div>
          
          
      </div>
    `
   div.innerHTML = str

   container.innerHTML = ''
   container.append(div)
}
