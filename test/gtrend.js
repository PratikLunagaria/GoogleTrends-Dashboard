// const googleTrends = require('google-trends-api');

// googleTrends.interestOverTime({keyword: 'Valentines Day'})
// .then(function(results){
//   console.log(results);
// })
// .catch(function(err){
//   console.error(err);
// });

// googleTrends.relatedTopics({keyword: 'Chipotle', startTime: new Date('2015-01-01'), endTime: new Date('2017-02-10')})
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// })

const { ExploreTrendRequest } = require('g-trends')

const explorer = new ExploreTrendRequest()

// explorer.addKeyword('Dream about snakes')
//         .between('2017-01-01','2019-01-10')
//         .download().then( csv => {
//             console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
//             console.log(csv)
//         }).catch( error => {
//             console.log('[!] Failed fetching csv data due to an error',error)
//         })

explorer.past5Years()
        .addKeyword('Cats','GB')
        .download().then( csv => {
            csv.shift()
            console.log(csv)
        })