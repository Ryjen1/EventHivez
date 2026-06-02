<div align="center">

<img src="apps/web/public/logo/eventhivez%20logo.svg" alt="EventHivez Logo" width="120" />

# EventHivez

**Decentralized Event Ticketing on Stellar**

Create events, sell tickets, and manage attendees with instant, low-cost USDC payments on the Stellar network — powered by Soroban smart contracts.

[![Contract CI](https://github.com/Ryjen1/EventHivez/actions/workflows/contracts.yml/badge.svg)](https://github.com/Ryjen1/EventHivez/actions/workflows/contracts.yml)
[![Frontend CI](https://github.com/Ryjen1/EventHivez/actions/workflows/frontend.yml/badge.svg)](https://github.com/Ryjen1/EventHivez/actions/workflows/frontend.yml)
[![Backend CI](https://github.com/Ryjen1/EventHivez/actions/workflows/backend.yml/badge.svg)](https://github.com/Ryjen1/EventHivez/actions/workflows/backend.yml)
[![Stellar](https://img.shields.io/badge/Stellar-Testnet-blue)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-Smart_Contracts-black)](https://soroban.stellar.org)

</div>

---

## Live Demo

**[https://eventhivez.vercel.app](https://eventhivez.vercel.app)**

> Deployed on Vercel. Mobile responsive — try it on your phone.

<!-- TODO: Add mobile screenshot -->
<!-- TODO: Add CI/CD pipeline screenshot -->

---

## Features

- **Event Management** — Create, customize, and manage event pages with tiered ticketing
- **Instant Payments** — USDC payouts on Stellar with 5-second finality
- **Escrow & Refunds** — On-chain escrow with automatic and manual refund support
- **Organizer Staking** — Stake collateral for verified organizer status
- **Loyalty Rewards** — On-chain loyalty scoring for repeat attendees
- **Multi-Admin Governance** — Multisig governance for platform parameters
- **Series Passes** — Season passes spanning multiple events
- **Ticket Auctions** — On-chain bidding for high-demand events
- **Scanner Auth** — QR-based check-in with on-chain scanner authorization

---

## Architecture

EventHivez is a monorepo with three layers:

```
EventHivez/
├── apps/web/          Next.js 15 frontend (React, Tailwind, Framer Motion)
├── server/            Rust backend (Axum, PostgreSQL)
├── contract/          Soroban smart contracts (Rust)
│   ├── contracts/event_registry/    Event state, inventory, loyalty, staking
│   ├── contracts/ticket_payment/    Payments, escrow, refunds, auctions
│   └── contracts/pro_subscription/  Pro subscription management
└── docs/              Architecture, contracts, and database docs
```

### Inter-Contract Calls

The Soroban contracts demonstrate **inter-contract communication**:

```
┌──────────────────────┐         ┌──────────────────────┐
│   ticket_payment     │────────▶│   event_registry     │
│                      │         │                      │
│ • Process purchases  │ calls   │ • Read event config  │
│ • Manage escrow      │────────▶│ • Increment inventory│
│ • Handle refunds     │         │ • Decrement inventory│
│ • Settle fees        │         │ • Loyalty scoring    │
│ • Run auctions       │         │ • Staking & governance│
└──────────────────────┘         └──────────────────────┘
```

`ticket_payment` calls into `event_registry` to:
- Validate event payment settings before processing purchases
- Increment ticket inventory after successful payments
- Decrement inventory after refunds
- Read loyalty discount rates for returning attendees

### Contract Events (Real-Time Streaming)

Both contracts emit Soroban events for off-chain indexing and real-time updates:

**event_registry** — 20+ events including `EventRegistered`, `InventoryIncremented`, `CollateralStaked`, `LoyaltyScoreUpdated`, `GoalMet`

**ticket_payment** — 15+ events including `PaymentProcessed`, `TicketTransferred`, `BidPlaced`, `AuctionClosed`, `BulkRefundProcessed`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, Tailwind CSS, Framer Motion |
| Backend | Rust, Axum, PostgreSQL |
| Smart Contracts | Soroban (Rust), Stellar Testnet |
| CI/CD | GitHub Actions (3 workflows: frontend, backend, contracts) |
| Deployment | Vercel (frontend), Docker (backend) |

---

## Contract Addresses (Stellar Testnet)

| Contract | Address | Deploy Tx |
|---|---|---|
| `event_registry` | [`CAINMUMZ4EQFTDB2BSUKB7R5NEE5ICOJTYQBDNCHXUTQLSX6LUR2OOO4`](https://stellar.expert/explorer/testnet/contract/CAINMUMZ4EQFTDB2BSUKB7R5NEE5ICOJTYQBDNCHXUTQLSX6LUR2OOO4) | [`c26631...2c17d`](https://stellar.expert/explorer/testnet/tx/c26631023dc4931b02a5e015f95f6a1648dab27b2b040fd5f8fb5c408b22c17d) |
| `ticket_payment` | [`CCHSOPWFFUTDAAHUGLDPSSA4WFMRSD4A32R73PQHMLAZMXKABY7ENA4J`](https://stellar.expert/explorer/testnet/contract/CCHSOPWFFUTDAAHUGLDPSSA4WFMRSD4A32R73PQHMLAZMXKABY7ENA4J) | [`1457b1...c34b`](https://stellar.expert/explorer/testnet/tx/1457b1faf4c3eaabd5803234d08ee9f0378d1b17fdfc173a44bdeb9ebcc2c34b) |
| `pro_subscription` | [`CD6WTHEJYLZX6UDMDJHKUTMRI77GDGKU7TZQXHOMQXGHOTLH4LCHC765`](https://stellar.expert/explorer/testnet/contract/CD6WTHEJYLZX6UDMDJHKUTMRI77GDGKU7TZQXHOMQXGHOTLH4LCHC765) | [`2da69b...16dd`](https://stellar.expert/explorer/testnet/tx/2da69b2a8e88fb3283a3646c312853b7cb721985a9e77da0c0f0b835a8ec16dd) |

**Inter-contract link:** `event_registry.set_ticket_payment_contract` → `CCHSOPWFFUTDAAHUGLDPSSA4WFMRSD4A32R73PQHMLAZMXKABY7ENA4J`

**Admin / Platform Wallet:** `GCQRHJJIB2U5VEOTW77I6NCSUXLE4YSTABZPSUA5ABTQC66F7T47GLPQ`

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- Rust toolchain (for contracts and backend)
- PostgreSQL (for backend)

### Install & Run

```bash
git clone https://github.com/Ryjen1/EventHivez.git
cd EventHivez
pnpm install
pnpm dev
```

### Build & Test Contracts

```bash
cd contract
cargo build --target wasm32-unknown-unknown --release
cargo test
```

### Deploy Contracts

```bash
cd contract
cp .env.devnet.example .env.devnet
# Fill in SOROBAN_ACCOUNT_SECRET, ADMIN_ADDRESS, PLATFORM_WALLET
./scripts/deploy_devnet.sh
```

---

## CI/CD Pipeline

Three GitHub Actions workflows run on every push/PR:

| Workflow | Trigger | What it does |
|---|---|---|
| `frontend.yml` | Push to `main` | `pnpm install` → `pnpm lint` → `pnpm build` |
| `backend.yml` | Push to `main`/`develop` (server changes) | `cargo fmt --check` → `cargo clippy` → `cargo test` → `cargo build` |
| `contracts.yml` | Push to `main`/`develop` (contract changes) | `cargo fmt --check` → `cargo clippy` → `cargo test` |

---

## Mobile Responsive

The frontend is fully responsive using Tailwind CSS breakpoints. Tested on:
- Desktop (1920px+)
- Tablet (768px–1024px)
- Mobile (320px–768px)

<!-- TODO: Add mobile screenshot here -->

---

<div align="center">

**Built with Stellar + Soroban**

</div>
