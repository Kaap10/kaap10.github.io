# Database Management System 
- acronym of "Database Management System"
- one of the important core subject in the field of computer science
- also a part of AKTU 3rd sem syllabus 
- Important for Interview / OA (mcq + coding)
- In the era of AI - data is the new oil

| DBMS Master Guide | 🔗 HTML Links |
| :--- | :--- |
| **1. DBMS Topics** | [Open File](/dbms/dbms_topics.html/) |
| **2. DBMS LEVEL-1** | [Open File](/dbms/dbms_level1.html/) |
| **3. DBMS LEVEL-2** | [Open File](/dbms/dbms_level2.html/) |
| **4. DBMS LEVEL-3** | [Open File](/dbms/dbms_level3.html/) |

# Level-1
## 1.1 Topics to cover
![[Pasted image 20260520113916.png|481]]
## 1.2 What is a Database & DBMS
### Data
- raw facts, meaning less, no information
- Ex: 42 (it can be age or amount)
### Information
- process data, meaningful, convey information
- Ex: age = 42 
### Data Points
- Ex: Student -> Rahul, 21, Delhi, 85% 
- these are all data points of a student
### Database
- organized collection of related data
- store data
- data can be AMU
- Ex: GLB SIM have all students record, finding anything takes milliseconds
- without DB? - excel files, redundancy, hard to find
- with DB? - fast search, no duplicates, reliable
### DBMS
- Software that create, manage and controls access to DB
- EX: DB is Library, DBMS is librarian
- CRUD operation on Data
- DBMS software like? - MySQL, MongoDB, PostgreSQL etc
- Security, backup and concurrency
### Interview QnA
![[Pasted image 20260520115723.png|575]]

## 1.3 DBMS vs File System

- where data was stored before DBMS? - plain files (.txt or excel)
### File System Problems
- Data Redundancy (same data - multiple times/places)
- Data inconsistency (1 file - different copies - different values)
- No Query language
- No access control
- No backup/recovery
- can't handle multiple users
### DBMS Advantage
- No Redundancy (normalization)
- Consistency Guaranteed
- SQL for queries
- RBAC
- Automatic backup/recovery
- handle concurrent users
### DBMS vs File System
![[Pasted image 20260520120337.png|522]]
### Interview QnA
![[Pasted image 20260520120444.png|525]]

## 1.4 Types of DBMS
- there are 4 main types
### Type-1 | Hierarchical
- Data arrange in tree pattern
- One parent, many children
- Fast
- inflexible - child can only have 1 parent
### Type-2 | Network
- hierarchical + child can have many parent
- graph pattern
- flexible + complex to manage
### Type-3 | Relational (RDBMS)
- Data stored in rows & cols (table format)
- table linked via keys
- use SQL to query
- Ex: MySQL, PostgreSQL, Oracle, SQL Server
- Note - MySQL is open-source and lightweight (by oracle), while Microsoft SQL Server is enterprise-focused with advanced features and tighter Microsoft ecosystem integration.
### Type-4 | NoSQL
- no fixed schema
- built for scale & flexibility 
- Store data as documents (MongoDB), Key-values (Redis), Graph-DB (Neo4j), wide-col (Cassandra)
### Interview QnA
![[Pasted image 20260520121623.png|550]]
## 1.5 3-Tier DBMS Architecture
- DBMS breaks into 3 level
- user don't need to know how data is storing
- changes at one level, doesn't effect another level
- this is called "Data Independence"
### Tier-1 | External / View
- each user see data relevant to them
- Ex: Rahul can only see his marks, teacher can see all student marks
### Tier-2 | Conceptual / Logical
- blueprint of DB
- describe everything about DB
### Tier-3 | Internal / Physical
- Database Administrator (DBA) manage this layer
- actual files storage etc on disks
### Example of 3-tier
- External (Customer sees Menu, not recipes)
- Conceptual (kitchen)
- Internal (where spices, vegetables are kept)
### Data Independence
![[Pasted image 20260520123258.png|538]]
### Interview QnA
![[Pasted image 20260520123333.png|548]]
## 1.6 ER Model & ER Diagrams
- Entity Relationship Model -> Blueprint of DB
- what it shows? - Data + Relationships
### Component of ER Model
- Entity -> Real world object (Rectangle)
- Attribute -> property of an entity (oval)
- Relationship -> link between entities (Diamond)
- Key Attribute -> uniquely identifies (underlined oval)
### Types of Attributes
1. Simple -> Can't divide further (age, roll no etc)
2. Composite -> Can divide in sub parts (name -> first, middle and last name & address etc)
3. Derived -> calculate from other attributes (age derived from DOB)
4. Multi-valued -> can have multiple values (phone no etc)
### Relationship Types (Cardinality)
![[Pasted image 20260520151301.png|641]]
### Weak Entity
- can't uniquely identified by own, need other attributes to be uniquely identified
- (double rectangle)
- Ex: Fees submit (but need transaction no)
### Interview QnA
![[Pasted image 20260520151503.png|622]]
### ER-Diagram Example
## 1.7 Relational Model Basics
- propose by E.F. Codd (1970)
 ![[Pasted image 20260520151915.png|506]]
### Properties of Relation
![[Pasted image 20260520152027.png|563]]
### Interview QnA
![[Pasted image 20260520152101.png|582]]
## 1.8 Types of Keys
- helps to find uniquely identified rows and establish relationship between tables
![[Pasted image 20260520152244.png|589]]
### Super Key vs Candidate Key
- super key -> any combination that give uniqueness
- candidate key -> minimal super key
### Foreign Key
- maintain referential integrity
![[Pasted image 20260520152517.png|566]]
## 1.9 Basic SQL (DDL + DML)
### SQL Categories
![[Pasted image 20260520152608.png|579]]
### DDL
![[Pasted image 20260520152727.png|529]]
### DML
![[Pasted image 20260520152755.png|541]]
### Important Constraints
![[Pasted image 20260520152828.png|557]]
### Drop vs Delete vs Truncate
![[Pasted image 20260520152900.png|561]]
### Interview QnA
![[Pasted image 20260520152945.png|546]]
# Level-2
![[Pasted image 20260520113729.png|493]]
## 2.1 Normalization
- Normalization removes **data redundancy** and **update anomalies** from tables by organizing them into well-structured smaller tables.
![[Pasted image 20260520170828.png|398]]
![[Pasted image 20260520170924.png|638]]
![[Pasted image 20260520171003.png|630]]
![[Pasted image 20260520171038.png|628]]
### Interview QnA
![[Pasted image 20260520171123.png|571]]
## 2.1 Functional Dependencies
## 2.2 SQL Joins (all types)
## 2.3 Aggregation & GROUP BY
## 2.4 Subqueries & Nested SQL
## 2.5 Views, Procedures & Triggers
## 2.6 Transactional & ACID
## 2.7 Concurrency Problems
## 2.8 Locking & 2PL
## 2.9 Indexing & B-tree
# Level-3
## Topics to cover
![[Pasted image 20260520113806.png]]
## 3.1 Deadlock 
## 3.2 Isolation Levels
## 3.3 Recovery & Logging
## 3.4 Query Optimization
## 3.5 Relational Algebra
## 3.6 Hashing Techniques
## 3.7 NoSQL vs SQL + CAP
## 3.8 Sharding & Replication
## 3.9 Advanced SQL
## 3.10 Top Interview QnA
