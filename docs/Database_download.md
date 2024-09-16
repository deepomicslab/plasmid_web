# How to download PlasmidScope datasets

## Plasmid sequence download
<div align=center><img src="/DB_figures/plasmid_list_download.png" width="1000"></div>

Users could be directed to the ``Plasmid List`` interface by clicking ``Database`` on the navigation bar. On the ``Plasmid List`` interface, users could scroll through the list of plasmids, use the ``sequence filter`` to find specific plasmids.
 
<div align=center><img src="/DB_figures/sequence_filter.png" width="1000"></div>

After selecting the plasmids, please click on the ``Download`` button. A popup would appear, allowing users to choose the desired format for download. plasmid sequences and information are provided in **FASTA**, **GFF3**, **GBK**, and **tabular** (Meta data) format. The plasmid sequences and information will be saved to users' device in the chosen format.

<div align=center><img src="/DB_figures/datatype_selection.png" width="1000"></div>

## Batch download 
PlasmidScope also provides a batch download interface for users to retrieve data, including the plasmid metadata, protein metadata, secondary metabolism metadata, tRNA & tmRNA gene metadata, CRISPR/Cas systems metadata, signal peptides metadata, antimicrobial resistance gene metadata, virulence factor metadata, transmembrane protein metadata, plasmid sequences in fasta format, plasmid annotations in gbk/gff3 file. Users could click ``Download`` on the navigation bar to enter the download interface.

<div align=center><img src="/DB_figures/download_interface.png" width="1000"></div>

### Meta data download
#### Plasmid meta data download
The metadata for all the 852,600 plasmids. Each row gives the information for a plasmid; The columns give information about plasmid ID (Plasmid\_ID), plasmid genome length (Size), plasmid GC content (GC), genome completeness (Completeness), plasmid host taxonomy (Host), plasmid predicted mobility (Predicted\_Mobility), primary cluster ID (Primary\_Cluster\_ID), subcluster ID (Secondary\_Cluster\_ID), and the plasmid source dataset (Data\_Source).

+ ``PLSDB plasmid Meta Data``: The metadata for the 50,553 plasmids from PLSDB.
+ ``IMG/PR plasmid Meta Data``: The metadata for the 699,973 plasmids from IMG/PR.
+ ``COMPASS plasmid Meta Data``: The metadata for the 12,084 plasmids from COMPASS.
+ ``Genbank plasmid Meta Data``: The metadata for the 91,783 plasmids from Genbank.
+ ``RefSeq plasmid Meta Data``: The metadata for the 85,995 plasmids from RefSeq.
+ ``ENA plasmid Meta Data``: The metadata for the 6,251 plasmids from ENA.
+ ``Kraken2 plasmid Meta Data``: The metadata for the 898 plasmids from Kraken2.
+ ``DDBJ plasmid Meta Data``: The metadata for the 5,320 plasmids from DDBJ.
+ ``TPA plasmid Meta Data``: The metadata for the 7 plasmids from TPA.
+ ``mMGE plasmid Meta Data``: The metadata for the 92,492 plasmids from mMGE.

#### Annotated protein meta data download
The metadata for all the 25,231,059 annotated proteins. Each row gives the information for a protein; The columns give information about plasmid ID (Plasmid\_ID), the protein source (Orf Prediction Source), the annotation source (Function Prediction Source), the protein start site on the genome (Start), the protein stop site on the genome(End), the strand encoding the protein (Strand), protein ID (Protein\_ID), protein product (Product), protein classification with COG category (COG\_category), annotation of EC number (EC\_number), annotation of COG ID (COG\_id), annotation of GO database (GOs), annotation of KEGG database (KEGG\_ko, KEGG\_Pathway, KEGG\_Module, KEGG\_Reaction, KEGG\_rclasss, BRITE, KEGG\_TC), annotation of CAZy database (CAZy), annotaion of  BiGG database (BiGG\_Reaction), annotation of Pfam database (PFAMs), the protein sequence (Sequence), and the plasmid source dataset (Source).

