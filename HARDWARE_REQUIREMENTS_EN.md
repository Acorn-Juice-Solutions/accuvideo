# Hardware Requirements — AccuVideo

Guide to minimum and recommended specs for running AccuVideo on your system.

> **📌 Note**: AccuVideo bundles **FFmpeg** for video re-encoding. Search vectors are stored in an **external managed DB**. The hardware requirements below refer **only to the local machine** running AccuVideo. The DB consumes no significant local resources (only a stable network connection).

---

## 🖥️ Windows

### Minimum Requirements
| Component | Spec |
|-----------|------|
| **CPU** | Intel Core i5 (8th gen) / AMD Ryzen 5 2600 or better |
| **RAM** | 8 GB DDR4 |
| **GPU** | Integrated (Intel UHD / AMD Radeon) — audio + search only; no visual ingestion |
| **Storage (OS + AccuVideo + models)** | SSD 128 GB with at least 50 GB free |
| **Storage (Videos)** | Configurable — from 50 GB (HDD or SSD) |
| **Network** | Ethernet or WiFi 2.4/5 GHz |

### Recommended Requirements
| Component | Spec |
|-----------|------|
| **CPU** | Intel Core i7 (10th gen+) / AMD Ryzen 7 3700X or better |
| **RAM** | 16 GB DDR4 |
| **GPU** | NVIDIA RTX 3060 12 GB / RTX 4060 8 GB / RTX 3060 Ti+ (CUDA for visual ingestion) |
| **Storage (OS + models)** | NVMe SSD 256 GB |
| **Storage (Videos)** | HDD 1-2 TB or SATA SSD — NVMe adds nothing for playback |
| **Network** | Gigabit Ethernet (1 Gbps) or WiFi 5/6 |

### Windows Notes
- **PyTorch CPU vs CUDA**: CUDA acceleration requires an NVIDIA GPU with ≥6 GB VRAM (Florence-2 fits in 6 GB). Without a GPU, visual ingestion runs on CPU but is very slow.
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
| **GPU** | Apple Neural Engine + MPS (M1+) — no extra dedicated GPU needed |
| **Storage (OS + models)** | SSD 256 GB |
| **Storage (Videos)** | External USB-C HDD 1-2 TB or internal SSD |
| **Network** | WiFi 5/6 or Gigabit Ethernet (adapter) |

### macOS Notes
- **Apple Silicon (M1/M2/M3)**: Native PyTorch + Accelerate framework → very efficient
- **Intel Mac**: PyTorch x86_64 + optional eGPU (AMD Radeon RX 6600 XT+)
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
| **GPU** | Integrated (audio + search only) or optional NVIDIA for visual ingestion |
| **Storage (OS + models)** | SSD 128 GB with 50 GB free |
| **Storage (Videos)** | Configurable — from 50 GB (HDD or SSD) |
| **Network** | Ethernet or WiFi |

### Recommended Requirements
| Component | Spec |
|-----------|------|
| **CPU** | Desktop: Core i7 / Ryzen 7. Server: Xeon Silver 4310+ / EPYC 7402+ |
| **RAM** | 16 GB (desktop) / 32 GB DDR4 ECC (server) |
| **GPU** | RTX 3060 12 GB / RTX 4060 (desktop). Server: NVIDIA L4, A4000 or RTX 4070 Ti+ |
| **Storage (OS + models)** | NVMe SSD 256 GB |
| **Storage (Videos)** | HDD 2 TB+ or SATA SSD (optional RAID on server) |
| **Network** | 1 Gbps Ethernet (desktop) / 2.5-10 Gbps (server with many clients) |

### Linux Notes
- **CUDA setup**: `nvidia-smi` must show the GPU; requires NVIDIA driver 525+
- **PyTorch**: Use prebuilt CUDA 12.4 binaries for best performance
- **FFmpeg**: Bundled with AccuVideo
- **DB**: External managed service. HTTPS endpoint configured in the app.
- **Multithreading**: For a server with 6+ concurrent clients, set WAITRESS_THREADS=20+
- **Monitoring**: `nvidia-smi dmon` / `htop` to watch RAM and GPU

---

## 📊 Quick Comparison

### Video Ingestion (Transcription + Embedding)
| Operation | Estimated time (on recommended config) |
|-----------|----------------------------------------|
| 1h video (audio) | 16-24 min (CPU) |
| 1h video (visual) | ~15h 15min *(extrapolated — see note)* |
| 80 min film (visual) | ~20h 20min *(measured on recommended hardware)* |
| Batch 10 videos × 1h (visual) | ~152h 30min (~6.4 days) |
| Batch 10 videos × 1h (audio only) | ~3h (CPU) |

> **Visual processing note**: The Florence-2 model analyses frame by frame, which leads to long runtimes even on powerful hardware. Consider limiting visual analysis to key videos or running it in overnight batches.

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
**Recommended config**: **Recommended + GPU**
- Desktop/mini-PC with i7+ CPU and a dedicated GPU
- WAITRESS_THREADS = 12-14
- 16 GB RAM minimum
- NVMe SSD for models; HDD for videos

### 🏢 Enterprise / School (10+ concurrent clients)
**Recommended config**: **Linux server + dedicated GPU**
- Server with Xeon Silver / Scalable or Ryzen EPYC CPU
- NVIDIA L4, A4000 or RTX 4090 GPU (24 GB VRAM allows large batches)
- 32+ GB RAM (ECC recommended for 24/7 server)
- HDD/SSD for videos; NVMe only for OS + models
- A100/H100 only if you need massive parallel visual ingestion (very large datasets)
- Load balancer if running multiple servers

---

## ✅ Setup Checklist

Before installing AccuVideo, verify:

- [ ] **Storage**: SSD with ~50 GB free (OS + models + temp cache)
- [ ] **Free RAM**: At least 6 GB available during ingestion
- [ ] **Network**: Stable connection for the managed DB and LAN streaming
- [ ] **Permissions**: RW access to the video folder
- [ ] **GPU (optional)**: NVIDIA driver 525+ with ≥6 GB VRAM if using CUDA visual ingestion

---

## 📞 Support

Questions about your setup?
- **Windows**: Send output of `systeminfo` + `nvidia-smi`
- **macOS**: Send output of `system_profiler SPHardwareDataType`
- **Linux**: Send output of `lscpu`, `free -h`, `nvidia-smi`

**Contact**: info@acornjuice.com
