import CoursePart from "../types"
import Part from "./Part"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((coursePart, idx) => <Part key={idx} coursePart={coursePart} />)}
    </>
  )
}

export default Content