import React from "react";
import { BookOpen, ShieldCheck, Code2, Sparkles, Mail } from "lucide-react";
import NavBar from "../Components/NavBar";

/* -------------------- REUSABLE COMPONENTS -------------------- */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
    <div className="flex justify-center mb-5 p-4 bg-gray-50 rounded-full w-fit mx-auto group-hover:bg-primary group-hover:text-white transition-colors">
      {React.cloneElement(icon, { className: "w-8 h-8 group-hover:text-white transition-colors" })}
    </div>
    <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
    <p className="text-secondary leading-relaxed">{desc}</p>
  </div>
);

const InfoCard = ({ title, content }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
    <h3 className="text-2xl font-bold mb-4 text-primary font-serif border-l-4 border-accent pl-4">{title}</h3>
    <p className="text-secondary leading-relaxed text-lg">{content}</p>
  </div>
);

/* -------------------- MAIN PAGE -------------------- */

const AboutPage = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-background px-6 py-12">
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto text-center mb-20 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight font-serif">
            A Modern Online Bookstore <br />
            <span className="text-accent">Built for Real Users</span>
          </h1>
          <p className="text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            This bookstore is a full-stack application designed to deliver a smooth,
            secure, and enjoyable book-buying experience — from browsing to checkout.
          </p>
        </section>

        {/* VALUE PROPOSITION */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <FeatureCard
            icon={<BookOpen className="text-primary" />}
            title="Reader-First Design"
            desc="Clean UI, fast navigation, and smart search so users find books without friction."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-primary" />}
            title="Secure & Scalable"
            desc="JWT authentication, role-based access, and backend architecture designed to scale."
          />
          <FeatureCard
            icon={<Code2 className="text-primary" />}
            title="Production-Grade Stack"
            desc="Built using industry-relevant tools with real-world best practices."
          />
        </section>

        {/* MISSION & VISION */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          <InfoCard
            title="Project Mission"
            content="To build a real-world e-commerce bookstore that demonstrates strong backend logic, clean frontend architecture, and secure user flows."
          />
          <InfoCard
            title="Project Vision"
            content="To evolve this project into a feature-rich, scalable platform while continuously improving performance, UX, and maintainability."
          />
        </section>

        {/* DEVELOPER SECTION */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>

            <img
              src="https://i.pravatar.cc/200?img=3"
              alt="Developer"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover ring-4 ring-gray-50 shadow-lg"
            />

            <h2 className="text-3xl font-bold text-primary mb-2 font-serif">
              Amogh Shrivastav
            </h2>
            <p className="text-accent font-bold mb-6 tracking-wide uppercase text-sm">
              Full-Stack Developer • Spring Boot & React
            </p>

            <p className="text-secondary leading-relaxed max-w-2xl mx-auto text-lg">
              I built this bookstore as a serious full-stack project to simulate
              real-world development scenarios. It focuses on backend correctness,
              API design, authentication, and a responsive frontend — not just visuals.
            </p>

            {/* TECH STACK */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                "Spring Boot",
                "JWT Security",
                "React",
                "REST APIs",
                "MySQL",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-accent px-4 py-1 bg-yellow-50 rounded-full">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wider">Still Improving</span>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4 font-serif">
            Open to Feedback & Opportunities
          </h2>
          <p className="text-secondary max-w-xl mx-auto mb-8 text-lg">
            This project is actively evolving. I’m open to collaboration, feedback,
            and professional opportunities.
          </p>
          <a href="mailto:contact@example.com">
            <button className="bg-primary hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
              <Mail className="w-5 h-5" /> Contact Me
            </button>
          </a>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
