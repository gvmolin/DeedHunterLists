import * as manager from "../programs/program.js";
import * as path from "../programs/paths.js"

const recover = document.querySelector('#recover-password');
recover.addEventListener('click', async()=>{ //<-------controller
    document.querySelector('#form-login').style.display = 'none';
    document.querySelector('#form-recover-password').style.display = 'block';
    document.querySelector('#recover-password b').style.display ='none';
    document.querySelector('#rec-email').focus();
    //alert("Chegou até aqui");
});


