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

const loginBtn = document.querySelector('#btn-login')
loginBtn.addEventListener('click', async(event)=>{
    event.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const str = `
        {
            "email":"${email}",
            "password":"${password}"
        }
    `

    const json = JSON.parse(str)
    const result = await manager.postData(json, path.login)


    console.log(result)
    if(result.login == 'true'){
        window.location.replace("/");
    }else{
        alert('EMAIL OU SENHA INCORRETO(S)')
    }
})

