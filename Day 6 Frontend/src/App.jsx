import { useState } from "react";
import "./App.css";

const initialForm = {
  username: "",
  password: "",
  email: "",
};

const initialSigninForm = {
  username: "",
  password: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [signinForm, setSigninForm] = useState(initialSigninForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [signinMessage, setSigninMessage] = useState("");
  const [signinError, setSigninError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSigninChange(event) {
    const { name, value } = event.target;
    setSigninForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(
          `Signup failed (HTTP ${response.status}). Please try again.`,
        );
      }

      setMessage("Your account was created successfully.");
      setForm(initialForm);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to sign up. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignin(event) {
    event.preventDefault();
    setIsSigningIn(true);
    setSigninMessage("");
    setSigninError("");

    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinForm),
      });
      const data = await response.json();

      if (!response.ok || typeof data.token !== "string") {
        throw new Error(
          typeof data.msg === "string"
            ? data.msg
            : `Sign in failed (HTTP ${response.status}). Please try again.`,
        );
      }

      console.log("Signin token:", data.token);

      localStorage.setItem("token", data.token);

      setSigninMessage(data.msg || "Signed in successfully.");
      setSigninForm(initialSigninForm);
    } catch (requestError) {
      setSigninError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSigningIn(false);
    }
  }

  const [courseData, setCourseData] = useState(null);
  const [isFetchingCourses, setIsFetchingCourses] = useState(false);
  const [courseError, setCourseError] = useState("");

  async function handleFetchCourses() {
    setIsFetchingCourses(true);
    setCourseError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error(`Could not fetch courses (HTTP ${response.status}).`);
      }

      const responseData = await response.json();
      const course = responseData.data;

      if (
        !course ||
        typeof course.courseId !== "string" ||
        typeof course.courseName !== "string" ||
        typeof course.material !== "string"
      ) {
        throw new Error("The server returned course data in an unexpected format.");
      }

      setCourseData(course);
    } catch (requestError) {
      setCourseError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to fetch courses. Please try again.",
      );
    } finally {
      setIsFetchingCourses(false);
    }
  }

  return (
    <>
      <main className="signup-page">
        <div className="signup-card">
          <section aria-labelledby="signup-title">
            <div className="signup-heading">
              <span className="signup-eyebrow">GET STARTED</span>
              <h1 id="signup-title">Create your account</h1>
              <p>Sign up with your details below.</p>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              <label htmlFor="signup-username">Username</label>
              <input
                autoComplete="username"
                id="signup-username"
                name="username"
                onChange={handleChange}
                placeholder="Your name"
                required
                value={form.username}
              />

              <label htmlFor="signup-email">Email address</label>
              <input
                autoComplete="email"
                id="signup-email"
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                required
                type="email"
                value={form.email}
              />

              <label htmlFor="signup-password">Password</label>
              <input
                autoComplete="new-password"
                id="signup-password"
                name="password"
                onChange={handleChange}
                placeholder="Create a password"
                required
                type="password"
                value={form.password}
              />

              <button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Signing up…" : "Sign up"}
              </button>
            </form>

            {message && (
              <p className="form-message success" role="status">
                {message}
              </p>
            )}
            {error && (
              <p className="form-message failure" role="alert">
                {error}
              </p>
            )}
          </section>

          <section className="signin-section" aria-labelledby="signin-title">
            <div className="signup-heading">
              <h2 id="signin-title">Already have an account?</h2>
              <p>Sign in to test your credentials.</p>
            </div>

            <form className="signup-form" onSubmit={handleSignin}>
              <label htmlFor="signin-username">Username</label>
              <input
                autoComplete="username"
                id="signin-username"
                name="username"
                onChange={handleSigninChange}
                placeholder="Your name"
                required
                value={signinForm.username}
              />

              <label htmlFor="signin-password">Password</label>
              <input
                autoComplete="current-password"
                id="signin-password"
                name="password"
                onChange={handleSigninChange}
                placeholder="Your password"
                required
                type="password"
                value={signinForm.password}
              />

              <button disabled={isSigningIn} type="submit">
                {isSigningIn ? "Signing in…" : "Sign in"}
              </button>
            </form>

            {signinMessage && (
              <p className="form-message success" role="status">
                {signinMessage}
              </p>
            )}
            {signinError && (
              <p className="form-message failure" role="alert">
                {signinError}
              </p>
            )}
          </section>
        </div>
      </main>

      <section className="courses-section" aria-labelledby="courses-title">
        <div className="courses-header">
          <div>
            <span className="signup-eyebrow">YOUR LEARNING</span>
            <h2 id="courses-title">Course details</h2>
            <p>Fetch your course information from the backend.</p>
          </div>
          <button
            className="courses-fetch-button"
            disabled={isFetchingCourses}
            onClick={handleFetchCourses}
            type="button"
          >
            {isFetchingCourses ? "Fetching…" : "Fetch course"}
          </button>
        </div>

        {courseError && (
          <p className="form-message failure" role="alert">
            {courseError}
          </p>
        )}

        {courseData ? (
          <article className="course-card" aria-label="Course information">
            <div className="course-card-heading">
              <span className="course-label">ENROLLED COURSE</span>
              <span className="course-id">ID: {courseData.courseId}</span>
            </div>
            <h3>{courseData.courseName}</h3>
            <div className="course-material">
              <span className="material-icon" aria-hidden="true">
                &lt;/&gt;
              </span>
              <div>
                <span className="course-label">COURSE MATERIAL</span>
                <p>{courseData.material}</p>
              </div>
            </div>
          </article>
        ) : (
          !courseError && (
            <p className="courses-empty" role="status">
              {isFetchingCourses
                ? "Loading your course details…"
                : "Your course details will appear here."}
            </p>
          )
        )}
      </section>
    </>
  );
}

export default App;
