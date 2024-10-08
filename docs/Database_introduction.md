# Welcome to PlasmidScope database


<div align=center><img src="/Figures/Plasmid_database.png" width="80%"></div>

## Data description
PlasmidScope integrates **1,045,624** plasmids from various databases, including **86,009** plasmids from **RefSeq** [1], **92,008** plasmids from **Genbank** [2], **6,266** plasmids from **ENA** [3], **5,333** plasmids from **DDBJ** [4], **7** plasmids from **TPA** [5], **50,554** plasmids from **PLSDB** [6], **699,973** plasmids from **IMG/PR** [7], **12,084** plasmids from **COMPASS** [8], **898** plasmids from **Kraken2** [9], **92,492** plasmids from **mMGE** [10]. After data curation, we identified a total of **852,600** unique plasmid sequences.

Applying multiple state-of-the-art tools to analyzing the plasmid sequences, we obtained **comprehensive annotations** for the plasmids.

### Host information
Host information indicates the organism(s) that a plasmid exists in or extracts from. Knowing the host range of plasmids can help researchers understand the impacts of the plasmids on the physiological features of the hosts or identify the communications among the hosts.

To obtain the host information, we extracted the related information from the background of plasmids **manually with text mining**. Among the **852,600** plasmids, the host information of **360,583** plasmids (42.29%) is available from the data submitters, while the other **492,017** plasmids (57.71%) are unavailable. In addition, we provided the complete taxonomy ranks for the host with the information from **NCBI taxonomy database** [11].

### Topology
The topological structure of a plasmid can significantly influence its behavior, replication, stability, and interaction with the hosts. 

According to the topological structures, plasmids can be divided into four types: circular plasmid, linear plasmid, plasmids with direct terminal repeats, and plasmids with inverted terminal repeats. Circular plasmids are the most common and typically the most stable, while linear plasmids and those with terminal repeats have specialized mechanisms to ensure their maintenance and function within the host. To obtain the topological information, we extracted the related information from the background of plasmids **manually with text mining**. Overall, PlasmidScope contains **75,454 circular plasmids** (8.85%), **645,375 linear plasmids** (75.70%), **124,254 plasmids with direct terminal repeats** (14.57%), **2,577 plasmids with inverted terminal repeats** (0.30%), and **4,940 plasmids with concatemer** (0.58%).

### Mobility
The mobility of a plasmid refers to its ability to transfer from one bacterial cell to another. This is a key feature in horizontal gene transfer, contributing to the spread of genetic traits such as antibiotic resistance, virulence factors, and metabolic capabilities among bacterial populations. The mobility of plasmids reflects their ability to transfer between cells, significantly influencing bacterial adaptability, gene dissemination, and evolutionary dynamics. 

According to the types of mobility, we divided the plasmids into conjugative plasmids, mobilizable plasmids, and non-mobilizable plasmids. PlasmidScope adopted the **MOB-suite** [12] to deduce the mobility of the plasmids. In summary, PlasmidScope identified **49,143 conjugative plasmids** (5.76%), **106,800 mobilizable plasmids** (12.53%), and 696,657 **non-mobilizable plasmids** (81.71%).

### Completeness
Plasmid completeness refers to the extent to which a plasmid genome has been achieved. The quality and completeness of the collected plasmids vary considerably.

To obtain reliable completeness information, we extracted the information on plasmid genome completeness from the background of plasmids manually with text mining. According to the statistical results, **208,350 sequences** (24.44%) are complete plasmids and **530,318 sequences** (62.20%) are incomplete plasmids.

### ORF prediction & protein annotation
ORF stands for Open Reading Frame and represents a region of DNA that has the potential to be translated into a protein. In PlasmidScope, information about ORFs and annotated proteins provides insights into the predicted genes and their corresponding proteins within the plasmid genomes. These annotations are crucial for the understanding of the genetic content of plasmids, identifying potential virulence factors, antibiotic resistance genes, secondary metabolites, etc.

