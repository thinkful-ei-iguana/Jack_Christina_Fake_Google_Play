const express = require('express');
const morgan = require('morgan');
const store = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) =>{
    res.send(store);
})

function alphabeticalSort(a, b){
    const aApp = a.App.toUpperCase();
    const bApp = b.App.toUpperCase();
    //console.alert(aApp);
    res = 0
    if(a.App > b.App){ res= 1 }
    else if (b.App > a.App ) {res =-1}
    return res
}

function ratingSort(a, b){
    const aRate = a.Rating;
    const bRate = b.Rating;
    if(aRate > bRate){ return -1 }
    if(bRate > aRate){return 1}
    return 0;
}


app.get('/apps', (req, res) =>{
    let result = store;
    let genre = '';
    if(req.query.sort !== undefined){
        filter = req.query.sort;
        if(req.query.sort === 'app'){
            result = result.sort(alphabeticalSort);
        }
        if(req.query.sort === 'rating'){
            result = result.sort(ratingSort)
        }
        
    }
    if(req.query.genres !== undefined){
        genre = req.query.genres;
        result = result.filter((element) => {
            if(genre === element.Genres){return element}
        })
    }
    //const {filter = "", filter2 = ""} = req.query;
    //filter = JSON.parse(filter);
    res.send(result);
})

app.listen(8000, () =>{
    console.log('yay')
});