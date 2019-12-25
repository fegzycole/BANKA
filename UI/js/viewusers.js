const activateModal = document.getElementById('activateModal');

const activateBtn = document.getElementsByClassName('activate');

const activBtn = document.getElementById('activateBtn');

const deactivateModal = document.getElementById('deactivateModal');

const deactivateBtn = document.getElementsByClassName('deactivate');

const deactivBtn = document.getElementById('deactivateBtn');

if (activateBtn.length !== 0) {
  for (let i = 0; i < activateBtn.length; i += 1) {
    activateBtn[i].addEventListener('click', () => {
      activateModal.style.display = 'block';
    });
  }
}

if (deactivateBtn.length !== 0) {
  for (let i = 0; i < deactivateBtn.length; i += 1) {
    deactivateBtn[i].addEventListener('click', () => {
      deactivateModal.style.display = 'block';
    });
  }
}

const closeActivateModal = () => {
  activateModal.style.display = 'none';
}

const closeDeactivateModal = () => {
  deactivateModal.style.display = 'none';
}

activBtn.addEventListener('click', closeActivateModal);

deactivBtn.addEventListener('click', closeDeactivateModal);
