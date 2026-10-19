// Main JavaScript for CV Ta'aruf Khairul Badri

document.addEventListener('DOMContentLoaded', () => {
  // ================= 0. ACCESS GATE & 30-MINUTE SESSION AUTH =================
  const AUTH_CONFIG = {
    DEFAULT_KEY: '11223344',
    SESSION_DURATION_MS: 30 * 60 * 1000, // 30 Minutes
    TOKEN_KEY: 'cv_taaruf_auth_token',
    EXPIRES_KEY: 'cv_taaruf_auth_expires'
  };

  const authGate = document.getElementById('authGate');
  const appContent = document.getElementById('appContent');
  const authForm = document.getElementById('authForm');
  const accessKeyInput = document.getElementById('accessKeyInput');
  const authErrorMsg = document.getElementById('authErrorMsg');
  const toggleKeyBtn = document.getElementById('toggleKeyVisibility');
  const btnLockCV = document.getElementById('btnLockCV');
  const btnLockCVMobile = document.getElementById('btnLockCVMobile');

  let swiperInstance = null;

  function initSwiper() {
    if (!swiperInstance && document.querySelector('.photo-slider')) {
      swiperInstance = new Swiper('.photo-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        grabCursor: true,
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        speed: 500,
      });
    }
  }

  function isSessionValid() {
    const savedToken = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    const expiresAt = localStorage.getItem(AUTH_CONFIG.EXPIRES_KEY);
    if (!savedToken || !expiresAt) return false;
    
    // Check if 30 minutes expired
    if (Date.now() > parseInt(expiresAt, 10)) {
      clearSession();
      return false;
    }
    return savedToken === AUTH_CONFIG.DEFAULT_KEY;
  }

  function grantAccess(key) {
    const expiresAt = Date.now() + AUTH_CONFIG.SESSION_DURATION_MS;
    localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, key);
    localStorage.setItem(AUTH_CONFIG.EXPIRES_KEY, expiresAt.toString());
    unlockContent();
  }

  function clearSession() {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.EXPIRES_KEY);
  }

  function unlockContent() {
    document.body.classList.remove('locked');
    if (authGate) authGate.classList.add('hidden');
    if (appContent) {
      appContent.classList.remove('hidden');
    }
    initSwiper();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function lockContent(isExpired = false) {
    document.body.classList.add('locked');
    if (appContent) appContent.classList.add('hidden');
    if (authGate) authGate.classList.remove('hidden');
    if (accessKeyInput) {
      accessKeyInput.value = '';
      accessKeyInput.focus();
    }
    if (authErrorMsg) {
      if (isExpired) {
        authErrorMsg.textContent = 'Sesi akses telah berakhir (30 menit). Silakan masukkan kode kembali.';
        authErrorMsg.classList.remove('hidden');
      } else {
        authErrorMsg.classList.add('hidden');
      }
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Initial Auth Check on Page Load
  if (isSessionValid()) {
    unlockContent();
  } else {
    lockContent(false);
  }

  // Periodic expiration checker (runs every 10 seconds)
  setInterval(() => {
    if (!document.body.classList.contains('locked')) {
      if (!isSessionValid()) {
        lockContent(true);
      }
    }
  }, 10000);

  // Form submission handler
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredKey = accessKeyInput ? accessKeyInput.value.trim() : '';
      if (enteredKey === AUTH_CONFIG.DEFAULT_KEY) {
        if (authErrorMsg) authErrorMsg.classList.add('hidden');
        grantAccess(enteredKey);
        showToast('Akses berhasil dibuka!');
      } else {
        if (authErrorMsg) {
          authErrorMsg.textContent = 'Kode akses salah. Silakan periksa kembali.';
          authErrorMsg.classList.remove('hidden');
          authErrorMsg.classList.remove('animate-shake');
          void authErrorMsg.offsetWidth; // Trigger reflow for shake animation
          authErrorMsg.classList.add('animate-shake');
        }
        if (accessKeyInput) {
          accessKeyInput.select();
        }
      }
    });
  }

  // Toggle Password/Key Visibility
  if (toggleKeyBtn && accessKeyInput) {
    toggleKeyBtn.addEventListener('click', () => {
      const isPass = accessKeyInput.type === 'password';
      accessKeyInput.type = isPass ? 'text' : 'password';
      const eyeIcon = toggleKeyBtn.querySelector('[data-lucide]');
      if (eyeIcon) {
        eyeIcon.setAttribute('data-lucide', isPass ? 'eye-off' : 'eye');
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // Manual Lock Buttons (Desktop & Mobile)
  [btnLockCV, btnLockCVMobile].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        clearSession();
        lockContent(false);
        showToast('Dokumen CV berhasil dikunci.');
      });
    }
  });

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 3. Image Modal / Lightbox
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const closeModalBtn = document.getElementById('closeModal');

  const photoSlides = document.querySelectorAll('.photo-slider img');
  photoSlides.forEach((img) => {
    img.addEventListener('click', () => {
      if (modal && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        if (modalTitle) {
          modalTitle.textContent = img.dataset.title || 'Foto Profil Ta\'aruf';
        }
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 4. Print / PDF Button Action
  const printBtns = document.querySelectorAll('.btn-print-cv');
  printBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.lucide) {
        window.lucide.createIcons();
      }
      window.print();
    });
  });

  // 5. Copy Link to Clipboard
  const shareBtn = document.getElementById('btn-share-cv');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const url = window.location.href;
      try {
        await navigator.clipboard.writeText(url);
        showToast('Tautan CV Ta\'aruf berhasil disalin!');
      } catch (err) {
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Tautan CV Ta\'aruf berhasil disalin!');
      }
    });
  }

  // 6. Toast Notification Helper
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
      toast.classList.add('opacity-100', 'translate-y-0');

      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        toast.classList.remove('opacity-100', 'translate-y-0');
      }, 3000);
    }
  }

  // 7. Mobile Navigation Toggle & Smooth Anchor Scrolling with Precise Offset
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scroll handler with precise header offset for all anchor links
  const allNavAnchors = document.querySelectorAll('a[href^="#"]');
  allNavAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        
        // Calculate header height dynamically to prevent overlap
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Close mobile dropdown if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }

        // Update URL hash cleanly
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // 8. Active Nav Link Highlighting on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('main section[id]');
  const desktopNavLinks = document.querySelectorAll('header nav a[href^="#"]');
  
  function highlightNavOnScroll() {
    const scrollPos = window.pageYOffset + 120;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-brand-600', 'bg-brand-50');
            link.classList.remove('text-slate-600');
          } else {
            link.classList.remove('text-brand-600', 'bg-brand-50');
            link.classList.add('text-slate-600');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
});
