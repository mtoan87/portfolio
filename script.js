const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Close' : 'Menu';
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = 'Menu';
  });
});

document.querySelectorAll('.video-upload input').forEach((input) => {
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    const frame = input.closest('.video-frame');
    const video = frame?.querySelector('video');
    if (!file || !frame || !video || !file.type.startsWith('video/')) return;

    if (video.dataset.objectUrl) URL.revokeObjectURL(video.dataset.objectUrl);
    const objectUrl = URL.createObjectURL(file);
    video.dataset.objectUrl = objectUrl;
    video.src = objectUrl;
    frame.classList.add('has-video');
  });
});

window.addEventListener('beforeunload', () => {
  document.querySelectorAll('video[data-object-url]').forEach((video) => {
    URL.revokeObjectURL(video.dataset.objectUrl);
  });
});