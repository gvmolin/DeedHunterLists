import * as path  from '../programs/paths.js' 

window.addEventListener('load', async()=>{

    const guide = await fetch(path.getGuide)
    const guideJson = guide.json()
    console.log(guideJson)
})