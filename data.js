import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { getSelfEthicist, getOthersEthicist, getFunding } from './reshape-data.js'

config() // load env
const api = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_KEY
)

const main = async () => {
    // fire up promises
    const countP = api.from('data').select(`id`, { count: 'exact' })
    const q70P = api.from('group_by_q70').select()
    const q71P = api.from('group_by_q71').select()
    const q65P = api.from('group_by_q65').select()
    const q14P = api.from('group_by_q14').select()

    // await the promises
    const { data: data, error: err1, count } = await countP
    const { data: q70, error: err2 } = await q70P
    const { data: q71, error: err3 } = await q71P
    const { data: q65, error: err4 } = await q65P
    const { data: q14, error: err5 } = await q14P

    const error = err1 || err2 || err3 || err4 || err5

    if (error) {
        console.error('API-ERROR:\n', error)
        return
    }

    // const reshapedArr = data.map(reshapeData)
    const selfEthicist = getSelfEthicist(q70) // :: Array
    const othersEthicist = getOthersEthicist(q71) // :: Array
    const funding = getFunding(q14) // :: Array

    const result = {
        name: '',
        children: [
            {
                name: 'identity',
                children: [
                    { name: 'self-ethicist', children: selfEthicist },
                    { name: 'others-ethicist', children: othersEthicist },
                    { name: 'funding', children: funding },
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

    console.dir(result, { depth: null })
}

main().catch(console.error)
