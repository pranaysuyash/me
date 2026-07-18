"use client";

import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImagePlus, RotateCcw, SlidersHorizontal } from "lucide-react";

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 260;

interface CleanupMetrics {
  foregroundPixels: number;
  cropWidth: number;
  cropHeight: number;
  sourceWidth: number;
  sourceHeight: number;
}

const emptyMetrics: CleanupMetrics = {
  foregroundPixels: 0,
  cropWidth: 0,
  cropHeight: 0,
  sourceWidth: CANVAS_WIDTH,
  sourceHeight: CANVAS_HEIGHT,
};

function seededRandom(seed = 42) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function drawSyntheticSignature(canvas: HTMLCanvasElement) {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return;

  const random = seededRandom();
  context.fillStyle = "#f5f1e7";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  context.strokeStyle = "rgba(75, 67, 53, 0.08)";
  context.lineWidth = 1;
  for (let y = 25; y < CANVAS_HEIGHT; y += 26) {
    context.beginPath();
    context.moveTo(0, y + random() * 3);
    context.lineTo(CANVAS_WIDTH, y + random() * 3);
    context.stroke();
  }

  for (let index = 0; index < 950; index += 1) {
    const x = Math.floor(random() * CANVAS_WIDTH);
    const y = Math.floor(random() * CANVAS_HEIGHT);
    const shade = 175 + Math.floor(random() * 55);
    const alpha = 0.08 + random() * 0.18;
    context.fillStyle = `rgba(${shade}, ${shade - 5}, ${shade - 13}, ${alpha})`;
    const size = random() > 0.94 ? 2 : 1;
    context.fillRect(x, y, size, size);
  }

  context.save();
  context.translate(80, 42);
  context.rotate(-0.035);
  context.strokeStyle = "rgba(21, 31, 39, 0.88)";
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(16, 122);
  context.bezierCurveTo(56, 26, 74, 35, 78, 117);
  context.bezierCurveTo(82, 161, 104, 158, 128, 76);
  context.bezierCurveTo(142, 31, 154, 56, 151, 111);
  context.bezierCurveTo(148, 149, 172, 146, 194, 88);
  context.bezierCurveTo(208, 50, 224, 65, 217, 116);
  context.bezierCurveTo(212, 148, 240, 151, 267, 91);
  context.bezierCurveTo(282, 58, 294, 77, 286, 121);
  context.bezierCurveTo(281, 148, 306, 147, 333, 106);
  context.bezierCurveTo(352, 77, 367, 91, 354, 126);
  context.bezierCurveTo(343, 154, 380, 145, 422, 104);
  context.stroke();

  context.lineWidth = 3.4;
  context.beginPath();
  context.moveTo(7, 160);
  context.bezierCurveTo(118, 175, 256, 170, 452, 149);
  context.stroke();
  context.restore();

  context.fillStyle = "rgba(38, 48, 54, 0.3)";
  context.font = "13px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillText("synthetic local scan", 22, 236);
}

function drawImageToCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const scale = Math.min(
    CANVAS_WIDTH / image.naturalWidth,
    CANVAS_HEIGHT / image.naturalHeight,
  );
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  context.drawImage(
    image,
    (CANVAS_WIDTH - width) / 2,
    (CANVAS_HEIGHT - height) / 2,
    width,
    height,
  );
}

