"use client";

import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImagePlus, RotateCcw, ScanLine } from "lucide-react";

const WIDTH = 640;
const HEIGHT = 360;

interface InspectionMetrics {
  width: number;
  height: number;
  meanLuminance: number;
  contrast: number;
  edgeDensity: number;
  dominantFamily: string;
  averageColour: string;
  edgeHotspot: string;
}

const emptyMetrics: InspectionMetrics = {
  width: WIDTH,
  height: HEIGHT,
  meanLuminance: 0,
  contrast: 0,
  edgeDensity: 0,
  dominantFamily: "Unknown",
  averageColour: "#000000",
  edgeHotspot: "Unknown",
};

function drawSyntheticScene(canvas: HTMLCanvasElement) {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return;

  const gradient = context.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, "#dce9ea");
  gradient.addColorStop(0.58, "#edf1ed");
  gradient.addColorStop(0.59, "#b7ad97");
  gradient.addColorStop(1, "#8b806c");
  context.fillStyle = gradient;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.fillStyle = "#26393d";
  context.fillRect(50, 64, 178, 166);
  context.fillStyle = "#aac4c0";
  context.fillRect(68, 82, 142, 88);
  context.fillStyle = "#0d1718";
  context.fillRect(122, 170, 34, 60);

  context.fillStyle = "#d59d5f";
  context.fillRect(280, 172, 124, 78);
  context.fillStyle = "#715944";
  context.fillRect(294, 186, 96, 12);
  context.fillRect(294, 211, 72, 10);

  context.fillStyle = "#4b6f72";
  context.beginPath();
  context.arc(500, 124, 54, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#a9d8ce";
  context.beginPath();
  context.arc(500, 124, 31, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = "rgba(13, 23, 24, 0.38)";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(0, 270);
  context.lineTo(WIDTH, 270);
  context.stroke();

  context.strokeStyle = "rgba(255, 255, 255, 0.4)";
  context.lineWidth = 2;
  for (let x = 20; x < WIDTH; x += 44) {
    context.beginPath();
    context.moveTo(x, 285);
    context.lineTo(x + 28, 350);
    context.stroke();
  }

  context.fillStyle = "rgba(13, 23, 24, 0.72)";
  context.font = "14px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillText("synthetic scene · browser generated", 22, 335);
}

function drawImageToCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  const scale = Math.min(WIDTH / image.naturalWidth, HEIGHT / image.naturalHeight);
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    (WIDTH - renderedWidth) / 2,
    (HEIGHT - renderedHeight) / 2,
    renderedWidth,
    renderedHeight,
  );
}

function toHex(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)))
    .toString(16)
    .padStart(2, "0");
}