+ ``PLSDB plasmid Annotated Protein Meta Data``: The metadata for the 5,602,536 annotated proteins from PLSDB.
+ ``IMG/PR plasmid Annotated Protein Meta Data``: The metadata for the 17,485,233 annotated proteins from IMG/PR.
+ ``COMPASS plasmid Annotated Protein Meta Data``: The metadata for the 1,368,450 annotated proteins from COMPASS.
+ ``GenBank plasmid Annotated Protein Meta Data``: The metadata for the 6,566,193 annotated proteins from GenBank.
+ ``RefSeq plasmid Annotated Protein Meta Data``: The metadata for the 7,247,983 annotated proteins from RefSeq.
+ ``ENA plasmid Annotated Protein Meta Data``: The metadata for the 385,943 annotated proteins from ENA.
+ ``Kraken2 plasmid Annotated Protein Meta Data``: The metadata for the 53,329 annotated proteins from Kraken2.
+ ``DDBJ plasmid Annotated Protein Meta Data``: The metadata for the 461,363 annotated proteins from DDBJ.
+ ``TPA plasmid Annotated Protein Meta Data``: The metadata for the 726 annotated proteins from TPA.
+ ``mMGE plasmid Annotated Protein Meta Data``: The metadata for the 1,078,535 annotated proteins from mMGE.

#### Secondary Metabolism meta data download
The metadata for all the 40,466 secondary metabolism region predicted by antiSMASH. Each row gives the information for a secondary metabolism region; The columns give information about the plasmid ID (Plasmid\_ID),  secondary metabolism region number (Region), the region start site on the genome (Start), the region stop site on the genome (End), the most similar known cluster for predicted region (Mosr similar known cluster), and the similarity among predicted region and known cluster (Similarity).

+ ``PLSDB plasmid Secondary Metabolism Meta Data``: The metadata for the 9,010 secondary metabolism regions from PLSDB.
+ ``IMG/PR plasmid Secondary Metabolism Meta Data``: The metadata for the 27,000 secondary metabolism regions from IMG/PR.
+ ``COMPASS plasmid Secondary Metabolism Meta Data``: The metadata for the 1,913 secondary metabolism regions from COMPASS.
+ ``GenBank plasmid Secondary Metabolism Meta Data``: The metadata for the 12,424 secondary metabolism regions from GenBank.
+ ``RefSeq plasmid Secondary Metabolism Meta Data``: The metadata for the 12,188 secondary metabolism regions from RefSeq.
+ ``ENA plasmid Secondary Metabolism Meta Data``: The metadata for the 452 secondary metabolism regions from ENA.
+ ``Kraken2 plasmid Secondary Metabolism e Meta Data``: The metadata for the 82 secondary metabolism regions genes from Kraken2.
+ ``DDBJ plasmid Secondary Metabolism e Meta Data``: The metadata for the 666 secondary metabolism regions from DDBJ.
+ ``TPA plasmid Secondary Metabolism Meta Data``: The metadata for the 2 secondary metabolism regions from TPA.
+ ``mMGE plasmid Secondary Metabolism Meta Data``: The metadata for the 1,271 secondary metabolism regions from mMGE.

#### tRNA & tmRNA meta data download
The metadata for all the 82,718 tRNAs & tmRNAs predicted with Aragorn. Each row gives the information for a t(m)RNA gene; The columns give information about the plasmid ID (Plasmid\_ID), t(m)RNA ID (tRNA\_ID), the t(m)RNA type (tRNA Type), the t(m)RNA start site on the genome (Start), the t(m)RNA stop site on the genome (End), the strand (Strand), the length of t(m)RNA (Length), and the t(m)RNA sequence (Sequence).

+ ``PLSDB plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 14,385 tRNA & tmRNA genes from PLSDB.
+ ``IMG/PR plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 53,599 tRNA & tmRNA genes from IMG/PR.
+ ``COMPASS plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 2,685 tRNA & tmRNA genes from COMPASS.
+ ``GenBank plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 17,241 tRNA & tmRNA genes from GenBank.
+ ``RefSeq plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 18,939 tRNA & tmRNA genes from RefSeq.
+ ``ENA plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 1,206 tRNA & tmRNA genes from ENA.
+ ``Kraken2 plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 179 tRNA & tmRNA genes from Kraken2.
+ ``DDBJ plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 1,275 tRNA & tmRNA genes from DDBJ.
+ ``TPA plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 1 tRNA & tmRNA genes from TPA.
+ ``mMGE plasmid tRNA & tmRNA Gene Meta Data``: The metadata for the 8,661 tRNA & tmRNA genes from mMGE.

