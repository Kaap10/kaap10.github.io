# Database Management System 
- acronym of "Database Management System"
- one of the important core subject in the field of computer science
- also a part of AKTU 3rd sem syllabus 
- Important for Interview / OA (mcq + coding)
- In the era of AI - data is the new oil
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
## 1.7 Relational Model Basics


## 1.8 Types of Keys
## 1.9 Basic SQL (DDL + DML)
# Level-2
![[Pasted image 20260520113729.png|493]]
# Level-3
![[Pasted image 20260520113806.png]]