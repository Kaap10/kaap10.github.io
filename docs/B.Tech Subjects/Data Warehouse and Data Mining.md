---
sidebar_position: 2
---

# Data Warehouse and Data Mining

# Unit-1

# Unit-2

# Unit-3

# Unit-4
# Unit-5
**1. Aggregation** 
- combining + summarizing large amounts of data into smaller meaningful form
Why need? Raw data are too big, detailed and difficult to understand.
![[Pasted image 20260511092010.png|469]]
Examples -> Daily Sales into weekly sales, marks of student -> average marks.

**2. Data Aggregator** 
- Tool that collect data, combines, summarizes and give useful patterns.
Working of Data Aggregator?
a) Collect data from different source
b) combines data
c) summarize data - use functions

**Why Data Generalization needed?**
- summarize, find patterns, remove unnecessary details, decision making.
**Analytical Characterization**
- descriptive summarize of data, using functions like (mean, median, mode etc)
Historical Information?
- old data stored in data warehouse, that help use to understand trends, patterns and change over time.
- Why? -> sales, customer behavior, profit, trends analysis change over time, decision making, forecasting
![[Pasted image 20260511092902.png|474]]
**Query Facility**
- tool that helps customer to get information for their query from data warehouse.
- Types? 
	- 1. Simple Queries (list all products)
	- 2. Complex Queries (last 3 months sales)
	- 3. OLAP Queries (deep analysis)
**OLAP**
- online analytical processing
- technology used to analyse large amount of data in warehouse
- view from different dimensions for better decisions.
- **OLAP Cube** -> stores data in multiple dimensions
![[Pasted image 20260511094517.png|336]]
- **Types of OLAP operations** - 
	- 1. Roll-up (summarization): Day -> Month -> Year
	- 2. Drill-down (detailing): Year -> Month -> Day
	- 3. Slice (single values of one dimension): cube to 2D table
	- 4. Dice (subset of dimension): 
	- 5. Pivot Rotate (rotate data to view from different angle)
- **OLAP Servers** -> system that process OLAP queries
- **Types of OLAP Servers** 
	- 1. ROLAP (relational) 
	- 2. MOLAP (multidimensional)
	- 3. HOLAP (hybrid)
	