import { useState, type FormEvent } from 'react'
import { DISCIPLINES } from '../types/project'
import './Contact.css'

type Status = 'idle' | 'sent'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Front-end only for now — wire to Formspree / email API when ready.
    setStatus('sent')
  }

  return (
    <div className="page contact">
      <div className="contact-layout shell">
        <header className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h1 className="display-sm">Start a project</h1>
          <p className="lede">
            Tell us what you’re building and which disciplines matter. We reply
            within a few business days with a clear next step — not a hard sell.
          </p>
          <ul className="contact-channels">
            <li>
              <span className="contact-channels__label">Email</span>
              <a href="mailto:hello@voxel.design">hello@voxel.design</a>
            </li>
            <li>
              <span className="contact-channels__label">Studio</span>
              <span>Voxel Design · Multi-discipline practice</span>
            </li>
          </ul>
        </header>

        <div className="contact-form-wrap">
          {status === 'sent' ? (
            <div className="contact-success" role="status">
              <p className="eyebrow">Received</p>
              <h2 className="display-sm">Thanks — we’ll be in touch</h2>
              <p className="lede">
                Your note is ready on this device. When you connect a form
                backend (Formspree, Resend, etc.), submissions will deliver
                automatically. For now, email{' '}
                <a href="mailto:hello@voxel.design">hello@voxel.design</a> to
                reach us directly.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  placeholder="you@company.com"
                />
              </div>

              <fieldset className="field field--set">
                <legend>Disciplines of interest</legend>
                <div className="check-grid">
                  {DISCIPLINES.map((d) => (
                    <label key={d.id} className="check">
                      <input type="checkbox" name="disciplines" value={d.id} />
                      <span>{d.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field">
                <label htmlFor="message">Project notes</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Goals, timeline, links, or questions…"
                />
              </div>

              <button type="submit" className="btn btn--primary contact-form__submit">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
