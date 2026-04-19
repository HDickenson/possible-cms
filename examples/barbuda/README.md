# Barbuda example

Reference implementation #2: Barbuda Leisure Tours marketing site. Proves that the core is generic by a second consumer passing no AIIA-specific assumptions.

Defines:
- Page
- Tour (title, description, duration, price, hero image, operator ref, reviews ref)
- Operator
- BookingInquiry
- Review
- BlogPost, Author, Testimonial, FAQ, Legal (inherit from base)

Seed importer: reads existing Barbuda Leisure D1 + static content.

Implementation: Epic 10. Blocker if AIIA schema bundle has leaked assumptions into core — refactor before v0.1.
