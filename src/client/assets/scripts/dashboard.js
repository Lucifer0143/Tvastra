function profile() {
    document.getElementById('dashboardDetail').style.display = 'block';
    document.getElementById('appointment').style.display = 'none';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('report').style.display = 'none';
    document.getElementById('setting').style.display = 'none';

    document.getElementById('scheduleBtn').style.display = 'none';

    document.getElementById('navBtn1h5').style.cssText = 'font-family: Nexa-bold; color: var(--deepblue)';
    document.getElementById('navBtn2h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn3h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn4h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn5h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
}

function appointment() {
    document.getElementById('dashboardDetail').style.display = 'none';
    document.getElementById('appointment').style.display = 'block';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('report').style.display = 'none';
    document.getElementById('setting').style.display = 'none';

    document.getElementById('scheduleBtn').style.display = 'none';

    document.getElementById('navBtn1h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn2h5').style.cssText = 'font-family: Nexa-bold; color: var(--deepblue)';
    document.getElementById('navBtn3h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn4h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn5h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
}

function schedule() {
    document.getElementById('dashboardDetail').style.display = 'none';
    document.getElementById('appointment').style.display = 'none';
    document.getElementById('schedule').style.display = 'block';
    document.getElementById('report').style.display = 'none';
    document.getElementById('setting').style.display = 'none';

    document.getElementById('scheduleBtn').style.display = 'block';

    document.getElementById('navBtn1h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn2h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn3h5').style.cssText = 'font-family: Nexa-bold; color: var(--deepblue)';
    document.getElementById('navBtn4h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn5h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
}

function report() {
    document.getElementById('dashboardDetail').style.display = 'none';
    document.getElementById('appointment').style.display = 'none';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('report').style.display = 'block';
    document.getElementById('setting').style.display = 'none';

    document.getElementById('scheduleBtn').style.display = 'none';

    document.getElementById('navBtn1h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn2h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn3h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn4h5').style.cssText = 'font-family: Nexa-bold; color: var(--deepblue)';
    document.getElementById('navBtn5h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
}

function setting() {
    document.getElementById('dashboardDetail').style.display = 'none';
    document.getElementById('appointment').style.display = 'none';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('report').style.display = 'none';
    document.getElementById('setting').style.display = 'block';

    document.getElementById('scheduleBtn').style.display = 'none';

    document.getElementById('navBtn1h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn2h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn3h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn4h5').style.cssText = 'font-family: Nexa-light; color: var(--black)';
    document.getElementById('navBtn5h5').style.cssText = 'font-family: Nexa-bold; color: var(--deepblue)';
}

function showSetSchedule() {
    document.getElementById('setSchedule').style.display = 'block';
}

function hideSetSchedule() {
    document.getElementById('setSchedule').style.display = 'none';
}

function showRecordForm() {
    document.getElementById('addrecordform').style.display = 'block';
}

function hideRecordForm() {
    document.getElementById('addrecordform').style.display = 'none';
}

function checkboxs() {
    var x = document.getElementById('scheduleDone').value;
    console.log('this is js file ' + x);
}

// var input = document.querySelector(".awesomplete");

// input.addEventListener("input", inputHandler);

// function inputHandler() {
//     alert(this.value)
// }

var loadFile = function(event) {
    var imagesarr = document.getElementById('uploadPicInput').files;
    var div = document.getElementById('pic');
    var str = "";
    for (var i = 0; i < imagesarr.length; i++) {
        str += '<img src="' + URL.createObjectURL(event.target.files[i]) + '">';
    }

    div.innerHTML = str;

};

// ---------for medical report page---------------------
function previewFiles(x) {
    if (x.length > 5) {
        alert('Maximum 5 file allowed');
        return
    };

    var preview = document.querySelector('#reportImg');
    var files = document.querySelector('input[type=file]').files;

    function readAndPreview(file) {

        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            var reader = new FileReader();

            reader.addEventListener("load", function() {
                var image = new Image();
                image.height = 10;
                image.title = file.name;
                image.src = this.result;
                preview.appendChild(image);
            }, false);

            reader.readAsDataURL(file);
        }

    }

    if (files) {
        [].forEach.call(files, readAndPreview);
    }

}

function viewReport() {
    document.getElementById('showRecord').style.display = 'block';
    document.getElementById('report').style.display = 'none';
}

function viewslot(id) {
    var x = document.getElementById(id);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

function liRadio1() {
    document.getElementById('liradio1').style.backgroundColor = 'var(--lightblue)';
    document.getElementById('liradio2').style.backgroundColor = 'var(--white)';
    document.getElementById('liradio3').style.backgroundColor = 'var(--white)';
};

function liRadio2() {
    document.getElementById('liradio1').style.backgroundColor = 'var(--white)';
    document.getElementById('liradio2').style.backgroundColor = 'var(--lightblue)';
    document.getElementById('liradio3').style.backgroundColor = 'var(--white)';
};

function liRadio3() {
    document.getElementById('liradio1').style.backgroundColor = 'var(--white)';
    document.getElementById('liradio2').style.backgroundColor = 'var(--white)';
    document.getElementById('liradio3').style.backgroundColor = 'var(--lightblue)';
};

$(document).ready(function() {
    $('#uploadPicInput').change(function() {
        if (this.files.length > 5)
            alert('to many files')
    });
});

function showBtn(id) {
    var x = document.getElementById(id);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
// ------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>for edit profile-------------------
function autoGrow(oField) {
    if (oField.scrollHeight > oField.clientHeight) {
        oField.style.height = oField.scrollHeight + "px";
    }
}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("UL");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("UL");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("ul");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

autocomplete(document.getElementById("myInput"), countries);