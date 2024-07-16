import Discord from './Discord';

export type Response = {
    text: string;
    price: Array<string>;
    id: string;
    media: string;
    url: string;
    created_at: string;
    profile: Profile;
}

type Profile = {
    screen_name: string;
    name: string;
}

export class Yuris extends Discord {

    private readonly wishList: Array<string> = ['controle', 'mouse', 'nintendo'];

    constructor() {
        super()
        if (!Bun.env?.WEBHOOK) throw new Error('Adicione URL no .env no WEBHOOK=');
    }

    public async start(): Promise<void> {
        const data = await this.get();
        for await (let i of data) {
            for (let j of this.wishList) {
                if (Cache.productId.includes(i.id)) continue;
                if (i.text.toLowerCase().includes(j.toLowerCase())) {
                    Cache.productId.push(i.id);
                    await this.post(i);
                }
            }
        }
    }

    private async get(): Promise<Response[]> {
        const response = await fetch('https://api.yurisroom.dev/?limit=20')
        if (response.status != 200) return [];

        const { data } = await response.json();
        return data;
    }
}

class Cache {
    public static productId: Array<string> = [];
}
