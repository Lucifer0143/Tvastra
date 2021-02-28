function alertDiv() {
    document.getElementById('alertMsgs').style.display = 'none';
}
$(document).ready(function() {
    $('#alertMsgs').delay(2000).fadeOut(5000);
});