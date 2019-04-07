/* eslint-disable semi */
/* eslint-disable no-unused-vars */
const creditModal = document.getElementById('creditModal');
const creditLength = document.getElementsByClassName('deposit').length;
const debitLength = document.getElementsByClassName('withdraw').length;
const closeBtn = document.getElementById('closeBtn');
const debitModal = document.getElementById('debitModal');
const closeBtn2 = document.getElementById('closeBtn2');
const activateModal = document.getElementById('activateModal');
const activBtn = document.getElementById('activBtn');
const activateBtn = document.getElementById('activateBtn');
const deactivateModal = document.getElementById('deactivateModal');
const deactivBtn = document.getElementById('deactivate');
const deactivateBtn = document.getElementById('deactivateBtn');
const deleteModal = document.getElementById('deleteModal');
const deleteBtn = document.getElementById('delete');
const delBtn = document.getElementById('deleteBtn');
const viewModal = document.getElementById('viewModal');
const viewButton = document.getElementById('viewBtn');
function openDebitModal() {
  debitModal.style.display = 'block';
}
function closeDebitModal() {
  debitModal.style.display = 'none';
}
function openCreditModal() {
  creditModal.style.display = 'block';
}
function closeCreditModal() {
  creditModal.style.display = 'none';
}
function openActivateModal() {
  activateModal.style.display = 'block';
}
function closeActivateModal() {
  activateModal.style.display = 'none';
}
function openDeactivateModal() {
  deactivateModal.style.display = 'block';
}
function closeDeactivateModal() {
  deactivateModal.style.display = 'none';
}
function openDeleteModal() {
  deleteModal.style.display = 'block';
}

function openViewModal() {
  viewModal.style.display = 'block';
}
function closeViewModal() {
  viewModal.style.display = 'none';
}
const creditBtn = document.getElementsByClassName('deposit');
if (creditBtn.length !== 0) {
  for (let i = 0; i < creditBtn.length; i += 1) {
    creditBtn[i].addEventListener('click', () => {
      creditModal.style.display = 'block';
    });
  }
}
const debitBtn = document.getElementsByClassName('withdraw');
if (creditBtn.length !== 0) {
  for (let i = 0; i < debitBtn.length; i += 1) {
    debitBtn[i].addEventListener('click', () => {
      debitModal.style.display = 'block';
    });
  }
}

closeBtn.addEventListener('click', closeCreditModal);
closeBtn2.addEventListener('click', closeDebitModal);
// activBtn.addEventListener('click', openActivateModal);
// activateBtn.addEventListener('click', closeActivateModal);
// deactivBtn.addEventListener('click', openDeactivateModal);
// deactivateBtn.addEventListener('click', closeDeactivateModal);
// deleteBtn.addEventListener('click', openDeleteModal);
// delBtn.addEventListener('click', closeDeleteModal);
// viewButton.addEventListener('click', closeViewModal);
