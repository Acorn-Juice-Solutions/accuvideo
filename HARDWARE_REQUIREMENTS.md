# Requisitos de Hardware — AccuVideo

Guía de requisitos mínimos y recomendados para ejecutar AccuVideo en tu sistema.

> **📌 Nota**: AccuVideo incluye **FFmpeg** en el bundle para reencode de vídeos. Los vectores de búsqueda se almacenan en un **DB gestionado externo**. Los requisitos de hardware descritos abajo se refieren **solo a la máquina local** donde corre AccuVideo. El DB no consume recursos locales significativos (solo requiere conexión de red estable).

---

## 🖥️ Windows

### Requisitos Mínimos
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Intel Core i5 (8ª gen) / AMD Ryzen 5 2600 o superior |
| **RAM** | 8 GB DDR4 |
| **GPU** | Integrada (Intel UHD / AMD Radeon) — recomendada para reencode |
| **Almacenamiento (SO)** | SSD 250 GB (Windows 10/11 + AccuVideo) |
| **Almacenamiento (Modelos)** | SSD 10 GB (modelos IA) |
| **Almacenamiento (Vídeos)** | Configurable — a partir de 50 GB recomendado |
| **Red** | Ethernet o WiFi 5 GHz |

### Requisitos Recomendados
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Intel Core i7 (10ª gen+) / AMD Ryzen 7 3700X o superior |
| **RAM** | 16 GB DDR4 o DDR5 |
| **GPU** | NVIDIA GeForce RTX 3060 Ti+ / AMD Radeon RX 6700 XT+ (CUDA/ROCm para aceleración) |
| **Almacenamiento (SO)** | SSD NVMe 512 GB |
| **Almacenamiento (Modelos)** | SSD NVMe 10 GB |
| **Almacenamiento (Vídeos)** | SSD NVMe 500 GB+ o HDD 2 TB+ |
| **Red** | Ethernet Gigabit (1 Gbps) |

### Notas Windows
- **PyTorch CPU vs CUDA**: PyTorch con CUDA (12.4) requiere GPU compatible NVIDIA (~8 GB VRAM)
- **FFmpeg**: Incluido en el bundle AccuVideo — acelera reencode de vídeos
- **DB**: Servicio gestionado externo (no consume recursos locales). Requiere conexión de red estable.
- **Modelos IA**: BGE-M3 (~800 MB), Florence-2 (~2.6 GB), Whisper (~1.5 GB)
- **Streaming LAN**: Para múltiples clientes, aumenta `WAITRESS_THREADS` a 12-16

---

## 🍎 macOS

### Requisitos Mínimos
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Intel Core i5 (6ª gen+) / Apple Silicon M1 |
| **RAM** | 8 GB unificada |
| **GPU** | Integrada (Intel Iris / Apple Neural Engine) |
| **Almacenamiento (SO)** | SSD 256 GB (macOS 12+) |
| **Almacenamiento (Modelos)** | SSD 10 GB |
| **Almacenamiento (Vídeos)** | Configurable — a partir de 50 GB |
| **Red** | WiFi 5 GHz o Ethernet Thunderbolt |

### Requisitos Recomendados
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Apple Silicon M2 Pro/Max o Intel Core i7 (10ª gen+) |
| **RAM** | 16 GB unificada (M2+) o DDR4/DDR5 (Intel) |
| **GPU** | Apple Neural Engine (M1+) optimizado; Intel → eGPU opcional |
| **Almacenamiento (SO)** | SSD NVMe 512 GB |
| **Almacenamiento (Modelos)** | SSD NVMe 10 GB |
| **Almacenamiento (Vídeos)** | SSD NVMe 500 GB+ o HDD externo USB-C 2 TB+ |
| **Red** | Ethernet Gigabit (adaptador Thunderbolt) |

### Notas macOS
- **Apple Silicon (M1/M2/M3)**: PyTorch nativo + aceleración Accelerate framework → muy eficiente
- **Intel Mac**: PyTorch x86_64 + eGPU (AMD Radeon RX 6600 XT+) opcionalmente
- **Deployment Target**: x86_64 macOS 10.12+, ARM64 macOS 13.0+
- **FFmpeg**: Incluido en el bundle AccuVideo
- **Gestión térmica**: M-series mantiene temperaturas bajas (~70°C con carga)
- **Streaming remoto**: WiFi 5/6 recomendado para múltiples clientes concurrentes

---

## 🐧 Linux (Ubuntu 20.04+ / Debian 11+)

### Requisitos Mínimos
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Intel Core i5 / AMD Ryzen 5 2600 o superior |
| **RAM** | 8 GB DDR4 |
| **GPU** | Integrada u opcional NVIDIA/AMD compatible con OpenCL |
| **Almacenamiento (SO)** | SSD 256 GB (Linux + Python + dependencias) |
| **Almacenamiento (Modelos)** | SSD 10 GB |
| **Almacenamiento (Vídeos)** | Configurable — a partir de 50 GB |
| **Red** | Ethernet o WiFi 5 GHz |

