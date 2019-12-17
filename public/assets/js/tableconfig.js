function scrapify() {
    var dataArr = {};
    var dataLength = document.querySelectorAll('div.body-scrollable > table.data-table-body > tbody > tr.data-table-row').length;
    for (i = 0; i < dataLength; i++) {
        var rowLength = document.querySelectorAll('div.body-scrollable > table.data-table-body > tbody > tr.data-table-row')[i].querySelectorAll('td.data-table-cell > div.content.ellipsis').length;

        var miniArr = [];
        var arrElementTitle = document.querySelectorAll('div.body-scrollable > table.data-table-body > tbody > tr.data-table-row')[i].querySelectorAll('td.data-table-cell > div.content.ellipsis')[1].innerHTML.trim();

        if (arrElementTitle.length!=0){
            for (j = 2; j < rowLength; j++) {
                var arrElement = document.querySelectorAll('div.body-scrollable > table.data-table-body > tbody > tr.data-table-row')[i].querySelectorAll('td.data-table-cell > div.content.ellipsis')[j].innerHTML.trim();
                miniArr.push(arrElement);
            }
            dataArr[arrElementTitle] = miniArr;
        }
    }
    return dataArr;
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}



$(document).ready(function () {
    $("#updatebtn").click(function (e) {
        var datapost = scrapify();
        var postLocation = "/";
        
        console.log('clicked');
        $.ajax({
            type: "POST",
            url: postLocation,
            data: JSON.stringify(datapost),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                console.log(msg.data)
                var byteCharacters = atob(msg.data.dl);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                
                saveAs(blob, 'xlsx.xlsx');
                // saveAs(new Blob([s2ab(msg.dl)],{type:"application/octet-stream"}), "test.xlsx")

                // const blob = new Blob([new Uint8Array(msg.dl)]);
                // download(blob, 'out.xls');
            },
            error: function (msg) {
                alert('failure');
                console.log(msg);
            }
        });
    });
});

// document.querySelectorAll('table.data-table-header > thead > tr.data-table-row > td.data-table-cell > div.content.ellipsis').values
// document.querySelectorAll('div.body-scrollable > table.data-table-body > tbody > tr.data-table-row > td.data-table-cell > div.content.ellipsis')[0][textProperty]
// document.querySelectorAll('div.body-scrollable > table.data-table-body > tbody > tr.data-table-row')[0].querySelectorAll('td.data-table-cell > div.content.ellipsis').length