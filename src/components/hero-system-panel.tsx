'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXTRACTION_FIELDS = [
  { key: 'account', label: 'Account', value: 'Northline Logistics' },
  { key: 'contact', label: 'Contact', value: 'Maya Patel' },
  { key: 'channel', label: 'Channel', value: 'Support Email' },
  { key: 'priority', label: 'Priority', value: 'High' },
  { key: 'theme', label: 'Theme', value: 'Billing Friction' },
  { key: 'status', label: 'Action Status', value: 'Needs Follow-up' },
] as const;

const PROCESSING_STEPS = [
  { id: 'ingest', label: 'Input captured', status: 'complete' as const },
  { id: 'parse', label: 'Signal parsing', status: 'complete' as const },
  { id: 'extract', label: 'Context extraction', status: 'running' as const },
  { id: 'tag', label: 'Theme tagging', status: 'pending' as const },
  { id: 'route', label: 'Route to owner', status: 'pending' as const },
] as const;

function StatusIcon({
  status,
}: {
  status: 'complete' | 'running' | 'pending' | 'error';
}) {
  if (status === 'complete') {
    return (
      <span
        title='Complete'
        className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400'
      >
        <svg
          className='h-3 w-3'
          fill='currentColor'
          viewBox='0 0 20 20'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </span>
    );
  }

  if (status === 'running') {
    return (
      <motion.span
        title='Running'
        className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/15'
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.span
          className='h-2.5 w-2.5 rounded-full bg-blue-400'
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.span>
    );
  }

  if (status === 'error') {
    return (
      <span
        title='Error'
        className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 text-red-400'
      >
        <svg
          className='h-3 w-3'
          fill='currentColor'
          viewBox='0 0 20 20'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      title='Pending'
      className='inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15'
    >
      <span className='h-1.5 w-1.5 rounded-full bg-white/30' />
    </span>
  );
}

function StepRow({
  label,
  status,
  isLast,
}: {
  label: string;
  status: 'complete' | 'running' | 'pending' | 'error';
  isLast?: boolean;
}) {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex flex-col items-center'>
        <StatusIcon status={status} />
        {!isLast && (
          <div
            className={`w-px h-6 mt-1 ${
              status === 'complete' ? 'bg-emerald-500/30' : 'bg-white/10'
            }`}
          />
        )}
      </div>
      <span
        className={`text-sm ${
          status === 'complete'
            ? 'text-white/80'
            : status === 'running'
              ? 'text-blue-300 font-medium'
              : 'text-white/50'
        }`}
      >
        {label}
      </span>
      {status === 'running' && (
        <span className='ml-auto text-xs text-blue-400/80 animate-pulse'>
          Processing...
        </span>
      )}
    </div>
  );
}

