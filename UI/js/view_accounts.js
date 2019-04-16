const viewModal = document.getElementById('viewModal');

const viewBtn = document.getElementsByClassName('view');

const viewButton = document.getElementById('viewBtn');

const deleteModal = document.getElementById('deleteModal');

const deleteBtn = document.getElementsByClassName('delete');

const delBtn = document.getElementById('deleteBtn');

if (viewBtn.length !== 0) {
  for (let i = 0; i < viewBtn.length; i += 1) {
    viewBtn[i].addEventListener('click', () => {
      viewModal.style.display = 'block';
    });
  }
}

if (deleteBtn.length !== 0) {
  for (let i = 0; i < deleteBtn.length; i += 1) {
    deleteBtn[i].addEventListener('click', () => {
      deleteModal.style.display = 'block';
    });
  }
}

const closeDeleteModal = () => {
  deleteModal.style.display = 'none';
}

const closeViewModal = () => {
  viewModal.style.display = 'none';
}

viewButton.addEventListener('click', closeViewModal);

delBtn.addEventListener('click', closeDeleteModal);
