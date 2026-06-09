# claude-image-enhancer

A Claude Code skill for professional image enhancement using ImageMagick. Batch-process images with upscaling, sharpening, denoising, format conversion, and platform-specific presets — all driven by natural language commands inside Claude Code.

## What It Does

- **Upscaling** — Lanczos, Mitchell, and Catrom filter algorithms for high-quality enlargement
- **Sharpening and denoising** — Unsharp mask, adaptive sharpen, despeckle
- **Format conversion** — PNG, JPEG, WebP, AVIF with quality targets
- **Compression optimization** — Strip metadata, chroma subsampling, lossless PNG
- **Platform presets** — Twitter/X, Instagram, LinkedIn, blog headers with exact crop dimensions
- **Batch processing** — Entire directories via `mogrify`, with optional parallel execution
- **Before/after comparison** — File size and dimension diffs, side-by-side montage

## Prerequisites

### ImageMagick

The skill requires ImageMagick (`convert`, `magick`, `mogrify`, `identify`).

**macOS**
```bash
brew install imagemagick
```

**Ubuntu / Debian**
```bash
sudo apt install imagemagick
```

**Windows**

Download the installer from https://imagemagick.org/script/download.php

**Verify installation**
```bash
magick --version
identify --version
```

**AVIF support** (optional — for `.avif` output)

AVIF requires ImageMagick compiled with `libavif`. To check:
```bash
magick -list format | grep AVIF
```

If absent, the skill falls back to WebP automatically.

### GNU Parallel (optional)

Used for parallel batch processing. Without it, batch jobs run serially via `mogrify`.

```bash
brew install parallel      # macOS
sudo apt install parallel  # Ubuntu
```

## Installing as a Claude Code Skill

1. Clone or download this repository.

2. Copy `SKILL.md` into your Claude Code skills directory:

```bash
# Create the skill directory if needed
mkdir -p ~/.claude/skills/image-enhancer

# Copy the skill file
cp SKILL.md ~/.claude/skills/image-enhancer/SKILL.md
```

3. Reload Claude Code (or start a new session). The skill is auto-loaded from the skills directory.

4. Trigger it in any conversation:
   ```
   /enhance-image
   ```
   or just describe what you want:
   ```
   Upscale this screenshot to 2x and sharpen it for my blog post
   ```

## Usage Examples

### Single Image — Upscale and Sharpen

```
Upscale logo.png to 2560px wide using Lanczos filter and apply unsharp mask
```

Claude runs:
```bash
convert logo.png -filter Lanczos -resize 2560x -unsharp 0x1 -strip logo-enhanced.png
```

### Screenshot — Text Clarity Enhancement

```
Enhance screenshot.png for documentation — I need the text to be crisp
```

Claude runs:
```bash
convert screenshot.png \
  -filter Mitchell -resize 200% \
  -adaptive-sharpen 0x1 \
  -contrast-stretch 0.1x0.1% \
  -strip \
  screenshot-enhanced.png
```

### Format Conversion — Batch PNG to WebP

```
Convert all PNGs in ./images/ to WebP at 85% quality, save to ./images/webp/
```

Claude runs:
```bash
mkdir -p images/webp
mogrify -format webp -quality 85 -path images/webp/ images/*.png
```

### Social Media — Twitter Preset

```
Resize hero.png for Twitter with the correct crop
```

Claude runs:
```bash
convert hero.png \
  -resize 1200x675^ -gravity center -extent 1200x675 \
  -quality 87 -strip \
  hero-twitter.jpg
```

### Before/After Comparison

```
Show me the file size difference between original.png and enhanced.png
```

Claude runs:
```bash
identify -format "%f: %wx%h %m %b bytes\n" original.png enhanced.png
```

---

## Platform Preset Reference

| Platform | Dimensions (px) | Format | Max Size | Quality |
|----------|----------------|--------|----------|---------|
| Twitter/X (landscape) | 1200 x 675 | JPG/PNG | 5 MB | 85–90 |
| Twitter/X (square) | 1200 x 1200 | JPG/PNG | 5 MB | 85–90 |
| Instagram feed (square) | 1080 x 1080 | JPG | 30 MB | 90 |
| Instagram feed (portrait) | 1080 x 1350 | JPG | 30 MB | 90 |
| Instagram Stories/Reels | 1080 x 1920 | JPG | 30 MB | 90 |
| LinkedIn post/preview | 1200 x 627 | JPG/PNG | 5 MB | 85–90 |
| LinkedIn banner | 1584 x 396 | JPG/PNG | 5 MB | 85–90 |
| Blog header (standard) | 1920 wide | WebP/JPG | — | 85 WebP / 90 JPG |
| Blog header (retina) | 2560 wide | WebP/JPG | — | 85 WebP / 90 JPG |

---

## Filter Algorithm Reference

| Filter | Best For | Speed |
|--------|----------|-------|
| Lanczos | Photos, natural images | Slow (highest quality) |
| Mitchell | Screenshots, text, UI | Medium |
| Catrom | General purpose | Medium |
| Point | Pixel art, no interpolation | Fast |
| Box | Simple averaging | Fast |

---

## Quality Guidelines

| Format | Use Case | Quality Target |
|--------|----------|---------------|
| PNG | Logos, screenshots, graphics | Lossless (compression 9) |
| JPEG | Photos, social exports | 85–90 web, 90–95 print |
| WebP | Web delivery | 80–85 photos, 90–95 graphics |
| AVIF | Maximum compression | 75–80 |

---

## Troubleshooting

**Blurry output after upscaling** — Switch to `-filter Lanczos` and add `-unsharp 0x1`.

**File size increased after conversion** — Add `-strip` to remove metadata, lower quality target, or use WebP.

**Text not sharp in screenshots** — Use `-filter Mitchell -adaptive-sharpen 0x1 -contrast-stretch 0.1x0.1%`.

**`convert` runs the wrong binary on Windows** — Prefix all commands with `magick`: `magick convert ...`.

**AVIF output fails** — Run `magick -list format | grep AVIF`. If missing, use `-quality 85 output.webp` instead.

---

## License

MIT License — Copyright (c) 2025 Edgeless Labs

See [LICENSE](LICENSE) for full text.
