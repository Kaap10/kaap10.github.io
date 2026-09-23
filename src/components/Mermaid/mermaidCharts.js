/**
 * High-Fidelity Mermaid.js Architecture Flowcharts for Open Source Projects
 * Crafted with clean linear node-to-node pipelines, uniform subgraphs, and symmetric alignment.
 */

export const MERMAID_CHARTS = {
  magpie: `flowchart TD
    classDef contributed fill:#1A1218,stroke:#FF4D4F,stroke-width:2px,color:#FFFFFF;
    classDef isolation fill:#1E1528,stroke:#A855F7,stroke-width:1.5px,color:#F1F5F9;
    classDef core fill:#0F1F17,stroke:#22C55E,stroke-width:1.5px,color:#F1F5F9;

    subgraph S1 ["Stage 1: Client and Agentic Harness Adapters"]
      M1["GitHub Copilot CLI Integration<br/><b>PR #1287</b> · Standalone CLI & Draft PR HITL Gating"]:::contributed
      M2["Aider Pair Programming Harness<br/><b>PR #1286</b> · On-Demand /read Skills & Git Discipline"]:::contributed
      M3["Block Goose Agentic CLI Harness<br/><b>PR #1217</b> · GOOSE_MODE='approve' & Recipes"]:::contributed
      M4["Local Sovereign LLM Adapters<br/><b>PR #1206 & #1204</b> · Ollama/vLLM 70B+ Offline Inference"]:::contributed
      M1 --> M2 --> M3 --> M4
    end

    subgraph S2 ["Stage 2: Layer 0 Credential and Environment Isolation"]
      M5["agent-iso Sandbox Boundary<br/><b>PR #1217 & #1286</b> · Ambient Token & Credential Stripping"]:::contributed
      M6["SSH_AUTH_SOCK & Git Signature Preservation<br/>Gated Push Verification & Clean Execution Environment"]:::isolation
      M5 --> M6
    end

    subgraph S3 ["Stage 3: Canonical Tool Standard and MCP Execution Engine"]
      M7["70+ RFC-AI-0004 Universal Skill Registry<br/>Vendor-Neutral Standard across All Harnesses"]:::core
      M8["OSV.dev & Vetted-Ops Dispatcher<br/><b>PR #1326 & #1297</b> · Alias Graph & Python urllib Egress"]:::contributed
      M9["PonyMail & Apache Projects MCP Tool Servers<br/>JSON-RPC 2.0 stdio & streamable_http Endpoints"]:::core
      M10["Human-in-the-Loop Review Boundary<br/>Draft Pull Request Verification (0 Unreviewed Writes)"]:::contributed
      M7 --> M8 --> M9 --> M10
    end

    M4 -->|Harness Invocation<br/>& Option Normalization| M5
    M6 -->|Layer 0 Clean Subshell<br/>& JSON-RPC 2.0| M7
`,

  pyrit: `flowchart TD
    classDef contributed fill:#1A1218,stroke:#FF4D4F,stroke-width:2px,color:#FFFFFF;
    classDef engine fill:#1E1528,stroke:#A855F7,stroke-width:1.5px,color:#F1F5F9;
    classDef qa fill:#0F1F17,stroke:#22C55E,stroke-width:1.5px,color:#F1F5F9;

    subgraph S1 ["Stage 1: Dynamic Attack Scheduling and Budget Machine"]
      P1["Progressive Schedule Controller<br/><b>PR #2720</b> · ScheduleTransitionAction State Machine"]:::contributed
      P2["Dynamic Control Weight Ratcheting (+0.01)<br/>Exact-Budget Boundary Lock & inf/nan Loss Safety"]:::engine
      P1 --> P2
    end

    subgraph S2 ["Stage 2: Candidate Generation and Cross-Device Migration"]
      P3["GCGCandidateProposer Phase<br/><b>PR #2671</b> · Typed CandidateProposalBatch"]:::contributed
      P4["Per-Worker L2 Gradient Normalization<br/>SamplingStrategy & CandidateFilter Protocols"]:::engine
      P5["Cross-Device Gradient Synchronization<br/><b>PR #2671</b> · Safe Tensor Migration to main_device"]:::contributed
      P3 --> P4 --> P5
    end

    subgraph S3 ["Stage 3: VRAM-Bounded Candidate Evaluation Phase"]
      P6["GCGCandidateEvaluator Phase<br/><b>PR #2700</b> · CandidateEvaluationBatch Scoring"]:::contributed
      P7["Prompt-Level VRAM Cleanup Guard<br/><b>PR #2700</b> · del logits, ids (0 CUDA OOM Spikes)"]:::contributed
      P6 --> P7
    end

    subgraph S4 ["Stage 4: AI Red Team Verification and Compliance"]
      P8["Microsoft AI Red Team Test Suite<br/>45+ Offline Deterministic Unit Tests · 100% Pass Rate"]:::qa
    end

    P2 -->|Step Budgeting<br/>& Worker Admission| P3
    P5 -->|Cross-Device<br/>Gradient Tensors| P6
    P7 -->|Evaluated Scores<br/>& Loss Minimization| P8
`,

  dynavec: `flowchart TD
    classDef contributed fill:#1A1218,stroke:#FF4D4F,stroke-width:2px,color:#FFFFFF;
    classDef storage fill:#0E1424,stroke:#38BDF8,stroke-width:1.5px,color:#F1F5F9;
    classDef engine fill:#1E1528,stroke:#A855F7,stroke-width:1.5px,color:#F1F5F9;
    classDef eval fill:#0F1F17,stroke:#22C55E,stroke-width:1.5px,color:#F1F5F9;

    subgraph S1 ["Stage 1: Client and Agent Ingestion Protocols"]
      D1["FastMCP JSON-RPC Tool Server<br/><b>PR #165</b> · Sub-1ms Stdio IPC for Claude & Cursor"]:::contributed
      D2["OpenAI Assistants Adapter<br/><b>PR #214</b> · Function Calling v2 & Fallback JSON Parser"]:::contributed
      D1 --> D2
    end

    subgraph S2 ["Stage 2: Ingestion and Cost Optimization Pipeline"]
      D3["SHA-256 Ingestion Dedup & Dimension Guard<br/><b>PR #120 & #119</b> · 30-40% Cost Reduction & Corruption Prevention"]:::contributed
    end

    subgraph S3 ["Stage 3: Hybrid Tiered Storage Architecture"]
      D4["SPFresh Hot Index Engine (RAM)<br/><b>PR #170</b> · 2-Means Splits & Sub-5ms Query Latency"]:::contributed
      D5["Serverless Cold Tier Persistence<br/>DynamoDB Metadata Index & Amazon S3 Vectors"]:::storage
      D4 --> D5
    end

    subgraph S4 ["Stage 4: Hybrid Search and Knowledge Graph Traversal"]
      D6["Hybrid RRF & GraphRAG Traversal Engine<br/><b>Issue #215 RFC & PR #165</b> · Dense/Sparse Fusion & BFS Cycle Safety"]:::engine
    end

    subgraph S5 ["Stage 5: Quality Benchmarks and Precision Math"]
      D7["Offline Mathematical Evaluation Engine<br/><b>PR #185 & #178</b> · Exact Recall@k, MRR & nDCG@k Logarithmic Math"]:::eval
    end

    D2 -->|RPC Deserialization<br/>& Payload Hashing| D3
    D3 -->|Dimension-Verified<br/>Embeddings| D4
    D5 -->|Hot/Cold Vector<br/>Recall Candidates| D6
    D6 -->|Fused Search<br/>Rankings| D7
`,

  layer5io: `flowchart TD
    classDef contributed fill:#1A1218,stroke:#FF4D4F,stroke-width:2px,color:#FFFFFF;
    classDef cluster fill:#0E1424,stroke:#38BDF8,stroke-width:1.5px,color:#F1F5F9;
    classDef mesh fill:#1E1528,stroke:#A855F7,stroke-width:1.5px,color:#F1F5F9;
    classDef academy fill:#0F1F17,stroke:#22C55E,stroke-width:1.5px,color:#F1F5F9;

    subgraph S1 ["Stage 1: Multi-OS Container and Cluster Foundation"]
      L1["Rootless Podman Runtime Boundary<br/><b>PR #276 & #277</b> · Cross-OS WSL2, macOS & Linux Packaging"]:::contributed
      L2["KinD Multi-Node K8s Cluster<br/><b>PR #278</b> · Declarative Multi-Node Topology YAML"]:::contributed
      L1 --> L2
    end

    subgraph S2 ["Stage 2: Observability Mesh and Shell Execution"]
      L3["Prometheus & Grafana Observability Mesh<br/><b>PR #280</b> · Decoupled Telemetry Pods & PromQL Sync"]:::contributed
      L4["Cross-Platform Shell Execution Harness<br/><b>PR #274</b> · POSIX/PowerShell Parity & 100% Dead Link Repair"]:::contributed
      L3 --> L4
    end

    subgraph S3 ["Stage 3: Interactive Cloud Native Academy Playground"]
      L5["Interactive Cloud Native Academy Playground<br/>Zero-Install Browser Labs for Istio, Linkerd & Envoy"]:::academy
      L6["Automated Real-Time Step Verification<br/>Continuous Validation of Student Cluster State"]:::cluster
      L5 --> L6
    end

    L2 -->|Cluster Runtime<br/>& Container Socket| L3
    L4 -->|Normalized Script<br/>& Telemetry Routing| L5
`,

  palinode: `flowchart TD
    classDef contributed fill:#1A1218,stroke:#FF4D4F,stroke-width:2px,color:#FFFFFF;
    classDef os fill:#0E1424,stroke:#38BDF8,stroke-width:1.5px,color:#F1F5F9;
    classDef kernel fill:#1E1528,stroke:#A855F7,stroke-width:1.5px,color:#F1F5F9;
    classDef integrity fill:#0F1F17,stroke:#22C55E,stroke-width:1.5px,color:#F1F5F9;

    subgraph S1 ["Stage 1: Cross-Platform Process Probing Layer"]
      P1["POSIX Kernel Runtime Environment<br/>Native os.kill(pid, 0) Null-Signal Probing"]:::os
      P2["Win32 Kernel Process Probe Engine<br/><b>PR #215</b> · kernel32 WaitForSingleObject (0ms)"]:::contributed
      P1 --> P2
    end

    subgraph S2 ["Stage 2: State Machine and Error Trapping"]
      P3["STILL_ACTIVE (259) Trap Shield<br/><b>PR #215</b> · WAIT_TIMEOUT Invariant & Zombie Elimination"]:::contributed
      P4["Thread-Safe Win32 Error Capture<br/><b>PR #215</b> · kernel32 use_last_error=True TLS Isolation"]:::contributed
      P3 --> P4
    end

    subgraph S3 ["Stage 3: Codebase Integrity and Verification"]
      P5["AST Static Analysis Guard<br/><b>PR #207</b> · Python AST Scanner & Issue URL Leak Filter"]:::contributed
      P6["Cross-Platform Path Guard<br/><b>PR #228</b> · POSIX Forward-Slash Normalization & ntpath Test"]:::contributed
      P7["Resilient Filesystem Operations<br/><b>Issue #169 Triage</b> · Atomic UTF-8/CJK Writes & os.fchmod Fallback"]:::integrity
      P5 --> P6 --> P7
    end

    P2 -->|Kernel Process Handles<br/>& Signal Probes| P3
    P4 -->|Validated State Transitions<br/>& TLS Error Safety| P5
`,

  quater: `flowchart TD
    classDef contributed fill:#1A1218,stroke:#FF4D4F,stroke-width:2px,color:#FFFFFF;
    classDef auth fill:#0E1424,stroke:#38BDF8,stroke-width:1.5px,color:#F1F5F9;
    classDef rpc fill:#1E1528,stroke:#A855F7,stroke-width:1.5px,color:#F1F5F9;
    classDef matrix fill:#0F1F17,stroke:#22C55E,stroke-width:1.5px,color:#F1F5F9;

    subgraph S1 ["Stage 1: CLI Header Parsing and Ingestion"]
      Q1["Repeatable Header Parsing Engine<br/><b>PR #192</b> · Custom Transport Headers (--header 'Key: value')"]:::contributed
    end

    subgraph S2 ["Stage 2: Dynamic Authentication Precedence"]
      Q2["Authentication Merge Engine<br/><b>PR #192</b> · Stored Bearer Token Preservation & Explicit Overrides"]:::contributed
    end

    subgraph S3 ["Stage 3: Remote Transport and RPC Dispatch Pipelines"]
      Q3["Remote Manifest Client Pipeline<br/><b>PR #192</b> · _request_json Routing & Service Capability Cache"]:::contributed
      Q4["Remote Action Dispatcher Pipeline<br/><b>PR #192</b> · call_action RPC & Safe JSON Body Serialization"]:::contributed
      Q3 --> Q4
    end

    subgraph S4 ["Stage 4: Multi-Runtime Matrix QA Verification"]
      Q5["Python 3.11-3.14 CI Matrix Test Verification<br/><b>PR #192 Matrix</b> · Hypothesis Testing (5/5 Greptile Score)"]:::matrix
    end

    Q1 -->|Parsed Key-Value<br/>Header Tuples| Q2
    Q2 -->|Merged Authorization<br/>Header Map| Q3
    Q4 -->|Streamed RPC<br/>Wire Payloads| Q5
`,

  sqlite_graph_memory: `flowchart TD
    classDef contributed fill:#1A1218,stroke:#FF4D4F,stroke-width:2px,color:#FFFFFF;
    classDef host fill:#0E1424,stroke:#38BDF8,stroke-width:1.5px,color:#F1F5F9;
    classDef mcp fill:#1E1528,stroke:#A855F7,stroke-width:1.5px,color:#F1F5F9;
    classDef test fill:#0F1F17,stroke:#22C55E,stroke-width:1.5px,color:#F1F5F9;

    subgraph S1 ["Stage 1: AI Agent Host and Ingestion Layer"]
      G1["AI Agent Client Host Environment<br/>Claude Desktop, Claude Code & Cursor IDE over stdio"]:::host
    end

    subgraph S2 ["Stage 2: Pure Stdlib MCP Server Layer"]
      G2["Pure Python Stdlib MCP Server<br/><b>PR #8</b> · Zero External Dependencies & Typed memory_recall"]:::contributed
    end

    subgraph S3 ["Stage 3: Crash-Safe Subprocess Isolation"]
      G3["Subprocess Bridge & IPC Scoping<br/><b>PR #10</b> · NamedTemporaryFile Allocation & BRAIN_ANSWER_OUT"]:::contributed
    end

    subgraph S4 ["Stage 4: Graph RAG Storage and Error Boundaries"]
      G4["Dense Vector & Wikilink Graph Ledger<br/>e5-base Embeddings & Bidirectional Cross-Encoder Rerank"]:::host
      G5["Strict Error Boundaries & Diagnostics<br/><b>PR #14 & #10</b> · isError: True Diagnostics (0 Leaked Logs)"]:::contributed
      G4 --> G5
    end

    subgraph S5 ["Stage 5: TDD and Mutation Test Verification"]
      G6["Red-to-Green Unit & Mutation Test Suite<br/><b>PR #8, #10, #14</b> · 84 Deterministic Tests in 3.6s"]:::test
    end

    G1 -->|Stdio Framing<br/>& JSON-RPC 2.0 Ingestion| G2
    G2 -->|Synchronous Tool<br/>Request Invocation| G3
    G3 -->|Isolated Model Inference<br/>IPC Subprocess| G4
    G5 -->|Verified Graph Memory<br/>Responses & Signals| G6
`
};

export function getMermaidChart(id) {
  if (!id) return null;
  const normalized = String(id).toLowerCase().replace(/[^a-z0-9_]/g, '_');
  if (MERMAID_CHARTS[normalized]) return MERMAID_CHARTS[normalized];
  if (normalized.includes('magpie')) return MERMAID_CHARTS.magpie;
  if (normalized.includes('pyrit')) return MERMAID_CHARTS.pyrit;
  if (normalized.includes('dynavec')) return MERMAID_CHARTS.dynavec;
  if (normalized.includes('layer5') || normalized.includes('meshery')) return MERMAID_CHARTS.layer5io;
  if (normalized.includes('palinode')) return MERMAID_CHARTS.palinode;
  if (normalized.includes('quater')) return MERMAID_CHARTS.quater;
  if (normalized.includes('sqlite')) return MERMAID_CHARTS.sqlite_graph_memory;
  return null;
}
