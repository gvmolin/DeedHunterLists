export const searchStr = (str, search) => {
    const arrLines = str.split(/\n/)
    let line
    arrLines.forEach(elem => {
        if (elem.includes(`${search}=`) == true) {
            line = elem
        } else if (elem.includes(`${search} `) == true) {
            line = elem
        } else if (elem.includes(`${search.substring(0, search.length - 1)} `)) {
            line = elem
        }
    })

    const lineArr = line.split('=')
    return lineArr[lineArr.length - 1]
}

export const result = (str, stateName) => {
    //NUMBER BASED INFOS ------
    let population = searchStr(str, '|população')
    let area = searchStr(str, '|área')
    let density = searchStr(str, '|densidade')
    let idh = searchStr(str, '|idh')

    let pib = searchStr(str, '|pib')
    pib = pibFormat(pib)


    //STRING BASED INFOS ------
    let capital = searchStr(str, '|capital')
    capital = capitalFormat(capital)

    let lema = searchStr(str, '|lema')
    if (!~lema.indexOf('mdy-all')) {
        lema = lemaFormat(lema)
    } else {
        lema = ''
    }

    let nickname = searchStr(str, '|apelido')
    nickname = nicknameFormat(nickname)

    let maiorCidade = searchStr(str, '|maiorcidade')
    maiorCidade = biggerCityFormat(maiorCidade)

    let fuso = searchStr(str, '|fuso_horário')
    fuso = fusoFormat(fuso)


    return {
        state: `${stateName}`, //
        population: `${population}`,//
        capital: `${capital}`,//
        area: `${area}`,//
        density: `${density}`,//
        idh: `${idh}`,//
        lema: `${lema}`, //
        nick: `${nickname}`, //
        biggerCity: `${maiorCidade}`,//
        pib: `${pib}`,//
        fuso: `${fuso}`,//
    }
}


////////////////
const lemaFormat = (lema) => {
    const arr = lema.split(/:/)
    let str = arr[1].substring(0, arr[1].length - 1);
    if (~!!str.indexOf('}')) {
        const arr2 = str.split(/\)/)
        str = arr2[0]
    } else {}
    return str
}

const pibFormat = (pib) => {
    const arr = pib.split('|')

    const valor = arr[3]
    const medida = arr[4].replace(/}/g, '');

    const str = `${valor} ${medida}`
    return str
}

const capitalFormat = (capital) => {
    const arr = capital.split('|');
    let str;
    if (arr.length === 1) {
        str = arr[0].replace(/\[/g, '');
        str = str.replace(/\]/g, '');
    } else if (arr.length === 2) {
        str = arr[1].replace(/\]/g, '');
    }

    if(!!~str.indexOf('}')){//se o resultado AINDA estiver errado a função nao retornará nada
        str = ''
    }
    return str
}

const biggerCityFormat = (biggerCity) => {
    let str
    if (biggerCity.includes('|')) {
        const arr = biggerCity.split('|')
        str = arr[1].replace(/\]/g, '');
    } else if (biggerCity.includes(']')) {
        str = biggerCity.replace(/]/g, '')
        str = str.replace(/\[/g, '')
    } else {
        str = biggerCity
    }

    if (!!~biggerCity.indexOf('&')) { //se o resultado AINDA assim possuir residuos, a função tratará
        const arr = biggerCity.split('&')
        const otherArr = arr[0].split(/\(/)
        str = otherArr[0].replace(/\[/g, '')
    }
    return str
}

const fusoFormat = (fuso) => {
    let str = fuso.replace(/\\/g, ' ')
    str = str.replace(/\[/g, '')
    str = str.replace(/]/g, '')
    return str
}

const nicknameFormat = (nick) => {
    let str
    if (!!~nick.indexOf('}')) {
        str = ''
    } else if (!!~nick.indexOf('[')) {
        const arr = nick.split('&')
        str = arr[0]
    } else {
        str = nick
    }
    return str
}