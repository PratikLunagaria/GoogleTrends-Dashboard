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
                alert('success');
                console.log(msg);
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