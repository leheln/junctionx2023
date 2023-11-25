import OpenAI from 'openai';
import {Base64Image, ConsumptionRaw} from '@/packages/consumption/types';
import prompt from '@/packages/consumption/logic/prompt';

const openai = new OpenAI({
    apiKey: ''
});

const MAX_TRIES = 3;

export async function recognize(image: Base64Image): Promise<ConsumptionRaw> {
    let tries = 0;
    while (tries < MAX_TRIES) {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-vision-preview',
            messages: [
                {
                    role: 'user',
                    content: [
                        {type: 'text', text: prompt},
                        {
                            type: 'image_url',
                            image_url: {
                                'url': image
                            }
                        }
                    ]
                }
            ],
            max_tokens: 1500
        });

        // Extracting JSON from response
        const regex = /{([\s\S]*)}/;
        const match = response.choices[0].message.content.match(regex);
        const consumptionRaw: ConsumptionRaw = JSON.parse(match[0]);
        if (consumptionRaw.success) {
            return consumptionRaw;
        }
    }
    throw new Error('Couldn\'t recognize utility bill.');
}