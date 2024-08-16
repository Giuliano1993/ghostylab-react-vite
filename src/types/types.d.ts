type ButtonProps = {
    href: string;
    text: string;
  }

type Project = {
    id: number,
    name: string,
    description: string,
    link: string,
    image: string
}
type ProjectLineProps = {
    project: Project
}