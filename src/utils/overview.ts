export const datasetsOption = {
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
        },
        feature: {
            dataView: { readOnly: true },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
        },
    },
    title: {
        text: 'Data Source Distribution',
        left: 'center',
    },
    tooltip: {},
    xAxis: {
        data: [
            'RefSeq',
            'Genbank',
            'EMBL',
            'DDBJ',
            'PhagesDB',
            'GVD',
            'GPD',
            'MGV',
            'TemPhD',
            'CHVD',
            'IGVD',
            'IMG_VR',
            'GOV2',
            'STV',
        ],
        axisLabel: {
            interval: 0,
            fontSize: 12,
            rotate: 19,
        },
    },
    yAxis: {},
    series: [
        {
            name: 'Phages',
            type: 'bar',
            data: [
                2086, 4637, 290, 156, 3754, 142809, 31402, 189680, 66823, 44935, 10021, 177361,
                196699, 4065,
            ],
        },
    ],
}

export const QualityOption = {
    title: {
        text: 'Phage Quality Tier Distribution',
        left: 'center',
    },
    tooltip: {},
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
        },
        feature: {
            dataView: { readOnly: true },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
        },
    },
    xAxis: {
        data: ['Not-determined', 'Low-quality', 'Medium-quality', 'High-quality', 'Complete'],
        axisLabel: {
            rotate: 19,
            fontSize: 13,
        },
    },
    yAxis: {},
    series: [
        {
            name: 'Phages',
            type: 'bar',
            data: [21688, 267050, 212175, 300137, 72668],
        },
    ],
}

export const Hostnumber = {
    title: {
        text: 'Host Phylum Distribution',
        left: 'center',
    },
    tooltip: {},
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
        },
        feature: {
            dataView: { readOnly: true },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
        },
    },
    xAxis: {
        data: [
            'Bacillota',
            'Bacteroidota',
            'Pseudomonadota',
            'Actinomycetota',
            'Thermodesulfobacteriota',
            'Others',
        ],
        axisLabel: {
            interval: 0,
            rotate: 19,
            fontSize: 13,
        },
    },
    yAxis: {},
    series: [
        {
            name: 'Phages',
            type: 'bar',
            data: [167542, 101632, 77669, 21341, 7264, 66189],
        },
    ],
}

export const lifestyleoption = {
    title: {
        text: 'Phage Lifestyle  Distribution',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
    },
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
        },
        feature: {
            dataView: { readOnly: true },
            saveAsImage: {},
        },
    },
    legend: {
        orient: 'vertical',
        left: 'left',

        itemHeight: 14,
        textStyle: {
            fontSize: 14,
        },
    },
    series: [
        {
            name: 'Phages',
            type: 'pie',
            data: [
                { value: 553688, name: 'virulent' },
                { value: 320030, name: 'temperate' },
            ],
            label: {
                fontSize: 15,
            },
        },
    ],
}
export const datasetspieOption = {
    title: {
        text: 'Data Source Distribution',
        left: 'center',
    },
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
        },
        feature: {
            dataView: { readOnly: true },
            saveAsImage: {},
        },
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
            fontSize: 16,
        },
    },
    series: [
        {
            name: 'Phages',
            type: 'pie',
            data: [
                { value: 4637, name: 'RefSeq' },
                { value: 2086, name: 'Genbank' },
                { value: 156, name: 'EMBL' },
                { value: 290, name: 'DDBJ' },
                { value: 3754, name: 'PhagesDB' },
                { value: 31402, name: 'GVD' },
                { value: 142809, name: 'GPD' },
                { value: 189680, name: 'MGV' },
                { value: 66823, name: 'TemPhD' },
                { value: 44935, name: 'CHVD' },
                { value: 10021, name: 'IGVD' },
                { value: 177361, name: 'IMG_VR' },
                { value: 196699, name: 'GOV2' },
                { value: 4065, name: 'STV' },
            ],
            label: {
                fontSize: 15,
            },
        },
    ],
}

