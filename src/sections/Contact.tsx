import { useRef, useState, type FormEvent } from 'react';
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiMail, FiPhone, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import useToggleReveal from '../hooks/useToggleReveal';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/portfolio';

type Status = 'idle' | 'sending' | 'success' | 'error';

const FORM_KEY = import.meta.env.VITE_FORM_KEY as string | undefined;

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useToggleReveal(root, '.contact-anim', { y: 45, duration: 0.8 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const socials = [
    { icon: FiFacebook, href: profile.socials.facebook, label: 'Facebook' },
    { icon: FiGithub, href: profile.socials.github, label: 'GitHub' },
    { icon: FiLinkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
    { icon: FiInstagram, href: profile.socials.instagram, label: 'Instagram' },
  ];

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:hello@hamzaboudi.dev?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // No backend key → mailto fallback (works without setup)
    if (!FORM_KEY) {
      mailtoFallback();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `Portfolio contact from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" ref={root} className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="contact-anim">
          <SectionHeading
            eyebrow="Hire me"
            title={<>Let&apos;s build something <span className="text-gradient">great together</span></>}
            desc="Open for freelance & full-time. Call, message, or send the form."
          />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* info card */}
          <div className="contact-anim rounded-2xl border border-black/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-7 dark:border-white/10 dark:bg-white/[0.03]">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500" /> Available now
            </span>
            <h3 className="font-display mt-4 text-2xl font-bold text-neutral-900 dark:text-white">{profile.name}</h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{profile.tagline}</p>
            <div className="mt-6 space-y-3">
              <a href={profile.socials.phone} className="glow-link flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
                <span className="rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 p-2.5 text-white"><FiPhone size={17} /></span>
                <span><span className="block text-xs text-neutral-500">Phone</span><span className="font-semibold text-neutral-900 dark:text-white">{profile.socials.phoneDisplay}</span></span>
              </a>
              <a href={profile.socials.email} className="glow-link flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
                <span className="rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 p-2.5 text-white"><FiMail size={17} /></span>
                <span><span className="block text-xs text-neutral-500">Email</span><span className="font-semibold text-neutral-900 dark:text-white">hello@hamzaboudi.dev</span></span>
              </a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="glow-link flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/5 p-3.5 hover:shadow-lg">
                <span className="rounded-lg bg-[#25D366] p-2.5 text-white"><FaWhatsapp size={17} /></span>
                <span><span className="block text-xs text-neutral-500">WhatsApp</span><span className="font-semibold text-neutral-900 dark:text-white">Chat instantly →</span></span>
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}
                  className="glow-icon rounded-full border border-black/10 bg-white p-3 text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                  <s.icon size={18} />
                </a>
              ))}
              <a href={profile.resume} download="Hamza-Boudi-CV.pdf"
                className="glow-btn rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black">
                ↓ CV
              </a>
            </div>
          </div>
          {/* form */}
          <form onSubmit={onSubmit} className="contact-anim rounded-2xl border border-black/10 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-[#12121A]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-neutral-500">Name</span>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name" autoComplete="name"
                  className="w-full rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-neutral-500">Email</span>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@mail.com" autoComplete="email"
                  className="w-full rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-neutral-500">Message</span>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project…"
                className="w-full resize-none rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-white/5 dark:text-white" />
            </label>
            <button type="submit" disabled={status === 'sending'}
              className="glow-btn mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 disabled:opacity-60">
              <FiSend size={16} />
              {status === 'sending' ? 'Sending…' : status === 'success' ? 'Message sent ✓' : status === 'error' ? 'Failed — try email' : 'Send message'}
            </button>
            <p className="mt-3 text-center text-xs text-neutral-500" role="status">
              {FORM_KEY ? 'Delivered via secure form backend.' : 'No key set — opens your email client. Add VITE_FORM_KEY for backend delivery.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
