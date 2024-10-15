import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getUserByToken } from '$lib/user';

export const load: LayoutServerLoad = async function ({ cookies, url }) {
    const token = cookies.get(JWT_TOKEN_COOKIE_NAME)!;

    let user = await getUserByToken(token);

    if (user === null) {
        throw redirect(302, '/logout');
    }

    const tabsProps: Record<string, { name: string; description: string; icon: string }> = {
        profile: {
            name: 'Perfil',
            description:
                'Visualize e edite suas informações pessoais, como nome, foto e biografia.',
            icon: 'mdi:user'
        },
        account: {
            name: 'Conta',
            description:
                'Gerencie as configurações da sua conta, como e-mail, senha e métodos de autenticação.',
            icon: 'mdi:cog'
        },
        privacy: {
            name: 'Privacidade',
            description:
                'Controle quem pode ver suas informações e gerencie as permissões de dados.',
            icon: 'mdi:key'
        },
        notifications: {
            name: 'Notificações',
            description: 'Configure suas preferências de notificação, como e-mails e alertas.',
            icon: 'mdi:bell'
        },
        security: {
            name: 'Segurança',
            description:
                'Ajuste as configurações de segurança, como autenticação de dois fatores e dispositivos conectados.',
            icon: 'mdi:shield'
        }
    };
    const validTabs = ['profile', 'account', 'privacy', 'notifications', 'security'];

    const tab = url.searchParams.get('tab');

    if (tab === null || !validTabs.includes(tab)) {
        throw redirect(304, '/settings?tab=profile');
    }

    return {
        user: user!,
        validTabs: validTabs,
        tabsProps: tabsProps
    };
};
