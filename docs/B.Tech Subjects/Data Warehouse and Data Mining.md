---
sidebar_position: 2
---

# Data Warehouse and Data Mining

## Unit 1: Data Warehousing: Concepts & Architecture

### 1.1 Data Warehouse — Definition & Features

A Data Warehouse is a large storage system where a company keeps all its old + current data in one place for analysis and decision-making.

#### Keywords
- **Bill Inmon**: Father of Data Warehousing — defined the 4 features
- **Subject-Oriented**: Data organized by topic — Sales, Customers, Products, Finance
- **Integrated**: Data from many sources combined into one consistent format
- **Time-Variant**: Stores historical data for years; compare past vs present
- **Non-Volatile**: Data is mostly read-only; added periodically, not deleted

#### Q&A
**❓ What do you mean by Data Warehousing?**

A Data Warehouse is a subject-oriented, integrated, time-variant, and non-volatile collection of data that supports management's decision-making process. It collects data from multiple operational systems (ERP, CRM, apps) and stores it in a central repository for analysis.

**❓ What is Data Warehouse? Explain its types.**
- Public Data Warehouse — cloud-based, open to public (AWS, Google BigQuery)
- Private Data Warehouse — owned by single org; more secure and costly
- Government Data Warehouse — managed by govt for census, crime, health data
- Cooperative Data Warehouse — shared by group of organizations

📌 **Note**: Amazon example: Stores orders, customers, payments, delivery data in DW to find best-selling products and customer patterns.

### 1.2 Data Warehouse Components

A Data Warehouse has 5 main components that work together in a pipeline.

#### Keywords
- **Data Sources**: OLTP DBs, Excel, CRM/ERP, web apps — raw data origin
- **ETL**: Extract → Transform → Load — heart of the data warehouse
- **DW Database**: Central storage; very large, read-optimized, stores years of data
- **Data Marts**: Smaller subject-specific parts (Sales Mart, Finance Mart)
- **Reporting Tools**: Power BI, Tableau, Excel — converts data to insights

#### Q&A
**❓ Briefly discuss the Data Warehousing Components.**
- Data Sources: OLTP systems, flat files, web apps provide raw data
- ETL: Extracts data from sources, transforms (clean + convert), loads into DW
- DW Database: Central repository — large, historical, read-optimized
- Data Marts: Dept-level subsets — Sales, HR, Finance get their own slice
- Reporting/Analytics Tools: Power BI, Tableau, Excel for dashboards and trends

**❓ Explain three-tier data warehousing architecture.**
- Tier 1 — Data Source layer: OLTP systems, flat files, external data
- Tier 2 — Data Warehouse Server: ETL + DW Database + OLAP server
- Tier 3 — Front-end layer: Reporting tools, dashboards, data mining tools

### 1.3 Building a Data Warehouse

#### Steps
1. Requirement Analysis — understand business needs, reports, analysis goals
2. Identify Data Sources — OLTP, ERP, CRM, flat files
3. Choose Architecture — top-down / bottom-up / hybrid
4. Schema Design — Star, Snowflake, or Fact Constellation
5. Design ETL Process — Extract, Transform, Load pipeline
6. Select Hardware & Software — servers, OS, ETL tools, OLAP tools
7. Load Data — initial data load, populate fact & dimension tables
8. Testing — functional, performance, data quality, security
9. Deployment — connect reporting tools, create dashboards
10. Maintenance — monitor, backup, user training

#### Q&A
**❓ Explain the steps of Knowledge Discovery in Data (KDD).**
1. Data Cleaning — remove noise, missing values, duplicates
2. Data Integration — combine from multiple sources
3. Data Selection — select relevant data for analysis
4. Data Transformation — normalize, aggregate, convert format
5. Data Mining — apply algorithms (classification, clustering, association)
6. Pattern Evaluation — filter useful, interesting patterns
7. Knowledge Presentation — graphs, tables, reports

**❓ What do you mean by Granularity?**

Granularity = the level of detail in data stored in a data warehouse.
- High granularity = very detailed (e.g., every single transaction with timestamp)
- Low granularity = summary data (e.g., total monthly sales)