export function SignatureCleanupMechanism() {
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);
  const [threshold, setThreshold] = useState(178);
  const [transparent, setTransparent] = useState(true);
  const [cropToContent, setCropToContent] = useState(true);
  const [sourceVersion, setSourceVersion] = useState(0);
  const [sourceName, setSourceName] = useState("Synthetic signature scan");
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<CleanupMetrics>(emptyMetrics);

  const processSource = useCallback(() => {
    const sourceCanvas = sourceCanvasRef.current;
    const outputCanvas = outputCanvasRef.current;
    if (!sourceCanvas || !outputCanvas) return;
    const sourceContext = sourceCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    const outputContext = outputCanvas.getContext("2d");
    if (!sourceContext || !outputContext) return;

    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
    const sourceImage = sourceContext.getImageData(0, 0, width, height);
    const mask = new Uint8Array(width * height);

    for (let index = 0; index < width * height; index += 1) {
      const offset = index * 4;
      const luminance =
        sourceImage.data[offset] * 0.2126 +
        sourceImage.data[offset + 1] * 0.7152 +
        sourceImage.data[offset + 2] * 0.0722;
      mask[index] = luminance < threshold ? 1 : 0;
    }

    const cleaned = new Uint8Array(mask.length);
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;
    let foregroundPixels = 0;

    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const index = y * width + x;
        if (!mask[index]) continue;
        let neighbours = 0;
        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
            if (mask[(y + offsetY) * width + x + offsetX]) neighbours += 1;
          }
        }
        if (neighbours < 3) continue;
        cleaned[index] = 1;
        foregroundPixels += 1;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }

    const processed = document.createElement("canvas");
    processed.width = width;
    processed.height = height;
    const processedContext = processed.getContext("2d");
    if (!processedContext) return;
    const outputImage = processedContext.createImageData(width, height);

    for (let index = 0; index < width * height; index += 1) {
      const offset = index * 4;
      const foreground = cleaned[index] === 1;
      if (foreground) {
        outputImage.data[offset] = 7;
        outputImage.data[offset + 1] = 16;
        outputImage.data[offset + 2] = 19;
        outputImage.data[offset + 3] = 255;
      } else if (!transparent) {
        outputImage.data[offset] = 255;
        outputImage.data[offset + 1] = 255;
        outputImage.data[offset + 2] = 255;
        outputImage.data[offset + 3] = 255;
      }
    }
    processedContext.putImageData(outputImage, 0, 0);

    outputCanvas.width = CANVAS_WIDTH;
    outputCanvas.height = CANVAS_HEIGHT;
    outputContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (!transparent) {
      outputContext.fillStyle = "#ffffff";
      outputContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    if (foregroundPixels && cropToContent) {
      const padding = 12;
      const sourceX = Math.max(0, minX - padding);
      const sourceY = Math.max(0, minY - padding);
      const cropWidth = Math.min(width - sourceX, maxX - minX + padding * 2);
      const cropHeight = Math.min(height - sourceY, maxY - minY + padding * 2);
      const scale = Math.min(
        (CANVAS_WIDTH - 48) / cropWidth,
        (CANVAS_HEIGHT - 48) / cropHeight,
      );
      const destinationWidth = cropWidth * scale;
      const destinationHeight = cropHeight * scale;
      outputContext.imageSmoothingEnabled = true;
      outputContext.drawImage(
        processed,
        sourceX,
        sourceY,
        cropWidth,
        cropHeight,
        (CANVAS_WIDTH - destinationWidth) / 2,
        (CANVAS_HEIGHT - destinationHeight) / 2,
        destinationWidth,
        destinationHeight,
      );
      setMetrics({
        foregroundPixels,
        cropWidth,
        cropHeight,
        sourceWidth: width,
        sourceHeight: height,
      });
    } else {
      outputContext.drawImage(processed, 0, 0);
      setMetrics({
        foregroundPixels,
        cropWidth: foregroundPixels ? maxX - minX + 1 : 0,
        cropHeight: foregroundPixels ? maxY - minY + 1 : 0,
        sourceWidth: width,
        sourceHeight: height,
      });
    }
  }, [cropToContent, threshold, transparent]);

  useEffect(() => {
    const canvas = sourceCanvasRef.current;
    if (!canvas) return;
    drawSyntheticSignature(canvas);
    setSourceVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    if (sourceVersion > 0) processSource();
  }, [processSource, sourceVersion]);

  const resetSample = () => {
    const canvas = sourceCanvasRef.current;
    if (!canvas) return;
    drawSyntheticSignature(canvas);
    setSourceName("Synthetic signature scan");
    setError("");
    setThreshold(178);
    setTransparent(true);
    setCropToContent(true);
    setSourceVersion((version) => version + 1);
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose a PNG, JPEG, or other browser-readable image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Keep the local image below 8 MB for this browser mechanism.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const canvas = sourceCanvasRef.current;
      if (canvas) {
        drawImageToCanvas(canvas, image);
        setSourceName(file.name);
        setSourceVersion((version) => version + 1);
        setError("");
      }
      URL.revokeObjectURL(objectUrl);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setError("The browser could not decode that image.");
    };
    image.src = objectUrl;
  };

  return (
    <div data-mechanism="cleanup" className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-xl border bg-muted/20 p-3">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                Source
              </p>
              <p className="mt-1 max-w-sm truncate text-sm font-medium">{sourceName}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center rounded-md border bg-background px-3 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary">
                <ImagePlus className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                Choose local image
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFile}
                  className="sr-only"
                />
              </label>
              <button
                type="button"
                onClick={resetSample}
                className="inline-flex items-center rounded-md border bg-background px-3 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                Reset sample
              </button>
            </div>
          </div>
          <canvas
            ref={sourceCanvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            role="img"
            aria-label="Source signature scan before cleanup"
            className="h-auto w-full rounded-lg border bg-white"
          />
        </div>

        <div className="rounded-xl border bg-muted/20 p-3">
          <div className="flex items-center justify-between gap-3 px-1 pb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                Cleaned result
              </p>
              <p className="mt-1 text-sm font-medium">Browser-generated preview</p>
            </div>
            <span className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
              Local only
            </span>
          </div>
          <div
            className="overflow-hidden rounded-lg border"
            style={{
              backgroundColor: "#ffffff",
              backgroundImage:
                "linear-gradient(45deg, #e8eceb 25%, transparent 25%), linear-gradient(-45deg, #e8eceb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e8eceb 75%), linear-gradient(-45deg, transparent 75%, #e8eceb 75%)",
              backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
              backgroundSize: "16px 16px",
            }}
          >
            <canvas
              ref={outputCanvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              role="img"
              aria-label="Cleaned signature result after thresholding, noise removal, and optional crop"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/[0.04] px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="grid gap-5 rounded-xl border p-4 lg:grid-cols-[1.2fr_0.8fr] lg:p-5">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.13em]">
              Cleanup controls
            </p>
          </div>
          <label htmlFor="signature-threshold" className="mt-5 flex items-center justify-between gap-4 text-sm font-medium">
            Foreground threshold
            <span className="font-mono text-xs text-muted-foreground">{threshold}</span>
          </label>
          <input
            id="signature-threshold"
            type="range"
            min="80"
            max="235"
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
            className="mt-3 w-full accent-[hsl(var(--primary))]"
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="flex items-start gap-3 rounded-lg border p-3 text-sm">
              <input
                type="checkbox"
                checked={transparent}
                onChange={(event) => setTransparent(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
              />
              <span>
                <span className="block font-medium">Transparent background</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  Keep only the cleaned foreground pixels.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-lg border p-3 text-sm">
              <input
                type="checkbox"
                checked={cropToContent}
                onChange={(event) => setCropToContent(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
              />
              <span>
                <span className="block font-medium">Crop to content</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  Fit the detected ink bounds into the preview.
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 overflow-hidden rounded-xl border bg-muted/20">
          {[
            [metrics.foregroundPixels.toLocaleString("en-IN"), "Foreground pixels"],
            [`${metrics.cropWidth} × ${metrics.cropHeight}`, "Detected bounds"],
            [`${metrics.sourceWidth} × ${metrics.sourceHeight}`, "Working canvas"],
            [transparent ? "RGBA" : "RGB", "Output mode"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`p-4 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t" : ""}`}
            >
              <p
                className="text-base font-bold"
                data-foreground-pixels={label === "Foreground pixels" ? metrics.foregroundPixels : undefined}
              >
                {value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
