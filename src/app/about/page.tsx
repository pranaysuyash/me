import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Story, worldview, and operating approach behind Pranay Suyash's practical workflow systems work.",
  openGraph: {
    title: 'About | Pranay Suyash',
    description:
      'Story, worldview, and operating approach behind practical workflow and product delivery systems.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <PageLayout>
      <section className='py-20 md:py-28'>
        <div className='container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start'>
            <div className='animate-fade-up'>
              <div className='w-40 h-40 bg-muted rounded-full flex items-center justify-center text-4xl font-bold text-primary mb-6'>
                PS
              </div>
              <p className='name-display text-xl font-semibold mb-1'>
                Pranay Suyash
              </p>
              <p className='text-sm text-muted-foreground mb-6'>
                Product/workflow operator-builder
              </p>
              <div className='flex flex-col gap-3'>
                <Button
                  variant='outline'
                  asChild
                  className='rounded-full w-full'
                >
                  <a
                    href='/pranay_resume.html'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Download className='mr-2 h-4 w-4' /> Resume
                  </a>
                </Button>
                <Button asChild className='rounded-full w-full'>
                  <Link href='/contact'>
                    <Calendar className='mr-2 h-4 w-4' /> Contact
                  </Link>
                </Button>
              </div>
              <div className='flex gap-3 mt-6'>
                <Link
                  href='https://github.com/pranaysuyash'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  <Github className='h-5 w-5' />
                </Link>
                <Link
                  href='https://linkedin.com/in/pranaysuyash'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  <Linkedin className='h-5 w-5' />
                </Link>
                <Link
                  href='https://x.com/pranaysuyash'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  <Twitter className='h-5 w-5' />
                </Link>
                <Link
                  href='mailto:pranay.suyash@gmail.com'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  <Mail className='h-5 w-5' />
                </Link>
              </div>
            </div>

            <div className='animate-fade-up'>
              <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-6'>
                About
              </h1>
              <div className='space-y-4 text-muted-foreground leading-relaxed'>
                <p>
                  I started out in enterprise consulting, working on SAP
                  implementations and large process-heavy systems. That taught
                  me how organizations actually run, where work gets stuck, and
                  how much time disappears between a plan and something that is
                  genuinely usable.
                </p>
                <p>
                  That changed when I joined MedPiper, a YC-backed healthcare
                  startup, and had to operate much closer to the work itself. I
                  moved from process and delivery into product, platform,
                  workflow design, compliance, and hands-on system building. The
                  work stopped being theoretical very quickly.
                </p>
                <p>
                  At MedPiper, I&apos;ve worked across product, platform, data
                  workflows, and security/compliance, helping build systems that
                  support real healthcare and insurance operations. We scaled to
                  roughly $1M ARR while I was working across those functions,
                  and that experience changed how I think about software: speed
                  matters, but only if what you ship actually survives real
                  users, real constraints, and messy operations.
                </p>
                <p>
                  What I care about now is the gap between a messy workflow and
                  a working system. That is where most teams lose time, money,
                  and momentum. I work best in that gap: understanding the
                  workflow, reducing ambiguity, and turning it into software
                  that is clear, useful, and shippable.
                </p>
                <p>
                  I don&apos;t optimize for technical theater. I optimize for
                  useful systems: clear inputs, operationally safe outputs, and
                  workflows that teams can trust.
                </p>
                <p>
                  Alongside MedPiper, I&apos;ve built and shipped independent
                  products to stay close to execution reality. Based in
                  Bengaluru.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 border-t'>
        <div className='container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center'>
          <h2 className='text-2xl font-bold tracking-tight mb-4'>
            Two ways to work with me
          </h2>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button asChild className='rounded-full px-8'>
              <Link href='/work-with-me'>
                Start a scoped build <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button variant='outline' asChild className='rounded-full px-8'>
              <Link href='/hire-me'>Explore role fit</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
