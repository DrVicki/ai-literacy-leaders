(function () {
  const data = window.courseData;
  if (!data) return;

  const objectivesGrid = document.getElementById("objectives-grid");
  objectivesGrid.innerHTML = data.objectives.map((objective, index) => `
    <article class="objective-card">
      <span class="objective-card__number">${String(index + 1).padStart(2, "0")}</span>
      <h3>${objective.title}</h3>
      <p>${objective.description}</p>
    </article>
  `).join("");

  const modulesList = document.getElementById("modules-list");
  modulesList.innerHTML = data.modules.map((module) => `
    <article class="module-card">
      <div class="module-meta">
        <span class="module-number">MODULE ${module.number}</span>
        <span class="module-count">${module.lessons.length} lessons</span>
      </div>
      <div class="module-content">
        <div>
          <h3>${module.title}</h3>
          <p>${module.description}</p>
        </div>
        <ul class="lesson-list" aria-label="${module.title} lessons">
          ${module.lessons.map((lesson) => `<li>${lesson}</li>`).join("")}
        </ul>
        <p class="activity-strip"><strong>Hands-on activity:</strong> ${module.activity}</p>
      </div>
    </article>
  `).join("");

  document.getElementById("current-year").textContent = new Date().getFullYear();
})();
