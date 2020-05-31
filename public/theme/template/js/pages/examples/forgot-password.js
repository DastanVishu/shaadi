$(function () {
    $('#forgot_password').validate({
        rules: {
            password: "required",
            confirm: {
              equalTo: "#password"
            }
          },
        highlight: function (input) {
            console.log(input);
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
        }
    });
});