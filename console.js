$(document).ready(function () {
    // Load credentials from cookie (if any)
    var creds = $.cookie("rdbconsole_creds");
    if (creds) {
        $("#username").val(creds.slice(0, 11));
        $("#authcode").val(creds.slice(11, 61));
    }
    
    $("#query_form").submit(function (event) {
        event.preventDefault();
    });
    
    $("#remove_cred").click(function () {
        $("#username").val("username");
        $("#authcode").val("authcode");
        $.cookie("rdbconsole_creds", null);
    });
    
    // Submit handler
    $("#query_form").validate({
        submitHandler: function (form) {
            $("#console pre").empty()
            var username = $("#username").val();
            var authcode = $("#authcode").val();
            $.cookie("rdbconsole_creds", username + authcode, {expires: 20});
            $("#console pre").append('<img src="loading.gif" alt="Loading..." />');
            $.rdbHostConfig({
                userName: username,
                authcode: authcode,
                errback: function (error_data) {
                    $("#console").html("<strong>Error:</strong> " + error_data);
                }
            })
            $("#console pre").datadump({
                q: $("#query").val()
            });
        }
    })
});
