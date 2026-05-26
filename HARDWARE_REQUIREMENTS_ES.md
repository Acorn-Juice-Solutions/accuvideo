# Requisitos de Hardware — AccuVideo

Guía de requisitos mínimos y recomendados para ejecutar AccuVideo en tu sistema.

> **📌 Nota**: AccuVideo incluye **FFmpeg** en el bundle para reencode de vídeos. Los vectores de búsqueda se almacenan en un **DB gestionado externo**. Los requisitos de hardware descritos abajo se refieren **solo a la máquina local** donde corre AccuVideo. El DB no consume recursos locales significativos (solo requiere conexión de red estable).

> **⚠️ Aceleración GPU / CUDA**: La versión actual de AccuVideo **se ejecuta exclusivamente en CPU**. El soporte para aceleración por GPU (CUDA en NVIDIA, MPS en Apple Silicon) está **planificado para una versión futura**. Las referencias a GPU/CUDA en este documento describen los requisitos previstos cuando ese soporte esté disponible — por ahora son **informativos**, no necesarios para usar AccuVideo.

---

## 🖥️ Windows

### Requisitos Mínimos
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Intel Core i5 (8ª gen) / AMD Ryzen 5 2600 o superior |
| **RAM** | 8 GB DDR4 |
| **GPU** | Integrada (Intel UHD / AMD Radeon) — toda la ingesta corre en CPU en esta versión |
| **Almacenamiento (SO + AccuVideo + modelos)** | SSD 128 GB con al menos 50 GB libres |
| **Almacenamiento (Vídeos)** | Configurable — desde 50 GB (HDD o SSD) |
| **Red** | Ethernet o WiFi 2.4/5 GHz |

### Requisitos Recomendados
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Intel Core i7 (10ª gen+) / AMD Ryzen 7 3700X o superior |
| **RAM** | 16 GB DDR4 |
| **GPU** | *(Futuro)* NVIDIA RTX 3060 12 GB / RTX 4060 8 GB / RTX 3060 Ti+ — pensado para el soporte CUDA previsto. No se usa en la versión actual |
| **Almacenamiento (SO + modelos)** | SSD NVMe 256 GB |
| **Almacenamiento (Vídeos)** | HDD 1-2 TB o SSD SATA — NVMe no aporta para reproducción |
| **Red** | Ethernet Gigabit (1 Gbps) o WiFi 5/6 |

### Notas Windows
- **PyTorch CPU vs CUDA**: La versión actual usa **PyTorch CPU**: toda la ingesta (audio y visual) corre en CPU. El soporte CUDA está **planificado para una versión futura** y requerirá GPU NVIDIA con ≥6 GB VRAM (Florence-2 cabe en 6 GB). Mientras tanto, la ingesta visual es funcional pero lenta — considera lotes nocturnos.
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
| **Almacenamiento (SO + modelos)** | SSD con 50 GB libres (macOS 12+) |
| **Almacenamiento (Vídeos)** | Configurable — desde 50 GB |
| **Red** | WiFi 2.4/5 GHz o Ethernet |

### Requisitos Recomendados
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Apple Silicon M2 / M3 o Intel Core i7 (10ª gen+) |
| **RAM** | 16 GB unificada (M-series) o DDR4 (Intel) |
| **GPU** | Apple Neural Engine — *(MPS planificado para una versión futura; la versión actual corre en CPU)* |
| **Almacenamiento (SO + modelos)** | SSD 256 GB |
| **Almacenamiento (Vídeos)** | HDD externo USB-C 1-2 TB o SSD interno |
| **Red** | WiFi 5/6 o Ethernet Gigabit (adaptador) |

### Notas macOS
- **Apple Silicon (M1/M2/M3)**: PyTorch nativo + framework Accelerate → eficiente en CPU. La aceleración **MPS está planificada para una versión futura**.
- **Intel Mac**: PyTorch x86_64 en CPU. El soporte para eGPU (AMD Radeon RX 6600 XT+) **no está disponible en esta versión**.
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
| **GPU** | Integrada — toda la ingesta corre en CPU en esta versión |
| **Almacenamiento (SO + modelos)** | SSD 128 GB con 50 GB libres |
| **Almacenamiento (Vídeos)** | Configurable — desde 50 GB (HDD o SSD) |
| **Red** | Ethernet o WiFi |

