import * as path from './paths.js'

export async function loadCounties(){
    const stateNumber = document.querySelector('#select-state').value
    
    const stateStr = `
    {
        "stateNumber":"${stateNumber}"
    }
    `
    const json = JSON.parse(stateStr)
    console.log(json)
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
        <button>GO!</button>
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