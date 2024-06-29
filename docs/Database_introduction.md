# Welcome to PlasmidScope database


<div align=center><img src="/Figures/Plasmid_database.png" width="80%"></div>

## Data description
PlasmidScope integrates **953,438** plasmids from various databases, including **86,009** plasmids from **RefSeq** [1], **92,310** plasmids from **Genbank** [2], **6,267** plasmids from **EMBL** [3], **5,336** plasmids from **DDBJ** [4], **7** plasmids from **TPA** [5], **50,554** plasmids from **PLSDB** [6], **699,973** plasmids from **IMG/PR** [7], **12,084** plasmids from **COMPASS** [8], **898** plasmids from **Kraken2** [9].

Applying multiple state-of-the-art tools to analyzing the plasmid sequences, we obtained **comprehensive annotations** for the plasmids.

### Host information
Host information indicates the organism(s) that a plasmid exists in or extracts from. Knowing the host range of plasmids can help researchers understand the impacts of the plasmids on the physiological features of the hosts or identify the communications among the hosts.

To obtain the host information, we extracted the related information from the background of plasmids **manually with text mining**. Among the **953,438** plasmids, the host information of **530,875** plasmids (55.86%) is available from the data submitters, while the other **422,563** plasmids (44.32%) are unavailable. In addition, we provided the complete taxonomy ranks for the host with the information from **NCBI taxonomy database** [10].

### Topology
The topological structure of a plasmid can significantly influence its behavior, replication, stability, and interaction with the hosts. 

According to the topological structures, plasmids can be divided into four types: circular plasmid, linear plasmid, plasmids with direct terminal repeats, and plasmids with inverted terminal repeats. Circular plasmids are the most common and typically the most stable, while linear plasmids and those with terminal repeats have specialized mechanisms to ensure their maintenance and function within the host. To obtain the topological information, we extracted the related information from the background of plasmids **manually with text mining**. Overall, PlasmidScope contains **183,970 circular plasmids** (19.30%), **623,451 linear plasmids** (65.39%), **142,805 plasmids with direct terminal repeats** (14.98%), and **3,212 plasmids with inverted terminal repeats** (0.33%).

### Mobility
The mobility of a plasmid refers to its ability to transfer from one bacterial cell to another. This is a key feature in horizontal gene transfer, contributing to the spread of genetic traits such as antibiotic resistance, virulence factors, and metabolic capabilities among bacterial populations. The mobility of plasmids reflects their ability to transfer between cells, significantly influencing bacterial adaptability, gene dissemination, and evolutionary dynamics. 

According to the types of mobility, we divided the plasmids into conjugative plasmids, mobilizable plasmids, and non-mobilizable plasmids. PlasmidScope adopted the **MOB suite** [11] to deduce the mobility of the plasmids. In summary, PlasmidScope identified **88,309 conjugative plasmids** (9.26%), **720,975 mobilizable plasmids** (75.62%), and 144,154 **non-mobilizable plasmids** (15.12%).

### Completeness
Plasmid completeness refers to the extent to which a plasmid genome has been achieved. The quality and completeness of the collected plasmids vary considerably.

To obtain reliable completeness information, we extracted the information on plasmid genome completeness from the background of plasmids manually with text mining. According to the statistical results, **340,490 sequences** (35.71%) are complete plasmids and **612,948 sequences** (64.29%) are incomplete plasmids.

### ORF prediction & protein annotation
ORF stands for Open Reading Frame and represents a region of DNA that has the potential to be translated into a protein. In PlasmidScope, information about ORFs and annotated proteins provides insights into the predicted genes and their corresponding proteins within the plasmid genomes. These annotations are crucial for the understanding of the genetic content of plasmids, identifying potential virulence factors, antibiotic resistance genes, secondary metabolites, etc.

The plasmids from RefSeq, Genbank, EMBL, DDBJ, and TPA contained the annotated genetic features. For the plasmids collected from PLSDB, IMG-PR, COMPASS, and Kraken2, we first applied **Prokka** [12] to identify the ORFs, and then employed **eggNOG-mapper** [13] to annotate the protein functions by assigning orthologs. A total of **39,172,224 proteins** were identified, which were categorized into **26 types**, including carbohydrate transport and metabolism, posttranslational modification, cell cycle control, etc.

### Virulence factors and antibiotic resistance genes
Virulence factors (VFs) are molecules produced by pathogens that enhance their ability to cause disease. VFs help the pathogen invade the host, evade the immune system, and obtain nutrients from the host. Antibiotic resistance genes (ARGs) encode proteins that enable bacteria to survive in the presence of antibiotics. The presence of virulence factors and antibiotic resistance genes on plasmids could enhance bacterial adaptability, pathogenicity, and survival, contributing to the spread of infectious diseases and complicating their treatment.

