var express = require("express");
var router = express.Router();
const { ExploreTrendRequest } = require('g-trends');
const XLSX = require('xlsx');
var wb = XLSX.utils.book_new();

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
  


async function fetchdata(query_kw,iter_num){
    let mainData = {};
    if(query_kw.length != 0){
        const explorer = new ExploreTrendRequest();
        var result = await explorer.past5Years()
                .addKeyword(query_kw,'GB')
                .download()
                .then(csv => {
                        if(iter_num == 0){
                            return csv.map(function(val,idx){
                                mainData[val[0]]=[val[1]];
                            });
                        }
                    return csv;
                })
                .then(csv1 => {
                    console.log(mainData)
                    if(iter_num != 0){
                        return csv1.map(function(val,idx){
                            mainData[val[0]].push(val[1]);
                        });
                    }
                    return mainData;
                })
                .then(sleep(2000))
                .catch( error => {
                    console.log('[!] Failed fetching csv data due to an error',error)
                });
    }
    return result;
}


async function datamgmnt(elems){
    console.log(elems)
    for(j=0; j < elems.length; j++){
        console.log(elems[j]);
        var datafetch = await sleep(5000).then(()=>fetchdata(elems[j], j));
    }
    return datafetch;
}




/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index");
});

router.post("/", function (req, res, next) {
    let arrayUpdate = req.body;

    Object.keys(arrayUpdate).forEach(async function(worksheet_name){
        if(worksheet_name.length != 0){
            wb.SheetNames.push(worksheet_name);
            let levelone_elems= arrayUpdate[worksheet_name];
            
            const iterr = await datamgmnt(levelone_elems)
                .then(d => {
                    let newData =[];
                    for(k=0; k<Object.keys(d).length; k++){
                        let tempArr = d[Object.keys(d)[k]];
                        tempArr.unshift(Object.keys(d)[k]);
                        newData.push(tempArr);
                    }
                    return newData;
                })
                .then(finald =>{
                    let ws_data = finald;
                    let ws = XLSX.utils.aoa_to_sheet(ws_data);
                    wb.Sheets[worksheet_name] = ws;
                    let wbout = XLSX.writeFile(wb,'out.xls');
                })
                .catch((err)=>console.log(err))   

        }
    });

    res.status(200).json({
        data: "Updated Successfully !"
    });
});



module.exports = router;