document.addEventListener('DOMContentLoaded', () => {
  // Alsó jogi elfogadó sáv: egyszer elfogadva az adott böngészőben eltűnik.
  const termsAccepted = localStorage.getItem('penzugyiTermsAccepted') === '1';
  const termsBar = document.createElement('div');
  termsBar.className = 'terms-bar' + (termsAccepted ? ' hidden' : '');
  termsBar.setAttribute('role', 'region');
  termsBar.setAttribute('aria-label', 'Jogi tájékoztató és feltételek elfogadása');
  termsBar.innerHTML = `
    <div class="terms-bar-inner">
      <div class="terms-bar-text"><strong>Fontos jogi tájékoztató:</strong> a weboldal használata és a digitális termékek igénybevétele előtt kérjük, ismerd meg az <a href="aszf.html">ÁSZF-et</a>, az <a href="adatkezeles.html">Adatkezelési tájékoztatót</a> és az <a href="impresszum.html">Impresszumot</a>.</div>
      <label class="terms-bar-check"><input type="checkbox" id="siteTermsAccept"> <span>Megismertem és elfogadom a feltételeket.</span></label>
      <button class="terms-bar-btn" type="button" id="siteTermsButton">Elfogadom</button>
    </div>`;
  document.body.appendChild(termsBar);

  const termsCheckbox = termsBar.querySelector('#siteTermsAccept');
  const termsButton = termsBar.querySelector('#siteTermsButton');
  termsButton.addEventListener('click', () => {
    if (!termsCheckbox.checked) {
      alert('Kérlek, jelöld be, hogy megismerted és elfogadod a feltételeket.');
      termsCheckbox.focus();
      return;
    }
    localStorage.setItem('penzugyiTermsAccepted', '1');
    termsBar.classList.add('hidden');
    setTimeout(() => termsBar.remove(), 400);
  });

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
