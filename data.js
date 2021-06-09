import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import {
    getSelfEthicist,
    getOthersEthicist,
    getFunding,
    getYearsInField,
    getEducation,
    getCareer,
    getTopics,
    getDomain,
} from './reshape-data.js'

config() // load env
const api = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_KEY
)

const main = async () => {
    // fire up promises
    const dataP = api
        .from('data')
        .select()
        .order('created_time', { ascending: false })
        .limit(1)
        .single()
    const countP = api.from('data').select('id', { count: 'exact' })
    const q70P = api.from('group_by_70').select()
    const q71P = api.from('group_by_71').select()
    const q65P = api.from('group_by_65').select()
    const q14P = api.from('group_by_14').select()
    const q7P = api.from('group_by_7').select()
    const q9P = api.from('group_by_9').select()

    const q30q133q149P = api.from('group_by_30_133_149').select()
    const q33q139q155P = api.from('group_by_33_139_155').select()

    // await the promises
    // data :: Object
    const { data: data, error: err } = await dataP
    const { error: err1, count } = await countP
    const { data: q70, error: err2 } = await q70P
    const { data: q71, error: err3 } = await q71P
    const { data: q65, error: err4 } = await q65P
    const { data: q14, error: err5 } = await q14P
    const { data: q7, error: err6 } = await q7P
    const { data: q9, error: err7 } = await q9P

    const { data: q30_q133_q149, error: err8 } = await q30q133q149P
    const { data: q33_q139_q155, error: err9 } = await q33q139q155P

    const error =
        err ||
        err1 ||
        err2 ||
        err3 ||
        err4 ||
        err5 ||
        err6 ||
        err7 ||
        err8 ||
        err9

    if (error) {
        console.error('API-ERROR:\n', error)
        return
    }
    console.log(data)

    //identity
    const selfEthicist = getSelfEthicist(data, q70) // :: Array
    const othersEthicist = getOthersEthicist(data, q71) // :: Array
    const funding = getFunding(data, q14) // :: Array
    const yearsInField = getYearsInField(data, q7) // :: Array
    const education = getEducation(data, q9) // :: Array
    const career = getCareer(data, q65) // :: Array

    //theme
    const topic = getTopics(data, q30_q133_q149) // :: Array
    const domain = getDomain(data, q33_q139_q155) // :: Array

    const result = {
        name: '',
        children: [
            {
                name: 'identity',
                children: [
                    { name: 'self-ethicist', children: selfEthicist },
                    { name: 'others-ethicist', children: othersEthicist },
                    { name: 'funding', children: funding },
                    { name: 'years in field', children: yearsInField },
                    { name: 'education', children: education },
                    { name: 'career path', children: career },
                ],
            },
            {
                name: 'theme',
                children: [
                    { name: 'topics', children: topic },
                    { name: 'domain', children: domain },
                    { name: 'outputs', children: [] },
                    { name: 'audiences', children: [] },
                    { name: 'collab type', children: [] },
                    { name: 'collab field', children: [] },
                ],
            },
            { responses: count },
        ],
    }

    console.dir(result.children[1].children, { depth: null })
    // console.dir(result, { depth: null })
}

main().catch(console.error)