PlasmidScope employed **Diamond** [14] and **Virulence Factor Database** [15] to identify VFs on plasmids, resulting in a collection of **62,662 VFs** which can be categorized into **14 classes**, including invasion, immune modulation, adherence, etc. In addition, PlasmidScope adopted **RGI** [16] and **Comprehensive Antibiotic Resistance Database** [17] to identify ARGs, leading to **80,591 ARGs** which can be categorized into **70 drug-resistance classes**, including cephalosporin, fluoroquinolone antibiotic, aminoglycoside, etc. 

### tRNAs & tmRNAs
tRNA (transfer RNA) and tmRNA (transfer-messenger RNA) on plasmids play significant roles in enhancing protein synthesis, maintaining translational efficiency, and ensuring cellular quality control. Their presence can confer a variety of physiological advantages to the host, including protein production enhancement, stress response, and genetic flexibility, which contribute to bacterial adaptability and survival in diverse environments.

PlasmidScope applied **ARAGORN** [18] to detect tRNA and tmRNA genes in plasmid sequences, leading to the delineation of **108,597 tRNA** and **913 tmRNA**.

### CRISPR-Cas systems
The CRISPR-Cas (Clustered Regularly Interspaced Short Palindromic Repeats and CRISPR-associated proteins) system is a form of adaptive immunity found in bacteria and archaea. It provides hosts with a defense mechanism against invading genetic elements such as viruses (bacterioplasmids) and plasmids. In addition, the CRISPR-Cas system on plasmids regulates horizontal gene transfer and enhances bacterial adaptability, offering powerful tools for synthetic biology and biotechnology.

PlasmidScope used **CRISPRCasTyper** [19] to identify CRISPR-Cas systems on plasmids, and discovered a total of **10,088 CRISPR-CAS systems** distributed in 953,438 plasmids. PlasmidScope provide the type and location of the CRISPR and CAS for each CRISPR-Cas system, along with their sequences for further analysis.

### Secondary metabolites
Secondary metabolites encoded by genes on plasmids can provide natural cyclic peptides with significant clinical applications, influencing the host's survival, competitiveness, and interactions with the environment. They can provide advantages in terms of antibiotic production, nutrient acquisition, defense against predators and competitors, symbiotic interactions, and environmental adaptation. The presence of these genes on plasmids also allows for their rapid spread through horizontal gene transfer, promoting the evolution and diversification of microbial populations.

PlasmidScope employed **antiSMASH** [20] to identify the secondary metabolites within the plasmids. The resulting collection of **32,127 secondary metabolites** has been made available within the PlasmidScope database, which was divided into **74 biosynthetic gene clusters types** including non-ribosomal peptide synthetases, type I and type II polyketide synthases, the ribosomally synthesised and post-translationally modified peptide, etc.

### Signal peptides
Signal peptides are short amino acid sequences typically found at the N-terminus of a newly synthesized protein. They serve as "address tags" that direct the protein to its correct location within the cell or for secretion outside the cell. The presence of signal peptide-encoding genes on plasmids facilitates the rapid spread of virulence factors and antibiotic resistance genes through horizontal gene transfer, promoting adaptation and survival of hosts in diverse environments.

PlasmidScope applied **SignalP** [21] to identify the signal peptides among the predicted proteins. In summary, a total of **75,349** proteins were identified as signal peptides, which can be categorized into **five types**, including metallo-beta-lactamase type 2, mercuric transport protein periplasmic component, cation efflux system protein CusC, etc.

### Transmembrane proteins
Transmembrane proteins are proteins that span the lipid bilayer of cell membranes. The annotation of transmembrane proteins provides information on the presence and characteristics of such proteins within the plasmid genomes. These annotations offer insights into the potential interactions between plasmid and host cell membrane and their roles in plasmid infection and release.

PlasmidScope applied **TMHMM** [22] to detect the transmembrane proteins among the predicted proteins. A total of **81,339** proteins were identified as helical membrane proteins, exhibiting **1-48 transmembrane helices**. The resultant set of transmembrane proteins, coupled with their corresponding **topology information**, has been made accessible through the PlasmidScope database.

### Transmembrane proteins
Protein structure is fundamental to the proper function, stability, specificity, and regulation of proteins. It plays a critical role in health and disease, biotechnology, and the effectiveness of plasmid-encoded proteins. Understanding and maintaining proper protein structure is essential for harnessing the full potential of proteins in biological systems and applications.

PlasmidScope applied **ESMFold** [23] to predict the structure of the **39,172,224** proteins. The predicted protein structure can be viewed on PlasmidScope, which also supports the download of the PDB structure file. 


### Comparative genomic studies
Comparative genomic studies, including sequence alignment and comparative tree construction, are also provided for the curated plasmids.

