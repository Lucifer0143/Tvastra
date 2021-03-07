function alertDiv() {
    document.getElementById('alertMsgs').style.display = 'none';
}
$(document).ready(function() {
    $('#alertMsgs').delay(2000).fadeOut(5000);
});

//-------------------for otp page------------------------------------

function getCodeBoxElement(index) {
    return document.getElementById('codeBox' + index);
}

function onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    if (getCodeBoxElement(index).value.length === 1) {
        if (index !== 4) {
            getCodeBoxElement(index + 1).focus();
        } else {
            getCodeBoxElement(index).blur();
            console.log('submit code ');
        }
    }
    if (eventCode === 8 && index !== 1) {
        getCodeBoxElement(index - 1).focus();
    }
}

function onFocusEvent(index) {
    for (item = 1; item < index; item++) {
        const currentElement = getCodeBoxElement(item);
        if (!currentElement.value) {
            currentElement.focus();
            break;
        }
    }
}




function otpTimer() {
    var timeLeft = 30;
    var elem = document.getElementById('timer');
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            doSomething();
        } else {
            elem.innerHTML = 'Resend OTP in ' + timeLeft;
            timeLeft--;
        }
    }

    function doSomething() {
        elem.innerHTML = 'Resend OTP';
    }
}
window.onload = otpTimer;



//-------------------for reset_password page----------------------------------


function passShowHide1(z) {

    var x = document.getElementById('pass1');
    if (x.type === 'password') {
        x.type = 'text';
        z.classList.remove('fa-eye-slash');
        z.classList.add('fa-eye');
    } else {
        x.type = 'password';
        z.classList.remove('fa-eye');
        z.classList.add('fa-eye-slash');
    }
}

function passShowHide2(z) {
    var x = document.getElementById('pass2');
    if (x.type === 'password') {
        x.type = 'text';
        z.classList.remove('fa-eye-slash');
        z.classList.add('fa-eye');
    } else {
        x.type = 'password';
        z.classList.remove('fa-eye');
        z.classList.add('fa-eye-slash');
    }
}