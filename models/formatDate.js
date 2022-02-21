class program{
    today(){
        const date = new Date();
        const day = ("" + date.getDate()).slice(-2)
        const month = ("" + (date.getMonth() + 1)).slice(-2)
        const yyyymmdd = `${date.getFullYear()}-${month}-${day}`
        return yyyymmdd
    }

    twoWeeks(){
        const date = new Date();
        date.setDate(date.getDate() + (2 * 7));
        const day = ("" + date.getDate()).slice(-2)
        const month = ("" + (date.getMonth() + 1)).slice(-2)
        const yyyymmdd = `${date.getFullYear()}-${month}-${day}`
        return yyyymmdd
    }

    fourWeeks(){
        const date = new Date();
        date.setDate(date.getDate() + (4 * 7));
        const day = ("" + date.getDate()).slice(-2)
        const month = ("" + (date.getMonth() + 1)).slice(-2)
        const yyyymmdd = `${date.getFullYear()}-${month}-${day}`
        return yyyymmdd
    }

}

module.exports = new program



