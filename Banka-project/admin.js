window.onload = function(){
    const add_staff_act         = document.getElementById('add-staff'),
          view_users_act        = document.getElementById('view-users'),
          view_accounts_act      = document.getElementById('view-accounts'),
          actions               = [add_staff_act,view_users_act,view_accounts_act];
    
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
    
    
          const add_staff         = document.getElementById('add_staff'),
          view_users              = document.getElementById('view_users'),
          view_accounts           = document.getElementById('view_accounts');
    
          const buttons = [add_staff,view_users,view_accounts];
          buttons[0].addEventListener('click',()=>{
            show(0);
          },false);
          buttons[1].addEventListener('click',()=>{
            show(1);
          },false);
          buttons[2].addEventListener('click',()=>{
              show(2);
          },false)
    
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
    
    
          activBtn.addEventListener('click',openActivateModal);
          activateBtn.addEventListener('click',closeActivateModal);
          deactivBtn.addEventListener('click',openDeactivateModal);
          deactivateBtn.addEventListener('click',closeDeactivateModal);
          deleteBtn.addEventListener('click',openDeleteModal);
          delBtn.addEventListener('click',closeDeleteModal);
          viewBtn.addEventListener('click',openViewModal);
          viewButton.addEventListener('click',closeViewModal);
    

         
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
    
    }
    