### Requisitos Recomendados
| Componente | Especificación |
|-----------|----------------|
| **CPU** | Desktop: Core i7 / Ryzen 7. Servidor: Xeon Silver 4310+ / EPYC 7402+ |
| **RAM** | 16 GB (desktop) / 32 GB DDR4 ECC (servidor) |
| **GPU** | *(Futuro)* RTX 3060 12 GB / RTX 4060 (desktop). Servidor: NVIDIA L4, A4000 o RTX 4070 Ti+ — previsto para el soporte CUDA futuro; no se usa en la versión actual |
| **Almacenamiento (SO + modelos)** | SSD NVMe 256 GB |
| **Almacenamiento (Vídeos)** | HDD 2 TB+ o SSD SATA (RAID opcional en servidor) |
| **Red** | Ethernet 1 Gbps (desktop) / 2.5-10 Gbps (servidor con muchos clientes) |

### Notas Linux
- **CUDA**: **No soportado en esta versión** — toda la ingesta corre en CPU. Cuando se añada el soporte CUDA en una versión futura, `nvidia-smi` deberá reportar la GPU y se requerirá NVIDIA driver 525+.
- **PyTorch**: Actualmente se usan binarios CPU. Los binarios con CUDA 12.4 se incorporarán cuando el soporte GPU esté disponible.
- **FFmpeg**: Incluido en el bundle AccuVideo
- **DB**: Servicio gestionado externo. Acceso por endpoint HTTPS configurado en la app.
- **Multithreading**: Para servidor con 6+ clientes concurrentes, usa WAITRESS_THREADS=20+
- **Monitoreo**: `htop` para supervisar CPU y RAM (`nvidia-smi dmon` solo será útil cuando exista soporte GPU)

---

## 📊 Comparativa Rápida

### Ingesta de Vídeos (Transcripción + Embedding) — solo CPU
| Operación | Tiempo estimado (en config recomendada) |
|-----------|----------------------------------------|
| Vídeo 1h (audio) | 16-24 min (CPU) |
| Vídeo 1h (visual) | ~15h 15min *(extrapolado — ver nota)* |
| Película 80 min (visual) | ~20h 20min *(medición real en hardware recomendado)* |
| Batch 10 vídeos × 1h (visual) | ~152h 30min (~6.4 días) |
| Batch 10 vídeos × 1h (solo audio) | ~3h (CPU) |

> **Nota procesado visual**: El modelo Florence-2 analiza frame a frame en CPU, lo que resulta en tiempos muy elevados incluso en hardware potente. Considera limitar el análisis visual a vídeos clave o ejecutarlo en lotes nocturnos. Estos tiempos **se reducirán significativamente cuando el soporte CUDA esté disponible** en una versión futura.

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
**Configuración Recomendada**: **Recomendada (solo CPU)**
- Desktop/Mini-PC con CPU i7+ (la GPU dedicada **no aporta** en esta versión; será relevante cuando llegue el soporte CUDA)
- WAITRESS_THREADS = 12-14
- 16 GB RAM mínimo
- SSD NVMe para modelos; HDD para vídeos

### 🏢 Empresa / Escuela (10+ clientes concurrentes)
**Configuración Recomendada**: **Servidor Linux (CPU potente)**
- Servidor con CPU Xeon Silver / Scalable o Ryzen EPYC — la ingesta corre en CPU, así que prioriza núcleos y frecuencia
- 32+ GB RAM (ECC recomendado para servidor 24/7)
- HDD/SSD para vídeos; NVMe solo para SO + modelos
- Load balancer si hay múltiples servidores
- *(Futuro)* GPUs NVIDIA L4, A4000, RTX 4070 Ti+ o RTX 4090 (24 GB VRAM) serán recomendables cuando el soporte CUDA esté disponible. A100/H100 quedará reservado para ingesta visual masiva en paralelo en datasets muy grandes.

---

## ✅ Checklist de Setup

Antes de instalar AccuVideo, verifica:

- [ ] **Almacenamiento**: SSD con ~50 GB libres (SO + modelos + caché temporal)
- [ ] **RAM libre**: Mínimo 6 GB disponible durante ingesta
- [ ] **Conexión de red**: Estable para acceder al DB gestionado y streaming LAN
- [ ] **Permisos**: Acceso RW a carpeta de vídeos
- [ ] **GPU**: No necesaria en esta versión (toda la ingesta corre en CPU). *Cuando llegue el soporte CUDA en una versión futura, se recomendará NVIDIA driver 525+ con ≥6 GB VRAM.*

---

## 📞 Soporte

¿Dudas sobre tu configuración?  
- **Windows**: Envía salida de `systeminfo`
- **macOS**: Envía salida de `system_profiler SPHardwareDataType`
- **Linux**: Envía salida de `lscpu`, `free -h`

**Contacto**: usa el formulario **Contacta** en la web de AccuVideo (enlace en el footer).
