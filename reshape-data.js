// Q70 - ethicist
// Q71 - seen by others as ethicist
// Q65 - Career stage
// Q9 - #education ;
// Q30/133/149 - topic ;
// Q33/139/155 - #domain
// Q35/141/157 - Collaborates? (y/n)
// Q36/142/158 - Fields collaborators belong to
// Q14 - Works on data ethics as paid work (y/n)
// Q37/143/159 - Types of outputs
// Q51/144/160 - Types of audiences
// Q7 - Number of years in the field? this is a free-form response I think and has to be converted to numbers

export function getSelfEthicist(data) {
    // Possible values, text has to match the options
    const values = {
        Yes: 1,
        No: 0,
    }
    const template = {
        q: 'do you identify as an ethicist?',
        parent: 'self-ethicist',
    }

    let needDefault = Object.keys(values)

    const generated = data.map(({ answer, count }) => {
        const val = values[answer]
        if (typeof val === 'undefined') {
            throw new Error(
                'Missing value type, make sure to add all possible values. (it has to match exactly)'
            )
        }
        // removing values which are taken from db
        needDefault = needDefault.filter((it) => it !== answer)

        return {
            ...template,
            value: val,
            name: answer,
            total: count,
        }
    })

    // In the situation where there are not even 1 answer for certain option,
    // we need to add default for this option which is not in db

    const defaultOptions = needDefault.map((it) => ({
        ...template,
        value: values[it],
        name: it,
        total: 0,
    }))

    return [...generated, ...defaultOptions]
}

export function getOthersEthicist(data) {
    // Possible values, text has to match the options
    const values = {
        Yes: 1,
        No: 0,
    }
    const template = {
        q: 'do others identify you as an ethicist?',
        parent: 'others-ethicist',
    }

    let needDefault = Object.keys(values)

    const generated = data.map(({ answer, count }) => {
        const val = values[answer]
        if (typeof val === 'undefined') {
            throw new Error(
                'Missing value type, make sure to add all possible values. (it has to match exactly)'
            )
        }
        // removing values which are taken from db
        needDefault = needDefault.filter((it) => it !== answer)

        return {
            ...template,
            value: val,
            name: answer,
            total: count,
        }
    })

    // In the situation where there are not even 1 answer for certain option,
    // we need to add default for this option which is not in db

    const defaultOptions = needDefault.map((it) => ({
        ...template,
        value: values[it],
        name: it,
        total: 0,
    }))

    return [...generated, ...defaultOptions]
}