📌 **Note**: Fine granularity → more storage; Coarse granularity → faster queries but less detail.

### 1.4 Multi-Dimensional Data Model & OLAP Cube Operations

#### Keywords
- **Fact Table**: Contains numeric measures (sales, quantity, profit) + foreign keys
- **Dimension Table**: Describes facts — Time, Product, Location, Customer
- **Roll-Up**: Summarize — Day → Month → Year; City → State → Country
- **Drill-Down**: Go deeper — Year → Month → Day (opposite of roll-up)
- **Slice**: Select single value of one dimension — shows a 2D table
- **Dice**: Select a range/subset of multiple dimensions — subcube
- **Pivot**: Rotate the cube — change rows ↔ columns for different view

#### Q&A
**❓ Explain Multi-Dimensional Data Model.**

The multi-dimensional model organizes data into Facts and Dimensions stored as a data cube. Facts are numeric values (e.g., sales = 5000) surrounded by dimension tables (Time, Product, Location, Customer). OLAP operations (Roll-up, Drill-down, Slice, Dice, Pivot) allow analysis from different angles.

**❓ Explain Pivot operation in OLAP.**

Pivot = Rotate the data cube to view it from a different perspective. Example: Change rows ↔ columns — Product-wise sales view → Region-wise sales view. Helps visualize data in different formats without changing the underlying data.

**❓ Compare OLTP and OLAP Systems.**
- OLTP: Transactional, current data, row-oriented, many small read/write ops
- OLAP: Analytical, historical data, column-oriented, complex read-heavy queries
- OLTP: Many users, high concurrency | OLAP: Few analysts, batch processing
- OLTP: Normalized DB | OLAP: Denormalized (Star/Snowflake schema)

### 1.5 Schemas — Star, Snowflake & Fact Constellation

#### Star Schema
- 1 central Fact Table surrounded by Dimension Tables
- Denormalized — dimension data is NOT split further
- Fast query performance; simple joins

#### Snowflake Schema
- Extension of Star — Dimension tables are further broken into sub-dimensions
- Normalized structure — reduces data redundancy
- More complex joins; saves storage but slower queries

#### Fact Constellation (Galaxy Schema)
- 2 or more Fact Tables sharing common Dimension Tables
- Used when a company has multiple business processes (Sales + Shipping)
- Most complex but most flexible

#### Q&A
**❓ Discuss Snowflake Schema in detail.**

Snowflake Schema is an extension of Star Schema where dimension tables are normalized into subdimension tables. E.g., Product Dimension splits into Category Dimension (Category ID → Category Name → Department Name). This reduces redundancy but increases number of joins, making queries slower but storage-efficient.

**❓ Discuss the Fact Constellation Schema.**

Fact Constellation (Galaxy Schema) has multiple fact tables sharing common dimension tables. E.g., Sales Fact Table and Shipping Fact Table both share Product, Customer, Time, and Store dimensions. Instead of duplicating dimensions, they are reused across fact tables.

### 1.6 Mapping DW to Multiprocessor Architecture

#### Architectures
- **Shared Memory (SMP)**: All CPUs share one memory — fast but limited scalability
- **Shared Disk (SMP variant)**: Each CPU has own memory but shared disk storage
- **Shared Nothing (MPP)**: Each CPU has own memory + disk — most scalable for DW

#### Steps to Map DW
1. Identify workload — large queries, OLAP ops, aggregations, data mining
2. Choose architecture — Shared Nothing is most common for DW
3. Distribute data — by tables, rows, columns, or partitions
4. Assign tasks — query processing, indexing, aggregation, ETL
5. Enable parallel query execution — divide queries across processors
6. Combine results — merge from all processors → single response to user

## Unit 2: Data Warehouse Process & Technology

### 2.1 Warehousing Strategy & Management

A Warehousing Strategy is the overall roadmap for building, using, managing, and maintaining a data warehouse.

