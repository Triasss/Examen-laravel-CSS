const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
};

let selectedProjectId = null;

async function loadProjects() {
    const res = await fetch('/api/projects', { headers: HEADERS });
    if (!res.ok) return;

    const projects = await res.json();
    const list = document.getElementById('project-list');
    list.innerHTML = '';

    if (projects.length === 0) {
        list.innerHTML = '<p style="font-size:0.8rem;color:#999;">Cap projecte</p>';
        return;
    }

    projects.forEach(p => {
        const el = document.createElement('p');
        el.className = 'project-item';
        el.textContent = p.nombre;
        el.dataset.id = p.id;
        el.addEventListener('click', () => selectProject(p, el));
        list.appendChild(el);
    });

    const first = list.querySelector('.project-item');
    if (first) first.click();
}

async function selectProject(project, el) {
    document.querySelectorAll('.project-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');

    selectedProjectId = project.id;

    const descripcio = project.descripcion ?? project.descripcio ?? project.description ?? 'Sense descripció';

    const featured = document.getElementById('featured');
    featured.innerHTML = `
        <strong>${project.nombre}: ${descripcio}</strong>
        <p style="margin-top: 8px; font-size: 0.85rem; color: #555;"></p>
    `;
    featured.style.cursor = 'pointer';

    await loadTasks(project.id);
}

async function loadTasks(projectId) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '<article class="card" style="color:#999;justify-content:center;">Carregant...</article>';

    const res = await fetch('/api/tasks', { headers: HEADERS });
    if (!res.ok) {
        taskList.innerHTML = '<article class="card" style="color:#c00;">Error carregant tasques</article>';
        return;
    }

    const allTasks = await res.json();
    const tasks = allTasks.filter(t => t.projects_id == projectId);

    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<article class="card" style="color:#999;justify-content:center;">Cap tasca per aquest projecte</article>';
        return;
    }

    tasks.forEach(t => {
        const card = document.createElement('article');
        card.className = 'card';
        card.textContent = t.description ?? `Tasca ${t.id}`;
        if (t.completada) {
            card.style.textDecoration = 'line-through';
            card.style.color = '#999';
        }
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `/task/show/${t.id}`;
        });
        card.style.cursor = 'pointer';
        taskList.appendChild(card);
    });
}

const featuredElement = document.getElementById('featured');
if (featuredElement) {
    featuredElement.addEventListener('click', () => {
        if (selectedProjectId) {
            window.location.href = `/project/show/${selectedProjectId}`;
        }
    });
}

loadProjects();