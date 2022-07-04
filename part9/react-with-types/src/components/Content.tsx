const Content = ({ courseParts }: { courseParts: { name: string, exerciseCount: number }[] }) => {
  return (
    <>
      {courseParts.map(({ name, exerciseCount }) => {
        return <p key={name}>{name} {exerciseCount}</p>
      })}
    </>
  )
}

export default Content