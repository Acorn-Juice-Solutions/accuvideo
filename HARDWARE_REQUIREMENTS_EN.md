# Hardware Requirements — AccuVideo

Guide to minimum and recommended specs for running AccuVideo on your system.

> **📌 Note**: AccuVideo bundles **FFmpeg** for video re-encoding. Search vectors are stored in an **external managed DB**. The hardware requirements below refer **only to the local machine** running AccuVideo. The DB consumes no significant local resources (only a stable network connection).

> **🟢 GPU / CUDA acceleration (Windows)**: AccuVideo now supports **optional NVIDIA CUDA acceleration** on Windows.
> - **Basic**: ships with CUDA support built in. If a compatible NVIDIA GPU is detected, the app offers to enable GPU mode and downloads a small bundled DLL pack (.zip) on demand.
> - **Pro**: the CUDA build is distributed as a **separate .zip (>2 GB)** hosted externally (GitHub asset size limit). The download link and SHA-256 hash are published in the release notes next to each GitHub release.
> - **CPU is still the default** on all platforms and remains fully supported. **MPS** (Apple Silicon) and **CUDA on Linux** are still on the roadmap.

---

## 🖥️ Windows

### Minimum Requirements
| Component | Spec |
|-----------|------|
| **CPU** | Intel Core i5 (8th gen) / AMD Ryzen 5 2600 or better |
| **RAM** | 8 GB DDR4 |
| **GPU** | Integrated (Intel UHD / AMD Radeon) is enough for Basic on CPU. Optional NVIDIA CUDA acceleration available in Basic if a compatible GPU is detected (in-app opt-in + bundled DLL pack) |
| **Storage (OS + AccuVideo + models)** | SSD 128 GB with at least 50 GB free |
| **Storage (Videos)** | Configurable — from 50 GB (HDD or SSD) |
| **Network** | Ethernet or WiFi 2.4/5 GHz |

### Recommended Requirements
| Component | Spec |
|-----------|------|
| **CPU** | Intel Core i7 (10th gen+) / AMD Ryzen 7 3700X or better |
| **RAM** | 16 GB DDR4 |
| **GPU** | NVIDIA RTX 3060 12 GB / RTX 4060 8 GB / RTX 3060 Ti+ with CUDA support — recommended for Pro visual indexing. The **Pro CUDA build** is a separate **.zip (>2 GB)** hosted externally; link and SHA-256 hash published next to each GitHub release |
| **Storage (OS + models)** | NVMe SSD 256 GB |
| **Storage (Videos)** | HDD 1-2 TB or SATA SSD — NVMe adds nothing for playback |
| **Network** | Gigabit Ethernet (1 Gbps) or WiFi 5/6 |

### Windows Notes
- **PyTorch CPU vs CUDA**: AccuVideo now supports both on Windows. CPU is the default (always works, no extra download). **CUDA mode** requires an NVIDIA GPU with ≥6 GB VRAM (Florence-2 fits in 6 GB). For **Basic**, CUDA support is built in: when a compatible GPU is detected, the app offers to enable GPU mode and downloads a small bundled DLL pack (.zip) on demand. For **Pro**, the CUDA build is a separate **.zip (>2 GB)** hosted externally — link and SHA-256 hash published next to each GitHub release.
- **FFmpeg**: Bundled with AccuVideo — accelerates video re-encoding
- **DB**: External managed service (no local resource use). Requires a stable network connection.
- **AI models**: BGE-M3 (~800 MB), Florence-2 (~2.6 GB), Whisper (~1.5 GB)
- **LAN streaming**: For multiple clients, raise `WAITRESS_THREADS` to 12-16

---

## 🍎 macOS

### Minimum Requirements
| Component | Spec |
|-----------|------|
| **CPU** | Intel Core i5 (6th gen+) / Apple Silicon M1 |
| **RAM** | 8 GB unified |
| **GPU** | Integrated (Intel Iris / Apple Neural Engine) |
| **Storage (OS + models)** | SSD with 50 GB free (macOS 12+) |
| **Storage (Videos)** | Configurable — from 50 GB |
| **Network** | WiFi 2.4/5 GHz or Ethernet |

### Recommended Requirements
| Component | Spec |
|-----------|------|
| **CPU** | Apple Silicon M2 / M3 or Intel Core i7 (10th gen+) |
| **RAM** | 16 GB unified (M-series) or DDR4 (Intel) |
| **GPU** | Apple Neural Engine — *(MPS planned for a future release; the current version runs on CPU)* |
| **Storage (OS + models)** | SSD 256 GB |
| **Storage (Videos)** | External USB-C HDD 1-2 TB or internal SSD |
| **Network** | WiFi 5/6 or Gigabit Ethernet (adapter) |

### macOS Notes
- **Apple Silicon (M1/M2/M3)**: Native PyTorch + Accelerate framework → efficient on CPU. **MPS acceleration is planned for a future release**.
- **Intel Mac**: PyTorch x86_64 on CPU. eGPU support (AMD Radeon RX 6600 XT+) **is not available in this release**.
- **Deployment target**: x86_64 macOS 10.12+, ARM64 macOS 13.0+
- **FFmpeg**: Bundled with AccuVideo
- **Thermal management**: M-series stays cool (~70°C under load)
- **Remote streaming**: WiFi 5/6 recommended for multiple concurrent clients

---

## 🐧 Linux (Ubuntu 20.04+ / Debian 11+)

