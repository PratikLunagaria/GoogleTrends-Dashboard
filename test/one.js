var one = [ [ 'unixtime', 'datetime', 'url', 'count' ],
[ '1569045388', '43729.24755', 'http://google.com', '15' ],
[ '1569097586',
  '',
  'https://cloudcovermusic.com/plans/messaging/',
  '6' ],
[ '1569097470',
  '',
  'https://randomwordgenerator.com/sentence.php',
  '6' ],
[ '1569097413', '', 'http://dropbox.com', '5' ],
[ '1569097404', '', 'http://reddit.com', '5' ],
[ '1569097334', '', 'http://redmondpie.com', '5' ],
[ '1569097327', '', 'http://macrumors.com', '5' ],
[ '1569042481', '', 'http://www.google.com', '24' ],
[ '1568667414',
  '',
  'https://github.com/derekkramer/slack-scraper',
  '8' ],
[ '1569042481', '', 'http://www.google.com', '6' ],
[ '1568667414',
  '',
  'https://github.com/derekkramer/slack-scraper',
  '2' ],
[ '1568662511', '', 'https://gizmodo.com', '10' ],
[ '1568662480', '', 'http://test.com/data', '4' ] ]

// var newJSON = {rows:[]};
// function arrtoJSON(inputarr){
//     for(i=1; i<=inputarr.length; i++){
//         var tempObj = {};
//         for(j=0; j<=inputarr[i].length; j++){
//             console.log(inputarr[0][1]);
//             tempObj[inputarr[0][i]] = inputarr[i][j];
//         };
//         newJSON.rows.push(tempObj);
//     };
//     console.log(newJSON);
//     return newJSON;

// }

// arrtoJSON(one);

function arrToObject (arr){
	//assuming header
	var keys = arr[0];
	//vacate keys from main array
	var newArr = arr.slice(1, arr.length);

	var formatted = [],
    data = newArr,
    cols = keys,
    l = cols.length;
	for (var i=0; i<data.length; i++) {
			var d = data[i],
					o = {};
			for (var j=0; j<l; j++)
					o[cols[j]] = d[j];
			formatted.push(o);
	}
	return formatted;
}

console.log(arrToObject(one));