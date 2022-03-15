const endpoint = 'https://pt.wikipedia.org/w/api.php?';
// http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=xmlfm&titles=Scary%20Monsters%20and%20Nice%20Sprites&rvsection=0

export const getText = async (state, container) => {
    const params = {
        origin: '*',
        format: 'json',
        action: 'query',
        prop: 'extracts',
        exchars: 100000,
        exintro: true,
        explaintext: true,
        generator: 'search',
        gsrlimit: 20,
    };
    params.gsrsearch = state

    try {
        const { data } = await axios.get(endpoint, { params });
        const arr = Object.values(data.query.pages);
        let str
        arr.forEach(element => {
            if(element.title == state){
                str = element.extract
            }
        })
        return str

    } catch (error) {
        console.log(error)
    }
};

export const getInfoBox = async (state) => {
    const params = {
        origin: '*',
        format: 'xml',
        action: 'query',
        prop: 'revisions',
        rvprop: 'content',
        rvsection: 0,
    }
    params.titles = state

    try {
        const { data } = await axios.get(endpoint, { params });
        return data
        
    } catch (error) {
        console.log(error)
    }
}

export const getImg = async (state) => {
    const params = {
        origin: '*',
        format: 'xml',
        action: 'query',
        prop: 'images',
        imlimit: 3
    }
    params.titles = state

    try {
        const { data } = await axios.get(endpoint, { params });
        console.log(data)
        return data
        
        
    } catch (error) {
        console.log(error)
    }
}