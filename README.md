# SE Project

This repository contains three main components: Ecocart, Tracefresh, and Shipment Simulation. Each directory is a standalone module that can be executed independently.

## Repository Structure

```txt
se-project
├── ecocart
├── tracefresh
└── shipment-simulation
```

---

## Ecocart

Ecocart is a FastAPI based backend with optional webcam-driven object tracking.

### Run the Webcam Tracker

Requirements: UV package manager

```
uv run run_tracker.py
```

### Run the Backend API

Install dependencies:

```
pip3 install -r requirements.txt
pip3 install fastapi uvicorn
```

Start the server:

```
python3 -m src.ecocart.api.main
```

The backend server will be available at:

[http://localhost:8000](http://localhost:8000)

---

## Tracefresh

Tracefresh is a web dashboard and consumer application built using Next.js.

[Live Demo](tracefresh.himanshu.co)

### Run Locally

```
bun install
bun run dev
```

The development server will start at:

[http://localhost:3000](http://localhost:3000)

---

## Shipment Simulation

A command line shipment generator that connects with the web dashboard to fetch shipment identifiers.

### Run the Shipment Simulator

```
pip3 install -r requirements.txt
python3 main.py
```

---

## Requirements

Each subproject manages its own dependencies. Refer to the respective README files inside each module for deeper usage instructions.

---

If you want, I can also format this as the root README.md file directly in your repository format, or I can add sections like project objectives, workflow diagrams, screenshots, or architecture details.
