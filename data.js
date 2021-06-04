import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { getSelfEthicist } from './reshape-data.js'

config()
const api = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_KEY
)

const main = async () => {
    const {
        data: data,
        error: err1,
        count,
    } = await api.from('data').select(`id`, { count: 'exact' })

    const { data: q70, error: err2 } = await api.from('group_by_q70').select()

    const error = err1 | err2

    if (error) {
        console.error('API-ERROR:\n', error)
        return
    }

    // const reshapedArr = data.map(reshapeData)
    const selfEthicist = getSelfEthicist(q70) // :: Array
    console.log(selfEthicist)
    const result = {
        name: '',
        children: [
            {
                name: 'identity',
                children: [
                    { name: 'self-ethicist', children: selfEthicist },
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