export const qualitypieOption = {
    title: {
        text: 'Phage Quality Tier Distribution',
        left: 'center',
    },
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
        },
        feature: {
            dataView: { readOnly: true },
            saveAsImage: {},
        },
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        top: '6',
        left: 'left',
        itemHeight: 14,
        textStyle: {
            fontSize: 14,
        },
    },
    series: [
        {
            name: 'Phages',
            type: 'pie',
            data: [
                { value: 72668, name: 'Complete' },
                { value: 300137, name: 'High-quality' },
                { value: 212175, name: 'Medium-quality' },
                { value: 267050, name: 'Low-quality ' },
                { value: 21688, name: 'Not-determined' },
            ],
            label: {
                fontSize: 15,
            },
        },
    ],
}

export const hostTypeOptions = {
    title: {
        text: 'Host Phylum Distribution',
        left: 'center',
    },
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
        },
        feature: {
            dataView: { readOnly: true },
            saveAsImage: {},
        },
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        top: 'bottom',
        width: 50,
        orient: 'horizontal',
        itemHeight: 14,
        textStyle: {
            fontSize: 14,
        },
    },
    series: [
        {
            name: 'Phages',
            type: 'pie',
            data: [
                { value: 332494, name: 'Bacillota' },
                { value: 172333, name: 'Pseudomonadota' },
                { value: 153390, name: 'Bacteroidota' },
                { value: 41180, name: 'Actinomycetota' },
                { value: 40633, name: 'Thermodesulfobacteriota' },
                { value: 133688, name: 'Others' },
            ],
            label: {
                fontSize: 15,
            },
        },
    ],
}

