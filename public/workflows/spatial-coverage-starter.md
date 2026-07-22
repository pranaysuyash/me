# Spatial visibility and coverage review — starter kit

Use this artifact to scope a scene, camera, monitored-zone, obstruction, or coverage-comparison workflow before installation or operational change.

This is a planning and simulation artifact. It is not a certified security design, physical-site survey, or replacement for installation and compliance review.

## 1. Decision being supported

- Which area, target, path, or event must be observable?
- What action follows when coverage is weak?
- Which assumptions are simulated and which are measured on site?
- Who approves the final placement or operating rule?

## 2. Scene contract

Record:

| Element | Coordinates/dimensions | Height | State | Source of truth |
|---|---|---:|---|---|
| Entrance | x/y/width | 2.1 m | fixed | floor plan + survey |
| Shelf | x/y/width/depth | 1.8 m | movable | operator input |
| Camera A | x/y/z + orientation | 2.7 m | proposed | simulation |

## 3. Targets and zones

For each target or zone define:

- purpose
- geometry
- required visibility or coverage
- privacy restrictions
- operating hours
- critical paths
- acceptable blind period
- evidence needed for approval

## 4. Simulation states

1. Import or draw scene
2. Calibrate dimensions
3. Place cameras/sensors
4. Define targets, zones, and paths
5. Add obstructions
6. Compute visibility/coverage
7. Compare alternatives
8. Record assumptions and decision
9. Validate against real feed or site measurements
10. Monitor drift after changes

## 5. Scenario record

```json
{
  "scenario_id": "retail-entry-v3",
  "scene_revision": "floorplan-2026-07-01",
  "camera": "camera-a",
  "targets": ["entrance", "cash-counter"],
  "obstructions": ["shelf-2"],
  "coverage_score": 0.5,
  "assumptions": ["camera_height=2.7m", "shelf_height=1.8m"],
  "decision": "move shelf 0.8m east and re-evaluate"
}
```

## 6. Deterministic checks

Depending on the product, test:

- line-of-sight intersection
- field of view
- distance and pixel density
- DORI or other declared criteria
- redundant coverage
- target/path visibility
- privacy-zone overlap
- time/state-dependent obstruction
- camera-feed alignment

## 7. Failure and uncertainty

Document:

- incomplete or inaccurate plan
- scale/calibration error
- temporary obstruction
- camera moved after installation
- lighting changes
- lens mismatch
- feed latency or outage
- target outside modelled height range
- privacy boundary conflict

## 8. Review surface

An operator should see:

- scene revision
- camera and target geometry
- visible and blocked rays/regions
- scenario assumptions
- before/after comparison
- reasons for recommendation
- who approved the decision
- what must be checked physically

## 9. Acceptance gate

- dimensions and calibration reviewed
- critical targets modelled
- privacy zones defined
- required scenarios pass
- known blind spots listed
- feed/site comparison completed where required
- recommendation is reproducible from the recorded scene
- drift/revalidation owner assigned

## 10. Scoping packet

Bring:

- floor plan or scene dimensions
- camera/lens information
- target zones and paths
- photos or feed samples when available
- known obstacles
- privacy restrictions
- budget and installation constraints
- required decision outputs

Related surfaces:

- Live 2D mechanism: `/systems#capability-tab-visibility`
- Audited case: `/work/sentineltwin`