#### CRISPR/Cas meta data download
The metadata for all the 4,083 CRISPR/Cas systems. Each row gives the information for a CRISPR/Cas systems; The columns give information about the Plasmid\_ID, Cas\_ID,  Cac\_start, Cac\_end, the subtype of Cas (Cas\_Subtype), CRISPR\_ID, CRISPR\_start, CRISPR\_end, the subtype of CRISPR (CRISPR_Subtype), the CRISPR\-Cac consenus prediction (CRISPR\-Cas Consenus Prediction), the sequence of consenus repeat (Consensus Repeat Sequence), and the Cas genes (Cas Genes).

+ ``PLSDB plasmid CRISPR/Cas Meta Data``: The metadata for the 1,482 CRISPR/Cas systems from PLSDB.
+ ``IMG/PR plasmid CRISPR/Cas Meta Data``: The metadata for the 3,653 CRISPR/Cas systems from IMG/PR.
+ ``COMPASS plasmid CRISPR/Cas Meta Data``: The metadata for the 489 CRISPR/Cas systems from COMPASS.
+ ``GenBank plasmid CRISPR/Cas Meta Data``: The metadata for the 1,967 CRISPR/Cas systems from GenBank.
+ ``RefSeq plasmid CRISPR/Cas Meta Data``: The metadata for the 2,079 CRISPR/Cas systems from RefSeq.
+ ``ENA plasmid CRISPR/Cas Meta Data``: The metadata for the 88 CRISPR/Cas systems from ENA.
+ ``Kraken2 plasmid CRISPR/Cas Meta Data``: The metadata for the 13 CRISPR/Cas systems from Kraken2.
+ ``DDBJ plasmid CRISPR/Cas Meta Data``: The metadata for the 317 CRISPR/Cas systems from DDBJ.
+ ``mMGE plasmid CRISPR/Cas Meta Data``: The metadata for the 382 CRISPR/Cas systems from mMGE.

#### Signal peptides meta data download
The metadata for all the 2,710,395 signal peptides. Each row gives the information for a signal peptides; The columns give information about the Plasmid\_ID, Protein\_ID,  the protein start site on the genome (Start), the protein stop site on the genome(End), the strand encoding the protein (Strand), the protein product (Product), the predicted type of signal peptides (Prediction), the ration of other type of protein (OTHER), the ration of SP type of signal peptide (SP(Sec/SPI)), the ration of LIPO type of signal peptide (LIPO(Sec/SPII)), the ration of TAT type of signal peptide (TAT(Tat/SPI)), the ration of TATLIPO type of signal peptide (TATLIPO(Tat/SPII)), the ration of PILIN type of signal peptide (PILIN(Sec/SPIII)), the position of CS (CS position), and the probability of CS position (Probability of CS Position).

+ ``PLSDB plasmid Signal peptides Meta Data``: The metadata for the 570,217 signal peptides from PLSDB.
+ ``IMG/PR plasmid Signal peptides Meta Data``: The metadata for the 1,921,273 signal peptides from IMG/PR.
+ ``COMPASS plasmid Signal peptides Meta Data``: The metadata for the 130,636 signal peptides from COMPASS.
+ ``GenBank plasmid Signal peptides Meta Data``: The metadata for the 706,270 signal peptides from GenBank.
+ ``RefSeq plasmid Signal peptides Meta Data``: The metadata for the 720,753 signal peptides from RefSeq.
+ ``ENA plasmid Signal peptides Meta Data``: The metadata for the 72,047 signal peptides from ENA.
+ ``Kraken2 plasmid Signal peptides Meta Data``: The metadata for the 5,304 signal peptides from Kraken2.
+ ``DDBJ plasmid Signal peptides Meta Data``: The metadata for the 45,549 signal peptides from DDBJ.
+ ``TPA plasmid Signal peptides Meta Data``: The metadata for the 38 signal peptides from TPA.
+ ``mMGE plasmid Signal peptides Meta Data``: The metadata for the 96,630 signal peptides from mMGE.

#### Antibiotic resistance gene meta data download
The metadata for all the 21,090,397 antibiotic resistance genes annotated by RGI. Each row gives the information for an antibiotic resistance gene; The columns give information about the Pasmid_ID, Protein_ID, the protein source (Orf Prediction Source), the protein start site on the genome (Start), the protein stop site on the genome(End), the strand encoding the protein (Strand), the product of protein (Product),  RGI detection paradigm (Cut\_Off), the identifier of HSP (HSP_identifier), ARO term of top hit in CARD (Best\_Hit\_ARO), percent identity of match to top hit in CARD(Best\_identities), ARO accession of match to top hit in CARD (ARO), ARO categorization in CARD (Drug\_Class), the resistance mechanism of aligned protein (Resistance Mechanism), the AMR gene family of aligned protein (AMR Gene Family), the antibiotics of aligned protein (Antibiotic), and the aligned protein sequence (Sequence).

