document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
    a.addEventListener('click', () => links?.classList.remove('open'));
  });

  const cookieTab = document.querySelector('.cookie-tab');
  const cookiePanel = document.querySelector('.cookie-panel');
  const cookieClose = document.querySelector('.cookie-close');
  if(cookieTab && cookiePanel) cookieTab.addEventListener('click',()=>cookiePanel.classList.toggle('show'));
  if(cookieClose) cookieClose.addEventListener('click',()=>cookiePanel.classList.remove('show'));

  const form = document.querySelector('#contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const message = document.querySelector('#message').value.trim();
      if(!name || !email || !message){ alert('Kérlek, töltsd ki az összes mezőt!'); return; }
      const subject = encodeURIComponent('Weboldali érdeklődés – ' + name);
      const body = encodeURIComponent(`Név: ${name}\nE-mail: ${email}\n\nÜzenet:\n${message}`);
      window.location.href = `mailto:netikdomokoserika@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* E-book köztes oldal */
  const legal = document.querySelector('#legalAccept');
  const workbookButtons = [
    document.querySelector('#workbookButton'),
    document.querySelector('#workbookButtonBottom')
  ].filter(Boolean);
  const shopifyButtons = [...document.querySelectorAll('.shopify-btn')];

  function requireLegal(e){
    if (legal && !legal.checked) {
      e.preventDefault();
      alert('A továbblépéshez kérlek, jelöld be az ÁSZF és az Adatkezelési tájékoztató megismerését igazoló jelölőnégyzetet.');
      document.querySelector('#jogi')?.scrollIntoView({behavior:'smooth', block:'center'});
      legal.focus();
      return false;
    }
    return true;
  }

  workbookButtons.forEach(button => button.addEventListener('click', requireLegal));
  shopifyButtons.forEach(button => button.addEventListener('click', requireLegal));

});