#### 12 Elements of Warehousing Strategy
1. Business Requirements — what the company wants to achieve
2. Data Sources — identify ERP, CRM, billing, Excel sources
3. Architecture Selection — top-down, bottom-up, or hybrid
4. DW Design — schema choice (Star/Snowflake/Galaxy)
5. ETL Strategy — extraction, cleaning, transformation, loading plan
6. Hardware & Software — servers, storage, ETL tools, OLAP tools
7. Data Quality & Metadata — ensure clean, well-described data
8. Security & Access Control — roles, permissions, user management
9. Refresh & Update Policy — daily/weekly/real-time update schedule
10. Performance Management — query optimization, tuning
11. Backup & Recovery — protect DW from failures
12. User Training & Support — train analysts, managers, end users

#### Warehouse Management Support Processes
- **ETL Execution**: Running ETL jobs to load fresh data into warehouse
- **Data Refresh**: Daily/weekly updates to keep latest information available
- **Backup & Recovery**: Regular backup; restore on failure
- **Performance Monitoring**: Track query speed, storage, ETL time
- **Metadata Management**: "Data about data" — definitions, formats, source info
- **Security & Access Control**: Roles and permissions for sensitive data
- **User Support**: Help analysts and managers run queries and reports

### 2.2 Warehouse Planning & Implementation

#### Steps (V.VIMP)
1. Requirement Analysis — understand business reports and analysis needs
2. Identify Data Sources — OLTP, ERP, CRM, flat files, APIs
3. Choose Architecture — Top-down (Inmon) or Bottom-up (Kimball)
4. Design DW — schema (Star/Snowflake), fact & dimension tables, metadata
5. Design ETL — Extract → Clean → Transform → Load pipeline
6. Select Hardware & Software — servers, Oracle/SQL Server, Informatica/Talend, Power BI
7. Load Data — initial data load, populate tables
8. Testing — functional, performance, data quality, security
9. Deployment — connect OLAP + reporting tools, publish dashboards
10. Training & Maintenance — train users; monitor, backup, update

### 2.3 Hardware & Operating Systems for DW

#### Hardware Types
- **CPU (Processors)**: Multi-core; processes millions of rows fast
- **RAM (Memory)**: 32GB–128GB+; supports caching and in-memory processing
- **Storage (HDD/SSD)**: High-capacity + RAID systems for data protection
- **Network Hardware**: Gigabit/10GbE for fast data transfer between servers
- **Backup Devices**: Tape drives, cloud backup, external storage
- **Cluster Machines**: Multiple machines connected for large-scale analytics

#### Operating Systems
- **Linux**: Most widely used — fast, secure, stable; best for enterprise DW
- **Unix**: Highly reliable for big companies and complex environments
- **Windows Server**: Supports Microsoft SQL Server, SSIS, SSAS; medium-large DW

#### Hardware Selection Criteria
- Performance, Scalability, Storage Capacity, Reliability, Compatibility, Cost, Backup Support, Network Speed

### 2.4 Client-Server Architecture

#### Types
- **1-Tier**: Everything on one machine — client + server + DB; small apps only
- **2-Tier**: Client ↔ Server; desktop app connects directly to DB server
- **3-Tier**: Client → Application Server → DB Server; most common for DW

3-Tier: Presentation layer (UI) | Logic layer (Java/.NET) | Database layer (MySQL/Oracle)

#### Q&A
**❓ Explain Client-Server Architecture used in Data Warehousing.**

Client-Server Architecture is a model where Client = device sending request and Server = machine processing it. In data warehousing, the 3-tier model is standard: (1) Presentation layer — dashboards and reports; (2) Application/OLAP server layer — processes queries; (3) Database/DW layer — stores data. Client sends query → server processes it → results returned.

### 2.5 Distributed DBMS & Shared Memory Architecture

#### Distributed Shared Memory (DSM)
DSM = Multiple computers sharing a common virtual memory space. All processes read/write from the same shared memory, even though memory is physically distributed across nodes.

#### Types of DSM
- **On-Chip Memory DSM**: Data inside CPU chip — very fast but expensive
- **Bus-Based Multiprocessors**: All CPUs on a bus; cache reduces traffic
- **Ring-Based Multiprocessors**: No central memory; token passes around ring

