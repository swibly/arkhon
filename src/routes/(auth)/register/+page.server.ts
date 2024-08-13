import { client } from "$lib/server/swibly-api";
import { Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = { default: async function (event) {
    const {firstname, lastname, username, email, password, confirm_pass} = Object.fromEntries(await event.request.formData()) as Record<string, string>;
    if(password === confirm_pass){
        const register = await client.auth.register( {firstname: firstname, lastname: lastname, username: username, email: email, password: password} );
        if(register.error){
            console.log(register.error);
        }else{
            // event.cookies.set('key', register.token!, {path: "/"} );       
            throw redirect(302, '/home');
        }
    }else{
        console.log("As senhas não são idênticas");
    }
} };
