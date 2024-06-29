# Welcome to PlasmidScope analysis

![image](/Figures/Plasmid_analysis.png)

## Analysis description
PlasmidScope analysis module includes **single genome annotation** and **multiple genome comparison**. Genome annotation includes **gene prediction** (ORF prediction & protein classification), **functional annotation** (tRNA & tmRNA annotation, virulence factor & antibiotic resistance gene detection, and transmembrane protein annotation). Genome comparison includes **sequence alignment** and **comparative tree construction**.

### Input
The only inputs users need to provide are plasmid sequences in **FASTA format**. Users could choose to upload a FASTA file (with single or multiple plasmid sequences), enter the plasmid ID from PlasmidScope database, or paste the sequences in the text field.

### Genome annotation
Users have the flexibility to perform either **single** or **multiple** analyses based on their specific research needs and objectives.

#### Gene prediction
+ ORF prediction & protein classification: This module focuses on the prediction and annotation of genetic elements within plasmid genomes. Open Reading Frames (ORFs), areas of DNA with the potential to be translated into proteins, are identified using **Prodigal** [2]; Protein functions are then assigned using **eggNOG-mapper** [3]. The module output the annotated sequences in gff format, the protein sequences in fasta format, and the protein metadata.

These annotations provide valuable insights into the genome structure, genetic content, and functional diversity encoded in plasmid genomes.

#### Functional annotation
+ tRNA & tmRNA genes: tRNA and tmRNA genes, essential for protein synthesis and quality control, respectively, are detected using **ARAGORN** [4].
+ Virulence factor annotation: Virulence factors are identified on plasmid protein sequences by **Diamond** [10] against **VFDB** [5] with identity > 60% and coverage > 40%.
+ Antibiotic resistance gene annotation: **RGI** [11] is applied on plasmid protein sequences against **CARD** [6] for antimicrobial resistance genes based on homology and SNP models.
+ Transmembrane protein annotation: Transmembrane proteins, which span cell membranes, are detected using **TMHMM** [7].

These modules return the identified items, along with their related information, such as locations, confidence scores, and molecular types. The annotations reveal crucial information about plasmid-host interactions, potential mechanisms of plasmid mobility, and the interchange of genetic material among distantly related lineages.

### Genome comparison
The genome comparison analysis module of PlasmidScope allows users to compare and analyze multiple plasmid genomes. It provides various analysis and visualization functions to explore the genetic variations and evolutionary relationships among these genomes. PlasmidScope provides an option for users to incorporate the curated plasmids into genome comparison pipelines.

#### Sequence clustering
This module groups plasmid genomes based on their sequence similarity with **mmseqs** [8], identifying clusters of plasmids that share common genetic characteristics. ``min-seq-id 0.9`` and ``-c 0.9`` are required to form **subclusters**, and the representative sequences for subclusters are grouped into **clusters** with the hyperparameters ``min-seq-id 0.6`` and ``-c 0.75``.

#### Sequence alignment
This module compares the protein sequences of multiple plasmid genomes to identify regions of similarity. The **protein sequences from the annotation files** are extracted and compared with each other with **BLASTP** [1]. The **alignment identity and coverage** are returned for visualization. This analysis helps in locating conserved regions, detecting sequence variations, and finding potential functional elements.

#### Comparative tree construction
This module constructs a comparative tree that represents the sequence similarities between the plasmid genomes. **Alfpy** [8] is applied to calculate the genome distance between the input sequences, and **neighbor joining algorithm** [9] is applied for tree reconstruction. The module returns the comparative tree in **newick format**. The tree provides a visual representation of their genetic relatedness, allowing researchers to study the plasmid's evolutionary history and track the divergence and convergence of different plasmid lineages.

## References
[1] Altschul S F, Gish W, Miller W, et al. Basic local alignment search tool[J]. Journal of molecular biology, 1990, 215(3): 403-410.
[2] Hyatt D, Chen G L, LoCascio P F, et al. Prodigal: prokaryotic gene recognition and translation initiation site identification[J]. BMC bioinformatics, 2010, 11(1): 1-11.
[3] Cantalapiedra C P, Hernandez-Plaza A, Letunic I, et al. eggNOG-mapper v2: functional annotation, orthology assignments, and domain prediction at the metagenomic scale[J]. Molecular biology and evolution, 2021, 38(12): 5825-5829.
[4] Laslett D, Canback B. ARAGORN, a program to detect tRNA genes and tmRNA genes in nucleotide sequences[J]. Nucleic acids research, 2004, 32(1): 11-16.
[5] Chen L, Yang J, Yu J, et al. VFDB: a reference database for bacterial virulence factors[J]. Nucleic acids research, 2005, 33(suppl_1): D325-D328.
[6] McArthur A G, Waglechner N, Nizam F, et al. The comprehensive antibiotic resistance database[J]. Antimicrobial agents and chemotherapy, 2013, 57(7): 3348-3357.
[7] Krogh A, Larsson B, Von Heijne G, et al. Predicting transmembrane protein topology with a hidden Markov model: application to complete genomes[J]. Journal of molecular biology, 2001, 305(3): 567-580.
[8] Zielezinski A, Vinga S, Almeida J, et al. Alignment-free sequence comparison: benefits, applications, and tools[J]. Genome biology, 2017, 18: 1-17.
[9] Saitou N, Nei M. The neighbor-joining method: a new method for reconstructing phylogenetic trees[J]. Molecular biology and evolution, 1987, 4(4): 406-425.
[10] Buchfink B, Reuter K, Drost HG. Sensitive protein alignments at tree-of-life scale using DIAMOND. Nat Methods. 2021;18(4):366-368. doi:10.1038/s41592-021-01101-x
[11] Alcock BP, Huynh W, Chalil R, et al. CARD 2023: expanded curation, support for machine learning, and resistome prediction at the Comprehensive Antibiotic Resistance Database. Nucleic Acids Res. 2023;51(D1):D690-D699. doi:10.1093/nar/gkac920
