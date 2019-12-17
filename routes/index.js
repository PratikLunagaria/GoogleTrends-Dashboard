var express = require("express");
var router = express.Router();
const { ExploreTrendRequest } = require('g-trends');
const XLSX = require('xlsx');


var mainData = {};

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
  
async function fetchdata(query_kw,iter_num){
    
    
    if(query_kw.length != 0){
        const explorer = new ExploreTrendRequest();
        var result = 
        await explorer.past5Years()
                .addKeyword(query_kw,'GB')
                .download()
                // .then(()=> sleep(2000))
                .then(csv => {
                    console.log(csv[0]);
                    console.log(iter_num);
                    if(iter_num == 0 ){
                        csv.map(function(val,idx){
                            mainData[val[0]]=[val[1]];
                        })
                        return mainData;
                    }else{
                        return csv;
                    }
                })
                .then(v=>{
                    if(iter_num > 0 ){
                        v.map(function(val,idx){   
                            mainData[val[0]].push(val[1]);
                        })
                        return mainData;
                    }else{
                        return v;
                    }
                })
                .catch( error => {
                    console.log('[!] Failed fetching csv data due to an error',error)
                });
        return result;
    }else{
        return mainData;
    }
    
}


async function datamgmnt(elems){
    console.log(elems);
    
    for(j=0; j < elems.length; j++){
        console.log(elems[j]);
        var datafetch = await fetchdata(elems[j], j);
    }
    return datafetch;
}




/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index");
});

router.post("/", async function (req, res, next) {
    let bindata = '';
    var wb = XLSX.utils.book_new();
    let arrayUpdate = req.body;

    const fetchTrends = async() => 
    {
        await asyncForEach(Object.keys(arrayUpdate),async function(worksheet_name){
        if(worksheet_name.length != 0){
            wb.SheetNames.push(worksheet_name);
            let levelone_elems= arrayUpdate[worksheet_name];
            const iterr = await datamgmnt(levelone_elems)
                // .then(d=>console.log(d))
                .then(d => {
                    mainData = {}
                    let newData =[];
                    if(d != undefined){
                        for(k=0; k<Object.keys(d).length; k++){
                            let tempArr = d[Object.keys(d)[k]];
                            tempArr.unshift(Object.keys(d)[k]);
                            newData.push(tempArr);
                        }
                    }  
                    return newData;
                })
                .then(finald =>{
                    let ws_data = finald;
                    let ws = XLSX.utils.aoa_to_sheet(ws_data);
                    wb.Sheets[worksheet_name] = ws;
                    var wopts = { bookType:'xlsx', bookSST:false, type:'base64'};
                    let wbout = XLSX.write(wb,wopts);
                    return wbout;
                })
                .then((tempd)=> bindata=tempd)
                .catch((err)=>console.log(err))   
        }
    });
        return bindata;
}

    const blobdata = await fetchTrends();
    // console.log(blobdata);
    // res.send(blobdata);

    // res.send(Buffer.from(blobdata, 'binary'));
    
    res.status(200).json({
        data: {
            message: "data fetched",
            dl: blobdata 
        }    
    });
    
});



module.exports = router;