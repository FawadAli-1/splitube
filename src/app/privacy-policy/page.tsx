import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <main>
      <section id="introduction">
        <h2 className="text-bold text-3xl">Introduction</h2>
        <p>
          Welcome to our YouTube Video Split Testing App. This policy outlines
          how we collect, use, and protect your personal information when you
          use our service.
        </p>
      </section>

      <section id="information-we-collect">
        <h2 className="text-bold text-3xl">Information We Collect</h2>
        <p>
          We collect the following types of information to provide and improve
          our service:
        </p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Includes your email address,
            YouTube channel details, and video metadata.
          </li>
          <li>
            <strong>OAuth Data:</strong> We use Google’s OAuth service to
            securely access only the necessary YouTube data.
          </li>
          <li>
            <strong>Usage Data:</strong> We may collect non-personal data such
            as site usage statistics, including page views and time spent on the
            app.
          </li>
        </ul>
      </section>

      <section id="how-we-use-your-information">
        <h2 className="text-bold text-3xl">How We Use Your Information</h2>
        <p>Your data helps us to:</p>
        <ul>
          <li>
            Provide and improve the YouTube Video Split Testing App services.
          </li>
          <li>Personalize your experience.</li>
          <li>
            Communicate updates, respond to inquiries, or notify you about
            changes.
          </li>
        </ul>
      </section>

      <section id="data-sharing-and-disclosure">
        <h2 className="text-bold text-3xl">Data Sharing and Disclosure</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>
            <strong>Third-Party Services:</strong> Trusted partners, such as
            analytics providers, solely for the purpose of improving our
            services.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information if
            required by law or to protect our rights and the rights of our
            users.
          </li>
        </ul>
      </section>

      <section id="data-retention-and-deletion">
        <h2 className="text-bold text-3xl">Data Retention and Deletion</h2>
        <p>
          We retain personal information only as long as necessary to provide
          our services. Users may request deletion of their data by contacting
          support at any time.
        </p>
      </section>

      <section id="data-security">
        <h2 className="text-bold text-3xl">Data Security</h2>
        <p>
          We use industry-standard security measures, including encryption and
          OAuth-based secure access, to protect your personal data.
        </p>
      </section>

      <section id="user-rights">
        <h2 className="text-bold text-3xl">User Rights</h2>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <ul>
          <li>
            <strong>Access and Update:</strong> Review and update your
            information.
          </li>
          <li>
            <strong>Data Deletion:</strong> Request deletion of your data at any
            time by contacting support.
          </li>
          <li>
            <strong>Data Portability:</strong> Obtain a copy of your data in a
            structured format.
          </li>
        </ul>
      </section>

      <section id="childrens-privacy">
        <h2 className="text-bold text-3xl">Children’s Privacy</h2>
        <p>
          This app is not intended for children under the age of 13 (or 16 in
          some jurisdictions). We do not knowingly collect information from
          children under this age.
        </p>
      </section>

      <section id="policy-changes">
        <h2 className="text-bold text-3xl">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy periodically. All changes will be
          posted on this page, and the date of the latest revision will be
          updated accordingly.
        </p>
      </section>

      <section id="contact-information">
        <h2 className="text-bold text-3xl">Contact Information</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a href="mailto:becomebetter101@gmail.com">becomebetter101@gmail.com</a>.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