#### Advantages / Disadvantages
- ✔ Simple to program | ✔ Large virtual memory | ✔ Portable
- ✘ Slow access | ✘ Consistency problems | ✘ Data redundancy

### 2.6 Parallel Processors & Cluster Systems

#### Parallel Processors
Parallel algorithms run on one computer using multiple CPU cores simultaneously. Each core processes a part of the data → results combined → faster output. Used in: multi-core computers, GPUs, Parallel K-Means.

#### Cluster Systems
A Cluster = group of multiple computers (nodes) connected together working as one powerful system.
- **High Performance** — combined CPU power for fast processing
- **High Availability** — if one node fails, others continue
- **Scalability** — add more nodes to increase capacity
- **Shared Storage** — common disk access for all nodes

### 2.7 Warehousing Software & Schema Design

#### Popular DW Tools
- **Amazon Redshift**: Cloud-based DW by AWS — fast, scalable
- **Snowflake**: Modern cloud DW — structured + semi-structured data
- **Google BigQuery**: Serverless DW — very fast, pay-per-use
- **Microsoft Azure Synapse**: Enterprise cloud analytics platform
- **Teradata**: Traditional enterprise DW — used by large companies
- **Power BI / Tableau**: Reporting and visualization tools
- **Informatica / Talend**: ETL tools for data pipeline

#### Schema Design
Covered in Unit 1 — Star, Snowflake, Fact Constellation. Selection depends on query patterns, data redundancy tolerance, and performance requirements.

### 2.8 Enterprise Warehouse, Data Mart & Market Basket Analysis

#### Enterprise Warehouse vs Data Mart
- **Enterprise Warehouse**: Organization-wide DW — all departments, all data
- **Data Mart**: Department-specific subset — Sales Mart, Finance Mart, HR Mart
- **Virtual Warehouse**: View over OLTP data — no physical DW storage

#### Market Basket Analysis
"If a customer buys Item A, what is the chance they also buy Item B?" — finds frequently bought-together items.
- **Support** = freq(A∪B) / N — how often items appear together
- **Confidence** = freq(A∪B) / freq(A) — how likely B is bought when A is bought
- **Apriori Algorithm** — generates association rules using support/confidence thresholds
- **Use cases**: retail shelf placement, combo offers, recommendation systems

### 2.9 Data Normalization

#### Min-Max Normalization
Scales data to a fixed range (usually 0 to 1). Formula: x' = (x − min) / (max − min). Good when data has no outliers.

#### Z-Score (Standard Score) Normalization
Scales using mean and standard deviation. Formula: x' = (x − μ) / σ. Good when data has outliers.

## Unit 3: Data Mining: Pre-processing & Data Reduction

### 3.1 Data Mining — Overview & Functionalities

#### Keywords
- **Data Mining**: Discovering patterns, trends, and knowledge from large data
- **KDD**: Knowledge Discovery in Databases — 5-step process leading to DM
- **Classification**: Predict category (Spam/Not Spam, Pass/Fail)
- **Clustering**: Group similar data without labels
- **Association Rules**: Find items that occur together (Market Basket)
- **Regression**: Predict continuous numerical values
- **Outlier Detection**: Find unusual/unexpected data points
- **Summarization**: Compact description of data — avg, trends, summaries

#### 7 Major Issues in Data Mining
1. Data Quality — missing values, noisy data, duplicates → wrong results
2. Huge Volume — large data needs powerful hardware
3. Data Integration — combining from many sources with different formats
4. Privacy & Security — personal data must be protected
5. Algorithm Complexity — some algorithms are slow; need optimization
6. Mining Different Data Types — text, images, videos are harder to mine
7. Interpretation of Results — not all patterns are meaningful

#### Q&A
**❓ Is Data Mining a part of KDD process?**

Yes — Data Mining is a key step within the KDD (Knowledge Discovery in Databases) process. KDD is the overall process: Cleaning → Integration → Selection → Transformation → Data Mining → Evaluation → Presentation. Data Mining is step 5 — where algorithms are applied to find patterns.

