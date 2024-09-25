function openDay(evt, dayName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(dayName).style.display = "block";
    evt.currentTarget.className += " active";
}

function toggleCheck(element, day) {
    element.classList.toggle('checked');
    setCookie('day' + day + 'Checked', element.classList.contains('checked'), 30);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function loadChecks() {
    for (var i = 1; i <= 5; i++) {
        var checked = getCookie('day' + i + 'Checked');
        if (checked === 'true') {
            document.querySelector('#Day' + i + ' .check-box').classList.add('checked');
        }
    }
}

function saveWeight(week, value) {
    setCookie('week' + week + 'Weight', value, 30);
}

function loadWeights() {
    var inputs = document.querySelectorAll('#WeightTracker input');
    inputs.forEach((input, index) => {
        var weight = getCookie('week' + (index + 1) + 'Weight');
        if (weight) {
            input.value = weight;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("defaultOpen").click();
    loadChecks();
    loadWeights();
});