The plasmids from RefSeq, Genbank, ENA, DDBJ, and TPA contained the annotated genetic features. For the plasmids collected from PLSDB, IMG/PR, COMPASS, Kraken2, and mMGE, we first applied **Prokka** [13] to identify the ORFs, and then employed **eggNOG-mapper** [14] to annotate the protein functions by assigning orthologs. A total of **25,231,059 proteins** were identified, which were categorized into **26 classes**, including carbohydrate transport and metabolism, posttranslational modification, cell cycle control, etc.

### Virulence factors and antibiotic resistance genes
Virulence factors (VFs) are molecules produced by pathogens that enhance their ability to cause disease. VFs help the pathogen invade the host, evade the immune system, and obtain nutrients from the host. Antibiotic resistance genes (ARGs) encode proteins that enable bacteria to survive in the presence of antibiotics. The presence of virulence factors and antibiotic resistance genes on plasmids could enhance bacterial adaptability, pathogenicity, and survival, contributing to the spread of infectious diseases and complicating their treatment.

PlasmidScope employed **Diamond** [15] and **Virulence Factor Database** [16] to identify VFs on plasmids, resulting in a collection of **306,218 VFs** which can be categorized into **14 classes**, including invasion, immune modulation, adherence, etc. In addition, PlasmidScope adopted **RGI** [17] and **Comprehensive Antibiotic Resistance Database** [18] to identify ARGs, leading to **21,090,397 ARGs** which can be categorized into **70 drug resistance classes**, including cephalosporin, fluoroquinolone antibiotic, aminoglycoside, etc. 

### tRNAs & tmRNAs
tRNA (transfer RNA) and tmRNA (transfer-messenger RNA) on plasmids play significant roles in enhancing protein synthesis, maintaining translational efficiency, and ensuring cellular quality control. Their presence can confer a variety of physiological advantages to the host, including protein production enhancement, stress response, and genetic flexibility, which contribute to bacterial adaptability and survival in diverse environments.

PlasmidScope applied **ARAGORN** [19] to detect tRNA and tmRNA genes in plasmid sequences, leading to the delineation of **81,963 tRNA** and **755 tmRNA**.

### CRISPR/Cas systems
The CRISPR/Cas (Clustered Regularly Interspaced Short Palindromic Repeats and CRISPR-associated proteins) system is a form of adaptive immunity found in bacteria and archaea. It provides hosts with a defense mechanism against invading genetic elements such as viruses (bacteriophages) and plasmids. In addition, the CRISPR/Cas systems on plasmids regulates horizontal gene transfer and enhances bacterial adaptability, offering powerful tools for synthetic biology and biotechnology.

PlasmidScope used **CRISPRCasTyper** [20] to identify CRISPR/Cas systems on plasmids, and discovered a total of **4,083 CRISPR/Cas systems** distributed in 1,045,930 plasmids. PlasmidScope provide the type and location of the CRISPR and CAS for each CRISPR/Cas systems, along with their sequences for further analysis.

### Secondary metabolites
Secondary metabolites encoded by genes on plasmids can provide natural cyclic peptides with significant clinical applications, influencing the host's survival, competitiveness, and interactions with the environment. They can provide advantages in terms of antibiotic production, nutrient acquisition, defense against predators and competitors, symbiotic interactions, and environmental adaptation. The presence of these genes on plasmids also allows for their rapid spread through horizontal gene transfer, promoting the evolution and diversification of microbial populations.

PlasmidScope employed **antiSMASH** [21] to identify the secondary metabolites within the plasmids. The resulting collection of **40,446 secondary metabolites** has been made available within the PlasmidScope database, which was divided into **74 biosynthetic gene clusters types** including non-ribosomal peptide synthetases, type I and type II polyketide synthases, the ribosomally synthesised and post-translationally modified peptide, etc.

### Signal peptides
Signal peptides are short amino acid sequences typically found at the N-terminus of a newly synthesized protein. They serve as "address tags" that direct the protein to its correct location within the cell or for secretion outside the cell. The presence of signal peptide-encoding genes on plasmids facilitates the rapid spread of virulence factors and antibiotic resistance genes through horizontal gene transfer, promoting adaptation and survival of hosts in diverse environments.

