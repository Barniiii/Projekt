document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const tableBody = document.getElementById('usersTable');

    function loadData() {
        const data = JSON.parse(localStorage.getItem('szamlak')) || [];
        tableBody.innerHTML = '';
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.szamla_id}</td>
                <td>${item.szamlaszam}</td>
                <td>${item.tulajdonos}</td>
                <td>${item.tipus}</td>
                <td>${item.egyenleg}</td>
                <td>${item.nyitasdatuma}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const szamla_id = document.getElementById('szamla_id').value;
        const szamlaszam = document.getElementById('szamlaszam_id').value;
        const tulajdonos = document.getElementById('tulajdonos_id').value;
        const tipus = document.getElementById('tipus_id').value;
        const egyenleg = document.getElementById('egyenleg_id').value;
        const nyitasdatuma = document.getElementById('nyitasdatuma_id').value;

        const ujSzamla = {
            szamla_id,
            szamlaszam,
            tulajdonos,
            tipus,
            egyenleg,
            nyitasdatuma
        };

        const data = JSON.parse(localStorage.getItem('szamlak')) || [];
        data.push(ujSzamla);
        localStorage.setItem('szamlak', JSON.stringify(data));

        form.reset();
        loadData();
    });

    loadData();
});
