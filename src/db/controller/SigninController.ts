import { connection } from '../connect';
import { Tables } from '../tables';

function date2SigninTime() {
    var date = new Date();
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
    };
}

export async function signedToday(id: number): Promise<boolean> {
    return (
        (
            await connection
                .select('*')
                .where({
                    id,
                    ...date2SigninTime(),
                })
                .from(Tables.Signin)
        )[0] != undefined
    );
}

export async function signin(id: number) {
    var date = new Date();
    await connection(Tables.Signin).insert({ id, ...date2SigninTime() });
}
