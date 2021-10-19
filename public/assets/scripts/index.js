$(document).ready(function () {

    let objArray = [];
    let selectedId;

    function loadFns() {

        $(".tr-class").on("click", function () {

            let selectedElement = $(this).attr('id');

            var obj = objArray.filter(x => x.externalid === selectedElement);

            selectedId = obj[0].externalid;

            $(".subject").html('').append(obj[0].subject);
            $("#tno").html('').append(obj[0].ticketnumber);
            $("#status").html('').append(obj[0].status);
            $("#customer").html('').append(obj[0].customername);
            $("#description").html('').append(obj[0].description);
            $(".form-select").val(obj[0].status);
            $('#exampleModal').modal('show');

        });


        $("#updatestatus").on("click", function () {

            var request = $.ajax({
                url: "/update",
                type: "GET",
                data: {
                    'Id': selectedId,
                    'Status': $(".form-select").val()
                },
                dataType: 'json'
            });

            request.done(function (msg) {
                alert(msg);
                init();
                $('#exampleModal').modal('hide');
            });

            request.fail(function (jqXHR, textStatus) {
                //alert("Request failed: " + textStatus);
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (jqXHR.exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (jqXHR.exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (jqXHR.exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }

                alert(msg);
                init();
                $('#exampleModal').modal('hide');
            });


        });

    }

    function init() {
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
    }


    init();
});