export function VisualInspectionMechanism() {
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const edgeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [sourceVersion, setSourceVersion] = useState(0);
  const [sourceName, setSourceName] = useState("Synthetic room scene");
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<InspectionMetrics>(emptyMetrics);

  const analyse = useCallback(() => {
    const sourceCanvas = sourceCanvasRef.current;
    const edgeCanvas = edgeCanvasRef.current;
    if (!sourceCanvas || !edgeCanvas) return;
    const sourceContext = sourceCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    const edgeContext = edgeCanvas.getContext("2d");
    if (!sourceContext || !edgeContext) return;

    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
    const image = sourceContext.getImageData(0, 0, width, height);
    const pixels = width * height;
    const luminance = new Float32Array(pixels);
    const families = { red: 0, green: 0, blue: 0, neutral: 0 };
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    let sumLuminance = 0;

    for (let index = 0; index < pixels; index += 1) {
      const offset = index * 4;
      const red = image.data[offset];
      const green = image.data[offset + 1];
      const blue = image.data[offset + 2];
      const value = red * 0.2126 + green * 0.7152 + blue * 0.0722;
      luminance[index] = value;
      sumR += red;
      sumG += green;
      sumB += blue;
      sumLuminance += value;

      const maximum = Math.max(red, green, blue);
      const minimum = Math.min(red, green, blue);
      if (maximum - minimum < 22) families.neutral += 1;
      else if (red === maximum) families.red += 1;
      else if (green === maximum) families.green += 1;
      else families.blue += 1;
    }

    const meanLuminance = sumLuminance / pixels;
    let variance = 0;
    for (const value of luminance) variance += (value - meanLuminance) ** 2;
    const contrast = Math.sqrt(variance / pixels);

    edgeCanvas.width = width;
    edgeCanvas.height = height;
    const edgeImage = edgeContext.createImageData(width, height);
    const quadrantEdges = [0, 0, 0, 0];
    let edgeCount = 0;

    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const index = y * width + x;
        const gradientX = Math.abs(luminance[index + 1] - luminance[index - 1]);
        const gradientY = Math.abs(
          luminance[index + width] - luminance[index - width],
        );
        const strength = Math.min(255, gradientX + gradientY);
        const edge = strength > 52;
        if (edge) {
          edgeCount += 1;
          const quadrant = (y >= height / 2 ? 2 : 0) + (x >= width / 2 ? 1 : 0);
          quadrantEdges[quadrant] += 1;
        }
        const offset = index * 4;
        const tone = edge ? Math.max(145, strength) : Math.round(strength * 0.22);
        edgeImage.data[offset] = edge ? 89 : tone;
        edgeImage.data[offset + 1] = edge ? 215 : tone;
        edgeImage.data[offset + 2] = edge ? 203 : tone;
        edgeImage.data[offset + 3] = 255;
      }
    }
    edgeContext.putImageData(edgeImage, 0, 0);

    const family = Object.entries(families).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "neutral";
    const hotspotIndex = quadrantEdges.indexOf(Math.max(...quadrantEdges));
    const hotspots = ["Top left", "Top right", "Bottom left", "Bottom right"];
    const averageColour = `#${toHex(sumR / pixels)}${toHex(sumG / pixels)}${toHex(sumB / pixels)}`;

    setMetrics({
      width,
      height,
      meanLuminance,
      contrast,
      edgeDensity: (edgeCount / pixels) * 100,
      dominantFamily: `${family[0].toUpperCase()}${family.slice(1)}`,
      averageColour,
      edgeHotspot: hotspots[hotspotIndex] ?? "Unknown",
    });
  }, []);

  useEffect(() => {
    const canvas = sourceCanvasRef.current;
    if (!canvas) return;
    drawSyntheticScene(canvas);
    setSourceVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    if (sourceVersion > 0) analyse();
  }, [analyse, sourceVersion]);

  const resetSample = () => {
    const canvas = sourceCanvasRef.current;
    if (!canvas) return;
    drawSyntheticScene(canvas);
    setSourceName("Synthetic room scene");
    setError("");
    setSourceVersion((version) => version + 1);
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose a browser-readable image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Keep the local image below 10 MB for this mechanism.");
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

  const metricCards = [
    [`${metrics.width} × ${metrics.height}`, "Working dimensions"],
    [`${metrics.meanLuminance.toFixed(1)} / 255`, "Mean luminance"],
    [metrics.contrast.toFixed(1), "Luminance contrast"],
    [`${metrics.edgeDensity.toFixed(2)}%`, "Edge density"],
    [metrics.dominantFamily, "Dominant family"],
    [metrics.edgeHotspot, "Strongest boundary region"],
  ];

  return (
    <div data-mechanism="inspection" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border bg-muted/20 p-4">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <ScanLine className="h-4 w-4" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.13em]">
              Local visual input
            </p>
          </div>
          <p className="mt-2 max-w-xl truncate text-sm font-medium">{sourceName}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Image decoding, metrics, and edge-map generation happen in this browser tab.
          </p>
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

      {error && (
        <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/[0.04] px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="overflow-hidden rounded-xl border bg-[#071013]">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-white/58">
              Source raster
            </p>
          </div>
          <canvas
            ref={sourceCanvasRef}
            width={WIDTH}
            height={HEIGHT}
            role="img"
            aria-label="Source image used for local visual inspection"
            className="h-auto w-full"
          />
        </div>
        <div className="overflow-hidden rounded-xl border bg-[#071013]">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-white/58">
              Derived edge evidence
            </p>
          </div>
          <canvas
            ref={edgeCanvasRef}
            width={WIDTH}
            height={HEIGHT}
            role="img"
            aria-label="Locally derived edge-strength map"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <div className="grid grid-cols-2 overflow-hidden rounded-xl border bg-muted/20 md:grid-cols-3">
          {metricCards.map(([value, label], index) => (
            <div
              key={label}
              className={`p-4 ${index % 2 ? "border-l md:border-l" : ""} ${
                index >= 2 ? "border-t md:border-t-0" : ""
              } ${index >= 3 ? "md:border-t" : ""}`}
            >
              <p
                className="text-base font-bold"
                data-edge-density={label === "Edge density" ? metrics.edgeDensity.toFixed(2) : undefined}
              >
                {value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
            Average colour
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span
              className="h-14 w-14 rounded-xl border shadow-inner"
              style={{ backgroundColor: metrics.averageColour }}
              aria-label={`Average colour ${metrics.averageColour}`}
            />
            <div>
              <p className="font-mono text-sm font-semibold">{metrics.averageColour}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Mean RGB value across the working raster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
