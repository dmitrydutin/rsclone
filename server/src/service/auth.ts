import { Tokens } from '../database/main';

export const getSessionByToken = async (token: string) => {
    const session = await Tokens.findOne({
        attributes: ['userId', 'expiresAt'],
        where: { token },
    });

    const result = session && new Date(session.expiresAt).getTime() > Date.now() ? session : null;

    if (!result && session) {
        await Tokens.destroy({
            where: { token },
        });
    }

    return result;
};