function FieldRow({
  label,
  value,
  confidence,
  isNew,
}: {
  label: string;
  value: string;
  confidence?: number;
  isNew?: boolean;
}) {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, x: -10 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className='flex items-center justify-between py-2 border-b border-white/[0.06] last:border-0'
    >
      <span className='text-sm text-white/55'>{label}</span>
      <div className='flex items-center gap-2'>
        <span className='text-sm text-white/90 font-mono'>{value}</span>
        {confidence !== undefined && (
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              confidence >= 95
                ? 'bg-emerald-500/15 text-emerald-400'
                : confidence >= 85
                  ? 'bg-amber-500/15 text-amber-400'
                  : 'bg-white/10 text-white/50'
            }`}
          >
            {confidence}%
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function HeroSystemPanel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [extractedCount, setExtractedCount] = useState(0);
  const [showConfidence, setShowConfidence] = useState(false);
  const [pipelineComplete, setPipelineComplete] = useState(false);
  const [modalRevealCount, setModalRevealCount] = useState(0);
  const hasFullExtraction = extractedCount >= EXTRACTION_FIELDS.length;
  const extractionActive = pipelineComplete && hasFullExtraction;

  const advance = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < 4) {
        return prev + 1;
      }
      setPipelineComplete(true);
      // Reset after completion
      setTimeout(() => {
        setPipelineComplete(false);
        setCurrentStep(0);
        setExtractedCount(0);
        setShowConfidence(false);
      }, 2000);
      return prev;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 1800);
    return () => clearInterval(interval);
  }, [advance]);

  useEffect(() => {
    if (currentStep >= 2 && extractedCount < EXTRACTION_FIELDS.length) {
      const timeout = setTimeout(() => {
        setExtractedCount((prev) => prev + 1);
        if (extractedCount >= 2) {
          setShowConfidence(true);
        }
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, extractedCount]);

  useEffect(() => {
    if (!extractionActive) {
      setModalRevealCount(0);
      return;
    }

    let reveal = 0;
    setModalRevealCount(0);
    const interval = setInterval(() => {
      reveal += 1;
      setModalRevealCount(reveal);
      if (reveal >= EXTRACTION_FIELDS.length) {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [extractionActive]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'complete';
    if (index === currentStep) return 'running';
    return 'pending';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='relative mx-auto w-full max-w-[420px]'
    >
      <div className='relative rounded-2xl border border-white/[0.1] bg-[#0b111a] shadow-xl overflow-hidden'>
        {/* Header */}
        <div className='px-4 py-3 border-b border-white/[0.07] flex items-center justify-between bg-white/[0.015]'>
          <div className='flex items-center gap-2'>
            <div className='flex gap-1.5'>
              <div className='w-2.5 h-2.5 rounded-full bg-white/20' />
              <div className='w-2.5 h-2.5 rounded-full bg-white/20' />
              <div className='w-2.5 h-2.5 rounded-full bg-white/20' />
            </div>
            <span className='text-xs text-white/40 font-mono ml-2'>
              workflow_signal_router
            </span>
          </div>
          <span className='text-[10px] text-white/35 uppercase tracking-wider'>
            Product Ops Console
          </span>
        </div>

        <div className='relative p-4 min-h-[420px]'>
          <div
            className={`space-y-4 transition-all duration-300 ${
              extractionActive
                ? 'opacity-70 scale-[0.985] blur-[1px]'
                : 'opacity-100 scale-100 blur-0'
            }`}
          >
            <div className='grid grid-cols-3 gap-2'>
              <div className='rounded-md border border-white/[0.07] bg-white/[0.015] p-2.5'>
                <p className='text-[10px] text-white/40 uppercase tracking-wide'>
                  Signals
                </p>
                <p className='text-sm font-mono text-white/85 mt-0.5'>142</p>
              </div>
              <div className='rounded-md border border-white/[0.07] bg-white/[0.015] p-2.5'>
                <p className='text-[10px] text-white/40 uppercase tracking-wide'>
                  At risk
                </p>
                <p className='text-sm font-mono text-amber-300 mt-0.5'>9</p>
              </div>
              <div className='rounded-md border border-white/[0.07] bg-white/[0.015] p-2.5'>
                <p className='text-[10px] text-white/40 uppercase tracking-wide'>
                  Resolved
                </p>
                <p className='text-sm font-mono text-emerald-300 mt-0.5'>97</p>
              </div>
            </div>

            {/* Document Input Card */}
            <div className='rounded-lg border border-white/[0.07] bg-white/[0.015] p-3'>
              <div className='flex items-start gap-3'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/[0.03] border border-white/10'>
                  <svg
                    className='h-5 w-5 text-white/70'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-medium text-white/90 truncate'>
                    q1_customer_feedback_batch.csv
                  </p>
                  <p className='text-xs text-white/40 mt-0.5'>
                    1,220 rows • Product + Support + Success
                  </p>
                </div>
                <span className='text-[10px] px-2 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/25'>
                  Live
                </span>
              </div>
            </div>

            {/* Processing Steps */}
            <div className='rounded-lg border border-white/[0.07] bg-white/[0.015] p-3'>
              <p className='text-[10px] uppercase tracking-wider text-white/40 mb-3 font-mono'>
                Workflow Pipeline
              </p>
              <div className='space-y-0'>
                {PROCESSING_STEPS.map((step, i) => (
                  <StepRow
                    key={step.id}
                    label={step.label}
                    status={getStepStatus(i)}
                    isLast={i === PROCESSING_STEPS.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Processing Stats */}
            {currentStep >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex items-center gap-4 text-xs text-white/40'
              >
                <div className='flex items-center gap-1.5'>
                  <svg
                    className='h-3.5 w-3.5 text-blue-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>~1.1s avg processing</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <svg
                    className='h-3.5 w-3.5 text-emerald-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>95% avg confidence</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Backdrop + Top Modal (no layout shift) */}
          <AnimatePresence mode='wait'>
            {extractionActive && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='absolute inset-0 bg-black/35 backdrop-blur-[1px]'
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.985 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className='absolute left-1/2 top-6 w-[calc(100%-2rem)] max-w-[330px] -translate-x-1/2 rounded-lg border border-white/[0.14] bg-[#0d1422]/96 backdrop-blur-sm shadow-2xl p-3'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <p className='text-[10px] uppercase tracking-wider text-white/40 font-mono'>
                      Extracted Context
                    </p>
                    {showConfidence && (
                      <span className='text-[10px] text-emerald-300/80'>
                        ✓ {extractedCount} signals
                      </span>
                    )}
                  </div>
                  <div className='space-y-0 min-h-[168px]'>
                    {EXTRACTION_FIELDS.slice(0, modalRevealCount).map(
                      (field, i) => (
                        <FieldRow
                          key={field.key}
                          label={field.label}
                          value={field.value}
                          confidence={showConfidence ? 94 + (i % 5) : undefined}
                          isNew={i === extractedCount - 1}
                        />
                      ),
                    )}
                    {modalRevealCount < EXTRACTION_FIELDS.length &&
                      Array.from({ length: 2 }).map((_, index) => (
                        <div
                          key={`skeleton-${index}`}
                          className='flex items-center justify-between py-2 border-b border-white/[0.06]'
                        >
                          <span className='h-2.5 w-24 rounded bg-white/10' />
                          <span className='h-2.5 w-20 rounded bg-white/10' />
                        </div>
                      ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className='px-4 py-2 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between'>
          <span className='text-[10px] text-white/30'>ID: OPS-SIG-2981</span>
          <span className='text-[10px] text-white/30'>v2.4.1</span>
        </div>
      </div>
    </motion.div>
  );
}
