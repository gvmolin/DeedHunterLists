import * as path from './paths.js'

export async function loadCounties(){
    const stateNumber = document.querySelector('#select-state').value
    
    const stateStr = `
    {
        "stateNumber":"${stateNumber}"
    }
    `
    const json = JSON.parse(stateStr)
    //console.log(json)
    const container = document.querySelector('#select-county')
    container.innerHTML = ''
    createOption('all', 'all', container)
    const response = await postData(json, path.counties)
    for (var i = 0; i < response.data.length; i++) {
        var index = response.data[i]
        createOption(index.name, index.name, container)
    }  
}

export function createOption(inner, value, container){
    var opt = document.createElement("option")
    opt.innerHTML = inner
    opt.value = value
    container.append(opt)
}

export async function postData(json, path){
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch(path, options)
        const responseJson = await rawResponse.json();
        return responseJson
    }
    catch(error){
        console.log(error)
    }
}

export function showStateQuery(container){
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

export async function loadStates(){
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

export function stateJson(state){
    const str = `{"state":"${state}"}`
    const json = JSON.parse(str)
    return json
}

export function filterByState(extJson, intJson){ //---> extJson = The json that API send me, intJson = the search criteria on user page
    var arr = []
   
    //const countyStr = `${intJson.county} County`
    for (let i = 0; i < extJson.length; i++) {
        var resIndex = extJson[i]
        if(intJson.state == resIndex.state){
            arr.push(resIndex)
        } 
    }
    return arr
}

export function filterByCounty(extJson, intJson){ //---> extJson = The json that API send me, intJson = the search criteria on user page
    var arr = []
   
    const countyStr = `${intJson.county} County`
    for (let i = 0; i < extJson.length; i++) {
        var resIndex = extJson[i]
        if(intJson.state == resIndex.state && countyStr == resIndex.county_name){
            arr.push(resIndex)
        } 
    }
    return arr
}

export function renderResult(element, container){
   const div = document.createElement('tr')
   //div.classList.add('result-item')
   const str = `
         <td data-label="Estado" >${element.state}</td>
         <td data-label="Condado" >${element.county_name}</td>
         <td data-label="Data" >${ddmmyyyyFormat(element.sale_date)}</td>
         <td data-label="Propriedades" >${element.parcel_num}</td>
         <td data-label="Procedimentos" >${element.bid_procedures}</td>
         <td data-label="Tipo" >${element.auction_type}</td>
         <td data-label="Arquivo" >
           <button id="${element.auto_id}" value="${element.auto_id}">Download</button>
           <div style="display:none;">${element.auto_id}</div>
         </td> 
   `
   div.innerHTML = str
   container.append(div)
   div.children[0].addEventListener('click', ()=>{
       accordion(div.children[0])
   })

   document.getElementById(element.auto_id).addEventListener('click', ()=>{
      const url = `https://www.taxsaleresources.com/DHHandlerinterim.aspx?UserID=12345&UserName=dhapi&Password=7jOsbudk[!&file_id=${element.auto_id}&file_type=raw_list`
      window.open(url, '_blank');
   })
}

function ddmmyyyyFormat(dateCont){
    const date = new Date(dateCont)
    const day = ("" + date.getDate()).slice(-2)
    const month = ("" + (date.getMonth() + 1)).slice(-2)
    const ddmmyyyy = `${day}/${month}/${date.getFullYear()}`
    
    return ddmmyyyy
}

export function renderStateInfo(element, container){
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

<!--<div id="result_coountyAndCalendar">
    <div class="result_county__container">              
     <h3 class="result_county__title">
       Condados em Washington
     </h3>

       <span class="result_county__item">
          Adams
       </span>

       <span class="result_county__item">
          Asotin
       </span>

       <span class="result_county__item">
          Benton
       </span>

       <span class="result_county__item">
          Chelan
       </span>

       <span class="result_county__item">
          Clallam
       </span>

    </div>

    <div class="result_county__container">              
       <h3 class="result_county__title">
         Calendário
       </h3>
   
         <span class="result_county__item">
            25/01/2023
         </span>
     
         <span class="result_county__item">
            08/03/2022
         </span>
     
     
    </div>
</div>-->
    `
    div.innerHTML = str
    container.append(div)
    div.children[0].addEventListener('click', ()=>{
        accordion(div.children[0])
    })
}