+ ``PLSDB plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 4,507,567 antibiotic resistance genes from PLSDB.
+ ``IMG/PR plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 14,076,411 antibiotic resistance genes from IMG/PR.
+ ``COMPASS plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 1,085,253 antibiotic resistance genes from COMPASS.
+ ``GenBank plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 5,306,079 antibiotic resistance genes from GenBank.
+ ``RefSeq plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 5,337,195 antibiotic resistance genes from RefSeq.
+ ``ENA plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 312,019 antibiotic resistance genes from ENA.
+ ``Kraken2 plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 42,956 antibiotic resistance genes from Kraken2.
+ ``DDBJ plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 374,767 antibiotic resistance genes from DDBJ.
+ ``TPA plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 583 antibiotic resistance genes from TPA.
+ ``mMGE plasmid Antibiotic Resistance Gene Meta Data``: The metadata for the 873,294 antibiotic resistance genes from mMGE.

#### Virulence factor meta data download
The metadata for all the 306,218 virulence factors. Each row gives the information for a virulence factor; The columns give information about the Plasmid\_ID, Protein\_ID, the protein source (Orf Prediction Source), the protein start site on the genome (Start), the protein stop site on the genome(End), the strand encoding the protein (Strand), aligned protein ID in VFDB (VFSeq\_ID) aligned identity (Identity), aligned e-value (E\-value), aligned gene name in VFDB (Gene\_Name), aligned protein product in VFDB (Product), aligned VFID in VFDB (VFID), aligned virulent factor name in VFDB (VF\_Name),  aligned virulent factor full name in VFDB (VF\_FullName), aligned protein VFCID in VFDB (VFCID), VF category of aligned virulent factor classified by VFDB (Vfcategory), the characteristics of aligned virulent factor (Characteristics), and the sequence of aligned protein (Sequence).

+ ``PLSDB plasmid Virulence Factor Meta Data``: The metadata for the 94,889 virulence factors from PLSDB.
+ ``IMG/PR plasmid Virulence Factor Meta Data``: The metadata for the 165,704 virulence factors from IMG/PR.
+ ``COMPASS plasmid Virulence Factor Meta Data``: The metadata for the 21,045 virulence factors from COMPASS.
+ ``GenBank plasmid Virulence Factor Meta Data``: The metadata for the 112,680 virulence factors from GenBank.
+ ``RefSeq plasmid Virulence Factor Meta Data``: The metadata for the 106,425 virulence factors from RefSeq.
+ ``ENA plasmid Virulence Factor Meta Data``: The metadata for the 4,997 virulence factors from ENA.
+ ``Kraken2 plasmid Virulence Factor Meta Data``: The metadata for the 816 virulence factors from Kraken2.
+ ``DDBJ plasmid Virulence Factor Meta Data``: The metadata for the 6,831 virulence factors from DDBJ.
+ ``TPA plasmid Virulence Factor Meta Data``: The metadata for the 13 virulence factors from TPA.
+ ``mMGE plasmid Virulence Factor Meta Data``: The metadata for the 20,395 virulence factors from mMGE.

#### Transmembrane protein meta data download
The metadata for all the 5,191,488 transmembrane proteins. Each row gives the information for a transmembrane protein; The columns give information about the Plasmid\_ID, Protein\_ID, the protein start site on the genome (Start), the protein stop site on the genome(End), the strand encoding the protein (Strand), protein length (Length), the number of predicted transmembrane helices (Number of predicted TMHs), the annotation source (Source), the position of transmembrane helices (Position), the start site (start), the stop site (end), the expected number of amino acids intransmembrane helices (Exp number of AAs in TMHs), the expected number of amino acids in transmembrane helices in the first 60 amino acids of the protein (Exp number, first 60 AAs), and the total probability that the N-term is on the cytoplasmic side of the membrane (Total prob of N\-in).

