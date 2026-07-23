// ─── SERVICIOS CON IMÁGENES ───
const svcs = [
  {
    icon: '🔧',
    title: 'Reparación de Montacargas',
    desc: 'Diagnóstico y reparación de fallas mecánicas, hidráulicas y eléctricas.',
    imgs: [
      './assets/reparacion.png',
      './assets/reparacion1.png',
      './assets/reparacion2.png'
    ]
  },
  {
    icon: '📅',
    title: 'Mantenimiento Preventivo y Correctivo',
    desc: 'Programas personalizados para maximizar la vida útil de los equipos.',
    imgs: [
      './assets/mantenimiento.png',
      './assets/mantenimiento1.png',
      './assets/mantenimiento2.png'
    ]
  },
  {
    icon: '🚛',
    title: 'Renta de Montacargas',
    desc: 'Equipos disponibles para necesidades temporales o proyectos especiales.',
    imgs: [
      './assets/renta.png',
      './assets/renta1.png',
      './assets/renta2.png'
    ]
  },
  {
    icon: '🛒',
    title: 'Venta de Equipos Nuevos',
    desc: 'Montacargas para diferentes capacidades y aplicaciones industriales.',
    imgs: [
      './assets/EquiposNuevos.png',
      './assets/EquiposNuevos1.png',
      './assets/EquiposNuevos2.png'
    ]
  },
  {
    icon: '📦',
    title: 'Venta de Refacciones y Llantas',
    desc: 'Refacciones originales y compatibles para múltiples marcas.',
    imgs: [
      './assets/refaccion.png',
      './assets/refaccion1.png',
      './assets/refaccion2.png'
    ]
  },
  {
    icon: '👷',
    title: 'Maniobras con Operador',
    desc: 'Servicio especializado para movimientos de carga y logística interna.',
    imgs: [
      './assets/maniobras.png',
      './assets/maniobras1.png',
      './assets/maniobras2.png'
    ]
  }
];

// Crear tarjetas
const grid = document.getElementById('srvGrid');
const cur = svcs.map(() => 0);

svcs.forEach((s, si) => {
  const card = document.createElement('div');
  card.className = 'srv-card';

  card.innerHTML = `
    <div class="car-wrap" id="cw${si}">
      ${s.imgs.map((src, i) => `
        <div class="car-slide${i === 0 ? ' active' : ''}">
          <img src="${src}" alt="${s.title}" loading="lazy">
        </div>
      `).join('')}

      <div class="car-dots">
        ${s.imgs.map((_, i) => `
          <div class="car-dot${i === 0 ? ' on' : ''}" id="cd${si}_${i}"></div>
        `).join('')}
      </div>
    </div>

    <div class="card-body">
      <div class="card-icon">${s.icon}</div>
      <div class="card-title">${s.title}</div>
      <div class="card-desc">${s.desc}</div>
      <a class="card-link" href="#contacto">Solicitar servicio →</a>
    </div>
  `;

  grid.appendChild(card);
});

// Rotación automática de imágenes
svcs.forEach((s, si) => {
  setTimeout(() => {
    setInterval(() => {

      const prev = cur[si];
      const next = (prev + 1) % s.imgs.length;

      const wrap = document.getElementById(`cw${si}`);

      wrap.querySelectorAll('.car-slide')[prev].classList.remove('active');
      wrap.querySelectorAll('.car-slide')[next].classList.add('active');

      document.getElementById(`cd${si}_${prev}`).classList.remove('on');
      document.getElementById(`cd${si}_${next}`).classList.add('on');

      cur[si] = next;

    }, 4000);
  }, si * 700);
});

// ─── MENÚ HAMBURGUESA / PANEL LATERAL ───
const navbar = document.getElementById('navbar');
const hamBtn = document.getElementById('hamBtn');
const drawerCloseBtn = document.getElementById('drawerCloseBtn');
const drawerOverlay = document.getElementById('drawerOverlay');

function openDrawer() {
  navbar.classList.add('mob-open');
  hamBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  navbar.classList.remove('mob-open');
  hamBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamBtn) {
  hamBtn.addEventListener('click', () => {
    navbar.classList.contains('mob-open') ? closeDrawer() : openDrawer();
  });
}
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});

document.querySelectorAll('.nav-drawer a, .nav-links a').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// Cierra el panel si la ventana crece a escritorio
window.addEventListener('resize', () => {
  if (window.innerWidth > 960) closeDrawer();
});

// ─── ENVÍO DEL FORMULARIO DE CONTACTO (Formspree) ───
const contactForm = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    sendBtn.disabled = true;
    sendBtn.textContent = 'Enviando...';
    formMsg.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMsg.style.color = '#2E7D32';
        formMsg.textContent = '¡Solicitud enviada! Le contactaremos pronto.';
        contactForm.reset();
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      formMsg.style.color = '#c62828';
      formMsg.textContent = 'Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp.';
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = '✉️ Enviar Solicitud';
    }
  });
}