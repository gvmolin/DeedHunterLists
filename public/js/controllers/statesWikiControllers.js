import * as program from "../programs/program.js";
import * as path from "../programs/paths.js"
import * as wiki from "../programs/wikiAPI.js"
import * as filter from "../programs/filterStringProgram.js"

const selectState = document.querySelector('#select-states-wiki')

window.addEventListener('load', async () => {
    const usStates = await fetch('/getStatesPT')
    const statesJson = await usStates.json()
    const arr = new Array()

    selectState.innerHTML = ""

    for (let i = 0; i < statesJson.features.length; i++) {
        var statesIndex = statesJson.features[i]
        arr.push([statesIndex.properties.NAME, statesIndex.properties.STATE]);
    }
    arr.sort();
    for (let i = 0; i < arr.length; i++) {
        var arrIndex = arr[i]
        program.createOption(arrIndex[0], arrIndex[1], selectState)
    }
})



selectState.addEventListener('change', async()=>{
    const stateName = selectState.options[selectState.selectedIndex].innerHTML

    const text = await wiki.getText(stateName)

    const infoBoxContent = await wiki.getInfoBox(stateName)
    const obj = filter.result(infoBoxContent, stateName)

    const images = wiki.getImg(stateName)

    const container = document.querySelector('#wiki-info')
    program.renderWiki(obj, container, text)

})