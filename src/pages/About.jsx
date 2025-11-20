export function About() {
    return (
        <section className="about">
            <div className="container">
                <h1 className="about-title">About</h1>
                <p className="about-description">
                    This website serves as a platform for hosting the public and private work of Ellis Mark Hughes while it is being developed and/or externally regulated.
                </p>
                <p className="about-copyright">
                    © {new Date().getFullYear()} Ellis Mark Hughes. All rights reserved.
                </p>
            </div>
        </section>
    )
}
