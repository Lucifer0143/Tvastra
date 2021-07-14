$('.doctorDetails').on("click", function() {
    $(this).submit();
});
////////////////////////////for carousel///////////////////////////////////////////////////

$('.popbtn').click(function() {
    var task = $("#task").val();
    $.ajax({
        url: '/task/addtask',
        method: 'post',
        dataType: 'json',
        data: { 'task': task },
        success: function(response) {
            if (response.msg == 'success') {
                alert('task added successfully');
                getdata();
                $('#task').val('')
            } else {
                alert('some error occurred try again');
            }
        },
        error: function(response) {
            alert('server error occured')
        }
    });
});

function showSlots(id) {
    var x = document.getElementById(id);
    var z = document.getElementById(id + 0);
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if (id == 'bookSlotNow' + i + j) {
                if (z.style.borderBottom == 'none') {
                    z.style.borderBottom = '0.2rem solid var(--deepblue)';
                } else {
                    z.style.borderBottom = 'none';
                }
                if (x.style.display == 'none') {
                    x.style.display = 'block';
                } else {
                    x.style.display = 'none';
                }
            } else {
                var y1 = document.getElementById('bookSlotNow' + i + j + 0);
                y1.style.borderBottom = 'none';
                var y = document.getElementById('bookSlotNow' + i + j);
                y.style.display = 'none';
            }
        }
    }
};

//////////////////////for doctor's filter////////////////////////////

function filter() {
    var x = document.getElementById('Location1');
    var y = document.getElementById('doctorList');
    console.log('this is on or off' + x);
    if (x.checked == true) {
        y.style.display = 'none';
    } else {
        y.style.display = 'block';
    }
}

function showSortBtnDropdown() {
    var x = document.getElementById('sortBtnDropdown');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

//////////////Slot informations(ajax)///////////////
// let popBtn = document.getElementById('popBtn');
// popBtn.addEventListener('click', popHandler);

// function popHandler() {
// console.log('You have clicked the pop handler');
// // Instantiate an xhr object
// const xhr = new XMLHttpRequest();
// // Open the object
// xhr.open('GET', 'localhost:27017/tvastra', true);
// // What to do when response is ready
// xhr.onload = function() {
//     if (this.status === 200) {
//         let obj = JSON.parse(this.responseText);
//         console.log('If you work like this always get error')
//         console.log(obj);
//         let list = document.getElementById('list');
//         str = "";
//         for (key in obj) {
//             str += `<li>${obj} </li>`;
//         }
//         list.innerHTML = str;
//     } else {
//         console.log("Some error occured")
//     }
// }
// // send the request
// xhr.send();
// console.log("We are done fetching employees!");
//     $.ajax({ url: 'mongodb://localhost:27017/tvastra', method: 'GET' })
//         .then(function(data) {
//             let list = document.getElementById('list');

//             list.innerHTML = data;
//         })
// }