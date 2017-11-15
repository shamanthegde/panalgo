function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function login() {
    var login_email = $('input[name=email]').val();
    var login_password = $('input[name=password]').val();
    var user_type = $('input[name=kind]:checked').val();
    var postData = {
        email: login_email,
        password: login_password,
        kind: user_type
    };
    $.post("http://pain-team.herokuapp.com/login",
        {
            email: login_email,
            password: login_password,
            kind: user_type
        })
        .done(function(response){
            createCookie('panalgo-user-id', response.id, 1);
            createCookie('panalgo-user-name', response.name, 1);
            if (user_type =="developer") {
                window.location.replace("dev-dashboard.html");
            }
            else {
                window.location.replace("dashboard.html");
            }
        }).fail(function(response) {
            $('#login-error').html("Error: " + response.responseJSON.error);
    });

}