(function () {
  "use strict";
  const data = window.AFMDATA;
  if (!data) return;

  const byId = (id) => document.getElementById(id);

  function addLink(parent, label, url) {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.textContent = label;
    if (/^https?:/.test(url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    parent.appendChild(link);
  }

  function addText(parent, text) {
    parent.appendChild(document.createTextNode(text));
  }

  function listTextItem(list, text) {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  }

  data.areas.forEach((area) => listTextItem(byId("research-areas"), area));

  data.faculty.forEach((person) => {
    const item = document.createElement("li");
    item.className = "faculty-person";

    const image = document.createElement("img");
    image.className = "faculty-photo";
    image.src = person.image;
    image.alt = "Photo of " + person.name;
    image.loading = "lazy";
    image.onerror = function () { this.style.display = "none"; };
    item.appendChild(image);

    const details = document.createElement("div");
    details.className = "faculty-details";
    const name = document.createElement("div");
    name.className = "faculty-name";
    addLink(name, person.name, person.page || person.official);
    details.appendChild(name);

    const links = document.createElement("div");
    links.className = "faculty-links";
    addLink(links, "Personal website", person.page);
    if (person.page && person.official) addText(links, " · ");
    addLink(links, "NITC profile", person.official);
    if (person.official && person.scholar) addText(links, " · ");
    addLink(links, "Google Scholar", person.scholar);
    details.appendChild(links);
    item.appendChild(details);
    byId("faculty-list").appendChild(item);
  });

  function renderPeople(listId, people) {
    people.forEach((person) => {
      const item = document.createElement("li");
      if (person.page) addLink(item, person.name, person.page);
      else addText(item, person.name);
      if (person.supervisors && person.supervisors.length) {
        addText(item, " (Guide" + (person.supervisors.length > 1 ? "s" : "") + ": " + person.supervisors.join(", ") + ")");
      }
      byId(listId).appendChild(item);
    });
  }

  renderPeople("current-scholars", data.scholars);
  renderPeople("alumni-list", data.alumni);
})();
