"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { Camera, Move, RotateCcw } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const camera: Point = { x: 70, y: 65 };
const entrance: Point = { x: 730, y: 100 };
const counter: Point = { x: 690, y: 320 };
const shelfSize = { width: 150, height: 72 };
const initialShelf = { x: 340, y: 150 };

function orientation(left: Point, middle: Point, right: Point) {
  const value =
    (middle.y - left.y) * (right.x - middle.x) -
    (middle.x - left.x) * (right.y - middle.y);
  if (Math.abs(value) < 0.0001) return 0;
  return value > 0 ? 1 : 2;
}

function onSegment(left: Point, middle: Point, right: Point) {
  return (
    middle.x <= Math.max(left.x, right.x) &&
    middle.x >= Math.min(left.x, right.x) &&
    middle.y <= Math.max(left.y, right.y) &&
    middle.y >= Math.min(left.y, right.y)
  );
}

function segmentsIntersect(a: Point, b: Point, c: Point, d: Point) {
  const o1 = orientation(a, b, c);
  const o2 = orientation(a, b, d);
  const o3 = orientation(c, d, a);
  const o4 = orientation(c, d, b);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSegment(a, c, b)) return true;
  if (o2 === 0 && onSegment(a, d, b)) return true;
  if (o3 === 0 && onSegment(c, a, d)) return true;
  if (o4 === 0 && onSegment(c, b, d)) return true;
  return false;
}

function lineIntersectsRectangle(start: Point, end: Point, rectangle: Rectangle) {
  const topLeft = { x: rectangle.x, y: rectangle.y };
  const topRight = { x: rectangle.x + rectangle.width, y: rectangle.y };
  const bottomLeft = { x: rectangle.x, y: rectangle.y + rectangle.height };
  const bottomRight = {
    x: rectangle.x + rectangle.width,
    y: rectangle.y + rectangle.height,
  };
  return (
    segmentsIntersect(start, end, topLeft, topRight) ||
    segmentsIntersect(start, end, topRight, bottomRight) ||
    segmentsIntersect(start, end, bottomRight, bottomLeft) ||
    segmentsIntersect(start, end, bottomLeft, topLeft)
  );
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(maximum, value));
}

