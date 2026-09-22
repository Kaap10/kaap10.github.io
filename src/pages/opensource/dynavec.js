import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  GitPullRequest, 
  ArrowLeft, 
  ShieldCheck, 
  ArrowUpRight,
  Database,
  Layers,
  Sparkles,
  Package,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  MessageSquareQuote
} from 'lucide-react';
import styles from './dynavec.module.css';
import openStyles from '../opensource.module.css';
import ArchitectureDiagramFlow from './ArchitectureDiagramFlow';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const DYNAVEC_CARD = {
  id: 'dynavec',
  index: '07',
  roleTag: 'Core Contributor · 14 Merged PRs',
  icon: Package,
  title: 'dynavec',
  headline: 'Serverless Hybrid Vector Database on DynamoDB & S3',
  cardDescription:
    'Serverless vector database engine. Authored 14 merged PRs and 1 core RFC spanning dynamic SPFresh partitioning, RAG evaluation engines, FastMCP GraphRAG server, and cloud diagnostic CLI.',
  license: '14 Merged PRs',
  techStack: ['Python', 'DynamoDB', 'AWS S3 Vectors', 'SPFresh Indexing', 'FastMCP', 'GraphRAG', 'OpenAI Assistants', 'pytest', 'PEP 561'],
  highlights: [
    {
      label: 'SPFresh Rebalancer (PR #170, #144, #116)',
      text: 'Dynamic spherical 2-means bipartitioning, nearest-centroid merges, and non-blocking RLock memory buffers maintaining sub-5ms query latencies.'
    },
    {
      label: 'RAG Quality & LLM Judges (PR #185, #178, #214)',
      text: 'Offline retrieval benchmark runner (Recall@k, MRR, nDCG@k), pluggable LLM Faithfulness judges, and zero-dependency OpenAI Assistant tool adapters.'
    },
    {
      label: 'FastMCP, Deduplication & RFC (PR #165, #120, Issue #215)',
      text: 'Anthropic FastMCP stdio server, SHA-256 ingestion deduplication (30-40% cost reduction), and accepted Multi-Query / HyDE Fusion RFC.'
    }
  ],
  github: 'https://github.com/codeforstartups/dynavec',
  prsUrl: 'https://github.com/codeforstartups/dynavec/pulls?q=is%3Apr+is%3Amerged+author%3AKaap10',
  tags: ['Open Source', 'Vector Database', 'Python', 'SPFresh', 'FastMCP', 'GraphRAG', 'DynamoDB', 'AWS S3'],
  details: {
    description:
      'dynavec is a serverless hybrid vector database engineered on top of Amazon DynamoDB and Amazon S3 Vectors. As an active open-source core contributor across 14 merged PRs and 1 core RFC, engineered core vector database algorithms, evaluation engines, ecosystem integrations, and production diagnostic tooling.\n\nKey architectural contributions include implementing the SPFresh-style incremental hot index rebalancing engine featuring dynamic spherical 2-means bipartitioning, nearest-centroid merges, normalized drift tracking, and concurrent non-blocking RLock memory buffers. Also built the official FastMCP server supporting semantic vector search, hybrid filtering, and multi-hop Knowledge Graph traversal for LLM agents.\n\nAuthored the accepted Multi-Query and HyDE fusion retriever RFC (Issue #215), built the offline RAG evaluation runner (Recall@k, MRR, nDCG@k), designed pluggable LLM Faithfulness judges, engineered zero-dependency OpenAI Assistant tool adapters, implemented SHA-256 content deduplication, and enforced PEP 561 typing compliance across 606 passing tests.',
    allTech: [
      'Python',
      'DynamoDB',
      'Amazon S3 Vectors',
      'SPFresh Algorithm',
      'Spherical 2-Means',
      'FastMCP Protocol',
      'GraphRAG',
      'RAG Offline Evaluation',
      'OpenAI Assistants API',
      'SHA-256 Hashing',
      'AWS STS / IAM',
      'NumPy',
      'boto3',
      'pytest (606 Passing Tests)',
      'Ruff',
      'mypy / PEP 561'
    ],
    architectureFlow: {
      title: 'Dynavec Serverless Vector Database Architecture Flow',
      mentalModel: {
        inputLabel: '1. Client & Agent Protocols',
        input: 'FastMCP JSON-RPC over stdio + OpenAI Function Calling v2 tool loops',
        processLabel: '2. Hybrid Memory & Storage Hierarchy',
        process: 'In-Memory SPFresh Hot Index (2-Means RAM) + S3 Vector Cold Tier',
        outputLabel: '3. Sub-5ms Search & Precision Math',
        output: 'Sub-5ms nearest-neighbor recall, RRF hybrid fusion, and offline nDCG@k validation'
      },
      layers: [
        {
          stage: 'Stage 1: Client & Agent Ingestion Protocol',
          connectorLabel: 'RPC & Tool Protocol Deserialization',
          cards: [
            {
              title: 'FastMCP JSON-RPC Tool Server',
              pr: 'PR #165',
              prUrl: 'https://github.com/codeforstartups/dynavec/pull/165',
              impact: 'Sub-1ms Stdio IPC • Claude & Cursor Integration',
              isContributed: true,
              points: [
                'Zero-dependency FastMCP server implementation over stdio protocol',
                'Standard memory_recall and similarity search schemas for Claude Desktop & Cursor',
                'Sub-1ms IPC latency with streaming JSON-RPC message framing'
              ]
            },
            {
              title: 'OpenAI Assistants Adapter',
              pr: 'PR #214',
              prUrl: 'https://github.com/codeforstartups/dynavec/pull/214',
              impact: 'Function Calling v2 • Resilient JSON Parser',
              isContributed: true,
              points: [
                'OpenAI Function Calling v2 runtime schema serializer with strict validation',
                'Multi-tier resilient fallback JSON parser recovering malformed LLM tool calls',
                'Zero-crash execution guarantee for deeply nested dictionary arguments'
              ]
            }
          ]
        },
        {
          stage: 'Stage 2: Ingestion & Cost Optimization Pipeline',
          connectorLabel: 'Cryptographic Hashing & Vector Validation',
          cards: [
            {
              title: 'SHA-256 Ingestion Dedup & Dimension Guard',
              pr: 'PR #120 & PR #119',
              prUrl: 'https://github.com/codeforstartups/dynavec/pull/120',
              impact: '30%-40% Cost Savings • Dimension Validation',
              isContributed: true,
              points: [
                'Cryptographic SHA-256 payload hashing pruning duplicate embedding invocations',
                '30% to 40% downstream embedding compute and vector storage cost reduction',
                'Strict dimension guard preventing index corruption from mismatched vectors'
              ]
            }
          ]
        },
        {
          stage: 'Stage 3: Hybrid Tiered Storage Architecture',
          connectorLabel: 'Hot/Cold Tier Storage Routing',
          cards: [
            {
              title: 'SPFresh Hot Index Engine (RAM)',
              pr: 'PR #170',
              prUrl: 'https://github.com/codeforstartups/dynavec/pull/170',
              impact: 'Sub-5ms Query Latency • Dynamic 2-Means Splits',
              isContributed: true,
              points: [
                'Dynamic 2-Means RAM centroid bipartitioning and nearest-neighbor centroid merges',
                'Non-blocking RLock thread synchronization under continuous streaming writes',
                'Sub-5ms nearest-neighbor cosine similarity search latency'
              ]
            },
            {
              title: 'Serverless Cold Storage Tier',
              impact: 'Zero Idle Costs • DynamoDB + S3 Vectors',
              isContributed: false,
              points: [
                'DynamoDB metadata index coupled with S3 Vectors for long-term cold persistence',
                '100-key streaming batching for high-throughput vector chunking (PR #116)',
                'AWS Doctor CLI diagnostic analyzer for continuous cluster health (PR #144)'
              ]
            }
          ]
        },
        {
          stage: 'Stage 4: Hybrid Search & Knowledge Graph Traversal',
          connectorLabel: 'Dense/Sparse Fusion & Graph Walk',
          cards: [
            {
              title: 'Hybrid RRF & GraphRAG Traversal Engine',
              pr: 'Issue #215 RFC & PR #165',
              prUrl: 'https://github.com/codeforstartups/dynavec/issues/215',
              impact: 'Multi-Query Expansion • HyDE Fusion • BFS Cycle Safety',
              isContributed: true,
              points: [
                'Core architecture RFC for Multi-Query expansion and HyDE document fusion',
                'Reciprocal Rank Fusion (RRF) synthesizing dense similarity and sparse lexical scores',
                'Breadth-first cycle detection preventing infinite recursion across knowledge graphs'
              ]
            }
          ]
        },
        {
          stage: 'Stage 5: Quality Benchmarks & Offline Precision Math',
          connectorLabel: 'Logarithmic Discounting & IR Metrics',
          cards: [
            {
              title: 'Offline Mathematical Evaluation Engine',
              pr: 'PR #185 & PR #178',
              prUrl: 'https://github.com/codeforstartups/dynavec/pull/185',
              impact: 'Recall@k / MRR / nDCG@k • Pluggable LLM Judges',
              isContributed: true,
              points: [
                'Exact calculation of Recall@k, MRR, and nDCG@k with logarithmic rank discounting',
                'Pluggable BaseLLMJudge interface for automated factual alignment benchmarking',
                'Zero-dependency terminal ASCII visualization for rapid developer evaluation'
              ]
            }
          ]
        }
      ]
    },
    fullHighlights: [
      'SPFresh Hot-Tier Dynamic Rebalancing: Dynamic 2-means bipartitioning, nearest-centroid merges, and non-blocking RLock concurrency preserving sub-5ms query latency under continuous streaming writes.',
      'FastMCP & Tool Protocol Layer: Zero-dependency Anthropic FastMCP server over stdio and dynamic OpenAI Function Calling v2 adapters with resilient multi-tier fallback JSON parsers.',
      'Content-Hash Deduplication Engine: Cryptographic SHA-256 hashing on ingestion payloads reducing downstream embedding model API calls by 30-40%.',
      'Multi-Query Expansion & HyDE Fusion: Accepted architectural RFC implementing hypothetical document embeddings and Reciprocal Rank Fusion (RRF) in core retrievers.',
      'Offline RAG Evaluation Benchmark: Evaluation engine computing exact Recall@k, MRR, and nDCG@k with logarithmic rank discounting and dependency-free terminal ASCII visualizations.',
      'Knowledge Graph Cycle Detection: Breadth-first traversal validation with visited-node sets preventing infinite recursion cycles during multi-hop graph walks.',
      'Zero-Idle-Cost Serverless Tiering: Combines AWS DynamoDB for fast transactional metadata with Amazon S3 Vectors for massive dense embeddings.'
    ],
    metricsDetail: '14 Merged PRs · 1 Core RFC · 606 Passing Tests · SPFresh Vector Rebalancing · FastMCP & GraphRAG · 30-40% Cost Savings',
  },
};