## References
[1] O'Leary N A, Wright M W, Brister J R, et al. Reference sequence (RefSeq) database at NCBI: current status, taxonomic expansion, and functional annotation[J]. Nucleic acids research, 2016, 44(D1): D733-D745.<br>
[2] Benson D A, Cavanaugh M, Clark K, et al. GenBank[J]. Nucleic acids research, 2018, 46(Database issue): D41.<br>
[3] Kanz C, Aldebert P, Althorpe N, et al. The EMBL nucleotide sequence database[J]. Nucleic acids research, 2005, 33(suppl_1): D29-D33.<br>
[4] Ogasawara O, Kodama Y, Mashima J, et al. DDBJ Database updates and computational infrastructure enhancement[J]. Nucleic acids research, 2020, 48(D1): D45-D50.<br>
[5] Guy C, Kirsty B, Rolf A, et al. Evidence standards in experimental and inferential INSDC Third Party Annotation data[J]. Omics: a journal of integrative biology vol. 10,2 (2006): 105-13.<br>
[6] Georges PS, Anna H, Pascal H, et al. PLSDB: advancing a comprehensive database of bacterial plasmids[J]. ucleic Acids Research, 2022, 50(D1): D273–D278.<br>
[7] Antonio PC, Lee C, Simon R, et al. IMG/PR: a database of plasmids from genomes and metagenomes with rich annotations and metadata[J].Nucleic acids research, 2022, 52(D1): Volume 52: D164–D173.<br>
[8] Douarre PE, Mallet L, Radomski N, et al. Analysis of COMPASS, a New Comprehensive Plasmid Database Revealed Prevalence of Multireplicon and Extensive Diversity of IncF Plasmids[J]. Frontiers in Microbiology, 2020, 11: 10.3389/fmicb.2020.00483.<br>
[9] Lu J, Rincon N, Wood DE, et al. Metagenome analysis using the Kraken software suite[J]. Nature Protocol, 2022, 17, 2815–2839.<br>
[10] Federhen S. The NCBI taxonomy database[J]. Nucleic acids research, 2012, 40(D1): D136-D143.<br>
[11] James R, Kyrylo B, Justin S, et al. Universal whole-sequence-based plasmid typing and its utility to prediction of host range and epidemiological surveillance[J]. Microbial genomics, 2020, 6(10): mgen000435.<br>
[12] Torsten Seemann. Prokka: rapid prokaryotic genome annotation[J]. Bioinformatics, 2014, 30(14): 2068-9.<br>
[13] Cantalapiedra C P, Hernandez-Plaza A, Letunic I, et al. eggNOG-mapper v2: functional annotation, orthology assignments, and domain prediction at the metagenomic scale[J]. Molecular biology and evolution, 2021, 38(12): 5825-5829.<br>
[14] Buchfink B, Reuter K, Drost HG. Sensitive protein alignments at tree-of-life scale using DIAMOND [J]. Nature Methods, 2021, 18: 366–368. <br>
[15] Chen L, Yang J, Yu J, et al. VFDB: a reference database for bacterial virulence factors[J]. Nucleic acids research, 2005, 33(suppl_1): D325-D328.<br>
[16] McArthur A G, Waglechner N, Nizam F, et al. The comprehensive antibiotic resistance database[J]. Antimicrobial agents and chemotherapy, 2013, 57(7): 3348-3357.<br>
[17] Brian P A, William H, Romeo C,  et al. CARD 2023: expanded curation, support for machine learning, and resistome prediction at the Comprehensive Antibiotic Resistance Database[J]. Nucleic acids research, (2023), 51(D1): D690-D699.<br>
[18] Laslett D, Canback B. ARAGORN, a program to detect tRNA genes and tmRNA genes in nucleotide sequences[J]. Nucleic acids research, 2004, 32(1): 11-16.<br>
[19] Jakob R, Rafael PR, David MM, et al. CRISPRCasTyper: Automated Identification, Annotation, and Classification of CRISPR-Cas Loci[J]. The CRISPR journal, 2020, 3(6): 462-469. <br>
[20] Kai B, Simon S, Hannah EA, et al. antiSMASH 7.0: new and improved predictions for detection, regulation, chemical structures and visualization[J]. Nucleic acids research, 2023, 51(W1): W46-W50.<br>
[21] Felix T, José JAA, Alexander RJ, et al. SignalP 6.0 predicts all five types of signal peptides using protein language models[J]. Nature biotechnology, 2022, 40(7): 1023-1025.<br>
[22] Krogh A, Larsson B, Von Heijne G, et al. Predicting transmembrane protein topology with a hidden Markov model: application to complete genomes[J]. Journal of molecular biology, 2001, 305(3): 567-580.<br>
[23] Zeming L, Halil A, Roshan R, et al. Evolutionary-scale prediction of atomic-level protein structure with a language model[J]. Science, 2023, 379(6637): 1123-1130.