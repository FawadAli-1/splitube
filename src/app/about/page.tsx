import Footer from "@/components/shared/Footer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About"
}

const AboutPage = () => {
  return (
    <>
      <section className="flex flex-col gap-12 px-8 mt-16 pb-12 border-b border-gray-300">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">What We Do:</h2>
          <p className="text-slate-600">
            Our app helps YouTube creators enhance their content by comparing
            different video attributes. Simply connect your Gmail associated
            with your YouTube channel, select a video, and set up your test.
            Upload two variations of each element, and let our system switch
            between them to determine the best-performing option. After six
            days, you’ll receive insights to guide your content strategy.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">How It Works:</h2>
          <ol className="flex flex-col gap-3 text-slate-600 list-disc">
            <li>
              Sign in with your Gmail account linked to your YouTube channel.
            </li>
            <li>Fetch your videos and select one to start testing.</li>
            <li>
              Upload two sets for each attribute: thumbnails, titles,
              descriptions, and tags.
            </li>
            <li>
              Our system will first apply Set A and collect performance data for
              3 days, then switch to Set B for another 3 days.
            </li>
            <li>
              Receive detailed results after the testing period to see which set
              performed better.
            </li>
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions:</h2>
          <div className="text-slate-600 flex flex-col gap-4">
            <h3 className="text-xl font-bold">
              Is my YouTube account information safe?
            </h3>
            <p>
              Yes, we use OAuth for secure authentication. Your credentials are
              never stored, and access is granted only to data necessary for
              split testing.
            </p>
          </div>
          <div className="text-slate-600 flex flex-col gap-4">
            <h3 className="text-xl font-bold">
              Can I stop a test once it has started?
            </h3>
            <p>
              While tests are scheduled to run for 6 days, you may stop the test
              at any point, although partial data may affect the results.
            </p>
          </div>
          <div className="text-slate-600 flex flex-col gap-4">
            <h3 className="text-xl font-bold">
              How do I view the test results?
            </h3>
            <p>
              Once the test is complete, you’ll receive a detailed report on
              engagement metrics, helping you choose the best-performing
              attributes.
            </p>
          </div>
          <div className="text-slate-600 flex flex-col gap-4">
            <h3 className="text-xl font-bold">
              Is there a limit to the number of tests I can run?
            </h3>
            <p>
              You can run as many tests as you’d like, but only one test can be
              active per video at any time.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;