PlasmidScope applied **SignalP** [22] to identify the signal peptides among the predicted proteins. In summary, a total of **2,710,395** proteins were identified as signal peptides, which can be categorized into **5 classes**, including metallo-beta-lactamase type 2, mercuric transport protein periplasmic component, cation efflux system protein CusC, etc.

### Transmembrane proteins
Transmembrane proteins are proteins that span the lipid bilayer of cell membranes. The annotation of transmembrane proteins provides information on the presence and characteristics of such proteins within the plasmid genomes. These annotations offer insights into the potential interactions between plasmid and host cell membrane and their roles in plasmid infection and release.

PlasmidScope applied **TMHMM** [23] to detect the transmembrane proteins among the predicted proteins. A total of **5,191,488** proteins were identified as helical membrane proteins, exhibiting **1-48 transmembrane helices**. The resultant set of transmembrane proteins, coupled with their corresponding **topology information**, has been made accessible through the PlasmidScope database.

### Protein structures
Protein structure is fundamental to the proper function, stability, specificity, and regulation of proteins. It plays a critical role in health and disease, biotechnology, and the effectiveness of plasmid-encoded proteins. Understanding and maintaining proper protein structure is essential for harnessing the full potential of proteins in biological systems and applications.

PlasmidScope applied **ESMFold** [24] to predict the structure of the **25,231,059** proteins. The predicted protein structure can be viewed on PlasmidScope, which also supports the download of the PDB structure file. 

### Comparative genomic studies
Comparative genomic studies, including sequence alignment and comparative tree construction, are also provided for the curated plasmids.

