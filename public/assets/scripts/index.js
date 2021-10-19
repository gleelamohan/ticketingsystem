$(document).ready(function () {

    let objArray = [];

    function loadFns() {

        $(".tr-class").on("click", function () {

            let selectedElement = $(this).attr('id');

            var obj = objArray.filter(x => x.externalid === selectedElement);

            $(".subject").html('').append(obj[0].subject);
            $("#tno").html('').append(obj[0].ticketnumber);
            $("#status").html('').append(obj[0].status);
            $("#customer").html('').append(obj[0].customername);
            $("#description").html('').append(obj[0].description);
            $(".form-select").val(obj[0].status);
            $('#exampleModal').modal('show');

        });

    }

    $.ajax("/result", {
        success: function (data, status, xhr) {

            console.log(data);

            objArray = data;

            let strTd = '';

            $.each(data, function (index, item) {
                strTd = strTd + `<tr id=${item.externalid} class="tr-class" >
                <td><a href="#">${item.ticketnumber}</a></td>
                <td>${item.subject}</td>
                <td>${item.customername}</td>
                <td>${item.status}</td>
            </tr>`

            });

            $("#td-append").html('').append(strTd);

            loadFns();
        }
    });


});