### 3.2 Data Cleaning

#### Techniques (V.V.VIMP)
- **Remove Duplicates**: Delete repeated rows/entries
- **Detect & Remove Outliers**: Fix extreme values that are errors
- **Remove Irrelevant Data**: Drop columns not needed for analysis
- **Standardize Capitalization**: "delhi" / "Delhi" / "DELHI" → "Delhi"
- **Convert Data Type**: "25" (string) → 25 (integer)
- **Clear Formatting**: ₹5000/- → 5000 (strip symbols)
- **Fix Errors**: "Kolkatta" → "Kolkata"
- **Language Translation**: "Yes" and "ह ाँ" → convert to same language
- **Handle Missing Values**: Replace with mean/median/mode or remove record

#### Handling Noisy Data
- **Binning** — group into bins, replace with mean/median/boundary
- **Regression** — fit curve to data, replace noisy values with predicted values
- **Clustering** — outliers appear outside clusters → remove/correct
- **Outlier Removal** — identify extreme values, remove or correct
- **Human Inspection** — manual check for meaning-based corrections

### 3.3 Binning & Discretization

#### Binning
Smoothing technique: sort data → divide into bins → replace each value with bin mean/median/boundary. Removes random noise.
- **Equal-width Binning**: divide range into equal intervals (0–10, 10–20, 20–30)
- **Equal-frequency Binning**: each bin has same number of data values

#### Discretization
Converting continuous data into discrete categories. E.g., height 150–180 cm → Short / Medium / Tall. Helps decision trees and reduces data complexity.
- **Clustering-based Discretization**: use k-means to form groups

### 3.4 Data Integration & Transformation

#### Issues in Data Integration
- **Schema Integration**: Different sources have different column names and formats
- **Data Redundancy**: Same customer appears in sales DB and billing DB
- **Conflicts/Inconsistency**: Age=25 in one source, Age=52 in another
- **Naming Conflicts**: "ID" = employee ID in HR vs product ID in sales
- **Different Formats**: "Delhi" vs "DELHI"; date 12-05-2024 vs 2024/05/12
- **Data Type Conflicts**: Age stored as string in one source, integer in another

#### Data Transformation Methods
- **Normalization**: Scale data into small range (0–1) — Min-Max or Z-score
- **Aggregation**: Summarize — daily → monthly sales
- **Generalization**: Age 21 → "Young"; city → state → country
- **Encoding**: Convert categories to numbers
- **Smoothing**: Reduce noise using moving/weighted averages

### 3.5 Data Reduction

#### Methods
- **Cube Aggregation**: Daily → weekly → monthly → yearly (fewer rows, same insight)
- **Dimensionality Reduction**: Reduce number of columns using PCA, wavelets
- **Data Compression**: Lossless (ZIP, PNG) or Lossy (JPEG, MP3) — reduce size
- **Numerosity Reduction**: Replace full data with model/sample/histogram

#### Dimensionality Reduction — Why
- Faster processing | Removes useless/correlated features | Less storage
- Improves model accuracy | Enables 2D/3D visualization

#### Q&A
**❓ What is Data Cube Aggregation and Dimensionality Reduction?**

Data Cube Aggregation: Summarize detailed data to higher-level form — daily sales → monthly summary → yearly total. Reduces rows and speeds up OLAP queries. Dimensionality Reduction: Reduce number of attributes (columns) without losing key information. Techniques include PCA (Principal Component Analysis) and wavelet transforms.

### 3.6 Numerosity Reduction

#### Types
- **Parametric Methods**: Use mathematical models (regression, log-linear) — only model params stored
- **Non-Parametric Methods**: Use actual reduced data:
  - **Histograms** — group data into buckets, store bucket info only
  - **Clustering** — replace cluster data with centroid (center point)
  - **Sampling** — use a small representative sample instead of full data
  - **Data Cubes** — store summarized values instead of detailed records

### 3.7 Statistical Measures — Central Tendency & Dispersion

#### Central Tendency
- **Mean**: Average — sum / count; affected by outliers
- **Median**: Middle value when sorted; not affected by outliers
- **Mode**: Most frequent value; works for categorical data

