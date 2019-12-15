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


const openDebitModal = () => {
  debitModal.style.display = 'block';
};

const closeDebitModal = () => {
  debitModal.style.display = 'none';
};

const openCreditModal = () => {
  creditModal.style.display = 'block';
};

const closeCreditModal = () => {
  creditModal.style.display = 'none';
};

const openActivateModal = () => {
  activateModal.style.display = 'block';
};

const closeActivateModal = () => {
  activateModal.style.display = 'none';
};

const openDeactivateModal = () => {
  deactivateModal.style.display = 'block';
};
const closeDeactivateModal = () => {
  deactivateModal.style.display = 'none';
};

const openDeleteModal = () => {
  deleteModal.style.display = 'block';
};

const openViewModal = () => {
  viewModal.style.display = 'block';
};

const closeViewModal = () => {
  viewModal.style.display = 'none';
};

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
