import _ from 'lodash'

// export const TypeDict = {
//     lysis: { color: '#ec364e', abbr: 'Lys', name: 'Lysis' },
//     integration: { color: '#9dc6e7', abbr: 'Int', name: 'Integration' },
//     replication: { color: '#0FF0BF', abbr: 'Rep', name: 'Replication' },
//     tRNA_related: { color: '#90ed7d ', abbr: 'tRNA-related', name: 'tRNA-related' },
//     regulation: { color: '#445d8f', abbr: 'Reg', name: 'Regulation' },
//     packaging: { color: '#9343f0', abbr: 'Pkg', name: 'Packaging' },
//     assembly: { color: '#45bf43', abbr: 'Asm', name: 'Assembly' },
//     infection: { color: '#5490F8', abbr: 'Inf', name: 'Infection' },
//     immune: { color: '#DF3AD2', abbr: 'Imm', name: 'Immune' },
//     mix: { color: '#ff6500', abbr: 'Mix', name: 'Mix' },
//     hypothetical: { color: '#29cbce', abbr: 'Hyp', name: 'Hypothetical' },
//     unsorted: { color: '#ffa235', abbr: 'Uns', name: 'Unsorted' },
// }

export const TypeDict = {
    J: { color: '#d4e4bc', abbr: 'J', name: 'Translation, ribosomal structure and biogenesis' },
    A: { color: '#96acb7', abbr: 'A', name: 'RNA processing and modification' },
    K: { color: '#36558f', abbr: 'K', name: 'Transcription' },
    L: { color: '#40376e ', abbr: 'L', name: 'Replication, recombination and repair' },
    B: { color: '#48233c', abbr: 'B', name: 'Chromatin structure and dynamics' },
    D: {
        color: '#bcf4de',
        abbr: 'D',
        name: 'Cell cycle control, cell division, chromosome partitioning',
    },
    Y: { color: '#cde5d7', abbr: 'Y', name: 'Nuclear structure' },
    V: { color: '#ded6d1', abbr: 'V', name: 'Defense mechanisms' },
    T: { color: '#eec6ca', abbr: 'T', name: 'Signal transduction mechanisms' },
    M: { color: '#ffb7c3', abbr: 'M', name: 'Cell wall/membrane/envelope biogenesis' },
    N: { color: '#d1d5de', abbr: 'N', name: 'Cell motility' },
    Z: { color: '#b7b6c2', abbr: 'Z', name: 'Cytoskeleton' },
    W: { color: '#837569', abbr: 'W', name: 'Extracellular structures' },
    U: {
        color: '#657153',
        abbr: 'U',
        name: 'Intracellular trafficking, secretion, and vesicular transport',
    },
    O: {
        color: '#8aaa79',
        abbr: 'O',
        name: 'Posttranslational modification, protein turnover, chaperones',
    },
    X: { color: '#272727 ', abbr: 'X', name: 'Mobilome: prophages, transposons' },
    C: { color: '#fed766', abbr: 'C', name: 'Energy production and conversion' },
    G: { color: '#009fb7', abbr: 'G', name: 'Carbohydrate transport and metabolism' },
    E: { color: '#696773', abbr: 'E', name: 'Amino acid transport and metabolism' },
    F: { color: '#eff1f3', abbr: 'F', name: 'Nucleotide transport and metabolism' },
    H: { color: '#381d2a', abbr: 'H', name: 'Coenzyme transport and metabolism' },
    I: { color: '#3e6990', abbr: 'I', name: 'Lipid transport and metabolism' },
    P: { color: '#aabd8c', abbr: 'P', name: 'Inorganic ion transport and metabolism' },
    Q: {
        color: '#e9e3b4',
        abbr: 'Q',
        name: 'Secondary metabolites biosynthesis, transport and catabolism',
    },
    R: { color: '#f39b6d', abbr: 'R', name: 'General function prediction only' },
    S: { color: '#68534d', abbr: 'S', name: 'Function unknown' },
}

export const proteinType = Object.keys(TypeDict)

// export const proteinType = [
//     'hypothetical',
//     'infection',
//     'assembly',
//     'unsorted',
//     'replication',
//     'packaging',
//     'lysis',
//     'regulation',
//     'immune',
//     'integration',
//     'tRNARelated',
//     'mix',
// ]

export const shallowGray = '#dadada'

export const gcTypeDict = {
    content: { color: '#367dd6', name: 'GC Content' },
    plus: { color: '#fb475e', name: 'GC Skew+' },
    minus: { color: '#019992', name: 'GC Skew-' },
}

export const gcType = Object.keys(gcTypeDict)

export const coverageDict = {
    4: { color: '#c4c4c4', text: '<50%' },
    5: { color: '#b1b1b1', text: '>=50%' },
    6: { color: '#a7a7a7', text: '>=60%' },
    7: { color: '#9d9d9d', text: '>=70%' },
    8: { color: '#939393', text: '>=80%' },
    9: { color: '#808080', text: '>=90%' },
}

export const identityDict = {
    4: { color: '#feeff5', text: '< 50%' },
    5: { color: '#fcc2d9', text: '>=50%' },
    6: { color: '#fba9c9', text: '>=60%' },
    7: { color: '#f979ab', text: '>=70%' },
    8: { color: '#f7488c', text: '>=80%' },
    9: { color: '#f5176d', text: '>=90%' },
}

// 计算一个字符串中G和C所占百分比
export const countGC = (stringTxt: string) => {
    const gcNumber = _.countBy(stringTxt.split(''), s => {
        return s === 'G' || s === 'C'
    }).true
    if (Number.isNaN(gcNumber) || typeof gcNumber === 'undefined') return 0
    return gcNumber / stringTxt.length
}

export const countGCSkew = (stringTxt: string) => {
    let gNumber = _.countBy(stringTxt.split(''), s => {
        return s === 'G'
    }).true
    let cNumber = _.countBy(stringTxt.split(''), s => {
        return s === 'C'
    }).true
    if (Number.isNaN(gNumber) || typeof gNumber === 'undefined') {
        gNumber = 0
    }
    if (Number.isNaN(cNumber) || typeof cNumber === 'undefined') {
        cNumber = 0
    }
    if (gNumber + cNumber === 0) return 0
    return (gNumber - cNumber) / (gNumber + cNumber)
}