#### Measures of Dispersion
- **Range**: Max − Min; simplest but affected by extreme values
- **Quartile Deviation (QD)**: (Q3 − Q1) / 2; spread of middle 50% data
- **Variance (σ²)**: Σ(x − mean)² / N; average squared deviation from mean
- **Standard Deviation (SD)**: √Variance; most used; shows spread in same units as data
- **Correlation Coefficient**: Positive: both increase together; Negative: one increases, other decreases; Zero: no relation

#### Q&A
**❓ What does negative, positive, and zero value of Correlation Coefficient indicate?**
- Positive (0 to +1): Both variables move in the same direction (e.g., height & weight)
- Negative (−1 to 0): Variables move in opposite directions (e.g., price & demand)
- Zero: No linear relationship between the two variables

### 3.8 Decision Tree (Overview)
Covered in detail in Unit 4. Decision trees work as a data reduction tool by using the most important attributes to split data and reduce high-dimensional datasets into structured decision paths. Algorithms: ID3 (Information Gain), C4.5 (Gain Ratio), CART (Gini Index).

## Unit 4: Classification and Prediction

### 4.1 Classification Overview
- Predict class/category on new data based on past data
- Example: Email classification, bank loan approval, medical diagnosis, online shopping

#### How Classification Works
- Training phase
- Model creation
- Testing phase
- Prediction

### 4.2 Data Generalization
- Detailed data into simple one
- Done using Aggregation, Group BY

### 4.3 Class Comparison
- Comparison of two or more classes to find how they are similar or different
- Better decision making, better models, analysis

#### Steps of Class Comparison
1. Form classes
2. Generalize data (remove unnecessary things)
3. Compute analytical characteristics
4. Compare the classes

### 4.4 Measure of Dispersion
- How spread data values are
- Measures: Range, Quartile Deviation (semi range), Mean Deviation, Variance, Standard Deviation

### 4.5 Statistical Based Algorithms
- Classification methods use probability & statistics to predict class of data
- Used in classification, prediction and pattern recognition
- Easy to implement, fast, accurate result

1. **Naive Bayes Classifier** - Uses Bayes theorem, fast, for text, small training data, easy
2. **Bayesian Network** - Graph based structures (nodes and edges), how variables influence each other
3. **Decision Trees** - Splits on basis of measures (Gini index, entropy, information gain), splitting criteria is statistical

### 4.6 Distance Based Algorithms
- Classify data by measuring distance between data points, check similarity
1. **KNN** - K-Nearest Neighbors algorithm

## Unit 5: Data Mining Applications and Advanced Topics

### 5.1 Aggregation
- Combining + summarizing large amounts of data into smaller meaningful form
- Why needed? Raw data are too big, detailed and difficult to understand

<img src="/img/Pasted image 20260511092010.png" width="469" />

Examples: Daily Sales into weekly sales, marks of student → average marks.

### 5.2 Data Aggregator
- Tool that collects data, combines, summarizes and gives useful patterns

#### Working of Data Aggregator
a) Collect data from different sources
b) Combines data
c) Summarize data - use functions

#### Why Data Generalization Needed?
- Summarize, find patterns, remove unnecessary details, decision making

#### Analytical Characterization
- Descriptive summary of data, using functions like (mean, median, mode etc)

### 5.3 Historical Information
- Old data stored in data warehouse, that helps us to understand trends, patterns and change over time
- Why? Sales, customer behavior, profit, trends analysis change over time, decision making, forecasting

<img src="/img/Pasted image 20260511092902.png" width="474" />

### 5.4 Query Facility
- Tool that helps customer to get information for their query from data warehouse

#### Types
- 1. Simple Queries (list all products)
- 2. Complex Queries (last 3 months sales)
- 3. OLAP Queries (deep analysis)

### 5.5 OLAP
- Online analytical processing
- Technology used to analyze large amount of data in warehouse
- View from different dimensions for better decisions
- **OLAP Cube** → stores data in multiple dimensions

