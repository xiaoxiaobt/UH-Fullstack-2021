import CoursePart from "../types"

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {

  switch (coursePart.type) {
    case "normal":
      return (
        <>
          <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
          <p><i>{coursePart.description}</i></p>
          <br/>
        </>
      )
    case "groupProject":
      return (
        <>
          <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
          <p>project exercises {coursePart.groupProjectCount}</p>
          <br/>
        </>
      )
    case "submission":
      return (
        <>
          <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
          <p><i>{coursePart.description}</i></p>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
          <br/>
        </>
      )
    case "special":
      return (
        <>
          <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
          <p><i>{coursePart.description}</i></p>
          <p>required skills: {coursePart.requirements.join(", ")}</p>
          <br/>
        </>
      )
    default:
      assertNever(coursePart)
      return null;
  }


}

export default Part