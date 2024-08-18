type ButtonProps = {
    href: string;
    text: string;
  }

type Project = {
    id?: number,
    name: string,
    description: string,
    link: string,
    image: string,
    public: boolean
}
type ProjectLineProps = {
    project: Project,
    onChange: ()=>void
}

type SkillBoxProps = {
    skill: string
}

interface ProjectInterface {
  all: () => Promise<Array<Project>>;
  get: (id: number) => Promise<Project | null>;
  create: (data: Project) => Promise<Project | null>;
  update: (id: number, data: Project) => Promise<boolean | null>;
  delete: (id: number) => Promise<boolean | null>;
}