import { estaLogueado, logout } from './auth.js';

export function initializeHeader() {
  const nav = document.querySelector('header nav ul');
  
  if (!nav) return;
  
  const perfilLi = document.createElement('li');
  perfilLi.className = 'perfil-menu';
  perfilLi.style.position = 'relative';
  
  if (estaLogueado()) {
    const username = localStorage.getItem('username') || 'Usuario';
    
    perfilLi.innerHTML = `
      <a href="#" class="perfil-toggle">
        <i class="fa-solid fa-user-circle" style="font-size: 1.5rem;"></i>
        <span style="margin-left: 0.3rem;">${username}</span>
      </a>
      <div class="perfil-dropdown" style="display: none;">
        <a href="#" id="btn-logout">
          <i class="fa-solid fa-right-from-bracket"></i>
          Cerrar Sesión
        </a>
      </div>
    `;
  } else {
    perfilLi.innerHTML = `
      <a href="#" class="perfil-toggle">
        <i class="fa-solid fa-user-circle" style="font-size: 1.5rem;"></i>
      </a>
      <div class="perfil-dropdown" style="display: none;">
        <a href="#" id="btn-login">
          <i class="fa-solid fa-right-to-bracket"></i>
          Iniciar Sesión
        </a>
      </div>
    `;
  }
  
  nav.appendChild(perfilLi);
  
  const style = document.createElement('style');
  style.innerHTML = `
    .perfil-menu {
      position: relative;
    }
    
    .perfil-toggle {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    .perfil-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      min-width: 180px;
      margin-top: 0.5rem;
      z-index: 1000;
    }
    
    .perfil-dropdown a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      color: #333;
      text-decoration: none;
      transition: background 0.2s;
    }
    
    .perfil-dropdown a:hover {
      background: #f5f5f5;
    }
    
    .perfil-dropdown a i {
      font-size: 1.2rem;
    }
  `;
  document.head.appendChild(style);
  
  const toggle = perfilLi.querySelector('.perfil-toggle');
  const dropdown = perfilLi.querySelector('.perfil-dropdown');
  
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });
  
  document.addEventListener('click', (e) => {
    if (!perfilLi.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
  
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
  
  const btnLogin = document.getElementById('btn-login');
  if (btnLogin) {
    btnLogin.addEventListener('click', (e) => {
      e.preventDefault();
      import('./auth.js').then(({ login }) => {
        login();
      });
    });
  }
}
