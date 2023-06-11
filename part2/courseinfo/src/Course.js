const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ course }) => {
  let parts = course.parts
  let sum = parts.reduce((acc, parts) => acc + parts.exercises, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({course}) => {
  let parts = course.parts
  return (
    <div>
      {parts.map(part => <Part part = {part} key = {part.id}/>)}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course = {course} />
      <Content course = {course} />
      <Total course = {course} />
    </div>
  )
}

export default Course;