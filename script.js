const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Фильтрация карточек курсов
const filterButtons = document.querySelectorAll('.filter');
const courseCards = document.querySelectorAll('.course-card');
const emptyState = document.getElementById('emptyState');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    let visibleCount = 0;
    courseCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visibleCount++;
    });
    emptyState.hidden = visibleCount !== 0;
  });
});

// Модальное окно записи
const modal = document.getElementById('enrollModal');
const modalCourse = document.getElementById('modalCourse');
const form = document.getElementById('enrollForm');
const successMessage = document.getElementById('successMessage');

function openModal(course) {
  modalCourse.textContent = course;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  successMessage.hidden = true;
  form.hidden = false;
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('.enroll-btn').forEach(button => {
  button.addEventListener('click', () => openModal(button.dataset.course));
});
modal.querySelectorAll('[data-close]').forEach(element => element.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  form.hidden = true;
  successMessage.hidden = false;
});
document.getElementById('year').textContent = new Date().getFullYear();