export function SpatialVisibilityMechanism() {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [shelf, setShelf] = useState(initialShelf);
  const [dragging, setDragging] = useState(false);

  const rectangle = useMemo<Rectangle>(
    () => ({ ...shelf, ...shelfSize }),
    [shelf],
  );
  const entranceBlocked = lineIntersectsRectangle(camera, entrance, rectangle);
  const counterBlocked = lineIntersectsRectangle(camera, counter, rectangle);
  const visibleTargets = Number(!entranceBlocked) + Number(!counterBlocked);
  const coverageScore = visibleTargets * 50;

  const toSvgPoint = (event: ReactPointerEvent<SVGGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const bounds = svg.getBoundingClientRect();
    return {
      x: ((event.clientX - bounds.left) / bounds.width) * 800,
      y: ((event.clientY - bounds.top) / bounds.height) * 410,
    };
  };

  const handlePointerDown = (event: ReactPointerEvent<SVGGElement>) => {
    const point = toSvgPoint(event);
    if (!point) return;
    dragOffsetRef.current = { x: point.x - shelf.x, y: point.y - shelf.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGGElement>) => {
    if (!dragging) return;
    const point = toSvgPoint(event);
    if (!point) return;
    setShelf({
      x: clamp(point.x - dragOffsetRef.current.x, 150, 570),
      y: clamp(point.y - dragOffsetRef.current.y, 55, 285),
    });
  };

  const handlePointerEnd = (event: ReactPointerEvent<SVGGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  const statusCards = [
    {
      label: "Entrance",
      blocked: entranceBlocked,
      detail: entranceBlocked ? "Shelf crosses the sight line" : "Direct sight line",
    },
    {
      label: "Service counter",
      blocked: counterBlocked,
      detail: counterBlocked ? "Shelf crosses the sight line" : "Direct sight line",
    },
  ];

  return (
    <div data-mechanism="visibility" className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="overflow-hidden rounded-xl border bg-[#071013]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-white/55">
              Top-down visibility plane
            </p>
            <p className="mt-1 text-sm text-white/78">
              Drag the shelf. Sight lines recompute immediately.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShelf({ x: 330, y: 252 })}
              className="inline-flex items-center rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/78 hover:bg-white/[0.08]"
            >
              <Move className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Move shelf clear
            </button>
            <button
              type="button"
              onClick={() => setShelf(initialShelf)}
              className="inline-flex items-center rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/78 hover:bg-white/[0.08]"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 800 410"
          role="img"
          aria-labelledby="visibility-title visibility-description"
          className="h-auto w-full touch-none select-none"
        >
          <title id="visibility-title">Interactive camera visibility plane</title>
          <desc id="visibility-description">
            A camera observes an entrance and service counter. A movable shelf can block either geometric line of sight.
          </desc>
          <defs>
            <pattern id="floor-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
            </pattern>
            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#000000" floodOpacity="0.28" />
            </filter>
          </defs>

          <rect x="0" y="0" width="800" height="410" fill="#0a1517" />
          <rect x="18" y="18" width="764" height="374" rx="18" fill="url(#floor-grid)" stroke="rgba(255,255,255,0.14)" />
          <path d="M70 65 L780 20 L780 392 Z" fill="rgba(89,215,203,0.07)" stroke="rgba(89,215,203,0.16)" />

          {[{ point: entrance, blocked: entranceBlocked }, { point: counter, blocked: counterBlocked }].map(
            ({ point, blocked }, index) => (
              <line
                key={`${point.x}-${point.y}`}
                x1={camera.x}
                y1={camera.y}
                x2={point.x}
                y2={point.y}
                stroke={blocked ? "#d69c59" : "#59d7cb"}
                strokeWidth="3"
                strokeDasharray={blocked ? "8 7" : undefined}
                opacity="0.82"
                aria-hidden="true"
              />
            ),
          )}

          <g transform={`translate(${camera.x} ${camera.y})`}>
            <circle r="25" fill="#102d30" stroke="#59d7cb" strokeWidth="2" />
            <path d="M-8 -8 H9 V8 H-8 Z M9 -5 L20 -13 V13 L9 5 Z" fill="#9ee8e0" />
            <text x="-27" y="42" fill="rgba(255,255,255,0.7)" fontSize="13">Camera</text>
          </g>

          <g transform={`translate(${entrance.x} ${entrance.y})`}>
            <rect x="-25" y="-38" width="50" height="76" rx="5" fill="#183033" stroke="#9ee8e0" />
            <circle cx="14" cy="0" r="3" fill="#9ee8e0" />
            <text x="-33" y="58" fill="rgba(255,255,255,0.72)" fontSize="13">Entrance</text>
          </g>

          <g transform={`translate(${counter.x} ${counter.y})`}>
            <rect x="-50" y="-25" width="100" height="50" rx="8" fill="#26383b" stroke="#8eb7df" />
            <rect x="-35" y="-12" width="70" height="8" rx="3" fill="#8eb7df" opacity="0.7" />
            <text x="-48" y="48" fill="rgba(255,255,255,0.72)" fontSize="13">Service counter</text>
          </g>

          <g
            transform={`translate(${shelf.x} ${shelf.y})`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            className={dragging ? "cursor-grabbing" : "cursor-grab"}
            filter="url(#soft-shadow)"
            data-spatial-obstacle
          >
            <rect width={shelfSize.width} height={shelfSize.height} rx="9" fill="#765b43" stroke="#d69c59" strokeWidth="2" />
            <line x1="18" y1="24" x2={shelfSize.width - 18} y2="24" stroke="#e6be8e" strokeWidth="4" opacity="0.65" />
            <line x1="18" y1="48" x2={shelfSize.width - 18} y2="48" stroke="#e6be8e" strokeWidth="4" opacity="0.65" />
            <text x="47" y="-10" fill="rgba(255,255,255,0.76)" fontSize="13">Movable shelf</text>
          </g>
        </svg>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl border bg-muted/20 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <Camera className="h-4 w-4" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.13em]">
                  Coverage result
                </p>
              </div>
              <p className="mt-3 text-4xl font-bold tracking-tight" data-coverage-score={coverageScore}>
                {coverageScore}%
              </p>
            </div>
            <span className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {visibleTargets}/2 visible
            </span>
          </div>

          <div className="mt-5 divide-y border-y">
            {statusCards.map((status) => (
              <div key={status.label} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="text-sm font-semibold">{status.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {status.detail}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${
                    status.blocked
                      ? "border-amber-500/30 text-amber-700 dark:text-amber-300"
                      : "border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {status.blocked ? "Occluded" : "Visible"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
            Keyboard-friendly shelf position
          </p>
          <label htmlFor="shelf-x" className="mt-5 flex items-center justify-between gap-4 text-sm font-medium">
            Horizontal position
            <span className="font-mono text-xs text-muted-foreground">{Math.round(shelf.x)}</span>
          </label>
          <input
            id="shelf-x"
            type="range"
            min="150"
            max="570"
            value={shelf.x}
            onChange={(event) => setShelf((current) => ({ ...current, x: Number(event.target.value) }))}
            className="mt-3 w-full accent-[hsl(var(--primary))]"
          />
          <label htmlFor="shelf-y" className="mt-5 flex items-center justify-between gap-4 text-sm font-medium">
            Vertical position
            <span className="font-mono text-xs text-muted-foreground">{Math.round(shelf.y)}</span>
          </label>
          <input
            id="shelf-y"
            type="range"
            min="55"
            max="285"
            value={shelf.y}
            onChange={(event) => setShelf((current) => ({ ...current, y: Number(event.target.value) }))}
            className="mt-3 w-full accent-[hsl(var(--primary))]"
          />
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            The result is derived from segment-to-rectangle intersection. No AI explanation is needed to decide whether the shelf crosses a sight line.
          </p>
        </div>
      </div>
    </div>
  );
}
