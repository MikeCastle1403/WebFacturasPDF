/**
 * DocuFlow — Document Management Platform Client-side Logic
 */

// Toast notification manager
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  if (type === 'success') {
    toast.style.borderLeftColor = 'var(--color-success)';
  } else if (type === 'error') {
    toast.style.borderLeftColor = 'var(--color-error)';
  }

  // Toast icon
  const icon = document.createElement('span');
  icon.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  `;
  
  const text = document.createElement('span');
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.2s ease-in';
    setTimeout(() => toast.remove(), 200);
  }, 3500);
}

// Modal handling
function openUploadModal() {
  const modal = document.getElementById('uploadModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeUploadModal() {
  const modal = document.getElementById('uploadModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function closeUploadModalOnBackdrop(event) {
  if (event.target.id === 'uploadModal') {
    closeUploadModal();
  }
}

function handleSimulatedUpload() {
  const fileInput = document.getElementById('modalFileInput');
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    closeUploadModal();
    showToast(`"${fileName}" selected. Upload endpoint ready for phase 2.`, 'success');
  } else {
    showToast('Please select a file to upload or proceed with the project setup.', 'info');
  }
}

// Keyboard shortcuts & DOMContentLoaded initialization
document.addEventListener('DOMContentLoaded', () => {
  // Global search shortcut (Ctrl+K or Cmd+K)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('globalSearchInput');
      if (searchInput) {
        searchInput.focus();
      }
    } else if (e.key === 'Escape') {
      closeUploadModal();
    }
  });

  // Dropzone drag-and-drop enhancements
  const dropzones = [
    document.getElementById('mainDropzone'),
    document.getElementById('modalDropzone')
  ];

  dropzones.forEach(zone => {
    if (!zone) return;
    
    ['dragenter', 'dragover'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.style.borderColor = 'var(--color-primary)';
        zone.style.backgroundColor = '#EFF6FF';
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.style.borderColor = '';
        zone.style.backgroundColor = '';
      });
    });

    zone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        showToast(`Selected "${files[0].name}" via drag-and-drop.`, 'success');
      }
    });
  });

  // File input change handler
  const modalFileInput = document.getElementById('modalFileInput');
  if (modalFileInput) {
    modalFileInput.addEventListener('change', () => {
      if (modalFileInput.files.length > 0) {
        showToast(`Selected "${modalFileInput.files[0].name}".`, 'info');
      }
    });
  }
});