## References
[1] O’Leary,N.A., Wright,M.W., Brister,J.R., Ciufo,S., Haddad,D., McVeigh,R., Rajput,B., Robbertse,B., Smith-White,B., Ako-Adjei,D., et al. (2015) Reference sequence (refseq) database at NCBI: Current status, taxonomic expansion, and functional annotation. Nucleic Acids Research, 44, D733-45. <br>
[2] Benson,D.A., Cavanaugh,M., Clark,K., Karsch-Mizrachi,I., Ostell,J., Pruitt,K.D. and Sayers,E.W. (2017) GenBank. Nucleic Acids Research, 46, D41-D47. <br>
[3] Kanz,C. (2004) The EMBL nucleotide sequence database. Nucleic Acids Research, 33, D29-33. <br>
[4] Ogasawara,O., Kodama,Y., Mashima,J., Kosuge,T. and Fujisawa,T. (2019) DDBJ database updates and Computational Infrastructure Enhancement. Nucleic Acids Research, 48, D45-D50. <br>
[5] Cochrane,G., Bates,K., Apweiler,R., Tateno,Y., Mashima,J., Kosuge,T., Mizrachi,I.K., Schafer,S. and Fetchko,M. (2006) Evidence standards in experimental and inferential INSDC Third Party Annotation Data. OMICS: A Journal of Integrative Biology, 10, 105–113. <br>
[6] Schmartz,G.P., Hartung,A., Hirsch,P., Kern,F., Fehlmann,T., Müller,R. and Keller,A. (2021) PLSDB: Advancing a comprehensive database of bacterial plasmids. Nucleic Acids Research, 50, D273–D278.<br>
[7] Camargo,A.P., Call,L., Roux,S., Nayfach,S., Huntemann,M., Palaniappan,K., Ratner,A., Chu,K., Mukherjeep,S., Reddy,T.B., et al. (2023) IMG/PR: A database of plasmids from genomes and metagenomes with rich annotations and metadata. Nucleic Acids Research, 52, D164–D173.<br>
[8] Douarre,P.-E., Mallet,L., Radomski,N., Felten,A. and Mistou,M.-Y. (2020) Analysis of Compass, a new comprehensive plasmid database revealed prevalence of Multireplicon and extensive diversity of INCF plasmids. Frontiers in Microbiology, 11, 483.<br>
[9] Wood,D.E., Lu,J. and Langmead,B. (2019) Improved metagenomic analysis with Kraken 2. Genome Biology, 20, 257. <br>
[10] Lai,S., Jia,L., Subramanian,B., Pan,S., Zhang,J., Dong,Y., Chen,W.-H. and Zhao,X.-M. (2020) mMGE: A database for human metagenomic extrachromosomal mobile genetic elements. Nucleic Acids Research, 49, D783-D791. <br>
[11] Federhen,S. (2011) The NCBI Taxonomy Database. Nucleic Acids Research, 40, D136-43. <br>
[12] Robertson,J., Bessonov,K., Schonfeld,J. and Nash,J.H. (2020) Universal whole-sequence-based plasmid typing and its utility to prediction of host range and epidemiological surveillance. Microbial Genomics, 6, mgen000435. <br>
[13] Seemann,T. (2014) Prokka: Rapid Prokaryotic Genome Annotation. Bioinformatics, 30, 2068–2069.<br>
[14] Cantalapiedra,C.P., Hernández-Plaza,A., Letunic,I., Bork,P. and Huerta-Cepas,J. (2021) Eggnog-mapper V2: Functional annotation, Orthology assignments, and domain prediction at the metagenomic scale. Molecular Biology and Evolution, 38, 5825–5829.<br>
[15] Buchfink,B., Reuter,K. and Drost,H.-G. (2021) Sensitive protein alignments at tree-of-life scale using Diamond. Nature Methods, 18, 366–368.<br>
[16] Chen,L. (2004) VFDB: A reference database for bacterial virulence factors. Nucleic Acids Research, 33, D325-8.<br>
[17] McArthur,A.G., Waglechner,N., Nizam,F., Yan,A., Azad,M.A., Baylay,A.J., Bhullar,K., Canova,M.J., De Pascale,G., Ejim,L., et al. (2013) The comprehensive antibiotic resistance database. Antimicrobial Agents and Chemotherapy, 57, 3348–3357. <br>
[18] Alcock,B.P., Huynh,W., Chalil,R., Smith,K.W., Raphenya,A.R., Wlodarski,M.A., Edalatmand,A., Petkau,A., Syed,S.A., Tsang,K.K., et al. (2022) Card 2023: Expanded curation, support for machine learning, and resistome prediction at the comprehensive antibiotic resistance database. Nucleic Acids Research, 51, D690-D699.<br>
[19] Laslett,D. (2004) Aragorn, a program to detect trna genes and tmrna genes in nucleotide sequences. Nucleic Acids Research, 32, 11–16.<br>
[20] Russel,J., Pinilla-Redondo,R., Mayo-Muñoz,D., Shah,S.A. and Sørensen,S.J. (2020) CRISPRCASTYPER: Automated Identification, annotation, and classification of CRISPR/Cas Loci. The CRISPR Journal, 3, 462–469. <br>
[21] Blin,K., Shaw,S., Augustijn,H.E., Reitz,Z.L., Biermann,F., Alanjary,M., Fetter,A., Terlouw,B.R., Metcalf,W.W., Helfrich,E.J., et al. (2023) Antismash 7.0: New and improved predictions for detection, regulation, chemical structures and visualisation. Nucleic Acids Research, 51, W46-W50.<br>
[22] Teufel,F., Almagro Armenteros,J.J., Johansen,A.R., Gíslason,M.H., Pihl,S.I., Tsirigos,K.D., Winther,O., Brunak,S., von Heijne,G. and Nielsen,H. (2022) SIGNALP 6.0 predicts all five types of signal peptides using protein language models. Nature Biotechnology, 40, 1023–1025. <br>
[23] Krogh,A., Larsson,B., von Heijne,G. and Sonnhammer,E.L.L. (2001) Predicting transmembrane protein topology with a hidden Markov model: Application to complete genomes11edited by F. Cohen. Journal of Molecular Biology, 305, 567–580. <br>
[24] Lin,Z., Akin,H., Rao,R., Hie,B., Zhu,Z., Lu,W., Smetanin,N., Verkuil,R., Kabeli,O., Shmueli,Y., et al. (2023) Evolutionary-scale prediction of atomic-level protein structure with a language model. Science, 379, 1123–1130. 