+ ``PLSDB plasmid Transmembrane Protein Meta Data``: The metadata for the 1,345,493 transmembrane proteins from PLSDB.
+ ``IMG/PR plasmid Transmembrane Protein Meta Data``: The metadata for the 3,221,059 transmembrane proteins from IMG/PR.
+ ``COMPASS plasmid Transmembrane Protein Meta Data``: The metadata for the 465,289 transmembrane proteins from COMPASS.
+ ``GenBank plasmid Transmembrane Protein Meta Data``: The metadata for the 1,313,227 transmembrane proteins from GenBank.
+ ``RefSeq plasmid Transmembrane Protein Meta Data``: The metadata for the 1,311,177 transmembrane proteins from RefSeq.
+ ``ENA plasmid Transmembrane Protein Meta Data``: The metadata for the 76,281 transmembrane proteins from ENA.
+ ``Kraken2 plasmid Transmembrane Protein Meta Data``: The metadata for the 10,749 transmembrane proteins from Kraken2.
+ ``DDBJ plasmid Transmembrane Protein Meta Data``: The metadata for the 83,827 transmembrane proteins from DDBJ.
+ ``TPA plasmid Transmembrane Protein Meta Data``: The metadata for the 129 transmembrane proteins from TPA.
+ ``mMGE plasmid Transmembrane Protein Meta Data``: The metadata for the 408,801 transmembrane proteins from mMGE.

## FASTA file download
### Plasmid FASTA file download

+ ``PLSDB plasmid FASTA File``: plasmid sequences from PLSDB in FASTA format.
+ ``IMG/PR plasmid FASTA File``: plasmid sequences from IMG/PR in FASTA format.
+ ``COMPASS plasmid FASTA File``: plasmid sequences from COMPASS in FASTA format.
+ ``GenBank plasmid FASTA File``: plasmid sequences from GenBank in FASTA format.
+ ``RefSeq plasmid FASTA File``: plasmid sequences from RefSeq in FASTA format.
+ ``ENA plasmid FASTA File``: plasmid sequences from ENA in FASTA format.
+ ``Kraken2 plasmid FASTA File``: plasmid sequences from Kraken2 in FASTA format.
+ ``DDBJ plasmid FASTA File``: plasmid sequences from DDBJ in FASTA format.
+ ``TPA plasmid FASTA File``: plasmid sequences from TPA in FASTA format.
+ ``mMGE plasmid FASTA File``: plasmid sequences from mMGE in FASTA format.

## GBK file download
### Plasmid GBK file download

+ ``PLSDB plasmid GBK File``: plasmid sequences from PLSDB in GBK format.
+ ``IMG/PR plasmid GBK File``: plasmid sequences from IMG/PR in GBK format.
+ ``COMPASS plasmid GBK File``: plasmid sequences from COMPASS in GBK format.
+ ``GenBank plasmid GBK File``: plasmid sequences from GenBank in GBK format.
+ ``RefSeq plasmid GBK File``: plasmid sequences from RefSeq in GBK format.
+ ``ENA plasmid GBK File``: plasmid sequences from ENA in GBK format.
+ ``Kraken2 plasmid GBK File``: plasmid sequences from Kraken2 in GBK format.
+ ``DDBJ plasmid GBK File``: plasmid sequences from DDBJ in GBK format.
+ ``TPA plasmid GBK File``: plasmid sequences from TPA in GBK format.
+ ``mMGE plasmid GBK File``: plasmid sequences from mMGE in GBK format.

## GFF3 file download
### Plasmid GFF3 File Download

+ ``PLSDB plasmid GFF3 File``: plasmid sequences from PLSDB in GFF3 format.
+ ``IMG/PR plasmid GFF3 File``: plasmid sequences from IMG/PR in GFF3 format.
+ ``COMPASS plasmid GFF3 File``: plasmid sequences from COMPASS in GFF3 format.
+ ``GenBank plasmid GFF3 File``: plasmid sequences from GenBank in GFF3 format.
+ ``RefSeq plasmid GFF3 File``: plasmid sequences from RefSeq in GFF3 format.
+ ``ENA plasmid GFF3 File``: plasmid sequences from ENA in GFF3 format.
+ ``Kraken2 plasmid GFF3 File``: plasmid sequences from Kraken2 in GFF3 format.
+ ``DDBJ plasmid GFF3 File``: plasmid sequences from DDBJ in GFF3 format.
+ ``TPA plasmid GFF3 File``: plasmid sequences from TPA in GFF3 format.
+ ``mMGE plasmid GFF3 File``: plasmid sequences from mMGE in GFF3 format.



