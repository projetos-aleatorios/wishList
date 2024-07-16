import type { Response } from './Yuris';

export default abstract class Discord {
    protected async post(data: Response): Promise<void> {
        const response = await fetch(Bun.env.WEBHOOK!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": "Ritsushiki",
                "avatar_url": "https://i.imgur.com/w3DLduH.gif",
                "embeds": [
                    {
                        "title": data.profile.screen_name,
                        "url": `https://${data.url.replace('https://', '')}`,
                        "description": data.text,
                        "color": 15258703,
                        "image": {
                            "url": data.media
                        }
                    }
                ]
            })
        })

        if (response.status != 200) return;
    }

}