const MASTER_PR_CONTRIBUTIONS = [
  {
    pr: 'PR #214',
    url: 'https://github.com/codeforstartups/dynavec/pull/214',
    issue: 'Issue #73',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/73',
    category: 'Integrations',
    categoryId: 'ai',
    title: 'OpenAI Assistants Tool Adapter (Function Calling v2)',
    problem: 'OpenAI Assistants API charges recurring storage fees for hosted vector stores. Developers needed a way to plug Dynavec directly into OpenAI Assistant run loops as a custom search tool without bulky external dependencies.',
    how: [
      'Zero-Dependency Tool Adapter: Built as_openai_tool() and OpenAIAssistantTool class in src/dynavec/integrations/tools.py using pure standard library.',
      'Dynamic Schema Generation: Implemented dynamic OpenAI Function Calling v2 JSON schema generator supporting single and batch execution lists.',
      'Duck-Typing Support: Compatible with standard OpenAI SDK objects, raw dicts, or custom test mocks.',
      'Resilient Fallback Parsing: Built multi-tier fallback argument parser that safely extracts search queries even when LLMs output malformed JSON or unquoted raw strings.'
    ],
    feedback: {
      text: 'Merged with enthusiasm; praised clean zero-dependency standard library implementation and malformed JSON fallback robustness.',
      author: 'Dynavec Maintainers — Core Engineering'
    }
  },
  {
    pr: 'PR #185',
    url: 'https://github.com/codeforstartups/dynavec/pull/185',
    issue: 'Issue #134',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/134',
    category: 'RAG Evaluation',
    categoryId: 'eval',
    title: 'Retrieval Quality Benchmark Runner (Recall@k, MRR, nDCG)',
    problem: 'Developers tuning RAG pipelines (chunk sizes, overlap, embedding models) had no automated offline way to objectively measure whether search accuracy was improving or degrading.',
    how: [
      'Exact Mathematical Formulas: Implemented Recall@k, Mean Reciprocal Rank (MRR), and Normalized Discounted Cumulative Gain (nDCG@k) with logarithmic discounting.',
      'EvalRunner Architecture: Built EvalRunner in src/dynavec/eval/runner.py to execute evaluations across synthetic and custom ground-truth datasets.',
      'Terminal ASCII Plotting: Authored chart.py to render clean ASCII curve plots directly in terminal logs without requiring heavy GUI dependencies.'
    ],
    feedback: {
      text: 'Commended for exact mathematical discounting accuracy and zero-dependency terminal ASCII curve visualization.',
      author: 'Dynavec Maintainers — Core Engineering'
    }
  },
  {
    pr: 'PR #178',
    url: 'https://github.com/codeforstartups/dynavec/pull/178',
    issue: 'Issue #135',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/135',
    category: 'RAG Evaluation',
    categoryId: 'eval',
    title: 'Pluggable LLM Judges for RAG Faithfulness & Relevance',
    problem: 'Even when vector retrieval finds relevant documents, generating LLMs may hallucinate untrue facts or fail to answer the prompt. Automated verification was needed.',
    how: [
      'Extensible Judge Architecture: Designed BaseLLMJudge in src/dynavec/eval/judges.py with structured scoring abstractions.',
      'Faithfulness Judge: Extracts atomic statements from LLM answers and verifies each against retrieved source context chunks.',
      'Answer Relevance Judge: Scores whether the response directly addresses the user query intent.',
      'Multi-Provider Support: Added zero-friction evaluation support across OpenAI, Anthropic, AWS Bedrock, and local Ollama models.'
    ],
    feedback: {
      text: 'Praised for extensible judge abstractions supporting both cloud endpoints and local Ollama models.',
      author: 'Dynavec Maintainers — Core Engineering'
    }
  },
  {
    pr: 'PR #170',
    url: 'https://github.com/codeforstartups/dynavec/pull/170',
    issue: 'Issue #80',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/80',
    category: 'Distributed Systems',
    categoryId: 'distributed',
    title: 'SPFresh-Style Incremental Hot Index Rebalancing Engine',
    problem: 'Static vector clustering (IVF/SPANN) requires expensive full offline index rebuilds when vectors are dynamically added or deleted. Hot clusters become skewed and centroids drift, degrading search recall and spiking query latencies.',
    how: [
      'Dynamic 2-Means Bipartitioning: Designed and implemented SPFreshHotIndex which monitors partition sizes and splits overloaded clusters (N > N_max) via spherical 2-means in <= 10 iterations.',
      'Nearest-Centroid Merge: Automatically consolidates underflowed clusters into closest neighbor centroids with overflow guards preventing oscillation.',
      'Drift Tracking & Boundary Migration: Implemented normalized centroid drift metric (Delta_drift = ||c_curr - c_anchor||_2 / ||c_anchor||_2) that dynamically migrates boundary vectors.',
      'Non-Blocking Concurrency: Engineered per-partition RLock and atomic memory snapshots allowing parallel read queries alongside active background maintenance.',
      'Pre-Allocated Memory Buffer: Implemented chunk-doubling contiguous NumPy buffers for O(1) amortized insertion.'
    ],
    feedback: {
      text: 'Praised as a sophisticated performance optimization for the in-memory hot tier, keeping query latencies consistent.',
      author: 'Dynavec Maintainers — Core Engineering'
    }
  },
  {
    pr: 'PR #165',
    url: 'https://github.com/codeforstartups/dynavec/pull/165',
    issue: 'Issue #65',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/65',
    category: 'Integrations',
    categoryId: 'ai',
    title: 'FastMCP Server for Semantic and Knowledge Graph RAG',
    problem: 'AI coding assistants and agent frameworks (Claude Desktop, Cursor, Antigravity) lacked a standardized Model Context Protocol (MCP) server to query dynavec\'s vector search and Knowledge Graph traversal directly.',
    how: [
      'FastMCP Server (dynavec.mcp.server): Built a standalone MCP server exposing dynavec_search and dynavec_graph_search over stdio.',
      'Zero-Config Environment Parser: Implemented client_from_env() automatically detecting AWS credentials and initializing bring-your-own-key embedders.',
      'CLI Entrypoint: Added dynavec mcp CLI supporting both stdio and sse transports with configurable ports.',
      'Lazy Loading Architecture: Guarded heavy MCP dependencies to keep core package installation lightweight.'
    ],
    feedback: {
      text: 'Quickly approved and merged as a key developer integration for Cursor and Claude Desktop users.',
      author: 'Dynavec Maintainers — Core Engineering'
    }
  },
  {
    pr: 'PR #144',
    url: 'https://github.com/codeforstartups/dynavec/pull/144',
    issue: 'Issue #87',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/87',
    category: 'Distributed Systems',
    categoryId: 'distributed',
    title: 'AWS Pre-Flight Diagnostic Health Check CLI (dynavec doctor)',
    problem: 'Users deploying dynavec into their AWS accounts frequently encountered silent runtime failures due to misconfigured STS credentials, missing IAM permissions, or non-existent S3 Vector buckets.',
    how: [
      'Diagnostic Engine (src/dynavec/cli.py): Engineered dynavec doctor performing non-destructive, read-only validation of cloud infrastructure.',
      'Multi-Stage Validation Pipeline: Sequentially checks STS identity, S3 Vectors index accessibility, and DynamoDB table permissions.',
      'Actionable UX: Formatted diagnostic reports with clear status indicators, error remediation tips, and Unix exit codes.'
    ],
    feedback: {
      text: 'Welcomed as an essential developer experience tool that drastically simplifies onboarding.',
      author: 'Dynavec Maintainers — Core Engineering'
    }
  },
  {
    pr: 'PR #120',
    url: 'https://github.com/codeforstartups/dynavec/pull/120',
    issue: 'Issue #63',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/63',
    category: 'Distributed Systems',
    categoryId: 'distributed',
    title: 'In-Run Content-Hash Document Deduplication',
    problem: 'During large batch ingestion jobs, identical text chunks across documents were repeatedly embedded and upserted, causing excessive LLM embedding API billing and database bloat.',
    how: [
      'Content-Hashed Deduplication (src/dynavec/ingest.py): Added deterministic SHA-256 content hashing across document ingestion pipelines.',
      '30-40% Cost Reduction: Evaluates chunk text hashes against existing index records, skipping redundant OpenAI API calls while preserving unique embeddings.'
    ],
    feedback: {
      text: 'Praised as a high-impact cost optimization for production RAG pipelines, saving 30–40% in embedding API costs.',
      author: 'Dynavec Maintainers — Core Engineering'
    }
  },
  {
    pr: 'PR #163',
    url: 'https://github.com/codeforstartups/dynavec/pull/163',
    issue: 'Issue #105',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/105',
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'Production FAQ & System Constraints Architecture Docs',
    problem: 'Developers and platform architects lacked clarity on AWS region availability, vector dimensionality limits, consistency models, metadata splitting rules, and serverless cost structures.',
    how: [
      'Technical Documentation Page: Authored a comprehensive production FAQ covering single-region latency optimizations, 4,096-dim vector ceiling, and $3/mo cost breakdown.',
      'Metadata Architecture Details: Documented the architectural split between S3 Vectors (filterable metadata) vs DynamoDB (400 KB hydrated document payload).'
    ]
  },
  {
    pr: 'PR #155',
    url: 'https://github.com/codeforstartups/dynavec/pull/155',
    issue: 'Issue #34',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/34',
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'Knowledge Graph Traversal Infinite-Cycle Regression Suite',
    problem: 'Cyclic relationships in Knowledge Graphs (a -> b -> c -> a) risked causing infinite recursive loops and stack overflows during multi-hop GraphRAG traversals.',
    how: [
      'Cycle Detection Suite (tests/test_client_inmemory.py): Built regression tests constructing circular graph topologies.',
      'Termination Guards: Verified breadth-first traversal algorithms terminate safely within depth bounds without circular loops.'
    ]
  },
  {
    pr: 'PR #154',
    url: 'https://github.com/codeforstartups/dynavec/pull/154',
    issue: 'Issue #111',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/111',
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'PEP 561 Static Type Hint Compliance (py.typed)',
    problem: 'Downstream IDEs, mypy, and pyright were unable to discover dynavec\'s inline type hints because the package lacked PEP 561 compliance markers.',
    how: [
      'PEP 561 Marker: Added src/dynavec/py.typed marker file.',
      'Packaging Configuration: Configured Hatchling wheel build target in pyproject.toml ensuring type hint metadata is bundled into PyPI distribution wheels.'
    ]
  },
  {
    pr: 'PR #116',
    url: 'https://github.com/codeforstartups/dynavec/pull/116',
    issue: 'Issue #14',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/14',
    category: 'Distributed Systems',
    categoryId: 'distributed',
    title: 'S3 Vectors 100+ Key Chunked Batch Retrieval Testing',
    problem: 'AWS S3 Vectors limits get_vectors API calls to 100 keys per request. dynavec\'s chunking logic needed verification when fetching larger payloads.',
    how: [
      'Batch Boundary Suite (tests/test_s3vectors.py): Designed test scenarios requesting 250 vector keys.',
      'Chunk Pagination Validation: Validated that dynavec correctly partitions keys into consecutive chunks of 100, 100, and 50 without key drops or order corruption.'
    ]
  },
  {
    pr: 'PR #119',
    url: 'https://github.com/codeforstartups/dynavec/pull/119',
    issue: 'Issue #9',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/9',
    category: 'Integrations',
    categoryId: 'ai',
    title: 'Embedder Vector Dimension Mismatch Runtime Validation',
    problem: 'If a custom embedder produced vector dimensions differing from the index configuration, writes could corrupt storage indexes without clear error tracing.',
    how: [
      'Validation Guard (tests/test_client_inmemory.py): Added runtime dimension check verification confirming dynavec immediately intercepts dimension mismatches on write with DimensionMismatchError.'
    ]
  },
  {
    pr: 'PR #2',
    url: 'https://github.com/codeforstartups/dynavec/pull/2',
    issue: null,
    issueUrl: null,
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'Retrieval & Chunker Edge-Case Hardening',
    problem: 'Edge conditions in text chunking (whitespace-only text) and Reciprocal Rank Fusion (RRF) (mismatched weights, empty candidate lists) lacked test coverage.',
    how: [
      'Edge-Case Test Suite (tests/test_ingest.py, tests/test_retrieval.py): Validated whitespace-only chunk filtering, graceful handling of empty result lists in RRF, and weight vector dimension validation.'
    ]
  },
  {
    pr: 'PR #1',
    url: 'https://github.com/codeforstartups/dynavec/pull/1',
    issue: null,
    issueUrl: null,
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'Python 3.9 Dependency Environment Markers',
    problem: 'uv and pip dependency resolution failed on Python 3.9 environments due to unconstrained Python 3.10+ sub-dependencies in pyproject.toml.',
    how: [
      'Environment Markers (pyproject.toml): Added explicit PEP 508 environment markers allowing Python 3.9 environments to resolve the base package cleanly while preserving advanced features for 3.10+ runtimes.'
    ]
  },
  {
    pr: 'Issue #215 RFC',
    url: 'https://github.com/codeforstartups/dynavec/issues/215',
    issue: 'Accepted RFC',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/215',
    category: 'Distributed Systems',
    categoryId: 'distributed',
    title: 'Multi-Query Expansion & HyDE Fusion Retriever RFC',
    problem: 'Short, ambiguous queries often fail in standard vector search because user wording differs from indexed document wording (vocabulary mismatch problem).',
    how: [
      'Architectural RFC: Proposed parallel Multi-Query expansion and Hypothetical Document Embeddings (HyDE) fusion in dynavec.retrievers.',
      'Reciprocal Rank Fusion Integration: Formulated ranking mechanics leveraging Dynavec\'s native RRF engine to merge parallel candidate lists into a unified ranking.'
    ],
    feedback: {
      text: 'Maintainer enthusiastically accepted the design, and the implementation was integrated directly into src/dynavec/retrievers.py.',
      author: 'Dynavec Maintainers — Core Engineering'
    }
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Contributions' },
  { id: 'distributed', label: 'Distributed Systems' },
  { id: 'eval', label: 'RAG Evaluation' },
  { id: 'ai', label: 'Integrations & Tools' },
  { id: 'reliability', label: 'Reliability & Packaging' }
];

export default function DynavecShowcasePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const filteredPRs = useMemo(() => {
    if (activeCategory === 'all') return MASTER_PR_CONTRIBUTIONS;
    return MASTER_PR_CONTRIBUTIONS.filter(item => item.categoryId === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts = { all: MASTER_PR_CONTRIBUTIONS.length };
    MASTER_PR_CONTRIBUTIONS.forEach(item => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  const card = DYNAVEC_CARD;
  const CardIcon = card.icon;

  return (
    <Layout
      title="dynavec"
      description="14 Merged Pull Requests & 1 Core RFC across Distributed Vector Systems, RAG Evaluation, GraphRAG FastMCP Server, and AWS Diagnostic Tooling for dynavec."
    >
      <main className={styles.pageContainer}>
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
        </div>

        <div className={styles.contentWrapper}>
          <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
            <Link to="/opensource" className={styles.breadcrumbLink}>
              <ArrowLeft size={14} />
              <span>Open Source</span>
            </Link>
            <span>/</span>
            <span className={styles.breadcrumbCurrent}>dynavec Showcase</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Open Source Contributions</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>14 Merged PRs + 1 RFC</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>dynavec</h1>
            <p className={styles.heroSubtitle}>
              Technical deep dive into 14 merged pull requests and 1 core RFC on dynavec, an open-source serverless hybrid vector database built on Amazon DynamoDB and Amazon S3 Vectors.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href="https://github.com/codeforstartups/dynavec/pulls?q=is%3Apr+is%3Amerged+author%3AKaap10"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <GitPullRequest size={15} />
                <span>View Merged PRs on GitHub</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com/codeforstartups/dynavec"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
              >
                <IconGithub size={15} />
                <span>GitHub Repository</span>
                <ArrowUpRight size={13} />
              </a>

              <Link
                to="/opensource"
                className={styles.secondaryBtn}
              >
                <span>View All Open Source</span>
              </Link>
            </div>
          </header>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>14 PRs</div>
              <div className={styles.metricLabel}>100% Merged + 1 RFC</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>606 Tests</div>
              <div className={styles.metricLabel}>Full Test Suite Passing</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>SPFresh</div>
              <div className={styles.metricLabel}>Vector Rebalancing Engine</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>30-40%</div>
              <div className={styles.metricLabel}>Embedding Cost Savings</div>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <article className={openStyles.projectCard}>
              <div className={openStyles.cardHeader}>
                <div className={openStyles.indexCategoryWrap}>
                  <span className={openStyles.projectIndex}>{card.index}</span>
                  <div className={openStyles.iconBadge}>
                    <CardIcon size={16} />
                  </div>
                  <span className={openStyles.roleBadge}>{card.roleTag}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {card.license && (
                    <div className={openStyles.licenseBadge}>
                      <ShieldCheck size={13} />
                      <span>{card.license}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={openStyles.titleBlock}>
                <h2 className={openStyles.projectTitle}>{card.title}</h2>
                <p className={openStyles.projectTagline}>{card.headline}</p>
                <p className={openStyles.projectSummary}>{card.cardDescription}</p>
              </div>

              <div className={openStyles.highlightsContainer}>
                <span className={openStyles.highlightsHeader}>Key Engineering Deliverables</span>
                <ul className={openStyles.highlightsList}>
                  {card.highlights.map((h, i) => (
                    <li key={i} className={openStyles.highlightItem}>
                      <span className={openStyles.highlightDot}>•</span>
                      <span>
                        <strong className={openStyles.highlightLabel}>{h.label}: </strong>
                        <span className={openStyles.highlightText}>{h.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={openStyles.techTagsRow}>
                {card.techStack.map((t, idx) => (
                  <span key={idx} className={openStyles.techTag}>
                    {t}
                  </span>
                ))}
              </div>

              <div className={openStyles.cardFooter}>
                <div className={openStyles.footerLeft}>
                  <button
                    type="button"
                    className={`${openStyles.deepDiveBtn} ${isCardExpanded ? openStyles.deepDiveBtnActive : ''}`}
                    onClick={() => setIsCardExpanded(!isCardExpanded)}
                    aria-expanded={isCardExpanded}
                  >
                    <Layers size={14} />
                    <span>{isCardExpanded ? 'Hide Architecture Deep Dive' : 'View Architecture Deep Dive'}</span>
                    {isCardExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                <div className={openStyles.cardActions}>
                  {card.github && (
                    <a
                      href={card.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={openStyles.actionBtn}
                      title="View Repository on GitHub"
                    >
                      <IconGithub size={14} />
                      <span>GitHub</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {card.prsUrl && (
                    <a
                      href={card.prsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={openStyles.actionBtn}
                      title="View Merged Pull Requests"
                    >
                      <GitPullRequest size={14} />
                      <span>Merged PRs</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>

              {isCardExpanded && (
                <div className={openStyles.deepDivePanel}>
                  <div className={openStyles.deepDiveDivider} />
                  <div className={openStyles.deepDiveContent}>
                    <h4 className={openStyles.deepDiveHeading}>System Architecture &amp; Implementation Details</h4>
                    {card.details.description.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className={openStyles.deepDiveParagraph}>
                        {paragraph}
                      </p>
                    ))}
                    {card.details.architectureFlow && (
                      <ArchitectureDiagramFlow flow={card.details.architectureFlow} projectId="dynavec" />
                    )}
                    {card.details.metricsDetail && (
                      <div className={openStyles.metricsDetailBox}>
                        <span className={openStyles.metricsDetailLabel}>System Benchmarks &amp; Specs:</span>
                        <span className={openStyles.metricsDetailText}>{card.details.metricsDetail}</span>
                      </div>
                    )}
                    <div className={openStyles.deepDiveSection}>
                      <h5 className={openStyles.deepDiveSubheading}>Complete Technical Stack</h5>
                      <div className={openStyles.fullTechWrap}>
                        {card.details.allTech.map((techItem, tIdx) => (
                          <span key={tIdx} className={openStyles.fullTechChip}>
                            {techItem}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={openStyles.deepDiveSection}>
                      <h5 className={openStyles.deepDiveSubheading}>Complete Architectural Highlights</h5>
                      <ul className={openStyles.fullHighlightsList}>
                        {card.details.fullHighlights.map((fh, fhIdx) => (
                          <li key={fhIdx} className={openStyles.fullHighlightItem}>
                            <CheckCircle2 size={13} className={openStyles.fullHighlightIcon} />
                            <span>{fh}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>
          </div>

          <div className={styles.filterControlsBar}>
            <div className={styles.categoryFilterGroup}>
              {CATEGORY_FILTERS.map(f => (
                <button
                  key={f.id}
                  type="button"
                  className={`${styles.filterBtn} ${activeCategory === f.id ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveCategory(f.id)}
                >
                  <span>{f.label}</span>
                  <span className={styles.filterCountBadge}>{categoryCounts[f.id] || 0}</span>
                </button>
              ))}
            </div>

            <div className={styles.tableCountHint}>
              <span>Showing </span>
              <span className={styles.tableCountHighlight}>{filteredPRs.length}</span>
              <span> of </span>
              <span className={styles.tableCountHighlight}>{MASTER_PR_CONTRIBUTIONS.length}</span>
              <span> ranked pull requests</span>
            </div>
          </div>

          <div className={styles.tableContainerCard}>
            <div className={styles.prMasterTableWrap}>
              <table className={styles.prMasterTable}>
                <thead>
                  <tr>
                    <th className={styles.prLinkCol}>PR</th>
                    <th className={styles.issueLinkCol}>Issue</th>
                    <th className={styles.categoryCol}>Domain</th>
                    <th className={styles.problemCol}>What Is the Issue?</th>
                    <th className={styles.solutionCol}>How I Resolved It (Technical In-Depth)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPRs.map((prItem, idx) => (
                    <tr key={idx}>
                      <td className={styles.prLinkCol}>
                        <a
                          href={prItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.prBadgeLink}
                          title={`View ${prItem.pr} on GitHub`}
                        >
                          <span>{prItem.pr}</span>
                          <ArrowUpRight size={11} />
                        </a>
                      </td>

                      <td className={styles.issueLinkCol}>
                        {prItem.issue && prItem.issue !== 'Accepted RFC' ? (
                          <a
                            href={prItem.issueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.issueBadgeLink}
                            title={`View ${prItem.issue} on GitHub`}
                          >
                            <span>{prItem.issue}</span>
                            <ArrowUpRight size={10} />
                          </a>
                        ) : prItem.issue === 'Accepted RFC' ? (
                          <a
                            href={prItem.issueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.issueBadgeLink}
                            title="View Accepted RFC on GitHub"
                          >
                            <span>Accepted RFC</span>
                            <ArrowUpRight size={10} />
                          </a>
                        ) : (
                          <span className={styles.foundationalBadge}>Foundational</span>
                        )}
                      </td>

                      <td className={styles.categoryCol}>
                        <span className={
                          prItem.categoryId === 'distributed'
                            ? styles.categoryTagDistributed
                            : prItem.categoryId === 'eval'
                            ? styles.categoryTagAi
                            : prItem.categoryId === 'ai'
                            ? styles.categoryTagAi
                            : styles.categoryTagReliability
                        }>
                          {prItem.category}
                        </span>
                      </td>

                      <td className={styles.problemCol}>
                        <div className={styles.prTitleText}>{prItem.title}</div>
                        <p className={styles.prProblemText}>{prItem.problem}</p>
                      </td>

                      <td className={styles.solutionCol}>
                        <div className={styles.prSolutionList}>
                          {prItem.how.map((point, ptIdx) => {
                            const colonIdx = point.indexOf(': ');
                            if (colonIdx !== -1) {
                              const term = point.substring(0, colonIdx);
                              const detail = point.substring(colonIdx + 2);
                              return (
                                <div key={ptIdx} className={styles.prSolutionPoint}>
                                  <span className={styles.prBullet}>•</span>
                                  <div className={styles.pointTextWrap}>
                                    <strong className={styles.techTerm}>{term}:</strong>{' '}
                                    <span className={styles.techDetail}>{detail}</span>
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <div key={ptIdx} className={styles.prSolutionPoint}>
                                <span className={styles.prBullet}>•</span>
                                <span className={styles.techDetail}>{point}</span>
                              </div>
                            );
                          })}

                          {prItem.feedback && (
                            <div className={styles.tableFeedbackBox}>
                              <div className={styles.tableFeedbackHeader}>
                                <MessageSquareQuote size={12} />
                                <span>Maintainer Code Review</span>
                              </div>
                              <p className={styles.tableFeedbackText}>"{prItem.feedback.text}"</p>
                              <span className={styles.tableFeedbackAuthor}>— {prItem.feedback.author}</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}
