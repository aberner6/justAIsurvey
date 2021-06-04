import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import reshapeData from './reshape-data.js'

config()
const api = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_KEY
)

const main = async () => {
    let {
        data: data,
        error,
        count,
    } = await api
        .from('data')
        .select(
            `id,response_id, created, email, q7,q70,q71,q65,q9,q30,q133,q149,q33,q139,q155,q35,q141,q157,q36,q142,q158,q14,q37,q143,q159,q51,q144,q160`,
            { count: 'exact' }
        )

    if (error) {
        console.error('API-ERROR:\n', error)
        return
    }

    const reshapedArr = data.map(reshapeData)

    const result = {
        name: '',
        children: [
            {
                name: 'identity',
                children: [
                    { name: 'self-ethicist', children: [] },
                    { name: 'others-ethicist', children: [] },
                    { name: 'funding', children: [] },
                    { name: 'years in field', children: [] },
                    { name: 'education', children: [] },
                    { name: 'career path', children: [] },
                ],
            },
            {
                name: 'theme',
                children: [
                    { name: 'topics', children: [] },
                    { name: 'domain', children: [] },
                    { name: 'outputs', children: [] },
                    { name: 'audiences', children: [] },
                    { name: 'collab type', children: [] },
                    { name: 'collab field', children: [] },
                ],
            },
            { responses: count },
        ],
    }

    console.log(result)
}

main().catch(console.error)
