// Q71 - seen by others as ethicist
// Q14 Paid work @Daniel update there - forgot to add it before
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

// q7
export function getYearsInField(latest, data) {
    const initVal = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 0,
        28: 0,
        29: 0,
        30: 0,
        31: 0,
        32: 0,
        33: 0,
        34: 0,
        35: 0,
        36: 0,
        37: 0,
        38: 0,
        39: 0,
        40: 0,
        41: 0,
        42: 0,
        43: 0,
        44: 0,
        45: 0,
        46: 0,
        47: 0,
        48: 0,
        49: 0,
        50: 0,
        '50+': 0,
    }

    const values = calculateValues(initVal)(latest.q7)

    const template = {
        q: 'years',
        parent: 'years in field',
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

// q9
export function getEducation(latest, data) {
    const initVal = {
        '#agriculture': 0,
        '#architecture': 0,
        '#biology': 0,
        '#business': 0,
        '#computer science': 0,
        '#data science': 0,
        '#design & art': 0,
        '#economics': 0,
        '#education': 0,
        '#engineering & technology': 0,
        '#health': 0,
        '#history': 0,
        '#information management': 0,
        '#languages': 0,
        '#law': 0,
        '#mathematics': 0,
        '#media': 0,
        '#environmental science': 0,
        '#politics': 0,
        '#psychology': 0,
        '#philosophy': 0,
        '#social sciences': 0,
        '#sports': 0,
        '#other': 0,
    }

    const values = calculateValues(initVal)(latest.q9)

    const template = {
        q: 'education',
        parent: 'education',
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

    return [...generated, ...defaultOptions].map((it) => ({
        ...it,
        name: it.name.replace('#', ''),
    }))
}