### Minimum Requirements
| Component | Spec |
|-----------|------|
| **CPU** | Intel Core i5 / AMD Ryzen 5 2600 or better |
| **RAM** | 8 GB DDR4 |
| **GPU** | Integrated — all ingestion runs on CPU in this release |
| **Storage (OS + models)** | SSD 128 GB with 50 GB free |
| **Storage (Videos)** | Configurable — from 50 GB (HDD or SSD) |
| **Network** | Ethernet or WiFi |

### Recommended Requirements
| Component | Spec |
|-----------|------|
| **CPU** | Desktop: Core i7 / Ryzen 7. Server: Xeon Silver 4310+ / EPYC 7402+ |
| **RAM** | 16 GB (desktop) / 32 GB DDR4 ECC (server) |
| **GPU** | *(Future)* RTX 3060 12 GB / RTX 4060 (desktop). Server: NVIDIA L4, A4000 or RTX 4070 Ti+ — intended for upcoming CUDA support; not used in the current release |
| **Storage (OS + models)** | NVMe SSD 256 GB |
| **Storage (Videos)** | HDD 2 TB+ or SATA SSD (optional RAID on server) |
| **Network** | 1 Gbps Ethernet (desktop) / 2.5-10 Gbps (server with many clients) |

### Linux Notes
- **CUDA**: **Not supported in this release** — all ingestion runs on CPU. When CUDA support ships in a future release, `nvidia-smi` will need to report the GPU and NVIDIA driver 525+ will be required.
- **PyTorch**: CPU binaries are used today. CUDA 12.4 binaries will be introduced once GPU support is available.
- **FFmpeg**: Bundled with AccuVideo
- **DB**: External managed service. HTTPS endpoint configured in the app.
- **Multithreading**: For a server with 6+ concurrent clients, set WAITRESS_THREADS=20+
- **Monitoring**: `htop` to watch CPU and RAM (`nvidia-smi dmon` only becomes useful once GPU support lands)

---

## 📊 Quick Comparison

### Video Ingestion (Transcription + Embedding) — CPU only
| Operation | Estimated time (on recommended config) |
|-----------|----------------------------------------|
| 1h video (audio) | 16-24 min (CPU) |
| 1h video (visual) | ~15h 15min *(extrapolated — see note)* |
| 80 min film (visual) | ~20h 20min *(measured on recommended hardware)* |
| Batch 10 videos × 1h (visual) | ~152h 30min (~6.4 days) |
| Batch 10 videos × 1h (audio only) | ~3h (CPU) |

> **Visual processing note**: The Florence-2 model analyses frame by frame on CPU, which leads to long runtimes even on powerful hardware. **CUDA mode** (Basic with the optional DLL pack, or the Pro CUDA build) typically cuts these times by an order of magnitude on a mid-range NVIDIA GPU. For pure-CPU runs, consider limiting visual analysis to key videos or running it in overnight batches.

### Runtime RAM Footprint
| Phase | Typical use |
|-------|-------------|
| App idle (no videos loaded) | 300-500 MB |
| Embedding search (remote DB access) | 200-400 MB (local) |
| Re-encoding 1 video | +800 MB - 1.5 GB |
| 5 clients streaming simultaneously | Base + 2-3 GB |

---

## 🚀 Recommendations by Use Case

### 👤 Single User (1-2 clients)
**Recommended config**: **Minimum**
- Laptop/desktop with minimum spec is enough
- Overnight ingestion (batch processing)
- SSD for OS + models; HDD for videos

### 👨‍💼 Small Team (3-5 concurrent clients)
**Recommended config**: **Recommended (CPU only)**
- Desktop/mini-PC with i7+ CPU (a dedicated GPU **adds nothing** in this release; it will matter once CUDA support ships)
- WAITRESS_THREADS = 12-14
- 16 GB RAM minimum
- NVMe SSD for models; HDD for videos

### 🏢 Enterprise / School (10+ concurrent clients)
**Recommended config**: **Linux server (powerful CPU)**
- Server with Xeon Silver / Scalable or Ryzen EPYC CPU — ingestion runs on CPU, so prioritise cores and clock speed
- 32+ GB RAM (ECC recommended for 24/7 server)
- HDD/SSD for videos; NVMe only for OS + models
- Load balancer if running multiple servers
- *(Future)* NVIDIA L4, A4000, RTX 4070 Ti+ or RTX 4090 (24 GB VRAM) GPUs will become recommended once CUDA support is available. A100/H100 will be reserved for massive parallel visual ingestion on very large datasets.

---

## ✅ Setup Checklist

Before installing AccuVideo, verify:

- [ ] **Storage**: SSD with ~50 GB free (OS + models + temp cache)
- [ ] **Free RAM**: At least 6 GB available during ingestion
- [ ] **Network**: Stable connection for the managed DB and LAN streaming
- [ ] **Permissions**: RW access to the video folder
- [ ] **GPU**: Not required — CPU mode always works. For optional **CUDA acceleration on Windows**: an NVIDIA GPU with ≥6 GB VRAM and driver 525+ is recommended. Basic enables CUDA via in-app opt-in (downloads a bundled DLL pack); Pro CUDA is a separate external **.zip (>2 GB)** linked from each GitHub release.

---

## 📞 Support

Questions about your setup?
- **Windows**: Send output of `systeminfo`
- **macOS**: Send output of `system_profiler SPHardwareDataType`
- **Linux**: Send output of `lscpu`, `free -h`

**Contact**: use the **Contact us** form on the AccuVideo site (footer link).