#### Types of OLAP Operations
- 1. Roll-up (summarization): Day → Month → Year
- 2. Drill-down (detailing): Year → Month → Day
- 3. Slice (single values of one dimension): cube to 2D table
- 4. Dice (subset of dimension):
- 5. Pivot Rotate (rotate data to view from different angle)

#### OLAP Servers
- System that processes OLAP queries

#### Types of OLAP Servers
- 1. ROLAP (relational)
- 2. MOLAP (multidimensional)
- 3. HOLAP (hybrid)

### 5.6 ROLAP
- Store data in relational database + SQL for analysis
- Working: Data stored in tables, ROLAP server converts OLAP query into SQL, runs on DB, responds to user
- Advantage: Handle large data + RDBMS + SQL + no cube storage
- Disadvantage: Slower than MOLAP + depends on SQL

<img src="/img/Pasted image 20260511102124.png" width="475" />

### 5.7 MOLAP
- Store data in multi-dimensional cube
- Precompute summary data
- Working: Data loaded from DB, MOLAP server creates cubes, user queries cubes for instant results
- Advantage: Fastest + complex queries + instant results
- Disadvantage: Can't handle large data + cube creation takes time and memory

<img src="/img/Pasted image 20260511102425.png" width="473" />

### 5.8 HOLAP
- ROLAP + MOLAP hybrid
- Working: Detail data queried from SQL + summary results from cube
- Advantage: Handle large data + better than ROLAP + flexible than MOLAP
- Disadvantage: Complex + costlier

### 5.9 Difference Between OLAP Types

<img src="/img/Pasted image 20260511102806.png" width="697" />

### 5.10 E.F. Codd's 12 OLAP Rules
A system must follow these rules to be called an OLAP System:
1. Multidimensional view (time, product, location)
2. Transparency (no overhead)
3. Accessibility (one interface)
4. Consistent report performance
5. Client-server architecture
6. Generic Dimensionality (all dimensions should have similarity)
7. Sparse handling (handling of empty cells in cube)
8. Cross-dimension operations
9. Multi-user support
10. Intuitive data manipulation
11. Flexible reporting
12. Dimensions and aggregation levels

### 5.11 Data Mining Interface
- Screen, dashboard, tool that allows user to interact with data mining system
- Bridge between user and data mining system

#### Role of Data Mining Interface
1. Select data
2. Data mining tasks
3. Runs algorithms
4. Results visually
5. Drill down and drill up
6. Save and export
7. User-friendly usage

### 5.12 Data Backup and Recovery
- Protect from system failures, hardware issues, human errors, etc.
- **Data Backup**: Copy of data stored (full, incremental, scheduled, off-site, replication backups)
- **Data Recovery**: Restoring lost or damaged data from backup. Load backup files from warehouse, rebuild missing data using logs, warehouse runs again after failure

### 5.13 Tuning
- Improving performance of data warehouse so that queries run faster

#### How Tuning is Done
1. Indexing → speed up
2. Partitioning → big tables into small tables
3. Query Optimization
4. Aggregated tables
5. Hardware tuning
6. Caching
7. Load Balancing

### 5.14 Types of Data Warehouse Testing
1. Data accuracy testing
2. Data completion testing
3. ETL testing
4. Performance testing
5. Integration testing
6. Security testing
7. User acceptance testing

### 5.15 Applications of Data Warehousing
- Business, marketing, finance, retail, e-commerce, healthcare, government, telecommunication, education

### 5.16 Security in Data Warehouse
- Protecting sensitive data from unauthorized access
- Includes: Authentication, authorization, data encryption, access control, audit logs, firewall and network security

### 5.17 Web Mining
- Finding useful patterns from web data (webpages, logs, etc.)
- Why? Improvement, better search results, targeted ads

#### Types of Web Mining
1. **Web Content** - From web pages
2. **Web Structure** - Study links between webpages
3. **Web Usage** - User behavior
4. **Spatial** - Data related to location or geographical
5. **Temporal** - Data that changes over time

### 5.18 Difference Between Spatial & Temporal Mining

<img src="/img/Pasted image 20260511094501.png" />
