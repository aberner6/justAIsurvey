import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import reshapeData from './reshape-data.js'

config()
const api = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_KEY
)

const main = async () => {
    let { data: data, error } = await api
        .from('data')
        .select(
            `id,response_id, created, email, q7,q70,q71,q65,q9,q30,q133,q149,q33,q139,q155,q35,q141,q157,q36,q142,q158,q14,q37,q143,q159,q51,q144,q160`
        )

    if (error) {
        console.error('API-ERROR:\n', error)
        return
    }

    const correct_format = data.map(reshapeData)
    // console.log(correct_format)
}

main().catch(console.error)
