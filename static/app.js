// ---- Sample data: London music communities & meetups ----
const communities = [
  {
    name: "Peckham Jazz Collective",
    genre: "jazz",
    area: "Peckham · SE15",
    members: "2.4k",
    thumb: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200&q=70",
    faces: [11, 32, 5],
  },
  {
    name: "Hackney Techno Underground",
    genre: "techno",
    area: "Hackney Wick · E9",
    members: "5.1k",
    thumb: "https://images.unsplash.com/photo-1571266028243-e4733b0f3f0a?w=200&q=70",
    faces: [12, 45, 23],
  },
  {
    name: "Brixton Afrobeats Crew",
    genre: "afrobeats",
    area: "Brixton · SW9",
    members: "3.8k",
    thumb: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&q=70",
    faces: [8, 60, 14],
  },
  {
    name: "Camden Indie Heads",
    genre: "indie",
    area: "Camden · NW1",
    members: "1.9k",
    thumb: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=70",
    faces: [33, 21, 9],
  },
  {
    name: "Croydon D&B Massive",
    genre: "dnb",
    area: "Croydon · CR0",
    members: "4.2k",
    thumb: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=200&q=70",
    faces: [52, 17, 41],
  },
  {
    name: "Soho Soul Society",
    genre: "soul",
    area: "Soho · W1",
    members: "1.3k",
    thumb: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=70",
    faces: [3, 28, 36],
  },
];

const events = [
  {
    d: "12", m: "Jun", title: "Late Night Jazz Jam", where: "Total Refreshment Centre",
    cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=70",
  },
  {
    d: "14", m: "Jun", title: "Warehouse Techno", where: "Bermondsey Arches",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=70",
  },
  {
    d: "18", m: "Jun", title: "Afrobeats Block Party", where: "Brixton Village",
    cover: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=70",
  },
  {
    d: "21", m: "Jun", title: "Indie Open Mic", where: "The Dublin Castle",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=70",
  },
];

// ---- Render helpers ----
const $ = (s) => document.querySelector(s);
const face = (id) => `https://i.pravatar.cc/40?img=${id}`;

let activeGenre = "all";
let query = "";

function renderCommunities() {
  const list = communities.filter((c) => {
    const matchGenre = activeGenre === "all" || c.genre === activeGenre;
    const matchQuery =
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.genre.toLowerCase().includes(query) ||
      c.area.toLowerCase().includes(query);
    return matchGenre && matchQuery;
  });

  const wrap = $("#communities");
  if (!list.length) {
    wrap.innerHTML = `<p style="color:var(--muted);font-size:13px;text-align:center;padding:24px 0">No crews match that — try another genre.</p>`;
    return;
  }

  wrap.innerHTML = list
    .map(
      (c, i) => `
    <article class="card" style="animation-delay:${i * 60}ms">
      <img class="thumb" src="${c.thumb}" alt="${c.name}" loading="lazy" />
      <div class="body">
        <p class="name">${c.name}</p>
        <p class="meta"><span class="tag-pill">${c.genre}</span>${c.area}</p>
        <div class="facepile">
          ${c.faces.map((f) => `<img src="${face(f)}" alt="" />`).join("")}
          <small>${c.members} members</small>
        </div>
      </div>
      <button class="join" data-name="${c.name}">Join</button>
    </article>`
    )
    .join("");
}

function renderEvents() {
  $("#events").innerHTML = events
    .map(
      (e, i) => `
    <article class="event" style="animation-delay:${i * 70}ms">
      <div class="cover" style="background-image:linear-gradient(transparent 50%, rgba(7,5,20,0.6)), url('${e.cover}')">
        <div class="date"><span class="d">${e.d}</span><span class="m">${e.m}</span></div>
      </div>
      <div class="info">
        <h3>${e.title}</h3>
        <p>📍 ${e.where}</p>
      </div>
    </article>`
    )
    .join("");
}

// ---- Toast ----
let toastTimer;
function toast(msg) {
  let t = $(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1900);
}

// ---- Events / interactivity ----
document.addEventListener("click", (e) => {
  // Genre chips
  const chip = e.target.closest(".chip");
  if (chip) {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    activeGenre = chip.dataset.genre;
    renderCommunities();
    return;
  }

  // Join buttons
  const join = e.target.closest(".join");
  if (join) {
    if (join.classList.contains("joined")) {
      join.classList.remove("joined");
      join.textContent = "Join";
      toast(`Left ${join.dataset.name}`);
    } else {
      join.classList.add("joined");
      join.textContent = "Joined ✓";
      toast(`You joined ${join.dataset.name} 🎶`);
    }
    return;
  }

  // Tab bar
  const tab = e.target.closest(".tab");
  if (tab) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    const labels = {
      home: "Home",
      discover: "Discover the London scene",
      create: "Start a new community",
      events: "Your events",
      chat: "Your crews",
    };
    if (tab.dataset.tab !== "home") toast(labels[tab.dataset.tab]);
    $("#scroll").scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // CTA
  if (e.target.closest(".cta")) {
    $("#scroll").scrollTo({ top: 400, behavior: "smooth" });
  }
});

$("#search").addEventListener("input", (e) => {
  query = e.target.value.trim().toLowerCase();
  renderCommunities();
});

// ---- Boot ----
renderCommunities();
renderEvents();
