export default function About() {
  return (
    <div
      id="About"
      className="text-center my-5 p-10 text-slate-600 flex flex-col justify-start items-center gap-10"
    >
      <h3>About</h3>

      <div className="text-xl">
        <p>
          This is my first Full Stack Website with authentication and databases.
        </p>
        <p>I used MERN Stack for this project</p>
      </div>

      <ol>
        <li>
          <a className="underline text-orange-600 text-xl font-bold" href="#">
            Github
          </a>
        </li>
        <li>
          <a className="underline text-orange-600 text-xl font-bold" href="#">
            Website
          </a>
        </li>
      </ol>

      {/* <p className=" max-w-screen-sm">
        This project is one the largest project I ever worked on and this took
        me weeks. This project was very simple and staright forward but since a
        lot of tool I used in this project such as sass, mongodb, typescript,
        tailwind, etc. were new to me and it was my first using them, it became
        a headeach, but now I am familiar to all those tools because of this
        project.
      </p>

      <p className="max-w-screen-sm">
        The process of making this website wasn't staright forward either it
        went worse as days passed by. In the first week I initialized a
        typescript + node on express server with the help of chatgpt and I
        completed the backend, its was easy since at that time I was learning
        backend and my entire focus was on it and also chatgpt helped me a lot
        with database related stuff, plus I was having my holidays because my
        board exams were over few days ago and i spent almost all my day working
        on backend.
        <br />
        <br />
        But then after completing backend I decided to work on another project
        called BaseShift you can find it on my github. That project took me
        around 7 to 8 days to complete it was my first svelte project. After
        that I decided to start working on the frontend of this web and it went
        worse day by day. In the start I was writing clean code and kept
        everything organised and distributed into small components and I think
        this was another big mistake because as project grew larger to maintain
        the continuity I continued to have small this divided into small
        coponents and got a huge list of files and it became harder to navigate
        between files and debug plus rendering data fetched from backend on load
        didnt work as intended either and i had to use many roundabouts to
        achieve want i intended which made my code readability worse and made it
        even harder to debug and it reached to a point where even add a single
        feature was a headache and many times i thought i should drop this
        project even yesterday just because categories with name were causing
        problem and i had to debug it, even tho the project was almost
        completed. But anyways here is this project completed and running.
      </p>

      <h6>
        Thank You, <br /> Aditya Jaiswal
      </h6> */}
    </div>
  );
}
