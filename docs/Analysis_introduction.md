# Welcome to PlasmidScope analysis

![image](/Figures/Plasmid_analysis.png)

## Analysis description
PlasmidScope analysis module includes **single genome annotation** and **multiple genome comparison**. Genome annotation includes **gene prediction** (ORF prediction & protein classification), **functional annotation** (tRNA & tmRNA annotation, virulence factor & antibiotic resistance gene detection, and transmembrane protein annotation). Genome comparison includes **sequence alignment** and **comparative tree construction**.

### Input
The only inputs users need to provide are plasmid sequences in **FASTA format**. Users could choose to upload a FASTA file (with single or multiple plasmid sequences), enter the plasmid ID from PlasmidScope database, or paste the sequences in the text field.

### Plasmid annotation
Users have the flexibility to perform either **single** or **multiple** analyses based on their specific research needs and objectives.

#### Gene prediction
+ ORF prediction & protein classification: This module focuses on the prediction and annotation of genetic elements within plasmid genomes. Open Reading Frames (ORFs), areas of DNA with the potential to be translated into proteins, are identified using **Prokka** [1]; Protein functions are then assigned using **eggNOG-mapper** [2]. The module output the annotated sequences in gff format, the protein sequences in fasta format, and the protein metadata.

These annotations provide valuable insights into the genome structure, genetic content, and functional diversity encoded in plasmid genomes.

#### Functional annotation
+ tRNAs & tmRNAs: tRNAs and tmRNAs are essential for protein synthesis and quality control, respectively. They are detected using **ARAGORN** [3].
+ Virulence factor annotation: Virulence factors are identified on plasmid protein sequences by **Diamond** [4] against **VFDB** [5] with identity > 60% and coverage > 40%.
+ Antibiotic resistance gene annotation: **RGI** [6] is applied on plasmid protein sequences against **CARD** [7] for antimicrobial resistance genes based on homology and SNP models.
+ Transmembrane protein annotation: Transmembrane proteins, which span cell membranes, are detected using **TMHMM** [8].

These modules return the identified items, along with their related information, such as locations, confidence scores, and molecular types. The annotations reveal crucial information about plasmid-host interactions, potential mechanisms of plasmid mobility, and the interchange of genetic material among distantly related lineages.

### Plasmid comparison
The genome comparison analysis module of PlasmidScope allows users to compare and analyze multiple plasmid genomes. It provides various analysis and visualization functions to explore the genetic variations and evolutionary relationships among these genomes. PlasmidScope provides an option for users to incorporate the curated plasmids into genome comparison pipelines.

#### Sequence alignment
This module compares the protein sequences of multiple plasmid genomes to identify regions of similarity. The **protein sequences from the annotation files** are extracted and compared with each other with **BLASTP** [9]. The **alignment identity and coverage** are returned for visualization. This analysis helps in locating conserved regions, detecting sequence variations, and finding potential functional elements.

#### Comparative analysis
This module constructs a comparative tree that represents the sequence similarities between the plasmid genomes. **Alfpy** [10] is applied to calculate the genome distance between the input sequences, and **neighbor joining algorithm** [11] is applied for tree reconstruction. The module returns the comparative tree in **newick format**. The tree provides a visual representation of their genetic relatedness, allowing researchers to study the plasmid's evolutionary history and track the divergence and convergence of different plasmid lineages.

## References
[1] Seemann,T. (2014) Prokka: Rapid Prokaryotic Genome Annotation. Bioinformatics, 30, 2068–2069.<br>
[2] Cantalapiedra,C.P., Hernández-Plaza,A., Letunic,I., Bork,P. and Huerta-Cepas,J. (2021) Eggnog-mapper V2: Functional annotation, Orthology assignments, and domain prediction at the metagenomic scale. Molecular Biology and Evolution, 38, 5825–5829. <br>
[3] Laslett,D. (2004) Aragorn, a program to detect trna genes and tmrna genes in nucleotide sequences. Nucleic Acids Research, 32, 11–16. <br>
[4] Buchfink,B., Reuter,K. and Drost,H.-G. (2021) Sensitive protein alignments at tree-of-life scale using Diamond. Nature Methods, 18, 366–368. <br>
[5] Chen,L. (2004) VFDB: A reference database for bacterial virulence factors. Nucleic Acids Research, 33, D325-8. <br>
[6] Alcock,B.P., Huynh,W., Chalil,R., Smith,K.W., Raphenya,A.R., Wlodarski,M.A., Edalatmand,A., Petkau,A., Syed,S.A., Tsang,K.K., et al. (2022) Card 2023: Expanded curation, support for machine learning, and resistome prediction at the comprehensive antibiotic resistance database. Nucleic Acids Research, 51, D690-D699. <br>
[7] McArthur,A.G., Waglechner,N., Nizam,F., Yan,A., Azad,M.A., Baylay,A.J., Bhullar,K., Canova,M.J., De Pascale,G., Ejim,L., et al. (2013) The comprehensive antibiotic resistance database. Antimicrobial Agents and Chemotherapy, 57, 3348–3357. <br>
[8] Krogh,A., Larsson,B., von Heijne,G. and Sonnhammer,E.L.L. (2001) Predicting transmembrane protein topology with a hidden Markov model: Application to complete genomes11edited by F. Cohen. Journal of Molecular Biology, 305, 567–580. <br>
[9] Altschul,S.F., Gish,W., Miller,W., Myers,E.W. and Lipman,D.J. (1990) Basic local alignment search tool. Journal of Molecular Biology, 215, 403–410. <br>
[10] Zielezinski,A., Vinga,S., Almeida,J. and Karlowski,W.M. (2017) Alignment-free sequence comparison: Benefits, applications, and Tools. Genome Biology, 18, 186. <br>
[11] The neighbor-joining method: A new method for reconstructing phylogenetic trees. (1987) Molecular Biology and Evolution, 4, 406-425. 
