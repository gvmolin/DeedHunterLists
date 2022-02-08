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

export function byStateJson(){
    var state = document.querySelector('#select-state')
    state = state.options[state.selectedIndex].innerHTML
    const county = document.querySelector('#select-county').value

    const str = `{"state":"${state}", "county":"${county}"}`
    const json = JSON.parse(str)
    //console.log(json)
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
    const div = document.createElement('div')
    div.classList.add('result-item')
    const str = `
        
            <div class="principal-content">
                <div><h2>Zip code:</h2><h3>${element.zip_code}</h3></div>
            </div>
            <div style="display:none;" class="hidden-content">
                <hr>
                <div><h2>Assessor address:</h2><h3>${element.assessor_address}</h3></div>
                <div><h2>Assessor city:</h2><h3>${element.assessor_city}</h3></div>
                <div><h2>Assessor entity:</h2><h3>${element.assessor_entity}</h3></div>
                <div><h2>Assessor phone:</h2><h3>${element.assessor_phone}</h3></div>
                <div><h2>Assessor zip:</h2><h3>${element.assessor_zip}</h3></div>
                <div><h2>Auction type:</h2><h3>${element.auction_type}</h3></div>
                <div><h2>Bid procedures:</h2><h3>${element.bid_procedures}</h3></div>
                <div><h2>County city:</h2><h3>${element.county_city}</h3></div>
                <div><h2>County email:</h2><h3>${element.county_email}</h3></div>
                <div><h2>County fax:</h2><h3>${element.county_fax}</h3></div>
                <div><h2>County name:</h2><h3>${element.county_name}</h3></div>
                <div><h2>County phone:</h2><h3>${element.county_phone}</h3></div>
                <div><h2>Current treasurer:</h2><h3>${element.current_treasurer}</h3></div>
                <div><h2>Records address:</h2><h3>${element.records_address}</h3></div>
                <div><h2>Records city:</h2><h3>${element.records_city}</h3></div>
                <div><h2>Records entity:</h2><h3>${element.records_entity}</h3></div>
                <div><h2>Records phone:</h2><h3>${element.records_phone}</h3></div>
                <div><h2>Records zip:</h2><h3>${element.records_zip}</h3></div>
                <div><h2>Sale date:</h2><h3>${ddmmyyyyFormat(element.sale_date)}</h3></div>
                <div><h2>Sale end_date:</h2><h3>${ddmmyyyyFormat(element.sale_end_date)}</h3></div>
                <div><h2>Sale price:</h2><h3>${element.sale_price}</h3></div>
                <div><h2>Sale start_date:</h2><h3>${ddmmyyyyFormat(element.sale_start_date)}</h3></div>
                <div><h2>State:</h2><h3>${element.state}</h3></div>            
            </div>
         
    `
    div.innerHTML = str
    container.append(div)
    div.children[0].addEventListener('click', ()=>{
        accordion(div.children[0])
    })
}

function ddmmyyyyFormat(dateCont){
    const date = new Date(dateCont)
    const day = ("" + date.getDate()).slice(-2)
    const month = ("" + (date.getMonth() + 1)).slice(-2)
    const ddmmyyyy = `${day}/${month}/${date.getFullYear()}`
    
    return ddmmyyyy
}