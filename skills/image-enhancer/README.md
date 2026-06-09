# claude-image-enhancer

A Claude Code skill for professional image enhancement using ImageMagick:
upscaling, sharpening, denoising, format conversion, compression, and
platform-specific presets — driven by natural language or `/enhance-image`.

## Install

```bash
/plugin marketplace add thedavidmurray/claude-skills
/plugin install image-enhancer@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/image-enhancer .claude/skills/
```

Requires ImageMagick (`brew install imagemagick` / `apt install imagemagick`);
GNU Parallel is optional for parallel batch jobs.

## Usage

> "Upscale this screenshot to 2x and sharpen it for my blog post"

> "Convert all PNGs in ./images/ to WebP at 85% quality"

> "Resize hero.png for Twitter with the correct crop"

> "Enhance screenshot.png for documentation — I need the text to be crisp"

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT License — Copyright (c) 2025 Edgeless Labs. See [LICENSE](LICENSE) for full text.
