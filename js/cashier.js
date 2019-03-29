window.onload = function(){
    const cash_transactions_act = document.getElementById('cash-transactions1'),
          view_users_act        = document.getElementById('view-users'),
          actions               = [cash_transactions_act,view_users_act];

          view_users_act.style.display = 'none';
    
    
          function show(index){
              for(let i = 0; i < actions.length; i++){
    
                   if(i !== index)
                   {
                      actions[i].style.display = 'none';
                   }
                   else
                   {
                       actions[i].style.display = 'block';
                   }
              }
          }
    
         show(0);
    
    
          const cash_transactions = document.getElementById('cash_transactions'),
          view_users              = document.getElementById('view_users');
    
          const buttons = [cash_transactions,view_users];
          buttons[0].addEventListener('click',()=>{
            show(0)
          },false);
          buttons[1].addEventListener('click',()=>{
            show(1)
          },false);
    
    
    
    
    
          const creditModal  = document.getElementById('creditModal');
          const creditBtn    = document.getElementById('credit');
          const closeBtn     = document.getElementById('closeBtn') ;
          const debitModal   = document.getElementById('debitModal');
          const debitBtn     = document.getElementById('debit');
          const closeBtn2    = document.getElementById('closeBtn2') ;
          const activateModal= document.getElementById('activateModal');
          const activBtn     = document.getElementById('activate');
          const activateBtn  = document.getElementById('activateBtn');
          const deactivateModal= document.getElementById('deactivateModal');
          const deactivBtn     = document.getElementById('deactivate');
          const deactivateBtn = document.getElementById('deactivateBtn');
          const deleteModal   = document.getElementById('deleteModal');
          const deleteBtn     = document.getElementById('delete');
          const delBtn        = document.getElementById('deleteBtn');
          const viewModal     = document.getElementById('viewModal');
          const viewBtn       = document.getElementById('view');
          const viewButton    = document.getElementById('viewBtn');
    
    
    
          debitBtn.addEventListener('click',openDebitModal);
          closeBtn.addEventListener('click', closeCreditModal)
          creditBtn.addEventListener('click',openCreditModal);
          closeBtn2.addEventListener('click',closeDebitModal);
          window.addEventListener('click',closeOutsideModal);
          activBtn.addEventListener('click',openActivateModal);
          activateBtn.addEventListener('click',closeActivateModal);
          deactivBtn.addEventListener('click',openDeactivateModal);
          deactivateBtn.addEventListener('click',closeDeactivateModal);
          deleteBtn.addEventListener('click',openDeleteModal);
          delBtn.addEventListener('click',closeDeleteModal);
          viewBtn.addEventListener('click',openViewModal);
          viewButton.addEventListener('click',closeViewModal);
    
    
          function openCreditModal(){
              creditModal.style.display = 'block';
          }
          function openDebitModal(){
            debitModal.style.display = 'block';
        }
    
          function closeDebitModal(){
            debitModal.style.display = 'none';
        }
        function closeCreditModal(){
            creditModal.style.display = 'none';
        }
         
        function openActivateModal(){
            activateModal.style.display = 'block';
        }
        function closeActivateModal(){
            activateModal.style.display = 'none';
        }
        function openDeactivateModal(){
            deactivateModal.style.display = 'block';
        }
        function closeDeactivateModal(){
            deactivateModal.style.display = 'none';
        }
        function openDeleteModal(){
            deleteModal.style.display = 'block';
        }
        function closeDeleteModal(){
            deleteModal.style.display = 'none';
        }
        function openViewModal(){
            viewModal.style.display = 'block';
        }
        function closeViewModal(){
            viewModal.style.display = 'none';
        }
        function closeOutsideModal(e){
            if (e.target == creditModal)
            {
            creditModal.style.display = 'none';
            }
            else if (e.target == debitModal)
            {
                debitModal.style.display = 'none';
            }
            else if(e.target == activateModal){
                debitModal.style.display = 'none';
            }
            else if(e.target == viewModal){
                viewModal.style.display = 'none';
            }
        }
    }
    