export const treedata = [
    {
        name: 'Pseudomonadota',
        value: 77669,
        rank: 'Phylum',
        children: [
            {
                name: 'Gammaproteobacteria',
                value: 71229,
                children: [
                    { name: 'Enterobacterales', value: 64178, children: [], rank: 'Order' },
                    { name: 'Pseudomonadales', value: 2815, children: [], rank: 'Order' },
                    { name: 'Xanthomonadales', value: 341, children: [], rank: 'Order' },
                    { name: 'Pasteurellales', value: 977, children: [], rank: 'Order' },
                    { name: 'Vibrionales', value: 937, children: [], rank: 'Order' },
                    { name: 'Alteromonadales', value: 81, children: [], rank: 'Order' },
                    { name: 'Moraxellales', value: 830, children: [], rank: 'Order' },
                    { name: 'Aeromonadales', value: 459, children: [], rank: 'Order' },
                    { name: 'Oceanospirillales', value: 434, children: [], rank: 'Order' },
                    { name: 'Chromatiales', value: 45, children: [], rank: 'Order' },
                    { name: 'Cellvibrionales', value: 19, children: [], rank: 'Order' },
                    { name: 'Legionellales', value: 43, children: [], rank: 'Order' },
                    { name: 'Cardiobacteriales', value: 35, children: [], rank: 'Order' },
                    { name: 'Methylococcales', value: 10, children: [], rank: 'Order' },
                    { name: 'Thiotrichales', value: 8, children: [], rank: 'Order' },
                    { name: 'Orbales', value: 3, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Alphaproteobacteria',
                value: 1662,
                children: [
                    { name: 'Rhodobacterales', value: 155, children: [], rank: 'Order' },
                    { name: 'Hyphomicrobiales', value: 1000, children: [], rank: 'Order' },
                    { name: 'Rhodospirillales', value: 41, children: [], rank: 'Order' },
                    { name: 'Caulobacterales', value: 45, children: [], rank: 'Order' },
                    { name: 'Sphingomonadales', value: 289, children: [], rank: 'Order' },
                    { name: 'Pelagibacterales', value: 47, children: [], rank: 'Order' },
                    { name: 'Rickettsiales', value: 74, children: [], rank: 'Order' },
                    { name: 'Maricaulales', value: 4, children: [], rank: 'Order' },
                    { name: 'Kordiimonadales', value: 1, children: [], rank: 'Order' },
                    { name: 'Hyphomonadales', value: 2, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Betaproteobacteria',
                value: 4771,
                children: [
                    { name: 'Burkholderiales', value: 3640, children: [], rank: 'Order' },
                    { name: 'Neisseriales', value: 1103, children: [], rank: 'Order' },
                    { name: 'Rhodocyclales', value: 5, children: [], rank: 'Order' },
                    { name: 'Nitrosomonadales', value: 21, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Acidithiobacillia',
                value: 4,
                children: [{ name: 'Acidithiobacillales', value: 4, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Zetaproteobacteria',
                value: 1,
                children: [{ name: 'Mariprofundales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Actinomycetota',
        value: 21341,
        rank: 'Phylum',
        children: [
            {
                name: 'Actinomycetes',
                value: 18121,
                children: [
                    { name: 'Mycobacteriales', value: 7389, children: [], rank: 'Order' },
                    { name: 'Propionibacteriales', value: 264, children: [], rank: 'Order' },
                    { name: 'Kitasatosporales', value: 710, children: [], rank: 'Order' },
                    { name: 'Micromonosporales', value: 105, children: [], rank: 'Order' },
                    { name: 'Micrococcales', value: 1329, children: [], rank: 'Order' },
                    { name: 'Actinomycetales', value: 235, children: [], rank: 'Order' },
                    { name: 'Pseudonocardiales', value: 20, children: [], rank: 'Order' },
                    { name: 'Bifidobacteriales', value: 8053, children: [], rank: 'Order' },
                    { name: 'Actinopolysporales', value: 1, children: [], rank: 'Order' },
                    { name: 'Streptosporangiales', value: 6, children: [], rank: 'Order' },
                    { name: 'Jiangellales', value: 2, children: [], rank: 'Order' },
                    { name: 'Nakamurellales', value: 1, children: [], rank: 'Order' },
                    { name: 'Geodermatophilales', value: 4, children: [], rank: 'Order' },
                    { name: 'Frankiales', value: 2, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Coriobacteriia',
                value: 3181,
                children: [
                    { name: 'Eggerthellales', value: 1367, children: [], rank: 'Order' },
                    { name: 'Coriobacteriales', value: 1814, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            { name: 'Thermoleophilia', value: 1, children: [], rank: 'Class' },
        ],
    },
    {
        name: 'Mycoplasmatota',
        value: 28,
        rank: 'Phylum',
        children: [
            {
                name: 'Mollicutes',
                value: 20,
                children: [
                    { name: 'Acholeplasmatales', value: 2, children: [], rank: 'Order' },
                    { name: 'Entomoplasmatales', value: 10, children: [], rank: 'Order' },
                    { name: 'Mycoplasmatales', value: 8, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Bacillota',
        value: 167542,
        rank: 'Phylum',
        children: [
            {
                name: 'Bacilli',
                value: 23249,
                children: [
                    { name: 'Bacillales', value: 11705, children: [], rank: 'Order' },
                    { name: 'Lactobacillales', value: 11494, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Clostridia',
                value: 131769,
                children: [
                    { name: 'Eubacteriales', value: 126291, children: [], rank: 'Order' },
                    { name: 'Thermoanaerobacterales', value: 9, children: [], rank: 'Order' },
                    { name: 'Thermosediminibacterales', value: 3, children: [], rank: 'Order' },
                    { name: 'Halanaerobiales', value: 12, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Negativicutes',
                value: 7777,
                children: [
                    { name: 'Selenomonadales', value: 1744, children: [], rank: 'Order' },
                    { name: 'Veillonellales', value: 3698, children: [], rank: 'Order' },
                    { name: 'Acidaminococcales', value: 2300, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Erysipelotrichia',
                value: 4567,
                children: [
                    { name: 'Erysipelotrichales', value: 4567, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Tissierellia',
                value: 166,
                children: [{ name: 'Tissierellales', value: 159, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Chlamydiota',
        value: 25,
        rank: 'Phylum',
        children: [
            {
                name: 'Chlamydiia',
                value: 25,
                children: [{ name: 'Chlamydiales', value: 25, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Euryarchaeota',
        value: 19,
        rank: 'Phylum',
        children: [
            {
                name: 'Methanobacteria',
                value: 4,
                children: [{ name: 'Methanobacteriales', value: 4, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Halobacteria',
                value: 12,
                children: [
                    { name: 'Natrialbales', value: 2, children: [], rank: 'Order' },
                    { name: 'Haloferacales', value: 7, children: [], rank: 'Order' },
                    { name: 'Halobacteriales', value: 3, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Methanomicrobia',
                value: 3,
                children: [{ name: 'Methanosarcinales', value: 3, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Bdellovibrionota',
        value: 8,
        rank: 'Phylum',
        children: [
            {
                name: 'Bdellovibrionia',
                value: 5,
                children: [{ name: 'Bdellovibrionales', value: 5, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Bacteriovoracia',
                value: 1,
                children: [{ name: 'Bacteriovoracales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Oligoflexia',
                value: 2,
                children: [
                    { name: 'Silvanigrellales', value: 1, children: [], rank: 'Order' },
                    { name: 'Oligoflexales', value: 1, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Myxococcota',
        value: 3,
        rank: 'Phylum',
        children: [
            {
                name: 'Myxococcia',
                value: 3,
                children: [{ name: 'Myxococcales', value: 3, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Bacteroidota',
        value: 101632,
        rank: 'Phylum',
        children: [
            {
                name: 'Flavobacteriia',
                value: 576,
                children: [{ name: 'Flavobacteriales', value: 576, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Bacteroidia',
                value: 100983,
                children: [
                    { name: 'Bacteroidales', value: 100898, children: [], rank: 'Order' },
                    { name: 'Marinilabiliales', value: 85, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Chitinophagia',
                value: 13,
                children: [{ name: 'Chitinophagales', value: 13, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Cytophagia',
                value: 19,
                children: [{ name: 'Cytophagales', value: 19, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Sphingobacteriia',
                value: 13,
                children: [{ name: 'Sphingobacteriales', value: 13, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Saprospiria',
                value: 1,
                children: [{ name: 'Saprospirales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Cyanobacteriota',
        value: 358,
        rank: 'Phylum',
        children: [
            {
                name: 'Cyanophyceae',
                value: 358,
                children: [
                    { name: 'Synechococcales', value: 318, children: [], rank: 'Order' },
                    { name: 'Pseudanabaenales', value: 9, children: [], rank: 'Order' },
                    { name: 'Chroococcales', value: 8, children: [], rank: 'Order' },
                    { name: 'Oscillatoriales', value: 11, children: [], rank: 'Order' },
                    { name: 'Nostocales', value: 12, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Deinococcota',
        value: 26,
        rank: 'Phylum',
        children: [
            {
                name: 'Deinococci',
                value: 26,
                children: [
                    { name: 'Thermales', value: 23, children: [], rank: 'Order' },
                    { name: 'Deinococcales', value: 3, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Nucleocytoviricota',
        value: 1,
        rank: 'Phylum',
        children: [
            {
                name: 'Megaviricetes',
                value: 1,
                children: [{ name: 'Imitervirales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Campylobacterota',
        value: 1059,
        rank: 'Phylum',
        children: [
            {
                name: 'Epsilonproteobacteria',
                value: 1059,
                children: [
                    { name: 'Campylobacterales', value: 1058, children: [], rank: 'Order' },
                    { name: 'Nautiliales', value: 1, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Nitrososphaerota',
        value: 1,
        rank: 'Phylum',
        children: [
            {
                name: 'Nitrososphaeria',
                value: 1,
                children: [{ name: 'Nitrososphaerales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    { name: 'Discosea', value: 2, rank: 'Phylum', children: [] },
    {
        name: 'Arthropoda',
        value: 2,
        rank: 'Phylum',
        children: [
            {
                name: 'Insecta',
                value: 2,
                children: [{ name: 'Odonata', value: 2, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Chlorophyta',
        value: 1,
        rank: 'Phylum',
        children: [
            {
                name: 'Chlorodendrophyceae',
                value: 1,
                children: [{ name: 'Chlorodendrales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Spirochaetota',
        value: 387,
        rank: 'Phylum',
        children: [
            {
                name: 'Spirochaetia',
                value: 387,
                children: [
                    { name: 'Leptospirales', value: 257, children: [], rank: 'Order' },
                    { name: 'Spirochaetales', value: 110, children: [], rank: 'Order' },
                    { name: 'Brachyspirales', value: 19, children: [], rank: 'Order' },
                    { name: 'Brevinematales', value: 1, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Phixviricota',
        value: 1,
        rank: 'Phylum',
        children: [
            {
                name: 'Malgrandaviricetes',
                value: 1,
                children: [{ name: 'Petitvirales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Fusobacteriota',
        value: 633,
        rank: 'Phylum',
        children: [
            {
                name: 'Fusobacteriia',
                value: 633,
                children: [{ name: 'Fusobacteriales', value: 633, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Aquificota',
        value: 7,
        rank: 'Phylum',
        children: [
            {
                name: 'Aquificae',
                value: 7,
                children: [
                    { name: 'Aquificales', value: 4, children: [], rank: 'Order' },
                    { name: 'Desulfurobacteriales', value: 3, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Uroviricota',
        value: 1,
        rank: 'Phylum',
        children: [{ name: 'Caudoviricetes', value: 1, children: [], rank: 'Class' }],
    },
    {
        name: 'Verrucomicrobiota',
        value: 651,
        rank: 'Phylum',
        children: [
            {
                name: 'Opitutae',
                value: 3,
                children: [
                    { name: 'Puniceicoccales', value: 1, children: [], rank: 'Order' },
                    { name: 'Opitutales', value: 1, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Verrucomicrobiae',
                value: 646,
                children: [{ name: 'Verrucomicrobiales', value: 646, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Spartobacteria',
                value: 2,
                children: [{ name: 'Chthoniobacterales', value: 2, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Chordata',
        value: 42,
        rank: 'Phylum',
        children: [
            {
                name: 'Mammalia',
                value: 42,
                children: [
                    { name: 'Primates', value: 37, children: [], rank: 'Order' },
                    { name: 'Rodentia', value: 2, children: [], rank: 'Order' },
                    { name: 'Artiodactyla', value: 3, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Thermoproteota',
        value: 2,
        rank: 'Phylum',
        children: [
            {
                name: 'Thermoprotei',
                value: 2,
                children: [{ name: 'Sulfolobales', value: 2, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Thermodesulfobacteriota',
        value: 7264,
        rank: 'Phylum',
        children: [
            {
                name: 'Desulfovibrionia',
                value: 7242,
                children: [
                    { name: 'Desulfovibrionales', value: 7242, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Desulfobulbia',
                value: 3,
                children: [{ name: 'Desulfobulbales', value: 3, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Thermodesulfobacteria',
                value: 1,
                children: [
                    { name: 'Thermodesulfobacteriales', value: 1, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Desulfomonilia',
                value: 1,
                children: [{ name: 'Desulfomonilales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Deferrisomatia',
                value: 2,
                children: [{ name: 'Deferrisomatales', value: 2, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Syntrophia',
                value: 2,
                children: [{ name: 'Syntrophales', value: 2, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Desulfuromonadia',
                value: 5,
                children: [
                    { name: 'Geobacterales', value: 4, children: [], rank: 'Order' },
                    { name: 'Desulfuromonadales', value: 1, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Desulfobacteria',
                value: 5,
                children: [{ name: 'Desulfobacterales', value: 5, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Desulfarculia',
                value: 1,
                children: [{ name: 'Desulfarculales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Syntrophobacteria',
                value: 2,
                children: [{ name: 'Syntrophobacterales', value: 2, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Synergistota',
        value: 132,
        rank: 'Phylum',
        children: [
            {
                name: 'Synergistia',
                value: 132,
                children: [{ name: 'Synergistales', value: 132, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Candidatus Thermoplasmatota',
        value: 15,
        rank: 'Phylum',
        children: [
            {
                name: 'Thermoplasmata',
                value: 15,
                children: [
                    { name: 'Methanomassiliicoccales', value: 15, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Lentisphaerota',
        value: 23,
        rank: 'Phylum',
        children: [
            {
                name: 'Lentisphaeria',
                value: 23,
                children: [{ name: 'Victivallales', value: 23, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Thermotogota',
        value: 3,
        rank: 'Phylum',
        children: [
            {
                name: 'Thermotogae',
                value: 3,
                children: [{ name: 'Petrotogales', value: 3, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Elusimicrobiota',
        value: 12,
        rank: 'Phylum',
        children: [
            {
                name: 'Elusimicrobia',
                value: 12,
                children: [{ name: 'Elusimicrobiales', value: 12, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    { name: 'Candidatus Melainabacteria', value: 6, rank: 'Phylum', children: [] },
    {
        name: 'Ignavibacteriota',
        value: 1,
        rank: 'Phylum',
        children: [{ name: 'Ignavibacteria', value: 1, children: [], rank: 'Class' }],
    },
    {
        name: 'Acidobacteriota',
        value: 2,
        rank: 'Phylum',
        children: [
            {
                name: 'Terriglobia',
                value: 1,
                children: [{ name: 'Bryobacterales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
            {
                name: 'Holophagae',
                value: 1,
                children: [{ name: 'Holophagales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Chloroflexota',
        value: 7,
        rank: 'Phylum',
        children: [
            {
                name: 'Anaerolineae',
                value: 3,
                children: [{ name: 'Anaerolineales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    { name: 'Nitrospinota', value: 1, rank: 'Phylum', children: [] },
    {
        name: 'Planctomycetota',
        value: 11,
        rank: 'Phylum',
        children: [
            {
                name: 'Planctomycetia',
                value: 6,
                children: [
                    { name: 'Gemmatales', value: 1, children: [], rank: 'Order' },
                    { name: 'Planctomycetales', value: 2, children: [], rank: 'Order' },
                    { name: 'Pirellulales', value: 3, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            {
                name: 'Candidatus Brocadiia',
                value: 3,
                children: [
                    { name: 'Candidatus Brocadiales', value: 3, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
            { name: 'Phycisphaerae', value: 1, children: [], rank: 'Class' },
        ],
    },
    {
        name: 'Deferribacterota',
        value: 4,
        rank: 'Phylum',
        children: [
            {
                name: 'Deferribacteres',
                value: 4,
                children: [{ name: 'Deferribacterales', value: 4, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    { name: 'Foraminifera', value: 2, rank: 'Phylum', children: [] },
    {
        name: 'Thermomicrobiota',
        value: 1,
        rank: 'Phylum',
        children: [{ name: 'Thermomicrobia', value: 1, children: [], rank: 'Class' }],
    },
    {
        name: 'Balneolota',
        value: 2,
        rank: 'Phylum',
        children: [
            {
                name: 'Balneolia',
                value: 2,
                children: [{ name: 'Balneolales', value: 2, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Rhodothermota',
        value: 1,
        rank: 'Phylum',
        children: [
            {
                name: 'Rhodothermia',
                value: 1,
                children: [{ name: 'Rhodothermales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    { name: 'Candidatus Aminicenantes', value: 3, rank: 'Phylum', children: [] },
    { name: 'Candidatus Moranbacteria', value: 1, rank: 'Phylum', children: [] },
    { name: 'Candidatus Hydrogenedentes', value: 2, rank: 'Phylum', children: [] },
    {
        name: 'Nitrospirota',
        value: 1,
        rank: 'Phylum',
        children: [
            {
                name: 'Thermodesulfovibrionia',
                value: 1,
                children: [
                    { name: 'Thermodesulfovibrionales', value: 1, children: [], rank: 'Order' },
                ],
                rank: 'Class',
            },
        ],
    },
    {
        name: 'Fibrobacterota',
        value: 1,
        rank: 'Phylum',
        children: [
            {
                name: 'Fibrobacteria',
                value: 1,
                children: [{ name: 'Fibrobacterales', value: 1, children: [], rank: 'Order' }],
                rank: 'Class',
            },
        ],
    },
    { name: 'Candidatus Poribacteria', value: 1, rank: 'Phylum', children: [] },
]
