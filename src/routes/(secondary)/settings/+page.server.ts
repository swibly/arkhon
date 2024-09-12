import type { Actions } from './$types';

export const actions: Actions = {
    default: async function (event) {        
        const token = event.cookies.get('key');

        if(token){
            event.cookies.delete('key', {path: "/"})                    
        }
    }
};