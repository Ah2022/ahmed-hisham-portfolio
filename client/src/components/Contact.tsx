import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
export default function Contact() {
  return (
    <section id="contact" className="portfolio-section">
      <div className="container">
        <SectionHeading
          number="06"
          label="CONTACT"
          title="Let's discuss your next BIM project."
          description="For BIM delivery opportunities, plumbing and fire protection coordination, or Revit workflow development."
        />
        <div className="contact-options">
          <a href="mailto:ahmed.hisham2000.ah@gmail.com">
            <Mail size={22} aria-hidden="true" />
            <span>
              <strong>Email Ahmed</strong>
              <small>ahmed.hisham2000.ah@gmail.com</small>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            href="https://linkedin.com/in/ahmed-hisham26"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={22} aria-hidden="true" />
            <span>
              <strong>Connect on LinkedIn</strong>
              <small>linkedin.com/in/ahmed-hisham26</small>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
