import { useState, type FormEvent } from 'react'
import './ContactSection.css'

export function ContactSection() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="snap-section contact-section" aria-label="Contact">
      <div className="contact-section__inner">
        <header>
          <p className="section-label">NEXT</p>
          <h2 className="section-title contact-section__title">
            LET&apos;S
            <br />
            BUILD.
          </h2>
          <p className="section-body">
            Web, identity, aerial, spatial — one studio. Tell me what you need.
          </p>
        </header>

        {sent ? (
          <div className="contact-section__done" role="status">
            <p className="section-label">GOT IT</p>
            <p className="section-body">
              Form is front-end only for now. Email{' '}
              <a href="mailto:hello@voxel.design">hello@voxel.design</a> and
              we&apos;ll take it from there.
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={onSubmit}>
            <label className="contact-form__field">
              <span>NAME</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label className="contact-form__field">
              <span>EMAIL</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
              />
            </label>
            <label className="contact-form__field contact-form__field--full">
              <span>PROJECT</span>
              <textarea name="message" rows={4} required placeholder="What are we making?" />
            </label>
            <button type="submit" className="contact-form__submit">
              SEND
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
