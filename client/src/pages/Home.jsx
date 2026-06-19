import React from "react";

const Home = () => {
  const styles = {
  page: {
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#F8FAFC",
    color: "#0F172A",
  },

  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "0 8%",
    background:
      "linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)",
    color: "#fff",
  },

  heroContent: {
    maxWidth: "850px",
  },

  title: {
    fontSize: "4.5rem",
    fontWeight: "800",
    marginBottom: "20px",
    lineHeight: "1.1",
  },

  subtitle: {
    fontSize: "1.25rem",
    opacity: "0.9",
    lineHeight: "1.8",
    marginBottom: "35px",
  },

  buttonGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "15px 35px",
    background: "#F97316",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },

  secondaryBtn: {
    padding: "15px 35px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },

  section: {
    padding: "90px 8%",
  },

  heading: {
    textAlign: "center",
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "15px",
  },

  subHeading: {
    textAlign: "center",
    color: "#64748B",
    marginBottom: "50px",
    fontSize: "1.1rem",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  serviceIcon: {
    fontSize: "2.5rem",
    marginBottom: "15px",
  },

  categoryCard: {
    background: "#fff",
    padding: "50px 20px",
    textAlign: "center",
    borderRadius: "20px",
    fontWeight: "600",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  statsSection: {
    background: "#0F172A",
    padding: "90px 8%",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "25px",
  },

  statCard: {
    background: "#1E293B",
    color: "#fff",
    textAlign: "center",
    padding: "35px",
    borderRadius: "18px",
  },

  statNumber: {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#F97316",
  },

  testimonialSection: {
    padding: "90px 8%",
    background: "#EEF2FF",
  },

  testimonialCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  footer: {
    background: "#0F172A",
    color: "#fff",
    textAlign: "center",
    padding: "30px",
  },
};

  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Print Your Ideas Into Reality</h1>

          <p style={styles.subtitle}>
            Professional printing solutions for businesses, events,
            marketing campaigns, and personal projects. Fast delivery,
            premium quality, and affordable pricing.
          </p>

          <div style={styles.buttonContainer}>
            <button style={styles.primaryBtn}>Shop Now</button>
            <button style={styles.secondaryBtn}>Explore Products</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Our Services</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Premium Quality</h3>
            <p>High-resolution prints with vibrant colors.</p>
          </div>

          <div style={styles.card}>
            <h3>Fast Delivery</h3>
            <p>Reliable and timely delivery for every order.</p>
          </div>

          <div style={styles.card}>
            <h3>Custom Designs</h3>
            <p>Create unique products tailored to your needs.</p>
          </div>

          <div style={styles.card}>
            <h3>Affordable Pricing</h3>
            <p>Competitive rates without compromising quality.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={styles.lightSection}>
        <h2 style={styles.heading}>Popular Categories</h2>

        <div style={styles.grid}>
          <div style={styles.card}>Business Cards</div>
          <div style={styles.card}>Flyers</div>
          <div style={styles.card}>Posters</div>
          <div style={styles.card}>Banners</div>
          <div style={styles.card}>Custom T-Shirts</div>
          <div style={styles.card}>Mugs</div>
        </div>
      </section>

      {/* Stats */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Why Choose Us</h2>

        <div style={styles.grid}>
          <div style={styles.darkCard}>
            <h1>10K+</h1>
            <p>Orders Completed</p>
          </div>

          <div style={styles.darkCard}>
            <h1>99%</h1>
            <p>Customer Satisfaction</p>
          </div>

          <div style={styles.darkCard}>
            <h1>24/7</h1>
            <p>Customer Support</p>
          </div>

          <div style={styles.darkCard}>
            <h1>500+</h1>
            <p>Business Clients</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.lightSection}>
        <h2 style={styles.heading}>Customer Reviews</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <p>
              "Excellent quality and quick delivery. Highly
              recommended!"
            </p>
            <h4>— Rahul Sharma</h4>
          </div>

          <div style={styles.card}>
            <p>
              "Our brochures looked fantastic. Great customer support."
            </p>
            <h4>— Priya Patel</h4>
          </div>

          <div style={styles.card}>
            <p>
              "Affordable and professional service every time."
            </p>
            <h4>— Amit Verma</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;