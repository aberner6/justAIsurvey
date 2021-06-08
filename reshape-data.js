// Q70 - ethicist
// Q71 - seen by others as ethicist
// q14 - funded
// Q65 - Career stage
// Q7 - Number of years in the field? this is a free-form response I think and has to be converted to numbers
// Q9 - #education ;
// Q30/133/149 - topic ;
// Q33/139/155 - #domain
// Q35/141/157 - Collaborates? (y/n)
// Q36/142/158 - Fields collaborators belong to
// Q14 - Works on data ethics as paid work (y/n)
// Q37/143/159 - Types of outputs
// Q51/144/160 - Types of audiences

// calculateValues :: String -> String -> Object
const calculateValues = (initValues) => (q) => {
    if (q === null || q === '')
        return Object.keys(initValues).reduce(
            (last_obj, key) => ({ ...last_obj, [key]: -1 }), // -1 on all values if skipped question
            {}
        )
    else {
        const latestChoice = { [q]: 1 } // 1 if picked
        return { ...initValues, ...latestChoice } // build values with default
    }
}

//q70
export function getSelfEthicist(latest, data) {
    const initVal = {
        Yes: 0,
        No: 0,
    }

    const values = calculateValues(initVal)(latest.q70)
    const template = {
        q: 'do you identify as an ethicist?',
        parent: 'self-ethicist',
    }

    let needDefault = Object.keys(values)

    const generated = data.map(({ answer, count }) => {
        const val = values[answer]
        if (typeof val === 'undefined') {
            throw new Error(
                `Missing value type, make sure to add all possible values. value searched: (${answer})`
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

//q71
export function getOthersEthicist(latest, data) {
    const initVal = {
        Yes: 0,
        No: 0,
    }

    const values = calculateValues(initVal)(latest.q71)

    const template = {
        q: 'do others identify you as an ethicist?',
        parent: 'others-ethicist',
    }

    let needDefault = Object.keys(values)

    const generated = data.map(({ answer, count }) => {
        const val = values[answer]
        if (typeof val === 'undefined') {
            throw new Error(
                `Missing value type, make sure to add all possible values. value searched: (${answer})`
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

// q14
export function getFunding(latest, data) {
    const initVal = {
        Yes: 0,
        No: 0,
    }

    const values = calculateValues(initVal)(latest.q14)

    const template = {
        q: 'are you funded?',
        parent: 'funding',
    }

    let needDefault = Object.keys(values)

    const generated = data.map(({ answer, count }) => {
        const val = values[answer]
        if (typeof val === 'undefined') {
            throw new Error(
                `Missing value type, make sure to add all possible values. value searched: (${answer})`
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
