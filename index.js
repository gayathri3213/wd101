let userform = document.getElementById("form");

userform.addEventListener("submit",function(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("acceptTerms").checked;

    if(!validemail(email)){
        alert("ENTER VALID EMAIL.");
        return;
    }

    if(!validage(dob)){
        alert("AGE MUST BE BETWEEN 18 AND 55.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        terms
    };

    save(entry);
    table(entry);
    this.reset();

});

function validemail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
    }
    
function validage(dob){
    const now = new Date();
    const current_year=now.getFullYear();
    const current_month=now.getMonth() + 1;
    const current_day = now.getDate();
    parts=dob.split('/');
    candiadate_date=parts[0];
    candiadate_month=parts[1];
    candiadate_year=parts[2];
    age_year=current_year - candiadate_year;
    if (current_month < candiadate_month || (current_month === candiadate_month && current_day < candiadate_date)) {
        age--;
    }
    if (age_year < 18 || age_year>55){
        return false;
    } else{
        return true;
    }
}

function save( entry){

    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
}

function table(entry) {
    const tableBody = document.querySelector("#entriesTable tbody");
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = entry.name;
    row.insertCell(1).textContent = entry.email;
    row.insertCell(2).textContent = entry.password;
    row.insertCell(3).textContent = entry.dob;
    row.insertCell(4).textContent = entry.terms ? "Accepted" : "Not Accepted";
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.forEach(entry => table(entry));
}

// Load saved entries when the page loads
document.addEventListener("DOMContentLoaded", loadEntries);