import L from 'leaflet';


const map = L.map('map').setView([7.1907, 125.4553], 12);

// Load OpenStreetMap.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Store project information while the page is open.
const projects = [];

let selectedMarker = null;

// Select a location by clicking the map.
map.on('click', function (event) {
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;

    document.getElementById('latitude').value = latitude.toFixed(6);
    document.getElementById('longitude').value = longitude.toFixed(6);

    if (selectedMarker) {
        map.removeLayer(selectedMarker);
    }

    selectedMarker = L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup('Selected project location')
        .openPopup();
});

// Escape text before displaying user-entered content in a popup.
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[character];
    });
}

// Add a project.
document.getElementById('projectForm')
    .addEventListener('submit', function (event) {

        event.preventDefault();

        const name = document.getElementById('projectName')
            .value.trim();

        const type = document.getElementById('projectType').value;

        const description = document.getElementById('projectDescription')
            .value.trim();

        const latitudeInput = document.getElementById('latitude').value;
        const longitudeInput = document.getElementById('longitude').value;

        const latitude = Number(latitudeInput);
        const longitude = Number(longitudeInput);

        if (
            !name ||
            !type ||
            latitudeInput === '' ||
            longitudeInput === '' ||
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            alert('Please enter valid project details and coordinates.');
            return;
        }

        if (selectedMarker) {
            map.removeLayer(selectedMarker);
            selectedMarker = null;
        }

        const project = {
            id: Date.now(),
            name,
            type,
            description,
            latitude,
            longitude,
            marker: null
        };

        project.marker = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`
                <strong>${escapeHTML(name)}</strong><br>
                Type: ${escapeHTML(type)}<br>
                ${escapeHTML(description || 'No description provided.')}
            `);

        projects.push(project);

        renderProjects();

        map.setView([latitude, longitude], 15);
        project.marker.openPopup();

        this.reset();
    });

function renderProjects() {
    const projectList = document.getElementById('projectList');
    const filter = document.getElementById('mapFilter').value;

    const visibleProjects = projects.filter(function (project) {
        return filter === 'All' || project.type === filter;
    });

    projectList.replaceChildren();

    if (visibleProjects.length === 0) {
        const empty = document.createElement('p');

        empty.className = 'empty';
        empty.textContent = projects.length === 0
            ? 'No projects added yet.'
            : 'No projects match this filter.';

        projectList.appendChild(empty);
    }

    visibleProjects.forEach(function (project) {
        const item = document.createElement('div');
        item.className = 'project-item';

        const title = document.createElement('strong');
        title.textContent = project.name;

        const type = document.createElement('span');
        type.textContent = project.type;

        item.append(title, type);

        item.addEventListener('click', function () {
            map.setView([project.latitude, project.longitude], 16);
            project.marker.openPopup();
        });

        projectList.appendChild(item);
    });

    document.getElementById('totalProjects').textContent =
        projects.length;

    document.getElementById('roadProjects').textContent =
        projects.filter(project => project.type === 'Road').length;

    document.getElementById('otherProjects').textContent =
        projects.filter(project => project.type !== 'Road').length;


    projects.forEach(function (project) {
        const shouldShow = filter === 'All' || project.type === filter;
        const markerIsVisible = map.hasLayer(project.marker);

        if (shouldShow && !markerIsVisible) {
            project.marker.addTo(map);
        } else if (!shouldShow && markerIsVisible) {
            map.removeLayer(project.marker);
        }
    });
}


document.getElementById('mapFilter')
    .addEventListener('change', renderProjects);


document.getElementById('resetButton')
    .addEventListener('click', function () {

        document.getElementById('projectForm').reset();

        if (selectedMarker) {
            map.removeLayer(selectedMarker);
            selectedMarker = null;
        }
    });

