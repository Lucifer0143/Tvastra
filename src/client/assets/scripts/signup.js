function alertDiv() {
    document.getElementById('alertMsgs').style.display = 'none';
}
$(document).ready(function() {
    $('#alertMsgs').delay(2000).fadeOut(5000);
});

function showHidePass(x) {
    var z = document.getElementById('password');
    if (z.type === 'password') {
        z.type = 'text';
        x.classList.remove('fa-eye-slash');
        x.classList.add('fa-eye');
    } else {
        z.type = 'password';
        x.classList.remove('fa-eye');
        x.classList.add('fa-eye-slash');
    }
}