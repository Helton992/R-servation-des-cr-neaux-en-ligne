function getCreneaux() {
    return JSON.parse(localStorage.getItem("creneaux")) || [];
}

function saveCreneaux(creneaux) {
    localStorage.setItem("creneaux", JSON.stringify(creneaux));
}

function getReservations() {
    return JSON.parse(localStorage.getItem("reservations")) || [];
}

function saveReservations(reservations) {
    localStorage.setItem("reservations", JSON.stringify(reservations));
}


function afficherCreneaux() {
    const table = document.getElementById("tableCreneaux");
    table.innerHTML = "";

    const creneaux = getCreneaux();

    creneaux.forEach(creneau => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${creneau.date}</td>
            <td>${creneau.heure}</td>
            <td class="${creneau.statut === 'Disponible' ? 'dispo' : 'reserve'}">
                ${creneau.statut}
            </td>
        `;

        table.appendChild(tr);
    });
}

function afficherSelectCreneaux() {
    const select = document.getElementById("selectCreneau");
    select.innerHTML = `<option value="">-- Sélectionner --</option>`;

    const creneaux = getCreneaux();

    creneaux.forEach((creneau, index) => {
        if (creneau.statut === "Disponible") {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${creneau.date} à ${creneau.heure}`;
            select.appendChild(option);
        }
    });
}

function afficherReservations() {
    const liste = document.getElementById("listeReservations");
    liste.innerHTML = "";

    const reservations = getReservations();

    reservations.forEach(reservation => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span><b>Client :</b> ${reservation.nom}</span>
            <span><b>Date :</b> ${reservation.date}</span>
            <span><b>Heure :</b> ${reservation.heure}</span>
        `;

        liste.appendChild(li);
    });
}


document.getElementById("formCreneau").addEventListener("submit", function(e) {
    e.preventDefault();

    const date = document.getElementById("dateCreneau").value;
    const heure = document.getElementById("heureCreneau").value;

    const creneaux = getCreneaux();

    const existe = creneaux.find(c => c.date === date && c.heure === heure);
    if (existe) {
        alert("Ce créneau existe déjà !");
        return;
    }

    creneaux.push({
        date: date,
        heure: heure,
        statut: "Disponible"
    });

    saveCreneaux(creneaux);

    document.getElementById("formCreneau").reset();

    afficherCreneaux();
    afficherSelectCreneaux();
});

document.getElementById("formReservation").addEventListener("submit", function(e) {
    e.preventDefault();

    const nom = document.getElementById("nomClient").value;
    const index = document.getElementById("selectCreneau").value;

    if (index === "") {
        alert("Veuillez sélectionner un créneau !");
        return;
    }

    const creneaux = getCreneaux();

   
    creneaux[index].statut = "Réservé";
    saveCreneaux(creneaux);

   
    const reservations = getReservations();

    reservations.push({
        nom: nom,
        date: creneaux[index].date,
        heure: creneaux[index].heure
    });

    saveReservations(reservations);

    document.getElementById("formReservation").reset();

    afficherCreneaux();
    afficherSelectCreneaux();
    afficherReservations();

    alert("Rendez-vous réservé avec succès !");
});


afficherCreneaux();
afficherSelectCreneaux();
afficherReservations();