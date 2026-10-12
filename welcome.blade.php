<!DOCTYPE html>
<html lang="en">
<head>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>

    <main class="container">

        <aside class="sidebar">

            <h2>Add Project</h2>

            <p class="subtitle">
                Register a project and select its location on the map.
            </p>

            <form id="projectForm">

                <label for="projectName">Project Name</label>
                <input
                    type="text"
                    id="projectName"
                    placeholder="Enter project name"
                    required
                >

                <label for="projectType">Infrastructure Type</label>
                <select id="projectType" required>
                    <option value="">Select project type</option>
                    <option value="Road">Road</option>
                    <option value="Bridge">Bridge</option>
                    <option value="Building">Building</option>
                    <option value="Drainage">Drainage</option>
                    <option value="Water System">Water System</option>
                    <option value="Other">Other</option>
                </select>

                <label for="projectDescription">Description</label>
                <textarea
                    id="projectDescription"
                    placeholder="Enter project description"
                ></textarea>

                <label for="latitude">Latitude</label>
                <input
                    type="number"
                    id="latitude"
                    step="any"
                    placeholder="Click the map to select"
                    required
                >

                <label for="longitude">Longitude</label>
                <input
                    type="number"
                    id="longitude"
                    step="any"
                    placeholder="Click the map to select"
                    required
                >

                <button type="submit" class="btn btn-primary">
                    + Add Project
                </button>

                <button
                    type="button"
                    id="resetButton"
                    class="btn btn-secondary"
                >
                    Clear Form
                </button>

            </form>

            <section class="project-list">
                <h3>Registered Projects</h3>
                <div id="projectList">
                    <p class="empty">No projects added yet.</p>
                </div>
            </section>

        </aside>
             <!-- Map dashboard -->
        <section class="map-section">

            <div class="map-header">
                <div>
                    <h2>Map</h2>
                    <p class="subtitle">
                        Explore project locations.
                    </p>
                </div>

                <select id="mapFilter">
                    <option value="All">All Projects</option>
                    <option value="Road">Roads</option>
                    <option value="Bridge">Bridges</option>
                    <option value="Building">Buildings</option>
                    <option value="Drainage">Drainage</option>
                    <option value="Water System">Water Systems</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div class="project-summary">

                <div class="summary-card">
                    <p>Total Projects</p>
                    <h3 id="totalProjects">0</h3>
                </div>

                <div class="summary-card">
                    <p>Road Projects</p>
                    <h3 id="roadProjects">0</h3>
                </div>

                <div class="summary-card">
                    <p>Other Projects</p>
                    <h3 id="otherProjects">0</h3>
                </div>

            </div>

            <div id="map"></div>

        </section>

    </main>

</body>
</html>
