const teamModal = document.getElementById('teamModal');
const closeModalButton = document.getElementById('closeModal');
const logoButton = document.getElementById('logoButton');

function openTeamModal() {
  teamModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  closeModalButton.focus();
}
function closeTeamModal() {
  teamModal.classList.remove('open');
  document.body.style.overflow = '';
}
logoButton.addEventListener('click', openTeamModal);
document.querySelectorAll('[data-open-team]').forEach(button => button.addEventListener('click', openTeamModal));
closeModalButton.addEventListener('click', closeTeamModal);
teamModal.addEventListener('click', event => { if (event.target === teamModal) closeTeamModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeTeamModal(); });

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a, button').forEach(item => item.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const track = document.getElementById('carouselTrack');
const cards = Array.from(track.querySelectorAll('.project-card'));
const dots = document.getElementById('carouselDots');
let activeIndex = 0;

cards.forEach((card, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (index === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'מעבר לתוצר ' + (index + 1));
  dot.addEventListener('click', () => moveTo(index));
  dots.appendChild(dot);
});
function moveTo(index) {
  activeIndex = (index + cards.length) % cards.length;
  cards[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  updateDots();
}
function updateDots() {
  Array.from(dots.children).forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
}
document.getElementById('prevBtn').addEventListener('click', () => moveTo(activeIndex - 1));
document.getElementById('nextBtn').addEventListener('click', () => moveTo(activeIndex + 1));
track.addEventListener('scroll', () => {
  let nearest = 0, minDistance = Infinity;
  const edge = track.getBoundingClientRect().right;
  cards.forEach((card, index) => {
    const distance = Math.abs(card.getBoundingClientRect().right - edge);
    if (distance < minDistance) { minDistance = distance; nearest = index; }
  });
  activeIndex = nearest;
  updateDots();
}, { passive: true });

const safariLetters = [
    {
        title: "סטילס",
        text: "צילום, תמונות ואלמנטים חזותיים שמוסיפים חיים לתוצרים."
    },
    {
        title: "פיתוח",
        text: "בניית לומדות, אתרים ורכיבים אינטראקטיביים."
    },
    {
        title: "אילוסטרציה",
        text: "איורים וגרפיקות מקוריות שמעניקים לתוכן אופי."
    },
    {
        title: "רשתות",
        text: "תוכן ועיצוב לעולמות הדיגיטל והרשתות."
    },
    {
        title: "יצירה",
        text: "רעיונות חדשים, חשיבה יצירתית והפיכת רעיונות לתוצרים."
    }
];

function showSafariLetter(index) {
    document.getElementById("letterTitle").textContent =
        safariLetters[index].title;

    document.getElementById("letterText").textContent =
        safariLetters[index].text;

    document.querySelectorAll(".letter-card").forEach((button, i) => {
        button.classList.toggle("active", i === index);
    });
}