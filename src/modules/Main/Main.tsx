import clsx from "clsx";
import { FC, useEffect, useState } from "react";

import { Title } from "@/components/Title";
import { Typography } from "@/ui/Typography";
import { Chip } from "@/ui/Chip";
import { Timeline } from "@/components/Timeline";

import styles from "./styles.module.scss";

type MainProps = {
  className?: string;
};

export const Main: FC<MainProps> = ({ className }) => {
  const [data, setData] = useState(null);
  const url = "https://api.jsonbin.io/v3/b/68ff4b50ae596e708f3017fc";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Access-Key":
  //           "$2a$10$wsWKlqQX88USN66M8T63F.szF6Dnraomfn8jIKAO348yH00tVS4fi",
  //       },
  //     });

  //     if (!response.ok) {
  //       console.error("Ошибка запроса", response.status);
  //       return;
  //     }

  //     const json = await response.json();
  //     console.log(json, "Data");
  //     setData(json);
  //   };

  //   fetchData();
  // }, []);

  return (
    <main className={clsx(className, styles.container)}>
      <Title tag="h1" className={styles.title}>
        Summary
      </Title>
      <Typography className={styles.text}>
        Front-end developer with 10+ years of commercial and start-up
        experience. Building and support of large-scale projects and web
        applications. Experience with modern (and not so) JavaScript frameworks
        and libraries. I have experience in development of a full cycle
        applications, including backend. Huge experience in the team using Agile
        methodology with Scrum\Kanban frameworks.
      </Typography>
      <Typography className={styles.text}>
        <strong>• JS</strong> - strong skills. Proficient in
        <Chip variant="filled">ES6+</Chip> syntax. Understanding of asynchronous
        code. Understanding cross-browser compatibility and optimizing
        applications for different browsers. Manipulating DOM elements.
        Understanding the event loop in JavaScript.
      </Typography>
      <Typography className={styles.text}>
        <strong>• Frameworks</strong> - Key framework is
        <Chip variant="filled">ReactJS/NextJS</Chip> and
        <Chip variant="filled">React ecosystem</Chip>. Working with global state
        managers like
        <Chip variant="filled">Redux\Flux\MobX</Chip> and asynchronously tools
        <Chip variant="filled">Thunk\Saga</Chip>. Understanding the module
        architecture of a React application. Experience in creation mobile and
        desktop applications with
        <Chip variant="filled">React Native</Chip>,
        <Chip variant="filled">Electron</Chip>. Also have basic knowledge of
        <Chip variant="filled">Vue.js</Chip>.
      </Typography>
      <Typography className={styles.text}>
        <strong>• Markup</strong> - Wide experience of HTML/CSS.
        Cross-Browser/Cross-Platform development knowledge of best practices for
        performance. Using preprocessor and postprocessor languages. Also
        understand all modern methodology and using them with JS frameworks
      </Typography>
      <Typography className={styles.text}>
        <strong>• Backend</strong> - Good knowledge of
        <Chip variant="filled">Node.js</Chip>. Basic knowledge of
        <Chip variant="filled">Python\PHP</Chip> languages. Understanding the
        construction of REST API applications and client-server communication.
        Integration with 3th-part applications. Experience with
        <Chip variant="filled">Django</Chip>,
        <Chip variant="filled">NextJS</Chip>,
        <Chip variant="filled">Laravel</Chip> frameworks.
      </Typography>
      <Typography className={styles.text}>
        <strong>• Databases</strong> - Understanding the basics of relational
        and NoSQL databases. Experience with major database management systems
        like
        <Chip variant="filled">MySQL</Chip>,
        <Chip variant="filled">PostgreSQL</Chip>,
        <Chip variant="filled">MongoDB</Chip>
      </Typography>
      <Typography className={styles.text}>
        <strong>• Graphic</strong> - Experience in raster and vector
        graphics(Canvas, SVG). Graphic Frameworks (GSAP, Snap.svg, D3). Basic
        understanding of web design.
      </Typography>
      <Typography className={styles.text}>
        <strong>• Other</strong> - OOP\Functional\Reactive methodology
        understanding, MV*, Design Patterns, SOLID principles.{" "}
      </Typography>
      <Title tag="h1" className={styles.title}>
        Work History
      </Title>

      <div className={clsx(styles.works, styles.section)}>
        <Timeline
          date={["2024-04"]}
          position="Senior Software Engineer"
          company="Starwind"
          skills={["NextJS/React", "Monorepo", "Microfrontend", "Typescript"]}
        >
          <Typography>
            Developed applications focused on virtual machines. Designed and
            implemented solutions using microfrontend architecture with Module
            Federation technologies. Specialized in advanced architectural
            configurations and seamless integration of multiple isolated web
            applications.
          </Typography>
        </Timeline>
        <Timeline
          date={["2024-04", "2024-12"]}
          position="Frontend Teamlead"
          company="MetaChain"
          skills={["NextJS/React", "Web3", "PWA", "Typescript"]}
        >
          <Typography>
            I worked at a company specializing in cryptocurrency operations and
            the development of blockchain-related applications. I led a small
            team, overseeing various aspects of working with digital assets,
            including the creation and maintenance of crypto platforms,
            integration of blockchain solutions.
          </Typography>
        </Timeline>

        <Timeline
          date={["2021-10", "2024-04"]}
          position="Senior Software Engineer"
          company="AURA"
          skills={[
            "React/Redux",
            "JavaScript",
            "Browser Extensions",
            "PWA",
            "Typescript",
            "React-Native",
          ]}
        >
          <Typography>
            Work on complex solutions in the field of user security. Creation
            and support of applications. Development of browser extensions.
          </Typography>
        </Timeline>
        <Timeline
          date={["2020-02", "2021-10"]}
          position="Senior Software Engineering"
          company="EPAM Systems"
          skills={[
            "React/Redux",
            "JavaScript",
            "Django",
            "Typescript",
            "NodeJS",
          ]}
        >
          <Typography>
            Worked on several large projects as an outsourcing developer.
            Developed high-load web applications from scratch. Supported ongoing
            projects. Collaborated and interacted with various teams and
            clients.
          </Typography>
        </Timeline>
        <Timeline
          date={["2016-08", "2020-02"]}
          position="Frontend Developer"
          company="ZEO Alliance"
          skills={["React/Redux", "JavaScript", "Electron", "React-Native"]}
        >
          <Typography>
            Worked as a frontend developer in a product company, beginning in
            the marketing department. Focused on creating user-friendly and
            visually appealing web interfaces to enhance customer engagement and
            drive conversions. Later transitioning to the R&amp;D department.
            Focus shifted towards more experimental and cutting-edge projects.
            Prototyping, researching new technologies, and developing solutions.
          </Typography>
        </Timeline>
        <Timeline
          date={["2013-04", "2016-07"]}
          position="Frontend Developer"
          company="ARIO Industrial Inc"
          skills={["JavaScript", "Symfony"]}
        >
          <Typography>
            Work orient in large-scale projects and commercial sites. Creating
            e-commerce websites. Development of adaptive websites and mobile
            applications.
          </Typography>
        </Timeline>
        <Timeline
          date={["2011-11", "2013-04"]}
          position="Markup developer"
          company="GeeksForLess Inc"
          skills={["JavaScript", "HTML", "CSS"]}
        >
          <Typography>
            Responsible for creating and coding web pages. Work involved
            accurately converting designs from mockups into clean and
            semantically correct HTML, CSS and JS code. Created web page
            layouts, advertising material and logos from the ground up based on
            project requirements.
          </Typography>
        </Timeline>
        <Timeline
          date={["2011-04", "2011-10"]}
          position="Data-analist"
          company="GeeksForLess Inc"
          skills={["JavaScript", "MSSQL", "RegExp"]}
        >
          <Typography>
            Agents creation for the data extraction from external sources.
            Transformation and cleaning with the subsequent loading in the SQL
            base. Databases technologies (SQL etc), XML, Javascript, ETL
            frameworks
          </Typography>
        </Timeline>
      </div>
      <div className={styles.section}>
        <Title tag="h2" className={styles.title}>
          Education
        </Title>
        <Timeline
          date={["2007", "2013"]}
          position="Petro Mohyla Black Sea State University"
          company="Computer Science"
        >
          <Typography>Assistant Network Administrator</Typography>
        </Timeline>
      </div>
      <div className={styles.section}>
        <Title tag="h2" className={styles.title}>
          Achievement
        </Title>
        <Typography>
          • Finalist <Chip variant="filled">IX</Chip> Ukrainian Web Challenge,
          in nomination <Chip variant="filled">Frontend Developer</Chip>.
        </Typography>
        <Typography>
          • Mentor in Frontend courses in{" "}
          <Chip variant="filled">PHP-Academy</Chip>
        </Typography>
      </div>

      <div className={styles.section}>
        <Title tag="h2" className={styles.title}>
          Languages
        </Title>
        <Typography>
          <strong>Ukrainian</strong> - Native language
        </Typography>
        <Typography>
          <strong>English</strong> - Intermediate (B1-B2)
        </Typography>
      </div>
    </main>
  );
};