### Requisitos Recomendados
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Intel Xeon E5-2680+ / AMD EPYC 7402 (servidor) o Core i7/Ryzen 7 (desktop) |
| **RAM** | 16-32 GB DDR4 ECC (servidor) / DDR5 (desktop) |
| **GPU** | NVIDIA A100/H100 (datacenter) o RTX 4090 (desktop) con CUDA 12.4 |
| **Almacenamiento (SO)** | SSD NVMe 512 GB (RAID-1 para servidor) |
| **Almacenamiento (Modelos)** | SSD NVMe 10 GB |
| **Almacenamiento (Vídeos)** | SSD NVMe 1 TB+ (RAID-5/6 para servidor) |
| **Red** | Ethernet 10 Gbps (servidor) / 1 Gbps (desktop) |

### Notas Linux
- **CUDA Setup**: `nvidia-smi` debe reportar GPU disponible; requiere NVIDIA driver 525+
- **PyTorch**: Usar binarios precompilados con CUDA 12.4 para máximo rendimiento
- **FFmpeg**: Incluido en el bundle AccuVideo
- **DB**: Servicio gestionado externo. Acceso por endpoint HTTPS configurado en la app.
- **Multithreading**: Para servidor con 6+ clientes concurrentes, usa WAITRESS_THREADS=20+
- **Monitoreo**: `nvidia-smi dmon` / `htop` para supervisa RAM y GPU

---

## 📊 Comparativa Rápida

### Ingesta de Vídeos (Transcripción + Embedding)
| Operación | Tiempo estimado (en config recomendada) |
|-----------|----------------------------------------|
| Vídeo 1h (audio) | 16-24 min (CPU) |
| Vídeo 1h (visual) | ~15h 15min *(extrapolado — ver nota)* |
| Película 80 min (visual) | ~20h 20min *(medición real en hardware recomendado)* |
| Batch 10 vídeos × 1h (visual) | ~152h 30min (~6.4 días) |
| Batch 10 vídeos × 1h (solo audio) | ~3h (CPU) |

> **Nota procesado visual**: El modelo Florence-2 analiza frame a frame, lo que resulta en tiempos muy elevados incluso en hardware potente. Considera limitar el análisis visual a vídeos clave o ejecutarlo en lotes nocturnos.

### Requisitos de RAM en Ejecución
| Fase | Consumo típico |
|-----|----------------|
| App idle (sin vídeos cargados) | 300-500 MB |
| Búsqueda embeddings (acceso a DB remoto) | 200-400 MB (local) |
| Reencode 1 video simultáneamente | +800 MB - 1.5 GB |
| 5 clientes reproduciendo simultáneamente | Base + 2-3 GB |

---

## 🚀 Recomendaciones por Caso de Uso

### 👤 Usuario Individual (1-2 clientes)
**Configuración Recomendada**: **Mínima**
- Laptop/Desktop con config mínima es suficiente
- Ingesta nocturna (batch processing)
- Almacenamiento SSD para SO + modelos; HDD para vídeos

### 👨‍💼 Equipo Pequeño (3-5 clientes concurrentes)
**Configuración Recomendada**: **Recomendada + GPU**
- Desktop/Mini-PC con CPU i7+ y GPU dedicada
- WAITRESS_THREADS = 12-14
- 16 GB RAM mínimo
- SSD NVMe para modelos; HDD para vídeos

### 🏢 Empresa / Escuela (10+ clientes concurrentes)
**Configuración Recomendada**: **Servidor Linux + GPU profesional**
- Servidor con CPU Xeon / Ryzen EPYC
- GPU A100/H100 o múltiples RTX 4090
- 32+ GB RAM (ECC recomendado)
- RAID-5/6 NVMe + HDD para vídeos
- Load balancer si hay múltiples servidores

---

## ✅ Checklist de Setup

Antes de instalar AccuVideo, verifica:

- [ ] **Python 3.9+** instalado (`python --version`)
- [ ] **Almacenamiento**: SSD ~50 GB mínimo (SO + modelos + caché temporal)
- [ ] **RAM libre**: Mínimo 6 GB disponible durante ingesta
- [ ] **Conexión de red**: Ethernet para LAN streaming (opcional WiFi 5 GHz)
- [ ] **Permisos**: Acceso RW a carpeta de vídeos
- [ ] **GPU (opcional)**: NVIDIA driver 525+ si usarás aceleración CUDA

---

## 📞 Soporte

¿Dudas sobre tu configuración?  
- **Windows**: Envía salida de `systeminfo` + `nvidia-smi`
- **macOS**: Envía salida de `system_profiler SPHardwareDataType`
- **Linux**: Envía salida de `lscpu`, `free -h`, `nvidia-smi`

**Contacto**: info@acornjuice.com
